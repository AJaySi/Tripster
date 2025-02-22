import { Typography, Input, Button, Card, Spin, message } from 'antd'
import { useState } from 'react'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AITravelAssistantPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [userInput, setUserInput] = useState('')
  const [chatHistory, setChatHistory] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)

  // Get user's trips for context
  const { data: trips } = Api.trip.findMany.useQuery({
    where: { organizationId },
    include: { tripMembers: true },
  })

  // Get user's preferences for personalized recommendations
  const { data: preferences } = Api.preference.findFirst.useQuery({
    where: { userId: user?.id, organizationId },
  })

  const generateAIResponse = Api.ai.generateText.useMutation()

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    try {
      setIsLoading(true)

      // Add user message to chat
      const newUserMessage = { role: 'user' as const, content: userInput }
      setChatHistory(prev => [...prev, newUserMessage])

      // Create context-aware prompt
      const contextPrompt = `
        As an AI travel assistant, please help with the following query: "${userInput}"
        
        Context:
        - User has ${trips?.length || 0} trips planned
        - Travel preferences: ${preferences?.travelStyle || 'Not specified'}
        - Budget range: ${preferences?.budgetRange || 'Not specified'}
        - Dietary restrictions: ${preferences?.dietaryRestrictions || 'None'}
      `

      // Get AI response
      const response = await generateAIResponse.mutateAsync({
        prompt: contextPrompt,
      })

      // Add AI response to chat
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: response.answer },
      ])
      setUserInput('')
    } catch (error) {
      message.error('Failed to get response from AI assistant')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-robot" style={{ marginRight: '10px' }}></i>
          AI Travel Assistant
        </Title>
        <Paragraph>
          Chat with our AI travel assistant to get personalized travel
          recommendations, trip planning help, and answers to your
          travel-related questions.
        </Paragraph>

        <Card style={{ marginTop: '20px', minHeight: '400px' }}>
          <div
            style={{ height: '300px', overflowY: 'auto', marginBottom: '20px' }}
          >
            {chatHistory.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '15px',
                  textAlign: message.role === 'user' ? 'right' : 'left',
                }}
              >
                <Card
                  size="small"
                  style={{
                    display: 'inline-block',
                    maxWidth: '70%',
                    backgroundColor:
                      message.role === 'user' ? '#e6f7ff' : '#f5f5f5',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <i
                      className={`las ${
                        message.role === 'user' ? 'la-user' : 'la-robot'
                      }`}
                    ></i>
                    <span>{message.content}</span>
                  </div>
                </Card>
              </div>
            ))}
            {isLoading && (
              <div style={{ textAlign: 'center' }}>
                <Spin />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              placeholder="Type your message here..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onPressEnter={handleSendMessage}
              disabled={isLoading}
            />
            <Button
              type="primary"
              onClick={handleSendMessage}
              disabled={isLoading}
              icon={<i className="las la-paper-plane"></i>}
            >
              Send
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
