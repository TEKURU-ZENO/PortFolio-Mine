import { motion } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

export function HeroSection() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(150deg, #050816 0%, #0B1020 55%, #050816 100%)',
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline {
          0% { top: 0px; }
          100% { top: 420px; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.022, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
      }} />

      {/* Glow blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '8%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '120px 48px 80px', width: '100%', display: 'grid', gridTemplateColumns: '6fr 4fr', gap: '60px', alignItems: 'center' }}>

        {/* ── LEFT (60%) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
            <div style={{ width: '28px', height: '1px', background: '#7C3AED' }} />
            <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', color: '#7C3AED' }}>
              AI SYSTEMS ENGINEER
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: FONT,
            fontSize: 'clamp(52px, 7vw, 104px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#F8FAFC',
            margin: '0 0 22px',
          }}>
            Dev<br />Mehta
          </h1>

          {/* Subtitle */}
          <div style={{
            fontFamily: FONT, fontSize: 'clamp(15px, 2vw, 20px)', fontWeight: 500,
            color: '#8B5CF6', marginBottom: '28px', lineHeight: 1.3,
          }}>
            Building Autonomous Systems for Science &amp; Society
          </div>

          {/* Description */}
          <p style={{
            fontFamily: FONT, fontSize: '17px', fontWeight: 400,
            color: '#64748B', lineHeight: 1.8, maxWidth: '540px', marginBottom: '48px',
          }}>
            I build intelligent systems that reason, plan, learn, and operate at scale.
            <br /><br />
            My work spans agentic AI, distributed systems, biomedical machine learning, and computational biology, with a focus on transforming research into deployable real-world technology.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.025, boxShadow: '0 0 28px rgba(124,58,237,0.38)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#projects')}
              style={{
                fontFamily: FONT, fontSize: '14px', fontWeight: 600, color: '#ffffff',
                background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                border: '1px solid rgba(139,92,246,0.5)',
                borderRadius: '8px', padding: '14px 26px', cursor: 'pointer',
              }}
            >
              Explore Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.025, borderColor: 'rgba(124,58,237,0.5)', color: '#CBD5E1' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#research')}
              style={{
                fontFamily: FONT, fontSize: '14px', fontWeight: 600, color: '#94A3B8',
                background: 'transparent', border: '1px solid rgba(100,116,139,0.22)',
                borderRadius: '8px', padding: '14px 26px', cursor: 'pointer',
              }}
            >
              Research
            </motion.button>
            <a href="/resume.pdf" download="Dev_Mehta_Resume.pdf" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.025, borderColor: 'rgba(100,116,139,0.5)', color: '#CBD5E1' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontFamily: FONT, fontSize: '14px', fontWeight: 600, color: '#94A3B8',
                  background: 'transparent', border: '1px solid rgba(100,116,139,0.22)',
                  borderRadius: '8px', padding: '14px 26px', cursor: 'pointer',
                  width: '100%',
                }}
              >
                Resume
              </motion.button>
            </a>
          </div>

          {/* Quick stat strip */}
          <div style={{ display: 'flex', gap: '40px', marginTop: '56px', paddingTop: '36px', borderTop: '1px solid rgba(124,58,237,0.1)', flexWrap: 'wrap' }}>
            {[
              { val: '15+', label: 'Projects' },
              { val: '3',  label: 'Publications' },
              { val: '8+', label: 'Hackathons' },
              { val: 'Rank #1', label: 'Academic' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: FONT, fontSize: '26px', fontWeight: 800, letterSpacing: '-0.03em', color: '#A78BFA' }}>{s.val}</div>
                <div style={{ fontFamily: MONO, fontSize: '10px', color: '#475569', letterSpacing: '0.14em', marginTop: '4px' }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT (40%) ── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}
        >
          {/* Outer glow */}
          <div style={{
            position: 'absolute', inset: '-20px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* 1. PHOTO CARD */}
          <div style={{
            position: 'relative',
            height: '420px',
            borderRadius: '32px',
            background: 'linear-gradient(180deg, rgba(139,92,246,0.15), rgba(6,182,212,0.08))',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(139,92,246,0.22)',
            boxShadow: '0 0 60px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.04)',
            overflow: 'hidden',
          }}>
            {/* Moving scanline */}
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.3), transparent)',
              boxShadow: '0 0 10px rgba(139,92,246,0.6)',
              animation: 'scanline 6s linear infinite',
              pointerEvents: 'none',
              zIndex: 3,
            }} />

            {/* Photo background image (will load once user uploads file) */}
            <img 
              src="/src/dev_mehta_profile.png" 
              alt="Dev Mehta"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.05) brightness(0.95)',
                zIndex: 1,
              }}
            />

            {/* Cybernetic abstract visual background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(145deg, #0f0a25 0%, #0d1a30 40%, #081a14 100%)',
              opacity: 0.9,
              zIndex: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Grid system */}
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.08,
                backgroundImage: `linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }} />
              
              {/* Holographic orbital design */}
              <div style={{
                width: '180px', height: '180px', borderRadius: '50%',
                border: '1px dashed rgba(124,58,237,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'spin 40s linear infinite',
              }}>
                <div style={{
                  width: '140px', height: '140px', borderRadius: '50%',
                  border: '1px solid rgba(34,211,238,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(34,211,238,0.4)', letterSpacing: '0.15em' }}>SYS:ONLINE</span>
                </div>
              </div>
            </div>

            {/* Vision Pro style profile information overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(5,8,22,0.96) 0%, rgba(5,8,22,0.75) 70%, transparent 100%)',
              backdropFilter: 'blur(8px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '24px',
              zIndex: 2,
            }}>
              <h3 style={{ fontFamily: FONT, fontSize: '22px', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em', margin: 0 }}>
                Dev Mehta
              </h3>
              <div style={{ fontFamily: MONO, fontSize: '10px', color: '#A78BFA', letterSpacing: '0.12em', marginTop: '4px', textTransform: 'uppercase' }}>
                AI Systems Engineer
              </div>
              
              <div style={{
                display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px',
                fontFamily: MONO, fontSize: '9px', color: '#64748B', letterSpacing: '0.04em'
              }}>
                <span>Chennai, India</span>
                <span style={{ color: '#1E293B' }}>•</span>
                <span>SRM IST</span>
                <span style={{ color: '#1E293B' }}>•</span>
                <span style={{ color: '#10B981' }}>CGPA 9.21</span>
              </div>
            </div>
          </div>

          {/* 2. CURRENT FOCUS CARD */}
          <div style={{
            position: 'relative',
            background: 'rgba(11,16,32,0.7)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(124,58,237,0.22)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
            padding: '28px 24px',
          }}>
            {/* Header */}
            <div style={{ fontFamily: MONO, fontSize: '10px', color: '#7C3AED', letterSpacing: '0.18em', fontWeight: 600, marginBottom: '20px' }}>
              CURRENT FOCUS
            </div>

            {/* Items list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                'Agentic AI Systems',
                'Biomedical AI',
                'Computational Biology',
                'Distributed Systems',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#8B5CF6', fontFamily: MONO, fontSize: '12px' }}>→</span>
                  <span style={{ fontFamily: FONT, fontSize: '15px', color: '#CBD5E1', fontWeight: 500 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer / Status */}
            <div style={{
              borderTop: '1px solid rgba(124,58,237,0.15)',
              paddingTop: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <div style={{ fontFamily: MONO, fontSize: '9px', color: '#475569', letterSpacing: '0.12em', fontWeight: 600 }}>
                STATUS
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px', flexShrink: 0 }}>
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }}
                  />
                </div>
                <div style={{ fontFamily: FONT, fontSize: '13px', color: '#CBD5E1', lineHeight: '1.5', fontWeight: 500 }}>
                  Available for Research Collaborations &amp; AI Engineering Roles
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.5), transparent)' }} />
        <span style={{ fontFamily: MONO, fontSize: '9px', color: '#1E293B', letterSpacing: '0.22em' }}>SCROLL</span>
      </motion.div>
    </section>
  );
}
