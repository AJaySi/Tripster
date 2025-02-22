import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Popconfirm,
  Progress,
  Radio,
  Row,
  Select,
  Slider,
  Tooltip,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useState } from 'react'

dayjs.extend(customParseFormat)
const { Title, Text } = Typography

export default function TravelPreferencesPage() {
  const { user, organization } = useUserContext()
  const [form] = Form.useForm()
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [templateName, setTemplateName] = useState('')

  const { mutateAsync: createTemplate } =
    Api.preferenceTemplate.create.useMutation()
  const { mutateAsync: deleteTemplate } =
    Api.preferenceTemplate.delete.useMutation()
  const { data: templates, refetch: refetchTemplates } =
    Api.preferenceTemplate.findMany.useQuery()

  const { data: preference, refetch } = Api.preference.findFirst.useQuery({
    where: {
      userId: user?.id,
      organizationId: organization?.id,
    },
  })

  const { mutateAsync: updatePreference } = Api.preference.update.useMutation()
  const { mutateAsync: createPreference } = Api.preference.create.useMutation()

  const calculateCompletion = (values: any) => {
    const totalFields = Object.keys(values).length
    const filledFields = Object.values(values).filter(
      value => value !== undefined && value !== null && value !== '',
    ).length
    return Math.round((filledFields / totalFields) * 100)
  }

  interface PreferenceFormValues {
    travelStyle?: string | string[]
    dietaryRestrictions?: string[]
    accommodationType?: string[]
    activityPreferences?: string[]
    budgetRange?: [number, number]
    travelDuration?: number
    preferredDestinations?: string[]
    climatePreferences?: string[]
    travelCompanions?: string
    accessibilityRequirements?: string[]
    transportationPreferences?: string[]
    travelGoals?: string[]
    activityIntensity?: string
    specialEvents?: string
    languagesSpoken?: string[]
    petPreferences?: string
    passportCountry?: string
    passportExpiry?: Date
    visaType?: string
    visaExpiry?: Date
  }

  interface TemplateData {
    name: string
    travelStyle?: string
    dietaryRestrictions?: string
    accommodationType?: string
    activityPreferences?: string
    budgetRange?: string
    travelDuration?: string
    preferredDestinations?: string
    climatePreferences?: string
    travelCompanions?: string
    accessibilityRequirements?: string
    transportationPreferences?: string
    travelGoals?: string
    activityIntensity?: string
    specialEvents?: string
    languagesSpoken?: string
    petPreferences?: string
    passportCountry?: string
    passportExpiry?: string
    visaType?: string
    visaExpiry?: string
    userId: string
    organizationId: string
  }

  const onFinish = async (values: PreferenceFormValues) => {
    try {
      if (!user?.id || !organization?.id) {
        message.error('User or organization data missing')
        return
      }

      const formattedData = {
        travelStyle: Array.isArray(values.travelStyle)
          ? values.travelStyle.join(',')
          : values.travelStyle,
        dietaryRestrictions: values.dietaryRestrictions?.join(','),
        accommodationType: values.accommodationType?.join(','),
        activityPreferences: values.activityPreferences?.join(','),
        budgetRange: values.budgetRange?.join('-'),
        travelDuration: values.travelDuration?.toString(),
        preferredDestinations: values.preferredDestinations?.join(','),
        climatePreferences: values.climatePreferences?.join(','),
        travelCompanions: values.travelCompanions,
        accessibilityRequirements: values.accessibilityRequirements?.join(','),
        transportationPreferences: values.transportationPreferences?.join(','),
        travelGoals: values.travelGoals?.join(','),
        activityIntensity: values.activityIntensity,
        specialEvents: values.specialEvents,
        languagesSpoken: values.languagesSpoken?.join(','),
        petPreferences: values.petPreferences,
        passportCountry: values.passportCountry,
        passportExpiry: values.passportExpiry
          ? values.passportExpiry?.toISOString().split('T')[0]
          : undefined,
        visaType: values.visaType,
        visaExpiry: values.visaExpiry
          ? values.visaExpiry?.toISOString().split('T')[0]
          : undefined,
        userId: user.id,
        organizationId: organization.id,
      }

      if (preference?.id) {
        await updatePreference({
          where: { id: preference.id },
          data: formattedData,
        })
      } else {
        await createPreference({
          data: formattedData,
        })
      }
      message.success('Preferences saved successfully!')
      refetch()
    } catch (error: unknown) {
      console.error('Preference save error:', error)
      message.error(
        error instanceof Error ? error.message : 'Failed to save preferences',
      )
    }
  }

  const onValuesChange = (changedValues: any, allValues: any) => {
    setCompletionPercentage(calculateCompletion(allValues))
  }

  const handleSaveTemplate = async () => {
    try {
      if (!user?.id || !organization?.id) {
        message.error('User or organization data missing')
        return
      }

      const values = form.getFieldsValue() as PreferenceFormValues
      const formattedData = {
        travelStyle: Array.isArray(values.travelStyle)
          ? values.travelStyle.join(',')
          : values.travelStyle,
        dietaryRestrictions: values.dietaryRestrictions?.join(','),
        accommodationType: values.accommodationType?.join(','),
        activityPreferences: values.activityPreferences?.join(','),
        budgetRange: values.budgetRange?.join('-'),
        travelDuration: values.travelDuration?.toString(),
        preferredDestinations: values.preferredDestinations?.join(','),
        climatePreferences: values.climatePreferences?.join(','),
        travelCompanions: values.travelCompanions,
        accessibilityRequirements: values.accessibilityRequirements?.join(','),
        transportationPreferences: values.transportationPreferences?.join(','),
        travelGoals: values.travelGoals?.join(','),
        activityIntensity: values.activityIntensity,
        specialEvents: values.specialEvents,
        languagesSpoken: values.languagesSpoken?.join(','),
        petPreferences: values.petPreferences,
        passportCountry: values.passportCountry,
        passportExpiry: values.passportExpiry
          ? values.passportExpiry?.toISOString().split('T')[0]
          : undefined,
        visaType: values.visaType,
        visaExpiry: values.visaExpiry
          ? values.visaExpiry?.toISOString().split('T')[0]
          : undefined,
        name: templateName,
        userId: user.id,
        organizationId: organization.id,
      }

      await createTemplate({
        data: formattedData,
      })
      message.success('Template saved successfully!')
      setTemplateName('')
    } catch (error) {
      console.error('Template save error:', error)
      if (error.message?.includes('Unique constraint')) {
        message.error('A template with this name already exists')
      } else {
        message.error('Failed to save template')
      }
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const [activeKey, setActiveKey] = useState<string[]>([])

  const handleLoadTemplate = (template: TemplateData) => {
    const formData = {
      ...template,
      templateName: template.name,
      travelStyle: template.travelStyle?.split(','),
      dietaryRestrictions: template.dietaryRestrictions?.split(','),
      accommodationType: template.accommodationType?.split(','),
      activityPreferences: template.activityPreferences?.split(','),
      budgetRange: template.budgetRange?.split('-').map(Number),
      travelDuration: template.travelDuration
        ? Number(template.travelDuration)
        : undefined,
      preferredDestinations: template.preferredDestinations?.split(','),
      climatePreferences: template.climatePreferences?.split(','),
      travelCompanions: template.travelCompanions,
      accessibilityRequirements: template.accessibilityRequirements?.split(','),
      transportationPreferences: template.transportationPreferences?.split(','),
      travelGoals: template.travelGoals?.split(','),
      activityIntensity: template.activityIntensity,
      specialEvents: template.specialEvents,
      languagesSpoken: template.languagesSpoken?.split(','),
      petPreferences: template.petPreferences,
    }
    form.setFieldsValue(formData)
    setTemplateName(template.name)
    setCompletionPercentage(calculateCompletion(formData))
    setActiveKey(['1'])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-cog" /> Travel Preferences
        </Title>
        <Text>
          Customize your travel experience by setting your preferences below.
        </Text>

        <Collapse
          activeKey={activeKey}
          onChange={key => setActiveKey(key as string[])}
          items={[
            {
              key: '1',
              label: 'Add New Travel Preferences',
              children: (
                <Card>
                  <Progress percent={completionPercentage} status="active" />
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSaveTemplate}
                    onValuesChange={onValuesChange}
                    initialValues={preference || {}}
                  >
                    <Form.Item
                      name="templateName"
                      label={
                        <Tooltip title="Give your preference template a unique name for easy identification">
                          Template Name
                        </Tooltip>
                      }
                      rules={[
                        {
                          required: true,
                          message: 'Template name is required',
                        },
                      ]}
                    >
                      <Input
                        value={templateName}
                        onChange={e => setTemplateName(e.target.value)}
                      />
                    </Form.Item>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Title level={4}>
                          <i className="las la-hotel" /> Accommodation
                          Preferences
                        </Title>
                        <Form.Item
                          name="accommodationType"
                          label={
                            <Tooltip title="Select one or more types of places you prefer to stay during your trips">
                              Preferred Accommodation Types
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              { label: 'Hotels', value: 'hotels' },
                              { label: 'Hostels', value: 'hostels' },
                              {
                                label: 'Vacation Rentals',
                                value: 'vacation_rentals',
                              },
                              { label: 'Resorts', value: 'resorts' },
                            ]}
                          />
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-hiking" /> Activity Preferences
                        </Title>
                        <Form.Item
                          name="activityPreferences"
                          label={
                            <Tooltip title="Choose activities you typically enjoy while traveling">
                              Preferred Activities
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              { label: 'Hiking', value: 'hiking' },
                              { label: 'Scuba Diving', value: 'scuba_diving' },
                              { label: 'Museums', value: 'museums' },
                              { label: 'Beach', value: 'beach' },
                              { label: 'City Tours', value: 'city_tours' },
                            ]}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Title level={4}>
                          <i className="las la-utensils" /> Dietary Preferences
                        </Title>
                        <Form.Item
                          name="dietaryRestrictions"
                          label={
                            <Tooltip title="Specify any food preferences or restrictions that should be considered">
                              Dietary Restrictions
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              { label: 'Vegetarian', value: 'vegetarian' },
                              { label: 'Vegan', value: 'vegan' },
                              { label: 'Gluten-Free', value: 'gluten_free' },
                              { label: 'Halal', value: 'halal' },
                              { label: 'Kosher', value: 'kosher' },
                            ]}
                          />
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-wallet" /> Budget Preferences
                        </Title>
                        <Form.Item
                          name="budgetRange"
                          label={
                            <Tooltip title="Set your preferred spending range per day in USD">
                              Daily Budget Range ($)
                            </Tooltip>
                          }
                        >
                          <Slider
                            range
                            min={0}
                            max={1000}
                            marks={{
                              0: '$0',
                              250: '$250',
                              500: '$500',
                              750: '$750',
                              1000: '$1000',
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={12}>
                        <Title level={4}>
                          <i className="las la-clock" /> Travel Duration
                        </Title>
                        <Form.Item
                          name="travelDuration"
                          label={
                            <Tooltip title="Enter your preferred number of travel days">
                              Preferred Days
                            </Tooltip>
                          }
                        >
                          <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-map-marker" /> Destinations
                        </Title>
                        <Form.Item
                          name="preferredDestinations"
                          label={
                            <Tooltip title="Select your preferred destinations">
                              Preferred Destinations
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              { label: 'Paris', value: 'paris' },
                              { label: 'Tokyo', value: 'tokyo' },
                              { label: 'New York', value: 'new_york' },
                              { label: 'London', value: 'london' },
                              { label: 'Rome', value: 'rome' },
                            ]}
                          />
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-sun" /> Climate
                        </Title>
                        <Form.Item
                          name="climatePreferences"
                          label={
                            <Tooltip title="Select your preferred climate types">
                              Climate Preferences
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              { label: 'Tropical', value: 'tropical' },
                              { label: 'Temperate', value: 'temperate' },
                              {
                                label: 'Mediterranean',
                                value: 'mediterranean',
                              },
                              { label: 'Desert', value: 'desert' },
                              { label: 'Polar', value: 'polar' },
                            ]}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Title level={4}>
                          <i className="las la-users" /> Travel Group
                        </Title>
                        <Form.Item
                          name="travelCompanions"
                          label={
                            <Tooltip title="Select your preferred travel group type">
                              Travel Companions
                            </Tooltip>
                          }
                        >
                          <Radio.Group>
                            <Radio.Button value="solo">Solo</Radio.Button>
                            <Radio.Button value="couple">Couple</Radio.Button>
                            <Radio.Button value="family">Family</Radio.Button>
                            <Radio.Button value="group">Group</Radio.Button>
                          </Radio.Group>
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-wheelchair" /> Accessibility
                        </Title>
                        <Form.Item
                          name="accessibilityRequirements"
                          label={
                            <Tooltip title="Select any accessibility requirements">
                              Accessibility Requirements
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              {
                                label: 'Wheelchair Access',
                                value: 'wheelchair',
                              },
                              { label: 'Step-Free Access', value: 'step_free' },
                              { label: 'Audio Guides', value: 'audio_guides' },
                              {
                                label: 'Sign Language',
                                value: 'sign_language',
                              },
                              { label: 'Braille', value: 'braille' },
                            ]}
                          />
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-subway" /> Transportation
                        </Title>
                        <Form.Item
                          name="transportationPreferences"
                          label={
                            <Tooltip title="Select preferred modes of transportation">
                              Transportation Preferences
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              { label: 'Walking', value: 'walking' },
                              {
                                label: 'Public Transit',
                                value: 'public_transit',
                              },
                              { label: 'Taxi/Ride-Share', value: 'taxi' },
                              { label: 'Rental Car', value: 'rental_car' },
                              { label: 'Bicycle', value: 'bicycle' },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col span={12}>
                        <Title level={4}>
                          <i className="las la-bullseye" /> Travel Goals
                        </Title>
                        <Form.Item
                          name="travelGoals"
                          label={
                            <Tooltip title="Select your travel purposes">
                              Travel Goals
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              { label: 'Sightseeing', value: 'sightseeing' },
                              { label: 'Relaxation', value: 'relaxation' },
                              { label: 'Adventure', value: 'adventure' },
                              {
                                label: 'Cultural Experience',
                                value: 'cultural',
                              },
                              { label: 'Food Tourism', value: 'food' },
                            ]}
                          />
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-running" /> Activity Level
                        </Title>
                        <Form.Item
                          name="activityIntensity"
                          label={
                            <Tooltip title="Select your preferred activity intensity">
                              Activity Intensity
                            </Tooltip>
                          }
                        >
                          <Radio.Group>
                            <Radio.Button value="low">Low</Radio.Button>
                            <Radio.Button value="moderate">
                              Moderate
                            </Radio.Button>
                            <Radio.Button value="high">High</Radio.Button>
                          </Radio.Group>
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-calendar" /> Special Events
                        </Title>
                        <Form.Item
                          name="specialEvents"
                          label={
                            <Tooltip title="Describe any special events you'd like to attend">
                              Special Events
                            </Tooltip>
                          }
                        >
                          <Input.TextArea rows={4} />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Title level={4}>
                          <i className="las la-language" /> Languages
                        </Title>
                        <Form.Item
                          name="languagesSpoken"
                          label={
                            <Tooltip title="Select languages you speak">
                              Languages Spoken
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              { label: 'English', value: 'english' },
                              { label: 'Spanish', value: 'spanish' },
                              { label: 'French', value: 'french' },
                              { label: 'German', value: 'german' },
                              { label: 'Japanese', value: 'japanese' },
                            ]}
                          />
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-paw" /> Pet Preferences
                        </Title>
                        <Form.Item
                          name="petPreferences"
                          label={
                            <Tooltip title="Select your pet accommodation needs">
                              Pet Accommodation
                            </Tooltip>
                          }
                        >
                          <Radio.Group>
                            <Radio.Button value="no_pets">No Pets</Radio.Button>
                            <Radio.Button value="pet_friendly">
                              Pet Friendly
                            </Radio.Button>
                            <Radio.Button value="service_animals">
                              Service Animals Only
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-plane" /> Travel Style
                        </Title>
                        <Form.Item
                          name="travelStyle"
                          label={
                            <Tooltip title="Select travel styles that best match your preferences">
                              Preferred Travel Style
                            </Tooltip>
                          }
                        >
                          <Select
                            mode="multiple"
                            options={[
                              { label: 'Luxury', value: 'luxury' },
                              { label: 'Budget', value: 'budget' },
                              { label: 'Adventure', value: 'adventure' },
                              { label: 'Cultural', value: 'cultural' },
                              { label: 'Relaxation', value: 'relaxation' },
                            ]}
                          />
                        </Form.Item>

                        <Title level={4}>
                          <i className="las la-passport" /> Travel Documents
                        </Title>
                        <Form.Item
                          name="passportCountry"
                          label={
                            <Tooltip title="Select your passport issuing country">
                              Passport Country
                            </Tooltip>
                          }
                        >
                          <Select
                            options={[
                              { label: 'United States', value: 'us' },
                              { label: 'United Kingdom', value: 'uk' },
                              { label: 'Canada', value: 'ca' },
                              { label: 'Australia', value: 'au' },
                              { label: 'France', value: 'fr' },
                              { label: 'Germany', value: 'de' },
                              { label: 'Japan', value: 'jp' },
                            ]}
                          />
                        </Form.Item>
                        <Form.Item
                          name="passportExpiry"
                          label={
                            <Tooltip title="Enter your passport expiry date">
                              Passport Expiry Date
                            </Tooltip>
                          }
                        >
                          <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          name="visaType"
                          label={
                            <Tooltip title="Select your visa type">
                              Visa Type
                            </Tooltip>
                          }
                        >
                          <Select
                            options={[
                              { label: 'Tourist', value: 'tourist' },
                              { label: 'Business', value: 'business' },
                              { label: 'Student', value: 'student' },
                              { label: 'Work', value: 'work' },
                              { label: 'Transit', value: 'transit' },
                            ]}
                          />
                        </Form.Item>
                        <Form.Item
                          name="visaExpiry"
                          label={
                            <Tooltip title="Enter your visa expiry date">
                              Visa Expiry Date
                            </Tooltip>
                          }
                        >
                          <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <div style={{ textAlign: 'right', marginTop: 24 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginTop: 24 }}
                      >
                        <i className="las la-save" /> Save as Template
                      </Button>
                    </div>
                  </Form>
                </Card>
              ),
            },
          ]}
        />

        {templates?.length > 0 && (
          <Card style={{ marginTop: 24 }}>
            <Title level={4}>Saved Templates</Title>
            <List
              dataSource={templates}
              renderItem={template => (
                <List.Item
                  actions={[
                    <Button
                      key="load"
                      loading={isLoading}
                      onClick={() => {
                        handleLoadTemplate(template)
                        message.success('Template loaded successfully')
                      }}
                    >
                      Load Template
                    </Button>,
                    <Popconfirm
                      key="delete"
                      title="Are you sure you want to delete this template?"
                      okText="Yes, delete"
                      cancelText="Cancel"
                      onConfirm={async () => {
                        await deleteTemplate({ where: { id: template.id } })
                        message.success('Template deleted successfully')
                        refetchTemplates()
                      }}
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta title={template.name} />
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
