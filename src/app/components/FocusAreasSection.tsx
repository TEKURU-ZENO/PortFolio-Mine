import { useState } from 'react';
import { motion } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const AREAS = [
  {
    icon: '🧠',
    title: 'Agentic AI Systems',
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.22)',
    items: ['LangGraph', 'Memory Systems', 'Planning', 'Reflection', 'Critique Loops', 'Tool Use'],
    desc: 'Building multi-agent architectures capable of planning, reasoning, memory retention, adversarial critique, and autonomous execution.',
  },
  {
    icon: '☁️',
    title: 'Distributed AI Infrastructure',
    color: '#22D3EE',
    glow: 'rgba(34,211,238,0.18)',
    items: ['Kafka', 'Redis', 'Kubernetes', 'Docker', 'Microservices', 'FastAPI'],
    desc: 'Designing cloud-native architectures for reliable, auditable and scalable AI deployment using modern distributed systems.',
  },
  {
    icon: '🧬',
    title: 'Biomedical AI',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.2)',
    items: ['BioGPT', 'BioBERT', 'GNNs', 'Clinical NLP', 'Drug Discovery', 'Healthcare AI'],
    desc: 'Applying large language models, graph learning, and explainable AI to healthcare and drug discovery.',
  },
  {
    icon: '🔬',
    title: 'Computational Biology',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.18)',
    items: ['Single Cell AI', 'Digital Twins', 'Causal ML', 'Multi-Omics', 'PyTorch Geometric'],
    desc: 'Creating simulation-driven frameworks for biological understanding through causal modeling, graph learning, and digital twin architectures.',
  },
];

export function FocusAreasSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="focus" style={{ background: '#050816', padding: '120px 48px', borderTop: '1px solid rgba(124,58,237,0.07)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#7C3AED' }}>FOCUS AREAS</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px,5vw,54px)', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.08 }}>
            What I Build
          </h2>
        </motion.div>

        {/* 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                background: '#0B1020',
                border: `1px solid ${active === i ? `${area.color}38` : 'rgba(124,58,237,0.09)'}`,
                borderRadius: '16px',
                padding: '40px',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                boxShadow: active === i ? `0 0 48px ${area.glow}` : 'none',
                transform: active === i ? 'translateY(-4px)' : 'none',
              }}
            >
              {/* Top glow on hover */}
              {active === i && (
                <div style={{
                  position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                  background: `linear-gradient(to right, transparent, ${area.color}80, transparent)`,
                }} />
              )}

              {/* Icon */}
              <div style={{
                width: '52px', height: '52px', borderRadius: '12px',
                background: `${area.color}12`, border: `1px solid ${area.color}28`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', marginBottom: '24px',
                boxShadow: active === i ? `0 0 24px ${area.glow}` : 'none',
                transition: 'box-shadow 0.3s',
              }}>
                {area.icon}
              </div>

              <div style={{ fontFamily: FONT, fontSize: '20px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                {area.title}
              </div>

              {/* Skill pills */}
              <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {area.items.map(item => (
                  <span key={item} style={{
                    fontFamily: MONO, fontSize: '9px',
                    color: area.color,
                    background: `${area.color}0E`, border: `1px solid ${area.color}22`,
                    borderRadius: '4px', padding: '4px 10px', letterSpacing: '0.07em',
                  }}>
                    {item}
                  </span>
                ))}
              </div>

              <p style={{ fontFamily: FONT, fontSize: '14px', color: '#475569', lineHeight: 1.72, margin: 0 }}>
                {area.desc}
              </p>

              {/* Bottom accent on hover */}
              <div style={{
                position: 'absolute', bottom: 0, left: '16px', right: '16px', height: '2px',
                background: `linear-gradient(to right, transparent, ${area.color}, transparent)`,
                opacity: active === i ? 1 : 0,
                transition: 'opacity 0.3s',
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
