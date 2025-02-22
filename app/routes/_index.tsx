import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `AI-Powered Personalization`,
      description: `Get custom itineraries based on your preferences, budget and travel style. Our AI learns what you love and creates the perfect trip.`,
      icon: <i className="las la-robot"></i>,
    },
    {
      heading: `Smart Price Tracking`,
      description: `Save up to 20% on bookings with real-time price alerts and optimal booking time recommendations.`,
      icon: <i className="las la-chart-line"></i>,
    },
    {
      heading: `Group Planning Made Easy`,
      description: `Coordinate with your travel buddies effortlessly. Share ideas, vote on activities, and make decisions together in real-time.`,
      icon: <i className="las la-users"></i>,
    },
    {
      heading: `All-in-One Dashboard`,
      description: `Access all your travel details in one place - from flights and hotels to activities and documents. No more switching between apps.`,
      icon: <i className="las la-columns"></i>,
    },
    {
      heading: `Travel Requirements Checker`,
      description: `Stay informed about visa requirements, travel restrictions, and necessary documentation for your destination.`,
      icon: <i className="las la-passport"></i>,
    },
    {
      heading: `24/7 Travel Support`,
      description: `Get instant help whenever you need it. Our AI assistant is always available to answer questions and solve problems.`,
      icon: <i className="las la-headset"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `Solo Traveler`,
      content: `The AI recommendations were spot-on! Saved me hours of research and found hidden gems I would've never discovered on my own.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Marcus Rodriguez`,
      designation: `Group Trip Organizer`,
      content: `Planning a 10-person trip used to be a nightmare. This platform made it incredibly easy to coordinate and keep everyone happy.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emma Thompson`,
      designation: `Digital Nomad`,
      content: `The price tracking feature alone saved me over $400 on flights. This is a game-changer for frequent travelers.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Wanderer`,
      description: `Perfect for occasional travelers`,
      monthly: 9,
      yearly: 89,
      features: [
        `3 trips per year`,
        `Basic AI recommendations`,
        `Email support`,
      ],
    },
    {
      title: `Explorer`,
      description: `Most popular for frequent travelers`,
      monthly: 19,
      yearly: 189,
      features: [
        `Unlimited trips`,
        `Advanced AI features`,
        `Group planning tools`,
        `24/7 priority support`,
      ],
      highlight: true,
    },
    {
      title: `Nomad`,
      description: `For travel professionals`,
      monthly: 39,
      yearly: 389,
      features: [
        `Everything in Explorer`,
        `API access`,
        `Custom branding`,
        `Dedicated account manager`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How does the AI personalization work?`,
      answer: `Our AI analyzes your preferences, past trips, and travel style to create personalized recommendations. The more you use the platform, the better it gets at predicting what you'll love.`,
    },
    {
      question: `Can I use this for group trips?`,
      answer: `Absolutely! Our platform excels at group planning with features like shared itineraries, voting systems, and expense splitting.`,
    },
    {
      question: `How much money can I save?`,
      answer: `Users typically save 15-20% on their total trip cost through our price tracking and optimal booking recommendations.`,
    },
    {
      question: `What if I need to change my plans?`,
      answer: `Our platform makes it easy to modify your itinerary anytime. Plus, our 24/7 AI support can help you navigate any changes or cancellations.`,
    },
  ]

  const steps = [
    {
      heading: `Share Your Travel Dreams`,
      description: `Tell us where you want to go, your interests, and travel style.`,
    },
    {
      heading: `Get AI-Powered Recommendations`,
      description: `Receive a personalized itinerary crafted just for you.`,
    },
    {
      heading: `Customize Your Perfect Trip`,
      description: `Fine-tune your plan with real-time pricing and smart suggestions.`,
    },
    {
      heading: `Travel Stress-Free`,
      description: `Enjoy your journey with all details organized in one place.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Spending hours researching across dozens of websites`,
    },
    {
      emoji: `💸`,
      title: `Overpaying due to poor timing and hidden costs`,
    },
    {
      emoji: `😤`,
      title: `Struggling to coordinate plans with travel companions`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Plan Your Dream Trip in Minutes, Not Hours`}
        subtitle={`Let AI create your perfect travel itinerary while saving time and money. Join 1M+ happy travelers who've discovered the smarter way to plan.`}
        buttonText={`Start Planning Free`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/fMyzvO-alwritytripster-4Yh8`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000000}
            suffixText={`happy travelers`}
          />
        }
      />
      <LandingSocialProof title={`Featured on`} />
      <LandingPainPoints
        title={`The average traveler wastes 15 hours and visits 38 websites to plan a single trip. Stop the madness.`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Perfect Trip in 4 Simple Steps`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need for Stress-Free Travel Planning`}
        subtitle={`Powerful tools that make planning your next adventure a breeze`}
        features={features}
      />
      <LandingTestimonials
        title={`Join Thousands of Happy Travelers`}
        subtitle={`See how others are transforming their travel experience`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Start Planning Your Dream Trip Today`}
        subtitle={`Choose the perfect plan for your travel needs`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About Smarter Travel Planning`}
        subtitle={`Everything you need to know about our AI-powered platform`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Travel Planning?`}
        subtitle={`Join 1M+ travelers who've discovered the easier way to plan amazing trips`}
        buttonText={`Start Planning Free`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
