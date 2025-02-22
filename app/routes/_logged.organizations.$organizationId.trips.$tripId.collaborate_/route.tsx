import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useParams } from '@remix-run/react'
import {
  Button,
  Calendar,
  Card,
  Input,
  List,
  Rate,
  Space,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from 'antd'
import { useState } from 'react'
import { TripActivity } from '@prisma/client'
import { z } from 'zod'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

export default function TripCollaborationPage() {
  const { tripId, organizationId } = useParams()
  const [activeTab, setActiveTab] = useState('1')
  const [newComment, setNewComment] = useState('')
  const [activitySuggestions, setActivitySuggestions] = useState<TripActivity[]>([])
  const [isGeneratingActivities, setIsGeneratingActivities] = useState(false)

  // Fetch trip data
  const { data: trip } = Api.trip.findFirst.useQuery({
    where: { id: tripId },
    include: { 
      tripMembers: { include: { user: true } },
      tripActivitys: true
    }
  })

  // Fetch preferences
  const { data: preferences } = Api.preference.findMany.useQuery({
    where: { organizationId },
    include: { user: true },
  })

  // Mutations
  const { mutateAsync: updateActivity } = Api.tripActivity.update.useMutation()
  const { mutateAsync: createActivity } = Api.tripActivity.create.useMutation()
  const { mutateAsync: generateJson } = Api.ai.generateJson.useMutation()

  const handleGenerateActivities = async () => {
    setIsGeneratingActivities(true)
    try {
      const prompt = `Generate personalized activities based on:
- Source & Destination: ${trip?.source} to ${trip?.destination}
- Travel Dates: ${trip?.startDate} to ${trip?.endDate}
- Trip Type: ${trip?.type}
- Travel Preferences: ${trip?.travelPreferences}
- Stay Type: ${trip?.stayType}
- Interests: ${trip?.interests}
- Activity Level: ${trip?.activityLevel}`
      const suggestions = await generateJson({
        content: prompt,
        instruction: 'Generate activity suggestions'
      }) as { results: Array<{
        type: string;
        name: string;
        status: string;
        date: string;
        location: string;
        cost: string;
      }> }
      setActivitySuggestions(suggestions.results.map(result => ({
        id: crypto.randomUUID(),
        type: result.type || null,
        name: result.name,
        status: result.status || null,
        date: result.date || null,
        location: result.location || null,
        cost: result.cost || null,
        tripId: tripId!,
        createdAt: new Date(),
        updatedAt: new Date()
      })))
    } catch (error) {
      console.error('Failed to generate activities:', error)
    } finally {
      setIsGeneratingActivities(false)
    }
  }

  const handleVote = async (activityId: string, rating: number) => {
    await updateActivity({
      where: { id: activityId },
      data: { status: rating > 3 ? 'approved' : 'pending' },
    })
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    // In a real implementation, we would save this to a comments table
    setNewComment('')
  }

  const items = [
    {
      key: '1',
      label: 'Activity Suggestions',
      children: (
        <>
          <Button 
            type="primary" 
            icon={<i className="las la-magic" />} 
            onClick={handleGenerateActivities} 
            loading={isGeneratingActivities}
            style={{ marginBottom: 16 }}
          >
            Generate Activities
          </Button>
          <List
            dataSource={[...(trip?.tripActivitys || []), ...activitySuggestions]}
            renderItem={activity => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Space
                      align="center" 
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      <div>
                        <Text strong>{activity.name}</Text>
                        <Tag
                          color={
                            activity.status === 'approved' ? 'green' : 'orange'
                          }
                        >
                          {activity.status}
                        </Tag>
                      </div>
                      <Rate onChange={value => handleVote(activity.id, value)} />
                    </Space>
                    <Paragraph>{activity.location}</Paragraph>
                    <TextArea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                    />
                    <Button type="primary" onClick={handleAddComment}>
                      <i className="las la-comment"></i> Comment
                    </Button>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: '2',
      label: 'Group Preferences',
      children: (
        <List
          dataSource={preferences}
          renderItem={pref => (
            <Card style={{ marginBottom: 16 }}>
              <Space align="start">
                <div>
                  <Paragraph>Travel Style: {pref.travelStyle}</Paragraph>
                  <Paragraph>Budget Range: {pref.budgetRange}</Paragraph>
                </div>
              </Space>
            </Card>
          )}
        />
      ),
    },
    {
      key: '3',
      label: 'Task Assignment',
      children: (
        <Timeline
          items={[
            {
              dot: <i className="las la-hotel"></i>,
              children: (
                <Card>
                  <Text strong>Book Hotel</Text>
                  <Tag color="processing">In Progress</Tag>
                  <Paragraph>Assigned to: John</Paragraph>
                </Card>
              ),
            },
            {
              dot: <i className="las la-plane"></i>,
              children: (
                <Card>
                  <Text strong>Book Flights</Text>
                  <Tag color="success">Completed</Tag>
                  <Paragraph>Assigned to: Sarah</Paragraph>
                </Card>
              ),
            },
          ]}
        />
      ),
    },
    {
      key: '4',
      label: 'Calendar',
      children: <Calendar />,
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-users"></i> Trip Collaboration Board
        </Title>
        <Paragraph>
          Collaborate with your travel group members, vote on activities, and
          manage trip details together.
        </Paragraph>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          style={{ marginTop: 24 }}
        />
      </div>
    </PageLayout>
  )
}
    