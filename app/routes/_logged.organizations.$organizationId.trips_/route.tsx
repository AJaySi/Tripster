import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Card,
  DatePicker,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  TableProps,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

interface Trip {
  id: string
  name: string
  startDate?: string
  endDate?: string
  destination?: string
  status?: string
}
const { Title, Text } = Typography
const { Search } = Input

export default function TripListPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null])
  const [selectedDestination, setSelectedDestination] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')

  // Delete trip mutation
  const { mutateAsync: deleteTrip, isLoading: isLoadingDelete } =
    Api.trip.delete.useMutation()

  // Fetch trips data
  const {
    data: trips,
    isLoading,
    refetch,
  } = Api.trip.findMany.useQuery({
    where: {
      organizationId,
    },
    include: {
      tripMembers: {
        include: {
          user: true,
        },
      },
    },
  })

  // Filter trips based on search and filters
  const handleDeleteTrip = async (tripId: string) => {
    await deleteTrip({ where: { id: tripId } })
    refetch()
  }

  const filteredTrips = trips?.filter(trip => {
    const matchesSearch =
      trip.name.toLowerCase().includes(searchText.toLowerCase()) ||
      trip.destination?.toLowerCase().includes(searchText.toLowerCase())

    const matchesDestination =
      !selectedDestination || trip.destination === selectedDestination
    const matchesStatus = !selectedStatus || trip.status === selectedStatus

    const matchesDate =
      !dateRange[0] ||
      !dateRange[1] ||
      (dayjs(trip.startDate).isAfter(dateRange[0]) &&
        dayjs(trip.endDate).isBefore(dateRange[1]))

    return matchesSearch && matchesDestination && matchesStatus && matchesDate
  })

  // Get unique destinations for filter
  const destinations = [
    ...new Set(trips?.map(trip => trip.destination).filter(Boolean)),
  ]
  const statuses = [...new Set(trips?.map(trip => trip.status).filter(Boolean))]

  const columns: TableProps<Trip>['columns'] = [
    {
      title: 'Trip Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Trip) => (
        <Space>
          <i className="las la-suitcase"></i>
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
      render: (text?: string) => (
        <Space>
          <i className="las la-map-marker"></i>
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Dates',
      key: 'dates',
      render: (record: Trip) => (
        <Space>
          <i className="las la-calendar"></i>
          <Text>
            {record.startDate} - {record.endDate}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text?: string) => (
        <Space>
          <i className="las la-info-circle"></i>
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Trip) => (
        <Space>
          <Button
            type="primary"
            onClick={() =>
              navigate(`/organizations/${organizationId}/trips/${record.id}`)
            }
          >
            <i className="las la-eye"></i> View
          </Button>
          <Button
            onClick={() =>
              navigate(
                `/organizations/${organizationId}/trips/${record.id}/collaborate`,
              )
            }
          >
            <i className="las la-users"></i> Collaborate
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this trip?"
            onConfirm={() => handleDeleteTrip(record.id)}
            okText="Yes, delete"
            cancelText="Cancel"
          >
            <Button type="text" danger loading={isLoadingDelete}>
              <i className="las la-trash"></i>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Card style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <Title level={2}>
          <i className="las la-suitcase"></i> My Trips
        </Title>
        <Text type="secondary">
          Manage and view all your past and upcoming trips
        </Text>

        <div style={{ marginTop: 24, marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Search
              placeholder="Search trips..."
              onChange={e => setSearchText(e.target.value)}
              style={{ maxWidth: 400 }}
            />

            <Space wrap>
              <DatePicker.RangePicker
                onChange={dates =>
                  setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
                }
              />

              <Select
                style={{ width: 200 }}
                placeholder="Filter by destination"
                allowClear
                onChange={setSelectedDestination}
              >
                {destinations.map(dest => (
                  <Select.Option key={dest} value={dest}>
                    {dest}
                  </Select.Option>
                ))}
              </Select>

              <Select
                style={{ width: 200 }}
                placeholder="Filter by status"
                allowClear
                onChange={setSelectedStatus}
              >
                {statuses.map(status => (
                  <Select.Option key={status} value={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>
            </Space>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredTrips}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </PageLayout>
  )
}
