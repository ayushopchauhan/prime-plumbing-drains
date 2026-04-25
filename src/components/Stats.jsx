import config from '../siteConfig'
import { useCountUp } from '../hooks/useCountUp'

function safeNum(val, fallback = 0) {
  const n = Number(val)
  return isFinite(n) && n > 0 ? n : fallback
}

function getDisplayStats() {
  const stats = Array.isArray(config.stats) ? config.stats : []
  const credentials = config.credentials && typeof config.credentials === 'object' ? config.credentials : {}
  const result = [...stats]

  if (result.length < 4) {
    const existing = new Set(result.map(s => (s.label || '').toLowerCase()))
    const fallbacks = [
      { number: credentials.yearsExperience, suffix: '+', label: 'Years Experience' },
      { number: credentials.jobsCompleted, suffix: '+', label: 'Jobs Completed' },
      { number: credentials.satisfactionRate, suffix: '%', label: 'Satisfaction Rate' },
      { number: parseInt(credentials.responseTime) || 0, suffix: 'min', label: 'Avg Response Time' },
      { number: credentials.reviewCount, suffix: '+', label: 'Happy Customers' },
    ]
    for (const fb of fallbacks) {
      if (result.length >= 4) break
      if (!fb.number || fb.number === 0) continue
      const key = fb.label.toLowerCase()
      if (existing.has(key)) continue
      existing.add(key)
      result.push(fb)
    }
  }

  return result
    .filter(s => s && typeof s === 'object' && safeNum(s.number) > 0)
    .map(s => ({
      number: safeNum(s.number),
      suffix: typeof s.suffix === 'string' ? s.suffix : (s.suffix != null ? String(s.suffix) : ''),
      label: typeof s.label === 'string' ? s.label : (s.label != null ? String(s.label) : ''),
    }))
    .slice(0, 4)
}

function StatItem({ number, suffix, label }) {
  const { count, ref } = useCountUp(number, 2000)

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '24px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {count.toLocaleString()}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontWeight: 700,
            color: '#38BDF8',
          }}
        >
          {suffix}
        </span>
      </div>
      <span
        style={{
          display: 'block',
          marginTop: '8px',
          color: 'rgba(201,209,217,0.7)',
          fontSize: '13px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Stats() {
  const displayStats = getDisplayStats()

  if (displayStats.length < 2) return null

  return (
    <section
      style={{
        background: '#0D1117',
        padding: '40px 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(displayStats.length, 4)}`}>
          {displayStats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                borderBottom: i < displayStats.length - 2 ? '1px solid rgba(14,165,233,0.1)' : 'none',
              }}
            >
              <StatItem
                number={stat.number}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
