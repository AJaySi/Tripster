import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import { Alert, Card, Col, List, Row, Statistic, Typography, theme } from 'antd'
import dayjs from 'dayjs'
const { Title, Text } = Typography
const { useToken } = theme

export default function HomePage() {
  const { user, organization } = useUserContext()
  const navigate = useNavigate()
  const { token } = useToken()

  // Fetch upcoming trips
  const { data: trips } = Api.trip.findMany.useQuery({
    where: {
      organizationId: organization?.id,
    },
    include: {
      tripMembers: true,
      expenses: true,
    },
  })

  // Fetch user preferences for recommendations
  const { data: preferences } = Api.preference.findFirst.useQuery({
    where: {
      userId: user?.id,
      organizationId: organization?.id,
    },
  })

  // Mock notifications (in a real app, these would come from the backend)
  const notifications = [
    {
      type: 'flight',
      message: 'Flight AA123 delayed by 2 hours',
      severity: 'warning',
    },
    {
      type: 'weather',
      message: 'Storm warning in Paris for next week',
      severity: 'error',
    },
    { type: 'visa', message: 'Visa expires in 30 days', severity: 'info' },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-home" style={{ marginRight: 8 }}></i>
          Travel Dashboard
        </Title>
        <Text type="secondary">
          Welcome back, {user?.name}! Here's your travel overview.
        </Text>

        {/* Quick Actions */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() =>
                navigate(`/organizations/${organization?.id}/trips/new`)
              }
            >
              <i
                className="las la-plus-circle"
                style={{ fontSize: 24, marginRight: 8 }}
              ></i>
              <Text strong>Plan New Trip</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() =>
                navigate(`/organizations/${organization?.id}/trips`)
              }
            >
              <i
                className="las la-suitcase"
                style={{ fontSize: 24, marginRight: 8 }}
              ></i>
              <Text strong>View All Trips</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() =>
                navigate(`/organizations/${organization?.id}/preferences`)
              }
            >
              <i
                className="las la-cog"
                style={{ fontSize: 24, marginRight: 8 }}
              ></i>
              <Text strong>Travel Preferences</Text>
            </Card>
          </Col>
        </Row>

        {/* Upcoming Trips */}
        <Title level={3} style={{ marginTop: 32 }}>
          <i className="las la-calendar" style={{ marginRight: 8 }}></i>
          Upcoming Trips
        </Title>
        <Row gutter={[16, 16]}>
          {trips?.map(trip => (
            <Col xs={24} sm={12} md={8} key={trip.id}>
              <Card
                hoverable
                onClick={() =>
                  navigate(
                    `/organizations/${organization?.id}/trips/${trip.id}`,
                  )
                }
                style={{
                  background: `linear-gradient(135deg, ${token.colorPrimary}, ${token.colorInfo}, ${token.colorLink})`,
                  boxShadow: token.boxShadow,
                  transition: 'all 0.3s ease',
                }}
                className="hover:scale-105 hover:shadow-xl"
              >
                <Title level={4}>{trip.name}</Title>
                <Text>
                  <i
                    className="las la-map-marker"
                    style={{ marginRight: 4 }}
                  ></i>
                  {trip.destination}
                </Text>
                <br />
                <Text>
                  <i className="las la-calendar" style={{ marginRight: 4 }}></i>
                  {dayjs(trip.startDate).format('MMM D')} -{' '}
                  {dayjs(trip.endDate).format('MMM D, YYYY')}
                </Text>
                <Statistic
                  title="Budget"
                  value={trip.budget || '0'}
                  prefix="$"
                  style={{ marginTop: 16 }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Alerts and Notifications */}
        <Title level={3} style={{ marginTop: 32 }}>
          <i className="las la-bell" style={{ marginRight: 8 }}></i>
          Travel Alerts
        </Title>
        <List
          dataSource={notifications}
          renderItem={item => (
            <List.Item>
              <Alert
                message={item.message}
                type={item.severity as any}
                showIcon
                style={{ width: '100%' }}
              />
            </List.Item>
          )}
        />

        {/* Recommendations */}
        {preferences && (
          <div style={{ marginTop: 32 }}>
            <Title level={3}>
              <i className="las la-star" style={{ marginRight: 8 }}></i>
              Personalized Recommendations
            </Title>
            <Card>
              <Text>Based on your preferences:</Text>
              <ul>
                <li>Travel Style: {preferences.travelStyle}</li>
                <li>Preferred Activities: {preferences.activityPreferences}</li>
                <li>Accommodation: {preferences.accommodationType}</li>
              </ul>
            </Card>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
