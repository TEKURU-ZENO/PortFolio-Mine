import { motion } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const LINKS = [
  { label: 'Email',    sub: 'devmehta060505@gmail.com',                                    href: 'mailto:devmehta060505@gmail.com',                          icon: '✉', color: '#7C3AED' },
  { label: 'LinkedIn', sub: 'linkedin.com/in/dev-mehta',                                 href: 'https://www.linkedin.com/in/dev-mehta-1861bb2a0',           icon: '↗', color: '#8B5CF6' },
  { label: 'GitHub',   sub: 'github.com/TEKURU-ZENO',                                    href: 'https://github.com/TEKURU-ZENO',                            icon: '⌥', color: '#A78BFA' },
  { label: 'Resume',   sub: 'Download PDF',                                               href: '/resume.pdf',                                               icon: '↓', color: '#22D3EE' },
];

export function ContactSection() {
  return (
    <section id="contact" style={{ background: '#050816', padding: '120px 48px 80px', borderTop: '1px solid rgba(124,58,237,0.07)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75 }}
          style={{ marginBottom: '72px', textAlign: 'center' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#7C3AED' }}>CONTACT</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(36px,6vw,72px)', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.04em', marginTop: '20px', lineHeight: 1.04 }}>
            Let's Build Something<br />
            <span style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Meaningful.
            </span>
          </h2>
          <p style={{ fontFamily: FONT, fontSize: '18px', color: '#475569', lineHeight: 1.7, maxWidth: '520px', margin: '24px auto 0' }}>
            I'm open to research collaborations, engineering roles, and ambitious projects at the intersection of AI and real-world impact.
          </p>
        </motion.div>

        {/* Link cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px', marginBottom: '64px' }}>
          {LINKS.map((lk, i) => (
            <motion.a
              key={lk.label}
              href={lk.href}
              target={lk.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 } as any}
              style={{
                display: 'flex', alignItems: 'center', gap: '20px',
                background: '#0B1020',
                border: '1px solid rgba(124,58,237,0.1)',
                borderRadius: '14px', padding: '28px 28px',
                textDecoration: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${lk.color}40`;
                e.currentTarget.style.boxShadow = `0 0 32px ${lk.color}18`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                background: `${lk.color}12`, border: `1px solid ${lk.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', color: lk.color,
              }}>
                {lk.icon}
              </div>
              <div>
                <div style={{ fontFamily: FONT, fontSize: '16px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.01em' }}>{lk.label}</div>
                <div style={{ fontFamily: MONO, fontSize: '11px', color: '#334155', letterSpacing: '0.05em', marginTop: '4px' }}>{lk.sub}</div>
              </div>
              <div style={{ marginLeft: 'auto', color: '#1E293B', fontSize: '18px', transition: 'color 0.2s' }}>→</div>
            </motion.a>
          ))}
        </div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '100px', padding: '10px 24px',
          }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }}
            />
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#10B981', letterSpacing: '0.16em' }}>
              OPEN TO OPPORTUNITIES · JUNE 2026
            </span>
          </div>
        </motion.div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(124,58,237,0.07)', paddingTop: '36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#0F172A', letterSpacing: '0.1em' }}>
            DEV MEHTA · AI SYSTEMS ENGINEER & RESEARCH BUILDER
          </span>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#0F172A', letterSpacing: '0.1em' }}>© 2026</span>
        </div>
      </div>
    </section>
  );
}
