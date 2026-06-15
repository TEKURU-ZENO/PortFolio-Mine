import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const MILESTONES = [
  { year: '2023', title: 'Full Stack Engineering',     color: '#7C3AED', active: false, future: false,
    desc: 'Built production web applications and data pipelines. Mastered React, TypeScript, Node.js, and cloud infrastructure. First exposure to LLM APIs.',
    tags: ['React', 'TypeScript', 'AWS', 'PostgreSQL'] },
  { year: '2024', title: 'Machine Learning & AI',      color: '#8B5CF6', active: false, future: false,
    desc: 'Transitioned into ML engineering. Trained custom models for NLP and computer vision. First agentic system built — automated literature review pipeline.',
    tags: ['PyTorch', 'Transformers', 'RAG', 'LangChain'] },
  { year: '2025', title: 'Healthcare AI',               color: '#10B981', active: false, future: false,
    desc: 'Applied AI to oncology research. Developed PERSEPHONE — a digital twin system for personalised cancer treatment simulation. Published first research paper.',
    tags: ['Digital Twins', 'Genomics', 'Clinical AI', 'Drug Discovery'] },
  { year: '2026', title: 'Agentic Systems Architecture',color: '#7C3AED', active: true,  future: false,
    desc: 'Designing and deploying full autonomous agent ecosystems. Building ASTRAEA and NYX — systems that conduct science without human intervention.',
    tags: ['Multi-Agent', 'Autonomous AI', 'Orchestration', 'LLM Systems'] },
  { year: '2027', title: 'Scientific Intelligence',      color: '#22D3EE', active: false, future: true,
    desc: 'The frontier — AI systems that not only assist science but advance it. Autonomous discovery at the intersection of biology, chemistry, and computation.',
    tags: ['Scientific AI', 'Drug Discovery', 'Autonomous Labs', 'Foundation Models'] },
];

function Item({ m, index }: { m: typeof MILESTONES[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const dim    = m.future ? '#1E293B' : m.active ? m.color : '#334155';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{ display: 'flex', gap: '40px' }}
    >
      {/* Year */}
      <div style={{ width: '72px', flexShrink: 0, paddingTop: '4px', textAlign: 'right' }}>
        <span style={{ fontFamily: MONO, fontSize: '13px', fontWeight: 600, color: m.future ? '#1E293B' : m.active ? m.color : '#334155', letterSpacing: '0.05em' }}>
          {m.year}
        </span>
      </div>

      {/* Spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <motion.div
          animate={m.active ? { boxShadow: [`0 0 10px ${m.color}`, `0 0 24px ${m.color}`, `0 0 10px ${m.color}`] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: m.active ? '14px' : '10px', height: m.active ? '14px' : '10px',
            borderRadius: '50%', marginTop: '5px',
            background: m.future ? 'transparent' : m.color,
            border: m.future ? `2px dashed #1E293B` : `2px solid ${m.color}`,
            zIndex: 2, flexShrink: 0,
          }}
        />
        {index < MILESTONES.length - 1 && (
          <div style={{
            width: '1px', flex: 1, minHeight: '72px', marginTop: '8px',
            background: `linear-gradient(to bottom, ${m.color}35, ${MILESTONES[index + 1].color}18)`,
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: '56px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: FONT, fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: m.future ? '#1E293B' : '#FFFFFF' }}>
            {m.title}
          </h3>
          {m.active && (
            <span style={{ fontFamily: MONO, fontSize: '9px', color: '#7C3AED', background: 'rgba(124,58,237,0.14)', border: '1px solid rgba(124,58,237,0.28)', borderRadius: '4px', padding: '3px 10px', letterSpacing: '0.15em' }}>
              NOW
            </span>
          )}
          {m.future && (
            <span style={{ fontFamily: MONO, fontSize: '9px', color: '#1E293B', border: '1px dashed #1E293B', borderRadius: '4px', padding: '3px 10px', letterSpacing: '0.15em' }}>
              HORIZON
            </span>
          )}
        </div>
        <p style={{ fontFamily: FONT, fontSize: '15px', color: m.future ? '#1E293B' : '#475569', lineHeight: 1.72, marginBottom: '16px', maxWidth: '520px' }}>
          {m.desc}
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {m.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: MONO, fontSize: '10px',
              color: m.future ? '#1E293B' : m.color,
              background: m.future ? 'transparent' : `${m.color}10`,
              border: `1px solid ${m.future ? '#0F172A' : `${m.color}28`}`,
              borderRadius: '4px', padding: '4px 10px', letterSpacing: '0.06em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TimelineSection() {
  return (
    <section style={{ background: '#040816', padding: '120px 40px', borderTop: '1px solid rgba(124,58,237,0.07)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          style={{ marginBottom: '80px' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#7C3AED' }}>TRAJECTORY</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px,5vw,56px)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.1 }}>
            The Arc of Progress
          </h2>
        </motion.div>

        {MILESTONES.map((m, i) => <Item key={m.year} m={m} index={i} />)}
      </div>
    </section>
  );
}
