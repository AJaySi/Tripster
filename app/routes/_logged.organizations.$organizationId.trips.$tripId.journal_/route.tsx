import {
  Typography,
  Card,
  Input,
  Button,
  List,
  Space,
  Rate,
  Modal,
  Upload,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TravelJournalPage() {
  const { organizationId, tripId } = useParams()
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '',
    location: '',
  })
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data: journals, refetch } = Api.journal.findMany.useQuery({
    where: { tripId },
    include: { user: true },
  })

  const { data: trip } = Api.trip.findFirst.useQuery({
    where: { id: tripId },
    include: { tripMembers: { include: { user: true } } },
  })

  const { mutateAsync: createJournal } = Api.journal.create.useMutation()
  const { mutateAsync: upload } = useUploadPublic()
  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

  const handleCreateEntry = async () => {
    try {
      await createJournal({
        data: {
          ...newEntry,
          tripId,
          userId: trip?.tripMembers[0]?.userId || '',
        },
      })
      message.success('Journal entry created successfully!')
      setNewEntry({ title: '', content: '', mood: '', location: '' })
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      message.error('Failed to create journal entry')
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      const updatedContent = newEntry.content + `\n![Image](${url})`
      setNewEntry({ ...newEntry, content: updatedContent })
      message.success('Image uploaded successfully!')
    } catch (error) {
      message.error('Failed to upload image')
    }
  }

  const generateAISummary = async (content: string) => {
    try {
      const { answer } = await generateText({
        prompt: `Summarize this travel journal entry: ${content}`,
      })
      message.info('AI Summary: ' + answer)
    } catch (error) {
      message.error('Failed to generate AI summary')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title level={2}>
              <i className="las la-book-reader" /> Travel Journal
            </Title>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              <i className="las la-plus" /> New Entry
            </Button>
          </div>

          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
            dataSource={journals}
            renderItem={journal => (
              <List.Item>
                <Card
                  hoverable
                  title={
                    <Space>
                      <i className="las la-pen" />
                      {journal.title}
                    </Space>
                  }
                  extra={
                    <Space>
                      <Button
                        type="text"
                        onClick={() => generateAISummary(journal.content || '')}
                      >
                        <i className="las la-robot" />
                      </Button>
                    </Space>
                  }
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text type="secondary">
                      <i className="las la-calendar" />{' '}
                      {dayjs(journal.createdAt).format('MMM D, YYYY')}
                    </Text>
                    {journal.location && (
                      <Text>
                        <i className="las la-map-marker" /> {journal.location}
                      </Text>
                    )}
                    {journal.mood && (
                      <Rate
                        disabled
                        defaultValue={parseInt(journal.mood)}
                        character={<i className="las la-smile" />}
                      />
                    )}
                    <Paragraph ellipsis={{ rows: 3 }}>
                      {journal.content}
                    </Paragraph>
                    <Text type="secondary">By {journal.user?.name}</Text>
                  </Space>
                </Card>
              </List.Item>
            )}
          />

          <Modal
            title="New Journal Entry"
            open={isModalVisible}
            onOk={handleCreateEntry}
            onCancel={() => setIsModalVisible(false)}
            width={800}
          >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Input
                placeholder="Title"
                value={newEntry.title}
                onChange={e =>
                  setNewEntry({ ...newEntry, title: e.target.value })
                }
                prefix={<i className="las la-heading" />}
              />
              <Input
                placeholder="Location"
                value={newEntry.location}
                onChange={e =>
                  setNewEntry({ ...newEntry, location: e.target.value })
                }
                prefix={<i className="las la-map-marker" />}
              />
              <TextArea
                rows={6}
                placeholder="Write your journal entry..."
                value={newEntry.content}
                onChange={e =>
                  setNewEntry({ ...newEntry, content: e.target.value })
                }
              />
              <Rate
                onChange={value =>
                  setNewEntry({ ...newEntry, mood: value.toString() })
                }
                character={<i className="las la-smile" />}
              />
              <Upload
                customRequest={({ file }) => handleImageUpload(file as File)}
                showUploadList={false}
              >
                <Button icon={<i className="las la-image" />}>
                  Upload Image
                </Button>
              </Upload>
            </Space>
          </Modal>
        </Space>
      </div>
    </PageLayout>
  )
}
