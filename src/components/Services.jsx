import config from '../siteConfig'
import {
  Siren, Waves, Flame, Wrench, Droplets, Construction,
  ShowerHead, Bath, Thermometer, ThermometerSun, Gauge, Hammer,
  PipetteIcon, Fan, Heater, Home, Shield, CheckCircle, Settings,
  Zap, AlertTriangle, Clock, Phone, Star, Award, Pipette,
  CloudRain, Snowflake, Sun, Wind, Lightbulb, Power, Plug,
  Trash2, Search, WrenchIcon, Cog, Filter, Lock, Key, ArrowRight
} from 'lucide-react'

const iconMap = {
  Siren, Waves, Flame, Wrench, Droplets, Construction,
  ShowerHead, Bath, Thermometer, ThermometerSun, Gauge, Hammer,
  PipetteIcon, Fan, Heater, Home, Shield, CheckCircle, Settings,
  Zap, AlertTriangle, Clock, Phone, Star, Award, Pipette,
  CloudRain, Snowflake, Sun, Wind, Lightbulb, Power, Plug,
  Trash2, Search, WrenchIcon, Cog, Filter, Lock, Key,
  Pipe: Droplets, Toilet: Droplets, Faucet: Droplets,
  Boiler: Flame, Gas: Flame, Emergency: Siren,
  Heating: ThermometerSun, Water: Waves, Drain: Waves,
  Tool: Wrench, Tools: Wrench, Plumbing: Wrench,
  Repair: Wrench, Install: Construction, Installation: Construction,
  Bathroom: Bath, Shower: ShowerHead, Electric: Zap,
  Electrical: Zap, Safety: Shield, Inspection: Search,
  Maintenance: Settings, Kitchen: Home,
}

function safeStr(val, fallback = '') {
  if (val == null) return fallback
  if (typeof val === 'string') return val
  if (typeof val === 'number') return String(val)
  return fallback
}

export default function Services() {
  const services = Array.isArray(config.services) ? config.services : []

  if (services.length === 0) return null

  return (
    <section
      id="services"
      style={{
        background: '#F6F8FA',
        padding: '80px 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span
            style={{
              display: 'inline-block',
              color: '#0EA5E9',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              fontFamily: 'var(--font-heading)',
              marginBottom: '12px',
            }}
          >
            Our Services
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#1F2937',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Expert Solutions for Every Plumbing Need
          </h2>
          <p
            style={{
              color: '#6B7280',
              fontSize: '16px',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            From quick fixes to full installations. Transparent pricing, licensed plumbers, guaranteed work.
          </p>
        </div>

        {/* Service grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '16px' }}
        >
          {services.map((service, i) => {
            if (!service || typeof service !== 'object') return null
            const iconKey = safeStr(service.icon)
            const Icon = iconMap[iconKey] || Wrench
            const name = safeStr(service.name, 'Service')
            const description = safeStr(service.description)
            const priceRange = safeStr(service.priceRange)
            const popular = Boolean(service.popular)

            return (
              <a
                key={i}
                href="#contact"
                className="reveal"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '28px',
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#0EA5E9'
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(14,165,233,0.12)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E5E7EB'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Popular badge */}
                {popular && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: '#F97316',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: '100px',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    Popular
                  </span>
                )}

                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(14,165,233,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  {Icon && <Icon style={{ width: '24px', height: '24px', color: '#0EA5E9' }} strokeWidth={1.5} />}
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#1F2937',
                    marginBottom: '8px',
                  }}
                >
                  {name}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: '#6B7280',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    marginBottom: priceRange ? '16px' : '0',
                  }}
                >
                  {description}
                </p>

                {/* Price range */}
                {priceRange && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #F3F4F6',
                      paddingTop: '16px',
                    }}
                  >
                    <span style={{ color: '#9CA3AF', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Starting from
                    </span>
                    <span
                      style={{
                        color: '#0EA5E9',
                        fontSize: '14px',
                        fontWeight: 700,
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {priceRange}
                    </span>
                  </div>
                )}
              </a>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '16px' }}>
            Not sure what you need? Describe your issue and we will recommend the right service.
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#F97316',
              color: '#FFFFFF',
              padding: '14px 28px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(249,115,22,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Get a Free Quote
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </a>
        </div>
      </div>
    </section>
  )
}
