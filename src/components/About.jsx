import config from '../siteConfig'
import { Shield, Users, Award } from 'lucide-react'

function isValidPhotoUrl(url) {
  if (!url) return false
  // Default stock photo from template
  if (url.includes('photo-1560250097-0b93528c311a')) return false
  if (url.includes('source.unsplash.com')) return false
  if (url.includes('placeholder')) return false
  return true
}

export default function About() {
  const { business, credentials } = config

  // Guard: credentials may be undefined in GPT-generated config
  const creds = credentials || {}

  // Use ownerName, fallback to business name if garbled/missing
  const displayName = (business?.ownerName && business.ownerName.length > 1 && business.ownerName !== 'Owner' && business.ownerName !== 'Unknown')
    ? business.ownerName
    : (business?.name || '')

  const displayFirstName = (business?.ownerFirstName && business.ownerFirstName.length > 1 && business.ownerFirstName !== 'Owner')
    ? business.ownerFirstName
    : displayName.split(' ')[0]

  const hasRealPhoto = isValidPhotoUrl(business?.photoUrl)

  // Get initials for fallback avatar
  const initials = displayName.split(/\s+/).map(w => w[0]).join('').substring(0, 2).toUpperCase()

  return (
    <section id="about" style={{ background: '#EFF2F5', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16 reveal">
          <p
            className="text-[var(--color-blue)] text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Meet the Owner
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-light-text)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {displayName}
          </h2>
          <div className="w-16 h-0.5 bg-[var(--color-blue)] mx-auto" />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Photo column */}
          <div className="reveal-left w-full lg:w-5/12 flex justify-center lg:justify-start shrink-0">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl card-elevated" style={{ boxShadow: '0 0 30px var(--color-blue-glow)' }}>
                {hasRealPhoto ? (
                  <img
                    src={business.photoUrl}
                    alt={displayName}
                    className="w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-96 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-96 flex flex-col items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)',
                    }}
                  >
                    {business?.logoUrl ? (
                      <div className="flex items-center justify-center w-40 h-40">
                        <img
                          src={business.logoUrl}
                          alt={business?.name}
                          className="max-w-full max-h-full object-contain"
                          style={{ imageRendering: 'auto' }}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <span
                        style={{
                          fontFamily: "'Dancing Script', cursive",
                          fontWeight: 700,
                          fontSize: '72px',
                          color: 'rgba(255,255,255,0.9)',
                          textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                        }}
                      >
                        {initials}
                      </span>
                    )}
                    <p
                      style={{
                        marginTop: '16px',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '14px',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {business?.name}
                    </p>
                  </div>
                )}
                {/* Licensed badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-lg bg-[var(--color-deep)]/90 backdrop-blur-sm px-4 py-2.5 border border-[var(--color-blue)]/20">
                  <Shield className="h-5 w-5 text-[var(--color-blue)] shrink-0" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-[var(--color-cream)]">
                    Licensed &amp; Insured
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="reveal-right w-full lg:w-7/12">
            {/* Story */}
            <p className="text-[var(--color-light-muted)] leading-relaxed text-base lg:text-lg mb-6">
              {business?.story}
            </p>

            {/* Owner quote */}
            <blockquote className="border-l-2 border-[var(--color-blue)] pl-5 mb-8">
              <p className="italic text-[var(--color-light-muted)] text-base leading-relaxed">
                &ldquo;Every homeowner deserves a plumber they can trust. Someone who shows up when they say they will, charges what they quoted, and stands behind their work. That is what we do, every single day.&rdquo;
              </p>
              <cite
                className="not-italic text-[var(--color-blue)] text-sm mt-2 block font-medium"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {displayFirstName}, Founder
              </cite>
            </blockquote>

            {/* Credential stats */}
            <div className="grid grid-cols-3" style={{ gap: '12px' }}>
              {[
                { icon: Award, value: `${creds.googleRating ?? '5.0'}★`, label: 'Google Rating' },
                { icon: Shield, value: `${creds.yearsExperience ?? '10'}+`, label: 'Years Experience' },
                { icon: Users, value: `${creds.jobsCompleted ?? '1000'}+`, label: 'Jobs Completed' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px 12px',
                    textAlign: 'center',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <stat.icon style={{ width: '20px', height: '20px', color: '#0EA5E9', margin: '0 auto 8px' }} strokeWidth={1.5} />
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, color: '#1F2937', marginBottom: '2px' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '10px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
