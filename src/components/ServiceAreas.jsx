import config from '../siteConfig'
import { MapPin, Clock } from 'lucide-react'

function safeStr(val, fallback = '') {
  if (val == null) return fallback
  if (typeof val === 'string') return val
  if (typeof val === 'number') return String(val)
  return fallback
}

export default function ServiceAreas() {
  const serviceAreas = Array.isArray(config.serviceAreas) ? config.serviceAreas : []

  if (serviceAreas.length === 0) return null

  return (
    <section
      id="areas"
      style={{
        background: '#F6F8FA',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
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
            Coverage
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
            Areas We Serve
          </h2>
        </div>

        {/* Areas Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: '16px' }}
        >
          {serviceAreas.map((area, i) => {
            if (!area || typeof area !== 'object') return null
            const name = safeStr(area.name, `Area ${i + 1}`)
            const description = safeStr(area.description)
            const responseTime = safeStr(area.responseTime)

            return (
              <div
                key={i}
                className="reveal"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.25s ease',
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
                {/* Area Icon + Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(14,165,233,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin style={{ width: '20px', height: '20px', color: '#0EA5E9' }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#1F2937',
                    }}
                  >
                    {name}
                  </h3>
                </div>

                {/* Description */}
                {description && (
                  <p
                    style={{
                      color: '#6B7280',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      marginBottom: responseTime ? '16px' : '0',
                    }}
                  >
                    {description}
                  </p>
                )}

                {/* Response Time Pill */}
                {responseTime && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '100px',
                      background: '#0EA5E9',
                      color: '#FFFFFF',
                    }}
                  >
                    <Clock style={{ width: '14px', height: '14px' }} />
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {responseTime} response
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
