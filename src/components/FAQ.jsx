import { useState } from 'react'
import config from '../siteConfig'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const faq = Array.isArray(config.faq) ? config.faq : []

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (faq.length === 0) return null

  return (
    <section
      id="faq"
      style={{
        background: '#EFF2F5',
        padding: '80px 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
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
            Common Questions
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: '#1F2937',
              letterSpacing: '-0.02em',
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faq.map((item, i) => {
            const isOpen = openIndex === i
            const question = typeof item.question === 'string' ? item.question : (item.question ? String(item.question) : '')
            const answer = typeof item.answer === 'string' ? item.answer : (item.answer ? String(item.answer) : '')

            if (!question) return null

            return (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: isOpen ? '1px solid #0EA5E9' : '1px solid #E5E7EB',
                  borderLeft: isOpen ? '3px solid #0EA5E9' : '1px solid #E5E7EB',
                  transition: 'all 0.25s ease',
                  boxShadow: isOpen ? '0 4px 16px rgba(14,165,233,0.1)' : 'none',
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '20px 24px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: isOpen ? '#0EA5E9' : '#1F2937',
                      transition: 'color 0.2s',
                    }}
                  >
                    {question}
                  </span>
                  <ChevronDown
                    style={{
                      width: '20px',
                      height: '20px',
                      flexShrink: 0,
                      color: '#0EA5E9',
                      transition: 'transform 0.3s',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {/* Answer with smooth height animation */}
                <div
                  id={`faq-answer-${i}`}
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.3s ease-in-out',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '0 24px 20px' }}>
                      <p
                        style={{
                          color: '#6B7280',
                          fontSize: '14px',
                          lineHeight: 1.7,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
