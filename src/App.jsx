import { createContext, useContext, lazy, Suspense } from 'react'
import { useReveal } from './hooks/useReveal'
import { useTracking, setTrackingEndpoint } from './hooks/useTracking'
import config from './siteConfig'

// Above-fold: loaded immediately (critical path)
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Stats from './components/Stats'
import DynamicFavicon from './components/DynamicFavicon'

// Below-fold: lazy-loaded for faster initial paint
// Section order based on conversion funnel psychology:
// Trust -> Value Demo -> Reciprocity -> Loss Aversion -> Commitment -> Social Proof -> Conversion
const Services = lazy(() => import('./components/Services'))
const CostEstimator = lazy(() => import('./components/CostEstimator'))
const About = lazy(() => import('./components/About'))
const Process = lazy(() => import('./components/Process'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const ServiceAreas = lazy(() => import('./components/ServiceAreas'))
const FAQ = lazy(() => import('./components/FAQ'))
const Contact = lazy(() => import('./components/Contact'))
const Chatbot = lazy(() => import('./components/Chatbot'))
const Footer = lazy(() => import('./components/Footer'))

// Configure endpoints from siteConfig
if (config.trackingEndpoint) setTrackingEndpoint(config.trackingEndpoint)
if (config.leadEndpoint) window.__LEAD_ENDPOINT__ = config.leadEndpoint
window.__SITE_SLUG__ = config.slug || window.location.hostname.replace('.vercel.app', '').replace('.netlify.app', '')

// Tracking context for child components
const TrackingContext = createContext(null)
export function useTrackingContext() {
  return useContext(TrackingContext)
}

const businessName = (config.business && typeof config.business.name === 'string')
  ? config.business.name
  : ''

export default function App() {
  useReveal()
  const { trackEmail, trackQuiz, trackCalculator, trackChat, sessionId } = useTracking(businessName)

  return (
    <TrackingContext.Provider value={{ trackEmail, trackQuiz, trackCalculator, trackChat, sessionId }}>
      <DynamicFavicon />
      <Navbar />

      {/* PHASE 1: ATTENTION CAPTURE */}
      <div data-track="hero"><Hero /></div>
      <div data-track="trust-bar"><TrustBar /></div>

      <div data-track="stats"><Stats /></div>

      <Suspense fallback={null}>
        <div data-track="services"><Services /></div>
        <div data-track="cost-estimator"><CostEstimator /></div>
        <div data-track="about"><About /></div>
        <div data-track="process"><Process /></div>
        <div data-track="testimonials"><Testimonials /></div>
        <div data-track="service-areas"><ServiceAreas /></div>
        <div data-track="faq"><FAQ /></div>
        <div data-track="contact"><Contact /></div>
        <Chatbot />
        <div data-track="footer"><Footer /></div>
      </Suspense>
    </TrackingContext.Provider>
  )
}
