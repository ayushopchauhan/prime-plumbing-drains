import config from '../siteConfig'
import { Phone, ArrowRight } from 'lucide-react'

function safeStr(val, fallback = '') {
  if (val == null) return fallback
  if (typeof val === 'string') return val
  if (typeof val === 'number') return String(val)
  return fallback
}

export default function Hero() {
  const hero = config.hero && typeof config.hero === 'object' ? config.hero : {}
  const contact = config.contact && typeof config.contact === 'object' ? config.contact : {}
  const business = config.business && typeof config.business === 'object' ? config.business : {}
  const credentials = config.credentials && typeof config.credentials === 'object' ? config.credentials : {}

  const headline = safeStr(hero.headline, 'Professional Plumbing Services')
  const subheadline = safeStr(hero.subheadline)
  const ctaText = safeStr(hero.ctaText, 'Get a Free Quote')
  const emergencyCtaText = safeStr(hero.emergencyCtaText, 'Emergency? Call Now')
  const backgroundImage = safeStr(hero.backgroundImage)
  const emergencyPhone = safeStr(contact.emergencyPhone || contact.phone)
  const phoneDisplay = safeStr(contact.emergencyPhoneDisplay || contact.phoneDisplay || contact.phone)

  // Split headline at the period for two-tone styling
  const parts = headline.split('.')
  const firstPart = parts[0]
  const secondPart = parts.slice(1).join('.').trim()

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,17,23,0.88) 0%, rgba(13,17,23,0.65) 50%, rgba(13,17,23,0.92) 100%)',
          }}
        />
      </div>

      {/* Subtle accent glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(100px, 15vh, 140px) 24px clamp(80px, 12vh, 120px)',
        }}
      >
        {/* Badge */}
        <div className="reveal" style={{ marginBottom: '24px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '100px',
              background: 'rgba(14,165,233,0.12)',
              border: '1px solid rgba(14,165,233,0.25)',
              color: '#38BDF8',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#0EA5E9',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            Available 24/7
          </span>
        </div>

        {/* Headline */}
        <h1
          className="reveal"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            marginBottom: '24px',
            maxWidth: '800px',
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ color: '#FFFFFF' }}>{firstPart}.</span>
          {secondPart && (
            <>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {secondPart}
              </span>
            </>
          )}
        </h1>

        {/* Subheadline */}
        {subheadline && (
          <p
            className="reveal"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(201,209,217,0.85)',
              maxWidth: '560px',
              lineHeight: 1.6,
              marginBottom: '40px',
            }}
          >
            {subheadline}
          </p>
        )}

        {/* CTAs */}
        <div
          className="reveal flex flex-col sm:flex-row"
          style={{
            gap: '12px',
            alignItems: 'stretch',
          }}
        >
          {/* Primary CTA */}
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '16px 32px',
              borderRadius: '12px',
              background: '#0EA5E9',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 4px 20px rgba(14,165,233,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#0284C7'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#0EA5E9'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {ctaText}
            <ArrowRight style={{ width: '18px', height: '18px' }} />
          </a>

          {/* Emergency CTA */}
          {emergencyPhone && (
            <a
              href={`tel:${emergencyPhone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px 28px',
                borderRadius: '12px',
                background: 'rgba(249,115,22,0.12)',
                border: '1.5px solid rgba(249,115,22,0.4)',
                color: '#FB923C',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(249,115,22,0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(249,115,22,0.12)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Phone style={{ width: '18px', height: '18px' }} />
              {emergencyCtaText}
            </a>
          )}
        </div>

        {/* Social proof strip */}
        <div
          className="reveal"
          style={{
            marginTop: '40px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px 28px',
            alignItems: 'center',
          }}
        >
          {credentials.googleRating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span style={{ color: '#E6EDF3', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>
                {credentials.googleRating}
              </span>
              <span style={{ color: 'rgba(201,209,217,0.5)', fontSize: '13px' }}>
                ({credentials.reviewCount}+ reviews)
              </span>
            </div>
          )}
          {credentials.yearsExperience && (
            <span style={{ color: 'rgba(201,209,217,0.6)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
              {credentials.yearsExperience}+ years in business
            </span>
          )}
          {credentials.jobsCompleted && (
            <span style={{ color: 'rgba(201,209,217,0.6)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
              {credentials.jobsCompleted.toLocaleString()}+ jobs completed
            </span>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, #FFFFFF 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
