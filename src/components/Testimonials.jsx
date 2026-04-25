import config from '../siteConfig'
import { Star, Quote } from 'lucide-react'

const avatarColors = [
  '#0ea5e9', '#f97316', '#10b981', '#8b5cf6', '#ec4899',
  '#06b6d4', '#f59e0b', '#14b8a6', '#a855f7', '#ef4444',
]

function safeStr(val, fallback = '') {
  if (val == null) return fallback
  if (typeof val === 'string') return val
  if (typeof val === 'number') return String(val)
  return fallback
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
}

function isValidImageUrl(url) {
  if (!url || typeof url !== 'string') return false
  if (url.includes('source.unsplash.com')) return false
  if (url.includes('placeholder')) return false
  if (url.includes('example.com')) return false
  return true
}

export default function Testimonials() {
  const credentials = config.credentials && typeof config.credentials === 'object' ? config.credentials : {}
  const rawTestimonials = Array.isArray(config.testimonials) ? config.testimonials : []

  const seen = new Set()
  const filtered = rawTestimonials.filter(t => {
    if (!t || typeof t !== 'object') return false
    const rating = typeof t.rating === 'number' ? t.rating : 5
    if (rating < 4) return false
    const name = safeStr(t.name, '')
    if (seen.has(name)) return false
    seen.add(name)
    return true
  })

  if (filtered.length === 0) return null

  return (
    <section
      id="reviews"
      style={{
        background: '#0D1117',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle accent glow */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
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
            Reviews
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#E6EDF3',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}
          >
            What Our Customers Say
          </h2>

          {/* Google Rating Badge */}
          <div
            className="reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              borderRadius: '100px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(14,165,233,0.15)',
            }}
          >
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} style={{ width: '14px', height: '14px', fill: '#F59E0B', color: '#F59E0B' }} />
              ))}
            </div>
            <span style={{ color: '#E6EDF3', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
              {credentials.googleRating || ''}
            </span>
            <span style={{ color: 'rgba(201,209,217,0.5)', fontSize: '13px' }}>
              {credentials.reviewCount ? `from ${credentials.reviewCount} reviews` : ''}
            </span>
          </div>
        </div>

        {/* Testimonial grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '16px' }}
        >
          {filtered.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }) {
  const quote = safeStr(testimonial.quote)
  const name = safeStr(testimonial.name, 'Customer')
  const detail = safeStr(testimonial.detail, 'Customer')
  const rating = typeof testimonial.rating === 'number' ? testimonial.rating : 5
  const image = testimonial.image
  const validImage = isValidImageUrl(image)
  const initials = getInitials(name)
  const bgColor = avatarColors[index % avatarColors.length]
  const starCount = Math.min(Math.max(Math.round(rating), 1), 5)

  return (
    <div
      className="reveal"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '28px',
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
        {[...Array(starCount)].map((_, i) => (
          <Star key={i} style={{ width: '16px', height: '16px', fill: '#F59E0B', color: '#F59E0B' }} />
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          color: 'rgba(230,237,243,0.8)',
          fontSize: '15px',
          lineHeight: 1.7,
          marginBottom: '24px',
          fontFamily: 'var(--font-body)',
        }}
      >
        "{quote}"
      </p>

      {/* Customer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
        {validImage ? (
          <img
            src={image}
            alt={name}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '14px',
              fontFamily: 'var(--font-heading)',
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
        )}
        <div>
          <p style={{ color: '#E6EDF3', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-heading)' }}>
            {name}
          </p>
          <p style={{ color: '#0EA5E9', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
            {detail}
          </p>
        </div>
      </div>
    </div>
  )
}
