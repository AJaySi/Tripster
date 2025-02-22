import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Theme as theme } from '@/designSystem/theme/theme'
import { Markdown } from '@/designSystem/ui/Markdown'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Progress,
  Radio,
  Row,
  Select,
  Spin,
  Steps,
  Tooltip,
  Typography,
} from 'antd'
import { useEffect, useRef, useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker

interface AccommodationSuggestionsCardProps {
  destination: string
  dates: [string, string]
  tripType: string
  transportMode: string
  travelPreferences: string[]
  budget: number
  stayType: string[]
  isGenerating: boolean
  suggestions: string
}

interface TransportationSuggestionsCardProps {
  destination: string
  dates: [string, string]
  tripType: string
  transportMode: string
  travelPreferences: string[]
  onLoadingChange?: (loading: boolean) => void
  onSuggestionsChange: (suggestions: string) => void
  onGenerateSuggestions: () => void
  isGenerating: boolean
  suggestions: string
}

interface MustKnowsCardProps {
  destination: string
  dates: [string, string]
  tripType: string
  isLoading?: boolean
}

interface ActivitySuggestionsCardProps {
  suggestions: string
  isGenerating: boolean
}

interface AiSuggestionsCardProps {
  values: {
    tripType?: string
    averageAge?: string
    interests?: string[]
    activityLevel?: string
    transportMode?: string
    stayType?: string[]
  }
}

export function AccommodationSuggestionsCard({
  destination,
  dates,
  tripType,
  transportMode,
  travelPreferences,
  budget,
  stayType,
  isGenerating,
  suggestions,
}: AccommodationSuggestionsCardProps) {
  return (
    <Card className="mt-4">
      <Title level={5}>Suggested Accommodation Options</Title>
      {isGenerating ? (
        <Spin />
      ) : suggestions ? (
        <Markdown content={suggestions} />
      ) : null}
    </Card>
  )
}

export function TransportationSuggestionsCard({
  destination,
  dates,
  tripType,
  transportMode,
  travelPreferences,
  onLoadingChange,
  onSuggestionsChange,
  onGenerateSuggestions,
  isGenerating,
  suggestions,
}: TransportationSuggestionsCardProps) {
  return (
    <Card className="mt-4">
      <Title level={5}>Suggested Transportation Options</Title>
      {isGenerating ? (
        <Spin />
      ) : suggestions ? (
        <Markdown content={suggestions} />
      ) : null}
    </Card>
  )
}

export function MustKnowsCard({
  destination,
  dates,
  tripType,
  isLoading,
}: MustKnowsCardProps) {
  const [insights, setInsights] = useState('')
  const aiTextGeneration = Api.ai.generateText.useMutation()

  useEffect(() => {
    const getInsights = async () => {
      if (!destination || !dates || !tripType) return
      const { answer } = await aiTextGeneration.mutateAsync({
        prompt: `Please provide a comprehensive guide for travelers embarking on a ${tripType} trip to ${destination} from ${dates[0]} to ${dates[1]}, provide:
        1. Local customs and etiquette
        2. Weather forecast during their stay(Clothing recommendations, allergies etc)
        3. Key events, festivals, and cultural activities happening during these dates
        4. Essential safety tips and precautions tailored to the destination
        5. Travel requirements (visas, documents, vaccinations)
        Note: Present your response in a well-structured markdown format, and where relevant, include a structured markdown comparison table that organizes information (for example, comparing different safety tips or visa requirements). 
        Use bullet points and simple visual cues to emphasize the most critical details.`,
      })
      setInsights(answer)
    }
    getInsights()
  }, [destination, dates, tripType])

  return (
    <Card className="mt-4">
      <Title level={5}>Must Knows & Facts</Title>
      {aiTextGeneration.isLoading ? <Spin /> : <Markdown content={insights} />}
    </Card>
  )
}

export function ActivitySuggestionsCard({
  suggestions,
  isGenerating,
}: ActivitySuggestionsCardProps) {
  return (
    <Card className="mt-4">
      <Title level={5}>Suggested Activities</Title>
      {isGenerating ? (
        <Spin />
      ) : suggestions ? (
        <Markdown content={suggestions} />
      ) : null}
    </Card>
  )
}

export function AiSuggestionsCard({ values }: AiSuggestionsCardProps) {
  const [aiSuggestions, setAiSuggestions] = useState('')
  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

  useEffect(() => {
    const getAiSuggestions = async () => {
      if (!values.interests?.length) return
      const { answer } = await generateText({
        prompt: `Generate a list of engaging activity suggestions for a ${
          values.tripType
        } trip with ${
          values.averageAge
        } age group, interested in ${values.interests.join(', ')} with ${
          values.activityLevel
        } activity level. The transport preferance is ${
          values.transportMode
        }, accommodation ${values.stayType?.join(', ')}
        Provide detailed recommendations for activities that cater to these criteria. 
        Please format your response into clear sections, and include a structured markdown comparison table where appropriate (for example, listing activity options alongside pros/cons, cost, and duration). 
        Use bullet points or charts as visual aids to highlight key suggestions and their benefits.`,
      })
      setAiSuggestions(answer)
    }
    getAiSuggestions()
  }, [
    values.tripType,
    values.averageAge,
    values.interests,
    values.activityLevel,
    values.transportMode,
    values.stayType,
  ])

  return (
    <Card className="mt-4">
      <Title level={5}>AI Suggested Activities</Title>
      {!aiSuggestions ? <Spin /> : <Markdown content={aiSuggestions} />}
    </Card>
  )
}

export default function TripPlanningPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isTransportModalVisible, setIsTransportModalVisible] = useState(false)
  const [tripBasics, setTripBasics] = useState<{
    destination: string
    dates: [string, string]
    tripType: string
  } | null>(null)
  const [progress, setProgress] = useState(0)
  const [form] = Form.useForm()
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState('')
  const [accommodationSuggestions, setAccommodationSuggestions] = useState('')
  const [activitySuggestions, setActivitySuggestions] = useState('')
  const mustKnowsButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const aiTextGeneration = Api.ai.generateText.useMutation()

  const handleGenerateActivitySuggestions = async () => {
    setIsGenerating(true)
    try {
      const values = await form.validateFields()
      const { answer } = await aiTextGeneration.mutateAsync({
        prompt: `For a ${tripBasics?.tripType} trip to ${
          tripBasics?.destination
        } from ${tripBasics?.dates[0]} to ${
          tripBasics?.dates[1]
        }, suggest activities considering:
        1. Interest areas: ${values.interests?.join(', ')}
        2. Activity level: ${values.activityLevel}
        3. Age group: ${values.averageAge}
        4. Daily schedule options
        5. Popular attractions and hidden gems
        6. Local experiences and cultural activities
        Provide detailed recommendations for activities that cater to these criteria. 
        Please format your response in markdown and into clear sections, and include a structured markdown comparison table where appropriate (for example, listing activity options alongside pros/cons, cost, and duration). 
        Use bullet points or charts as visual aids to highlight key suggestions and their benefits.`,
      })
      setActivitySuggestions(answer)
    } catch (error) {
      message.error('Failed to generate activity suggestions')
      console.error('Error generating suggestions:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateAccommodationSuggestions = async () => {
    setIsGenerating(true)
    try {
      const values = await form.validateFields()
      const { answer } = await aiTextGeneration.mutateAsync({
        prompt: `For a ${tripBasics?.tripType} trip to ${
          tripBasics?.destination
        } from ${tripBasics?.dates[0]} to ${
          tripBasics?.dates[1]
        } with a budget of $${
          values.budget
        }, and preferences for ${values.stayType.join(
          ', ',
        )}, provide detailed accommodation suggestions considering the following criteria:

1. **Location and Accessibility**: Highlight proximity to key attractions, transportation hubs, and local amenities.
2. **Cost Comparison**: Provide a comparison of options within the specified budget, including any potential savings or discounts.
3. **Amenities and Facilities**: Detail the facilities offered (e.g., Wi-Fi, breakfast, parking, pools, or unique features) and their relevance to the preferences.
4. **Reviews and Ratings**: Summarize the reviews and ratings from credible sources, mentioning key points of praise or concern.
5. **Local Area and Safety**: Evaluate the safety and convenience of the surrounding area, especially for solo travelers or families.
6. **Specific Recommendations**: Suggest ${values.stayType.join(
          ', ',
        )} options tailored to the budget and preferences, highlighting what makes each recommendation stand out.

**Formatting Instructions**:
- Organize the suggestions into a clear, **markdown table format** comparing the accommodations side-by-side with columns for "Name," "Location," "Cost," "Amenities," and "Rating."
- Use bullet points and **bold headings** to emphasize key insights for each option.
- Include simple visual aids (e.g., thumbs-up/down icons, star ratings, or charts) where possible to make the details more engaging and easier to digest.
`,
      })
      setAccommodationSuggestions(answer)
    } catch (error) {
      message.error('Failed to generate accommodation suggestions')
      console.error('Error generating suggestions:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateSuggestions = async () => {
    setIsGenerating(true)
    console.log('Generating suggestions...')
    try {
      const values = await form.validateFields()
      console.log('Form values:', values)

      const { answer } = await aiTextGeneration.mutateAsync({
        prompt: `For a ${tripBasics?.tripType} trip to ${
          tripBasics?.destination
        } from ${tripBasics?.dates[0]} to ${tripBasics?.dates[1]} using ${
          values.transportMode
        }, and considering the preferences ${values.travelPreferences.join(
          ', ',
        )}, provide detailed transportation suggestions addressing the following aspects:

1. **Available Modes of Transport**: List all viable options (e.g., flights, trains, buses, car rentals) and their suitability for the trip type and destination.
2. **Cost Comparison**: Compare the costs of each transportation option, highlighting the most budget-friendly and value-for-money choices.
3. **Travel Duration**: Include estimated travel times for each option, emphasizing faster or more efficient methods.
4. **Convenience and Comfort**: Discuss factors such as seating arrangements, onboard facilities, and overall travel experience.
5. **Local Transportation Tips**: Offer practical advice on navigating the destination, including recommendations for local transit passes, ride-sharing, or cultural norms to be aware of.
6. **Specific Recommendations**: Provide ${
          values.transportMode
        } suggestions tailored to preferences, highlighting why these options are ideal for this trip.

**Formatting Instructions**:
- Present a markdown structured **comparison table** with columns for "Mode of Transport," "Cost," "Duration," "Comfort Level," and "Suitability for Preferences."
- Use **bold headings** and **bullet points** to draw attention to critical insights for each option.
- Include **visual elements** such as star ratings for comfort, icons for cost levels (e.g., $, $$, $$$), or a simple graph comparing travel times and costs.
`,
      })
      console.log('API response:', answer)
      setSuggestions(answer)
      setIsTransportModalVisible(true)
    } catch (error) {
      message.error('Failed to generate suggestions')
      console.error('Error generating suggestions:', error)
      setIsTransportModalVisible(false)
    } finally {
      setIsGenerating(false)
    }
  }

  const calculateProgress = (values: any) => {
    let completedSteps = 0
    if (validateTripBasics(values)) completedSteps++
    if (validateTransportation(values)) completedSteps++
    if (validateAccommodation(values)) completedSteps++
    if (validateActivities(values)) completedSteps++
    return Math.round((completedSteps / 4) * 100)
  }

  useEffect(() => {
    const values = form.getFieldsValue()
    setProgress(calculateProgress(values))
  }, [form.getFieldsValue(), currentStep])

  const validateStepFields = (step: number, values: any) => {
    switch (step) {
      case 0:
        return validateTripBasics(values)
      case 1:
        return validateTransportation(values)
      case 2:
        return validateAccommodation(values)
      case 3:
        return validateActivities(values)
      default:
        return true
    }
  }

  const validateTripBasics = (values: any) => {
    return (
      values.source?.trim() &&
      values.destination?.trim() &&
      values.dates &&
      values.tripType
    )
  }

  const validateTransportation = (values: any) => {
    return (
      values.transportMode &&
      values.travelPreferences &&
      values.travelPreferences.length > 0
    )
  }

  const validateAccommodation = (values: any) => {
    return values.budget && values.stayType && values.stayType.length > 0
  }

  const validateActivities = (values: any) => {
    if (values.tripType === 'solo') return true
    return (
      values.averageAge && values.interests?.length > 0 && values.activityLevel
    )
  }

  const { mutateAsync: createTrip, isLoading: isCreatingTrip } =
    Api.trip.create.useMutation()

  const steps = [
    { title: 'Trip Basics', icon: 'las la-map-marked' },
    { title: 'Transportation', icon: 'las la-plane' },
    { title: 'Accommodation', icon: 'las la-hotel' },
    { title: 'Activities', icon: 'las la-hiking' },
    { title: 'Budget & Review', icon: 'las la-money-bill' },
  ]

  const onFinish = async (values: any) => {
    try {
      // Validate all required fields
      const requiredFields = [
        'source',
        'destination',
        'dates',
        'tripType',
        'transportMode',
        'travelPreferences',
        'budget',
        'stayType',
      ]

      const missingFields = requiredFields.filter(field => !values[field])
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
      }

      // Prepare data object
      const data: any = {
        name: values.destination.trim(),
        source: values.source.trim(),
        destination: values.destination.trim(),
        startDate: values.dates[0].format('YYYY-MM-DD'),
        endDate: values.dates[1].format('YYYY-MM-DD'),
        type: values.tripType,
        transportationType: values.transportMode,
        travelPreferences: values.travelPreferences.join(','),
        budget: values.budget.toString(),
        stayType: values.stayType.join(','),
        averageAge: values.averageAge,
        interests: values.interests?.join(','),
        activityLevel: values.activityLevel,
        organizationId: organizationId,
      }

      // Only include totalPeople for family, group or business trips
      if (
        ['family', 'group', 'business'].includes(values.tripType) &&
        values.totalPeople
      ) {
        data.totalPeople = values.totalPeople.toString()
      }

      const trip = await createTrip({ data })
      navigate(`/organizations/${organizationId}/trips/${trip.id}`)
    } catch (error) {
      // Handle Prisma validation errors
      if (error.code === 'P2002') {
        message.error('A trip with these details already exists')
      } else if (error.code === 'P2000') {
        message.error('The provided value is invalid')
      } else {
        message.error(
          error instanceof Error
            ? error.message
            : 'Failed to create trip. Please try again.',
        )
      }
      console.error('Error creating trip:', error)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Card
              style={{
                background: `linear-gradient(to right, ${theme.token['--colorMetallicBrown1']}, ${theme.token['--colorMetallicBrown3']})`,
                padding: '24px',
                marginBottom: '24px',
                borderRadius: theme.token['--cardBorderRadius'],
                boxShadow: theme.token['--cardBoxShadow'],
                transition: 'all 0.3s ease',
              }}
              className="hover:transform hover:-translate-y-2 hover:shadow-lg transition-all"
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="source"
                    label={
                      <Tooltip title="Mention (city, country) place of Travel">
                        Source (city, country)
                      </Tooltip>
                    }
                    rules={[{ required: true }]}
                    style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                  >
                    <Input
                      placeholder="Enter city, country"
                      className="focus-visible:ring-2 ring-offset-2 ring-white"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="destination"
                    label="Destination (city, country)"
                    rules={[{ required: true }]}
                    style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                  >
                    <Input
                      placeholder="Enter city, country"
                      className="focus-visible:ring-2 ring-offset-2 ring-white"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card
              style={{
                background: `linear-gradient(to right, ${theme.token['--colorMetallicBrown1']}, ${theme.token['--colorMetallicBrown3']})`,
                padding: '24px',
                marginBottom: '24px',
                borderRadius: theme.token['--cardBorderRadius'],
                boxShadow: theme.token['--cardBoxShadow'],
                transition: 'all 0.3s ease',
              }}
              className="hover:transform hover:-translate-y-2 hover:shadow-lg transition-all"
            >
              <Form.Item
                name="dates"
                label="Travel Dates"
                rules={[{ required: true }]}
                style={{ color: 'rgba(255, 255, 255, 0.85)' }}
              >
                <RangePicker
                  style={{ width: '100%' }}
                  className="focus-visible:ring-2 ring-offset-2 ring-white"
                />
              </Form.Item>
            </Card>
            <div>
              <Card
                style={{
                  background: `linear-gradient(to right, ${theme.token['--colorMetallicBrown1']}, ${theme.token['--colorMetallicBrown3']})`,
                  padding: '24px',
                  marginBottom: '24px',
                }}
              >
                <Form.Item
                  name="tripType"
                  label="Trip Type"
                  rules={[{ required: true }]}
                  style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                >
                  <Radio.Group>
                    <Radio.Button value="solo">
                      <i className="las la-user"></i> Solo
                    </Radio.Button>
                    <Radio.Button value="family">
                      <i className="las la-users"></i> Family
                    </Radio.Button>
                    <Radio.Button value="group">
                      <i className="las la-user-friends"></i> Group
                    </Radio.Button>
                    <Radio.Button value="business">
                      <i className="las la-briefcase"></i> Business
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Card>
            </div>
            <Form.Item dependencies={['tripType']}>
              {({ getFieldValue }) => {
                const tripType = getFieldValue('tripType')
                if (!['family', 'group', 'business'].includes(tripType))
                  return null

                return (
                  <Form.Item
                    name="totalPeople"
                    label="Total Number of People"
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      min={1}
                      placeholder="Enter number of travelers"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                )
              }}
            </Form.Item>
            <Form.Item dependencies={['destination', 'dates', 'tripType']}>
              {({ getFieldsValue }) => {
                const values = getFieldsValue()
                if (!values.destination || !values.dates || !values.tripType)
                  return null
                return (
                  <>
                    <Row style={{ gap: '10px', marginBottom: '24px' }}>
                      <Button
                        ref={mustKnowsButtonRef}
                        type="primary"
                        onClick={() => setIsModalVisible(true)}
                        icon={<i className="las la-info-circle" />}
                        className="hover:scale-105 transition-transform"
                        style={{ borderRadius: '8px' }}
                        onKeyDown={e => {
                          if (e.key === 'ArrowRight' && nextButtonRef.current) {
                            nextButtonRef.current.focus()
                          }
                        }}
                      >
                        View Must Knows & Facts
                      </Button>
                      <Button
                        ref={nextButtonRef}
                        type="primary"
                        icon={<i className="las la-arrow-right" />}
                        className="hover:scale-105 transition-transform"
                        style={{ borderRadius: '8px' }}
                        onKeyDown={e => {
                          if (
                            e.key === 'ArrowLeft' &&
                            mustKnowsButtonRef.current
                          ) {
                            mustKnowsButtonRef.current.focus()
                          }
                        }}
                        onClick={async () => {
                          try {
                            const values = await form.validateFields()
                            setTripBasics({
                              destination: values.destination,
                              dates: [
                                values.dates[0].format('YYYY-MM-DD'),
                                values.dates[1].format('YYYY-MM-DD'),
                              ],
                              tripType: values.tripType,
                            })
                            setCurrentStep(1)
                          } catch (error) {
                            message.error(
                              'Please complete all required fields before proceeding',
                            )
                          }
                        }}
                      >
                        Next
                      </Button>
                    </Row>
                    <Modal
                      title="Must Knows & Facts"
                      open={isModalVisible}
                      onOk={() => setIsModalVisible(false)}
                      onCancel={() => setIsModalVisible(false)}
                      width={800}
                    >
                      <MustKnowsCard
                        destination={values.destination}
                        dates={[
                          values.dates[0].format('YYYY-MM-DD'),
                          values.dates[1].format('YYYY-MM-DD'),
                        ]}
                        tripType={values.tripType}
                      />
                    </Modal>
                  </>
                )
              }}
            </Form.Item>
          </>
        )
      case 1:
        return (
          <>
            <Card
              style={{
                background: `linear-gradient(to right, ${theme.token['--colorMetallicGray1']}, ${theme.token['--colorMetallicGray3']})`,
                padding: '24px',
                marginBottom: '24px',
                borderRadius: theme.token['--cardBorderRadius'],
                boxShadow: theme.token['--cardBoxShadow'],
                transition: 'all 0.3s ease',
              }}
              className="hover:transform hover:-translate-y-2 hover:shadow-lg transition-all"
            >
              <Form.Item
                name="transportMode"
                label="Mode of Travel"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio.Button value="flight">
                    <i className="las la-plane"></i> Flight
                  </Radio.Button>
                  <Radio.Button value="train">
                    <i className="las la-train"></i> Train
                  </Radio.Button>
                  <Radio.Button value="bus">
                    <i className="las la-bus"></i> Bus
                  </Radio.Button>
                  <Radio.Button value="car">
                    <i className="las la-car"></i> Car
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Card>
            <Card
              style={{
                background: `linear-gradient(to right, ${theme.token['--colorMetallicGray1']}, ${theme.token['--colorMetallicGray3']})`,
                padding: '24px',
                marginBottom: '24px',
              }}
            >
              <Form.Item
                name="travelPreferences"
                label="Travel Preferences"
                rules={[{ required: true }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Click Generate Suggestions after selecting preferences"
                  options={[
                    { value: 'direct', label: 'Direct flights only' },
                    { value: 'economy', label: 'Economy class' },
                    { value: 'business', label: 'Business class' },
                  ]}
                  onChange={() => setSuggestions('')}
                />
              </Form.Item>
            </Card>
            <Form.Item dependencies={['transportMode', 'travelPreferences']}>
              {({ getFieldValue }) => {
                const transportMode = getFieldValue('transportMode')
                const travelPreferences = getFieldValue('travelPreferences')
                if (!transportMode || !travelPreferences?.length) return null

                return (
                  <Flex justify="space-between" align="center">
                    <Button
                      type="primary"
                      icon={<i className="las la-magic" />}
                      onClick={handleGenerateSuggestions}
                      loading={isGenerating}
                      style={{ marginTop: '20px' }}
                    >
                      Generate Suggestions
                    </Button>
                    {!isGenerating && (
                      <Button
                        type="primary"
                        icon={<i className="las la-arrow-right" />}
                        onClick={() => {
                          const formValues = form.getFieldsValue()
                          if (validateTransportation(formValues)) {
                            setCurrentStep(currentStep + 1)
                          } else {
                            message.error(
                              'Please fill in all required transportation fields',
                            )
                          }
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Flex>
                )
              }}
            </Form.Item>
            <Form.Item
              dependencies={['transportMode', 'travelPreferences', 'dates']}
            >
              {({ getFieldsValue }) => {
                const values = getFieldsValue()
                if (!values.transportMode || !values.travelPreferences?.length)
                  return null
                return (
                  <>
                    <Modal
                      title="Transportation Suggestions"
                      open={isTransportModalVisible}
                      onOk={() => setIsTransportModalVisible(false)}
                      onCancel={() => setIsTransportModalVisible(false)}
                      width={800}
                    >
                      <TransportationSuggestionsCard
                        destination={form.getFieldValue('destination')}
                        dates={
                          values.dates
                            ? [
                                values.dates[0].format('YYYY-MM-DD'),
                                values.dates[1].format('YYYY-MM-DD'),
                              ]
                            : ['', '']
                        }
                        tripType={values.tripType}
                        transportMode={values.transportMode}
                        travelPreferences={values.travelPreferences}
                        onLoadingChange={setIsGenerating}
                        onSuggestionsChange={setSuggestions}
                        onGenerateSuggestions={handleGenerateSuggestions}
                        isGenerating={isGenerating}
                        suggestions={suggestions}
                      />
                    </Modal>
                  </>
                )
              }}
            </Form.Item>
          </>
        )
      case 2:
        return (
          <>
            <Card
              style={{
                background: `linear-gradient(to right, ${theme.token['--colorGradientFresh1']}, ${theme.token['--colorGradientFresh2']}, ${theme.token['--colorGradientFresh3']})`,
                padding: '24px',
                marginBottom: '24px',
                borderRadius: theme.token['--cardBorderRadius'],
                boxShadow: theme.token['--cardBoxShadow'],
                transition: 'all 0.3s ease',
              }}
              className="hover:transform hover:-translate-y-2 hover:shadow-lg transition-all"
            >
              <Form.Item
                name="budget"
                label="Budget Range"
                rules={[{ required: true }]}
              >
                <InputNumber
                  prefix="$"
                  style={{ width: '100%' }}
                  placeholder="Enter your accommodation budget"
                />
              </Form.Item>
            </Card>
            <Card
              style={{
                background: `linear-gradient(to right, ${theme.token['--colorGradientFresh1']}, ${theme.token['--colorGradientFresh2']}, ${theme.token['--colorGradientFresh3']})`,
                padding: '24px',
                marginBottom: '24px',
              }}
            >
              <Form.Item
                name="stayType"
                label="Type of Stay"
                rules={[{ required: true }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select accommodation type"
                  options={[
                    { value: 'hotel', label: 'Hotel' },
                    { value: 'hostel', label: 'Hostel' },
                    { value: 'apartment', label: 'Vacation Rental' },
                  ]}
                />
              </Form.Item>
            </Card>
            <Form.Item dependencies={['budget', 'stayType']}>
              {({ getFieldValue }) => {
                const budget = getFieldValue('budget')
                const stayType = getFieldValue('stayType')

                if (!budget || !stayType?.length) {
                  return null
                }

                return (
                  <Flex justify="space-between" align="center">
                    <Button
                      type="primary"
                      icon={<i className="las la-magic" />}
                      onClick={handleGenerateAccommodationSuggestions}
                      loading={isGenerating}
                      style={{ marginTop: '20px' }}
                    >
                      Generate Suggestions
                    </Button>
                    {!isGenerating && (
                      <Button
                        type="primary"
                        icon={<i className="las la-arrow-right" />}
                        onClick={() => {
                          const formValues = form.getFieldsValue()
                          if (validateAccommodation(formValues)) {
                            setCurrentStep(currentStep + 1)
                          } else {
                            message.error(
                              'Please fill in all required accommodation fields',
                            )
                          }
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Flex>
                )
              }}
            </Form.Item>
            <Form.Item dependencies={['budget', 'stayType']}>
              {({ getFieldsValue }) => {
                const values = getFieldsValue()
                if (!values.budget || !values.stayType?.length) return null
                return (
                  <AccommodationSuggestionsCard
                    destination={form.getFieldValue('destination')}
                    dates={tripBasics?.dates || ['', '']}
                    tripType={tripBasics?.tripType || ''}
                    transportMode={values.transportMode}
                    travelPreferences={values.travelPreferences}
                    budget={values.budget}
                    stayType={values.stayType}
                    isGenerating={isGenerating}
                    suggestions={accommodationSuggestions}
                  />
                )
              }}
            </Form.Item>
          </>
        )
      case 3:
        return (
          <>
            <Card
              style={{
                background: `linear-gradient(to right, ${theme.token['--colorGradientLuxury1']}, ${theme.token['--colorGradientLuxury2']}, ${theme.token['--colorGradientLuxury3']})`,
                padding: '24px',
                marginBottom: '24px',
                borderRadius: theme.token['--cardBorderRadius'],
                boxShadow: theme.token['--cardBoxShadow'],
                transition: 'all 0.3s ease',
              }}
              className="hover:transform hover:-translate-y-2 hover:shadow-lg transition-all"
            >
              <Form.Item
                name="averageAge"
                label="Average Age Group"
                rules={[
                  { required: form.getFieldValue('tripType') !== 'solo' },
                ]}
                style={{ color: 'rgba(255, 255, 255, 0.85)' }}
              >
                <Select
                  placeholder="Select age group"
                  options={[
                    { value: 'children', label: '0-12 years' },
                    { value: 'teenagers', label: '13-17 years' },
                    { value: 'young-adults', label: '18-30 years' },
                    { value: 'adults', label: '31-50 years' },
                    { value: 'seniors', label: '51+ years' },
                  ]}
                  style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                />
              </Form.Item>
            </Card>
            <Card
              style={{
                background: `linear-gradient(to right, ${theme.token['--colorGradientLuxury1']}, ${theme.token['--colorGradientLuxury2']}, ${theme.token['--colorGradientLuxury3']})`,
                padding: '24px',
                marginBottom: '24px',
                borderRadius: theme.token['--cardBorderRadius'],
                boxShadow: theme.token['--cardBoxShadow'],
                transition: 'all 0.3s ease',
              }}
              className="hover:transform hover:-translate-y-2 hover:shadow-lg transition-all"
            >
              <Form.Item
                name="interests"
                label="Interests"
                style={{ color: 'rgba(255, 255, 255, 0.85)' }}
              >
                <Select
                  mode="multiple"
                  placeholder="Select your interests"
                  options={[
                    { value: 'adventure', label: 'Adventure' },
                    { value: 'culture', label: 'Culture' },
                    { value: 'food', label: 'Food' },
                    { value: 'relaxation', label: 'Relaxation' },
                  ]}
                  style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                />
              </Form.Item>
            </Card>
            <Card
              style={{
                background: `linear-gradient(to right, ${theme.token['--colorGradientLuxury1']}, ${theme.token['--colorGradientLuxury2']}, ${theme.token['--colorGradientLuxury3']})`,
                padding: '24px',
                marginBottom: '24px',
                borderRadius: theme.token['--cardBorderRadius'],
                boxShadow: theme.token['--cardBoxShadow'],
                transition: 'all 0.3s ease',
              }}
              className="hover:transform hover:-translate-y-2 hover:shadow-lg transition-all"
            >
              <Form.Item
                name="activityLevel"
                label="Daily Activity Level"
                style={{ color: 'rgba(255, 255, 255, 0.85)' }}
              >
                <Radio.Group>
                  <Radio.Button value="relaxed">Relaxed</Radio.Button>
                  <Radio.Button value="moderate">Moderate</Radio.Button>
                  <Radio.Button value="busy">Busy</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Card>
            <Form.Item
              dependencies={['averageAge', 'interests', 'activityLevel']}
              style={{ color: 'rgba(255, 255, 255, 0.85)' }}
            >
              {({ getFieldValue }) => {
                const tripType = getFieldValue('tripType')
                const averageAge = getFieldValue('averageAge')
                const interests = getFieldValue('interests')
                const activityLevel = getFieldValue('activityLevel')

                const isValid =
                  tripType === 'solo' ||
                  (averageAge && interests?.length > 0 && activityLevel)

                if (!isValid) return null

                return (
                  <Flex justify="space-between" align="center">
                    <Button
                      type="primary"
                      icon={<i className="las la-magic" />}
                      onClick={handleGenerateActivitySuggestions}
                      loading={isGenerating}
                      style={{ marginTop: '20px' }}
                    >
                      Generate Suggestions
                    </Button>
                    <Button
                      type="primary"
                      icon={<i className="las la-arrow-right" />}
                      onClick={() => {
                        const values = form.getFieldsValue()
                        if (validateActivities(values)) {
                          setCurrentStep(currentStep + 1)
                        } else {
                          message.error(
                            'Please fill in all required activity fields',
                          )
                        }
                      }}
                    >
                      Next
                    </Button>
                  </Flex>
                )
              }}
            </Form.Item>
            <Form.Item dependencies={['interests', 'activityLevel']}>
              {({ getFieldsValue }) => {
                const values = getFieldsValue()
                if (!values.interests?.length) return null
                return (
                  <ActivitySuggestionsCard
                    isGenerating={isGenerating}
                    suggestions={activitySuggestions}
                  />
                )
              }}
            </Form.Item>
          </>
        )
      case 4:
        return (
          <Card>
            <div>
              <Form.Item name="interests" noStyle preserve={true} />
            </div>
            <Form.Item name="source" noStyle preserve={true} />
            <Form.Item name="destination" noStyle preserve={true} />
            <Form.Item name="dates" noStyle preserve={true} />
            <Form.Item name="tripType" noStyle preserve={true} />
            <Form.Item name="transportMode" noStyle preserve={true} />
            <Form.Item name="travelPreferences" noStyle preserve={true} />
            <Form.Item name="stayType" noStyle preserve={true} />
            <Form.Item name="budget" noStyle preserve={true} />
            <Form.Item name="budget" label="Total Trip Budget" preserve={true}>
              <InputNumber prefix="$" style={{ width: '100%' }} />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isCreatingTrip}
            >
              <i className="las la-save"></i> Create Trip
            </Button>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-suitcase"></i> Plan Your Trip
        </Title>
        <Text>Follow these steps to create your perfect travel itinerary</Text>

        <div style={{ maxWidth: 800, margin: '0 auto', marginTop: '20px' }}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onValuesChange={async (_, allValues) => {
                await form
                  .validateFields([
                    'source',
                    'destination',
                    'dates',
                    'tripType',
                  ])
                  .catch(() => {})
                if (validateTripBasics(allValues)) {
                  if (mustKnowsButtonRef.current) {
                    mustKnowsButtonRef.current.focus()
                  }
                }
              }}
            >
              <Steps
                current={currentStep}
                onChange={step => {
                  const values = form.getFieldsValue()
                  const isValid = validateStepFields(currentStep, values)
                  if (isValid) {
                    setCurrentStep(step)
                  } else {
                    message.error(
                      'Please complete all required fields before proceeding',
                    )
                  }
                }}
                items={steps.map(step => ({
                  title: step.title,
                  icon: <i className={step.icon}></i>,
                }))}
              />
              <Progress
                percent={progress}
                status="active"
                style={{ marginTop: '20px' }}
              />
              <div style={{ marginTop: '40px' }}>{renderStepContent()}</div>
            </Form>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
