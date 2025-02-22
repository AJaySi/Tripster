import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Markdown } from '@/designSystem/ui/Markdown'
import { useParams } from '@remix-run/react'
import {
  Alert,
  Button,
  Card,
  Collapse,
  List,
  Modal,
  Progress,
  Space,
  Table,
  Tabs,
  Tag,
  Timeline,
  Typography,
  Upload,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

type DocumentAlert = {
  description: string
}
const { Title, Text } = Typography
const { Panel } = Collapse

export default function TripDetailsPage() {
  const { tripId, organizationId } = useParams()

  // Fetch trip details
  const { data: trip, refetch } = Api.trip.findFirst.useQuery({
    where: { id: tripId },
    include: {
      tripActivitys: true,
      expenses: true,
      documents: true,
      tripMembers: { include: { user: true } },
    },
  })

  const [selectedDay, setSelectedDay] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [budgetSuggestions, setBudgetSuggestions] = useState('')
  const [isLoadingBudget, setIsLoadingBudget] = useState(false)
  const [itinerary, setItinerary] = useState<string>('')
  const [isLoadingItinerary, setIsLoadingItinerary] = useState(false)
  const [isItineraryModalVisible, setIsItineraryModalVisible] = useState(false)
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false)
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false)
  const [expenseSuggestions, setExpenseSuggestions] = useState([])
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([])
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false)

  const documentAlerts = trip?.documentAlerts || []
  // Mutations
  const { mutateAsync: updateActivity } = Api.tripActivity.update.useMutation()
  const { mutateAsync: updateExpense } = Api.expense.update.useMutation()
  const { mutateAsync: uploadDocument } = Api.document.create.useMutation()
  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()
  const { mutateAsync: generateJson } = Api.ai.generateJson.useMutation()
  const { mutateAsync: updateTrip } = Api.trip.update.useMutation()
  const { mutateAsync: createExpense } = Api.expense.create.useMutation()

  const handleGetItinerary = async () => {
    try {
      setIsLoadingItinerary(true)
      const prompt = `Create a detailed daily itinerary in markdown format based on:
- Source & Destination: ${trip?.source} to ${trip?.destination} 
- Travel Dates: ${trip?.startDate} to ${trip?.endDate}
- Trip Type: ${trip?.type}
- Mode of Travel: ${trip?.transportationType}
- Travel Preferences: ${trip?.travelPreferences}
- Accommodation: ${trip?.stayType}
- Interests: ${trip?.interests}
- Activity Level: ${trip?.activityLevel}
- Existing Activities: ${trip?.tripActivitys
        ?.map?.(activity => activity.name)
        ?.join?.(', ')}`

      const { answer } = await generateText({ prompt })
      setItinerary(answer)
      setIsItineraryModalVisible(true)
    } catch (error) {
      console.error('Failed to generate itinerary:', error)
    } finally {
      setIsLoadingItinerary(false)
    }
  }

  const handleGetDocumentAlerts = async () => {
    setIsLoadingAlerts(true)
    try {
      const prompt = `Based on this trip information, generate a list of required travel documents and alerts:
- Source & Destination: ${trip?.source} to ${trip?.destination}
- Travel Dates: ${trip?.startDate} to ${trip?.endDate}
- Trip Type: ${trip?.type}
- Mode of Travel: ${trip?.transportationType}`
      const alerts = await generateJson({
        content: prompt,
        instruction: 'List all required documents and generate relevant alerts',
      })

      const formattedAlerts = alerts.results.map(
        (alert: DocumentAlert) => alert.description,
      )

      await updateTrip({
        where: { id: tripId },
        data: { documentAlerts: formattedAlerts },
      })
      await refetch()
    } catch (error) {
      console.error('Failed to generate alerts:', error)
    } finally {
      setIsLoadingAlerts(false)
    }
  }

  const handleGenerateExpenses = async () => {
    try {
      setIsLoadingExpenses(true)
      const prompt = `Generate a list of typical expenses for this trip:
- Source & Destination: ${trip?.source} to ${trip?.destination} 
- Travel Dates: ${trip?.startDate} to ${trip?.endDate}
- Trip Type: ${trip?.type}
- Mode of Travel: ${trip?.transportationType}
- Travel Preferences: ${trip?.travelPreferences}
- Accommodation: ${trip?.stayType}`

      const suggestions = await generateJson({
        content: prompt,
        instruction:
          'Generate expense suggestions with description, amount, category and date',
      })

      setExpenseSuggestions(suggestions.results)
      setIsExpenseModalVisible(true)
    } catch (error) {
      console.error('Failed to generate expenses:', error)
    } finally {
      setIsLoadingExpenses(false)
    }
  }

  const handleSaveAllExpenses = async () => {
    try {
      setIsLoadingExpenses(true)
      for (const expense of expenseSuggestions) {
        await createExpense({
          data: {
            ...expense,
            tripId,
            userId: trip?.tripMembers[0]?.userId || '',
          },
        })
      }
      setExpenseSuggestions([])
      setIsExpenseModalVisible(false)
      await refetch()
    } catch (error) {
      console.error('Failed to save expenses:', error)
    } finally {
      setIsLoadingExpenses(false)
    }
  }

  const handleSaveSelectedExpenses = async () => {
    try {
      setIsLoadingExpenses(true)
      const selectedSuggestions = expenseSuggestions.filter(expense =>
        selectedExpenses.includes(expense.description),
      )
      for (const expense of selectedSuggestions) {
        await createExpense({
          data: {
            ...expense,
            tripId,
            userId: trip?.tripMembers[0]?.userId || '',
          },
        })
      }
      setExpenseSuggestions([])
      setSelectedExpenses([])
      setIsExpenseModalVisible(false)
      await refetch()
    } catch (error) {
      console.error('Failed to save selected expenses:', error)
    } finally {
      setIsLoadingExpenses(false)
    }
  }

  const handleGetBudget = async () => {
    try {
      setIsLoadingBudget(true)
      const prompt = `Create a comprehensive trip budget table in markdown format using:
- Source & Destination: ${trip?.source} to ${trip?.destination} 
- Travel Dates: ${trip?.startDate} to ${trip?.endDate}
- Trip Type: ${trip?.type}
- Mode of Travel: ${trip?.transportationType}
- Travel Preferences: ${trip?.travelPreferences}
- Accommodation: ${trip?.stayType}
- Average Age Group: ${trip?.averageAge}
- Interests: ${trip?.interests}
- Daily Activity Level: ${trip?.activityLevel}`

      const { answer } = await generateText({ prompt })
      setBudgetSuggestions(answer)
      setIsModalVisible(true)
    } catch (error) {
      console.error('Failed to generate budget:', error)
    } finally {
      setIsLoadingBudget(false)
    }
  }

  // Calculate budget stats
  const totalBudget = parseFloat(trip?.budget || '0')
  const totalSpent =
    trip?.expenses?.reduce((acc, exp) => acc + parseFloat(exp.amount), 0) || 0
  const budgetProgress = (totalSpent / totalBudget) * 100

  const items = [
    {
      key: '1',
      label: 'Itinerary',
      children: (
        <>
          <Space style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<i className="las la-calendar" />}
              onClick={handleGetItinerary}
              loading={isLoadingItinerary}
            >
              Generate Itinerary
            </Button>
          </Space>
          <Collapse>
            {trip?.tripActivitys?.map(activity => (
              <Panel header={activity.name} key={activity.id}>
                <Timeline
                  items={[
                    {
                      children: (
                        <>
                          <Text strong>Location: </Text>
                          <Text>{activity.location}</Text>
                          <br />
                          <Text strong>Time: </Text>
                          <Text>{activity.date}</Text>
                          <br />
                          <Text strong>Cost: </Text>
                          <Text>${activity.cost}</Text>
                          <br />
                          <Button
                            icon={<i className="las la-edit" />}
                            type="link"
                          >
                            Edit
                          </Button>
                          <Button
                            icon={<i className="las la-map" />}
                            type="link"
                          >
                            View Map
                          </Button>
                        </>
                      ),
                    },
                  ]}
                />
              </Panel>
            ))}
          </Collapse>
        </>
      ),
    },
    {
      key: '2',
      label: 'Expenses',
      children: (
        <Card>
          <Button
            type="primary"
            icon={<i className="las la-receipt" />}
            onClick={handleGenerateExpenses}
            loading={isLoadingExpenses}
            style={{ marginBottom: 16 }}
          >
            Generate Expenses
          </Button>

          <Progress
            percent={budgetProgress}
            status={budgetProgress > 100 ? 'exception' : 'normal'}
          />
          <Title level={5}>Budget Overview</Title>
          <Text>Total Budget: ${totalBudget}</Text>
          <br />
          <Text>Total Spent: ${totalSpent}</Text>

          <Table
            dataSource={[
              ...(trip?.expenses || []),
              ...expenseSuggestions.map(exp => ({
                ...exp,
                status: 'suggested',
              })),
            ].map(expense => ({ ...expense, key: expense.description }))}
            columns={[
              {
                title: '',
                dataIndex: 'description',
                width: 50,
                render: (description, record) =>
                  record.status === 'suggested' && (
                    <input
                      type="checkbox"
                      checked={selectedExpenses.includes(description)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedExpenses([
                            ...selectedExpenses,
                            description,
                          ])
                        } else {
                          setSelectedExpenses(
                            selectedExpenses.filter(d => d !== description),
                          )
                        }
                      }}
                    />
                  ),
              },
              { title: 'Description', dataIndex: 'description' },
              {
                title: 'Amount',
                dataIndex: 'amount',
                render: amount => `$${amount}`,
              },
              { title: 'Category', dataIndex: 'category' },
              { title: 'Date', dataIndex: 'date' },
              {
                title: 'Status',
                dataIndex: 'status',
                render: status =>
                  status === 'suggested' ? (
                    <Tag color="warning">Suggested</Tag>
                  ) : (
                    <Tag color="success">Saved</Tag>
                  ),
              },
            ]}
          />
          <Modal
            title="Expense Suggestions"
            open={isExpenseModalVisible}
            onCancel={() => setIsExpenseModalVisible(false)}
            footer={[
              <Button
                key="cancel"
                onClick={() => setIsExpenseModalVisible(false)}
              >
                Cancel
              </Button>,
              <Button
                key="saveSelected"
                type="primary"
                onClick={handleSaveSelectedExpenses}
                disabled={selectedExpenses.length === 0}
                loading={isLoadingExpenses}
              >
                Save Selected
              </Button>,
              <Button
                key="saveAll"
                type="primary"
                onClick={handleSaveAllExpenses}
                loading={isLoadingExpenses}
              >
                Save All
              </Button>,
            ]}
            width={800}
          >
            <Table
              dataSource={expenseSuggestions.map(exp => ({
                ...exp,
                key: exp.description,
              }))}
              columns={[
                {
                  title: '',
                  dataIndex: 'description',
                  width: 50,
                  render: description => (
                    <input
                      type="checkbox"
                      checked={selectedExpenses.includes(description)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedExpenses([
                            ...selectedExpenses,
                            description,
                          ])
                        } else {
                          setSelectedExpenses(
                            selectedExpenses.filter(d => d !== description),
                          )
                        }
                      }}
                    />
                  ),
                },
                { title: 'Description', dataIndex: 'description' },
                {
                  title: 'Amount',
                  dataIndex: 'amount',
                  render: amount => `$${amount}`,
                },
                { title: 'Category', dataIndex: 'category' },
                { title: 'Date', dataIndex: 'date' },
              ]}
            />
          </Modal>
        </Card>
      ),
    },
    {
      key: '3',
      label: 'Documents',
      children: (
        <Card>
          <Space
            direction="vertical"
            style={{ width: '100%', marginBottom: 16 }}
          >
            <Button
              type="primary"
              icon={<i className="las la-bell" />}
              onClick={handleGetDocumentAlerts}
              loading={isLoadingAlerts}
            >
              Generate Document Alerts
            </Button>
            {documentAlerts.map((alert, index) => (
              <Alert key={index} message={alert} type="info" showIcon />
            ))}
          </Space>
          <Upload>
            <Button icon={<i className="las la-upload" />}>
              Upload Document
            </Button>
          </Upload>
          <List
            dataSource={trip?.documents}
            renderItem={doc => (
              <List.Item
                actions={[
                  <Button
                    key="download"
                    icon={<i className="las la-download" />}
                  >
                    Download
                  </Button>,
                ]}
              >
                <List.Item.Meta title={doc.name} description={doc.type} />
              </List.Item>
            )}
          />
        </Card>
      ),
    },
    {
      key: '4',
      label: 'Budget & Review',
      children: (
        <Card>
          <Button
            type="primary"
            icon={<i className="las la-calculator" />}
            onClick={handleGetBudget}
            loading={isLoadingBudget}
          >
            Get Budget
          </Button>
          <Modal
            title="AI Budget Suggestions"
            open={isModalVisible}
            onOk={() => setIsModalVisible(false)}
            onCancel={() => setIsModalVisible(false)}
            width={800}
          >
            <Markdown content={budgetSuggestions} />
          </Modal>
          <Modal
            title="AI Generated Itinerary"
            open={isItineraryModalVisible}
            onOk={() => setIsItineraryModalVisible(false)}
            onCancel={() => setIsItineraryModalVisible(false)}
            width={800}
          >
            <Markdown content={itinerary} />
          </Modal>
        </Card>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-suitcase" /> Trip Details
        </Title>

        <Alert
          message="Trip Updates"
          description="Check your upcoming activities and stay updated with the latest changes."
          type="info"
          showIcon
          style={{ marginBottom: 20 }}
        />

        <Tabs items={items} />
      </div>
    </PageLayout>
  )
}
