import { useUserContext } from '@/core/context'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import { Button, Card, Col, Flex, Row, Space, Typography, theme } from 'antd'
const { Title, Text, Paragraph } = Typography
const { useToken } = theme

export default function HomePage() {
  const navigate = useNavigate()
  const { token } = useToken()
  const { organization } = useUserContext()
  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Title level={1}>
              <i
                className="las la-plane-departure"
                style={{ marginRight: 10 }}
              ></i>
              Welcome to TravelPlanner
            </Title>
            <Paragraph style={{ fontSize: 18 }}>
              Your all-in-one solution for planning and managing your travel
              experiences
            </Paragraph>
          </div>

          {/* Quick Action */}
          <Card
            hoverable
            onClick={() =>
              navigate(`/organizations/${organization?.id}/trips/new`)
            }
            style={{
              textAlign: 'center',
              marginBottom: 40,
              cursor: 'pointer'
            }}
          >
            <Title
              level={2}
              style={{
                background: 'linear-gradient(135deg, #4CAF50, #009688, #2196F3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <i className="las la-plane" style={{ marginRight: 8 }}></i>
              Start your Journey now
            </Title>
          </Card>

          {/* Main Features Grid */}
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i
                    className="las la-map-marked-alt"
                    style={{ marginRight: 8 }}
                  ></i>
                  Trip Planning
                </Title>
                <Paragraph>
                  Create and organize your trips with ease. Set destinations,
                  dates, and budgets all in one place.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i className="las la-users" style={{ marginRight: 8 }}></i>
                  Collaboration
                </Title>
                <Paragraph>
                  Invite friends and family to plan together. Share ideas and
                  make decisions as a group.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i className="las la-book" style={{ marginRight: 8 }}></i>
                  Travel Journal
                </Title>
                <Paragraph>
                  Document your adventures with our built-in travel journal.
                  Save memories and share experiences.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i className="las la-robot" style={{ marginRight: 8 }}></i>
                  AI Assistant
                </Title>
                <Paragraph>
                  Get personalized travel recommendations and assistance with
                  our AI-powered travel assistant.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i className="las la-wallet" style={{ marginRight: 8 }}></i>
                  Expense Tracking
                </Title>
                <Paragraph>
                  Keep track of your travel expenses and split costs with your
                  travel companions.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Title level={4}>
                  <i className="las la-cog" style={{ marginRight: 8 }}></i>
                  Preferences
                </Title>
                <Paragraph>
                  Set your travel preferences and get personalized
                  recommendations for your trips.
                </Paragraph>
              </Card>
            </Col>
          </Row>

          {/* Getting Started Section */}
          <Card style={{ marginTop: 40 }}>
            <Title level={3}>
              <i
                className="las la-flag-checkered"
                style={{ marginRight: 8 }}
              ></i>
              Getting Started
            </Title>
            <Space direction="vertical" size="middle">
              <Text>
                <i
                  className="las la-check-circle"
                  style={{ marginRight: 8 }}
                ></i>
                Create or join an organization to start planning trips with
                others
              </Text>
              <Text>
                <i
                  className="las la-check-circle"
                  style={{ marginRight: 8 }}
                ></i>
                Set up your travel preferences to get personalized
                recommendations
              </Text>
              <Text>
                <i
                  className="las la-check-circle"
                  style={{ marginRight: 8 }}
                ></i>
                Start planning your first trip by clicking on "New Trip"
              </Text>
              <Text>
                <i
                  className="las la-check-circle"
                  style={{ marginRight: 8 }}
                ></i>
                Invite your travel companions to collaborate on trip planning
              </Text>
            </Space>
            <Flex
              justify="space-between"
              align="center"
              style={{ marginTop: 16 }}
            >
              <Button type="primary">Generate Suggestions</Button>
              <Button type="primary">Next</Button>
            </Flex>
          </Card>
        </Space>
      </div>
    </PageLayout>
  )
}
