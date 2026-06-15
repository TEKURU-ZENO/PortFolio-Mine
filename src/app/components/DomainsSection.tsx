import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const DOMAINS = [
  {
    id: 0,
    icon: '🧠',
    title: 'Agentic Intelligence',
    subtitle: 'Multi-agent orchestration at scale',
    description: 'Autonomous pipelines where agents plan, delegate, critique, and execute — without human handholding. Systems like ASTRAEA and NYX that conduct scientific inquiry end-to-end.',
    color: '#7C3AED',
    glow: 'rgba(124,58,237,0.25)',
    tags: ['Agent Orchestration', 'LLM Pipelines', 'Tool Use', 'Self-Critique'],
  },
  {
    id: 1,
    icon: '⚡',
    title: 'Infrastructure Intelligence',
    subtitle: 'Cloud-native autonomous systems',
    description: 'Designing AI-native infrastructure that observes itself, scales predictively, and recovers from failure without paging anyone at 3am.',
    color: '#22D3EE',
    glow: 'rgba(34,211,238,0.2)',
    tags: ['Kubernetes', 'Event-Driven Architecture', 'Observability', 'Auto-Scaling'],
  },
  {
    id: 2,
    icon: '🧬',
    title: 'Biological Intelligence',
    subtitle: 'AI for life sciences & oncology',
    description: 'Digital twins for patients. Multi-modal models over genomic, proteomic, and clinical data. PERSEPHONE simulates tumor biology to personalise treatment before it\'s administered.',
    color: '#10B981',
    glow: 'rgba(16,185,129,0.2)',
    tags: ['Digital Twins', 'Genomics', 'Clinical AI', 'Drug Discovery'],
  },
  {
    id: 3,
    icon: '🌌',
    title: 'Scientific Intelligence',
    subtitle: 'Autonomous discovery systems',
    description: 'Beyond AI assistants — systems that formulate research questions, design experiments, synthesize literature, and peer-review their own outputs. The autonomous scientist.',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.22)',
    tags: ['Hypothesis Generation', 'Experiment Design', 'Literature Synthesis', 'Peer Review AI'],
  },
];

// Edge positions between cards in a 2×2 grid (relative to the 2×2 container)
// These SVG paths connect card centers
const EDGE_PATHS = [
  // top-left ↔ top-right
  { d: 'M 25 25 L 75 25', color: '#7C3AED' },
  // top-left ↔ bottom-left
  { d: 'M 25 25 L 25 75', color: '#7C3AED' },
  // top-right ↔ bottom-right
  { d: 'M 75 25 L 75 75', color: '#22D3EE' },
  // bottom-left ↔ bottom-right
  { d: 'M 25 75 L 75 75', color: '#10B981' },
  // diagonals
  { d: 'M 25 25 L 75 75', color: '#8B5CF6' },
  { d: 'M 75 25 L 25 75', color: '#7C3AED' },
];

export function DomainsSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section id="domains" style={{ background: '#040816', padding: '120px 48px', borderTop: '1px solid rgba(124,58,237,0.08)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '72px' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.25em', color: '#7C3AED' }}>COGNITIVE DOMAINS</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.1 }}>
            Four Frontiers
          </h2>
        </motion.div>

        {/* Grid wrapper — with SVG edge overlay */}
        <div style={{ position: 'relative' }}>
          {/* SVG edge overlay — renders on hover */}
          <AnimatePresence>
            {activeId !== null && (
              <motion.svg
                key="edges"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
              >
                {EDGE_PATHS.map((edge, i) => (
                  <motion.path
                    key={i}
                    d={edge.d}
                    stroke={edge.color}
                    strokeWidth="0.3"
                    strokeOpacity="0.5"
                    fill="none"
                    strokeDasharray="2 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                  />
                ))}
              </motion.svg>
            )}
          </AnimatePresence>

          {/* 2×2 grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', position: 'relative', zIndex: 2 }}>
            {DOMAINS.map((domain, i) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                onMouseEnter={() => setActiveId(domain.id)}
                onMouseLeave={() => setActiveId(null)}
                style={{
                  background: '#070B1A',
                  border: `1px solid ${activeId === domain.id ? `${domain.color}40` : 'rgba(124,58,237,0.1)'}`,
                  borderRadius: '16px',
                  padding: '44px 40px',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: activeId === domain.id ? `0 0 48px ${domain.glow}, inset 0 0 48px rgba(0,0,0,0.2)` : 'none',
                  transform: activeId === domain.id ? 'translateY(-4px)' : 'none',
                }}
              >
                {/* Icon + color dot */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '12px',
                    background: `${domain.color}15`, border: `1px solid ${domain.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px',
                    transition: 'box-shadow 0.3s ease',
                    boxShadow: activeId === domain.id ? `0 0 20px ${domain.glow}` : 'none',
                  }}>
                    {domain.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: '18px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{domain.title}</div>
                    <div style={{ fontFamily: MONO, fontSize: '10px', color: domain.color, letterSpacing: '0.1em', marginTop: '4px' }}>{domain.subtitle}</div>
                  </div>
                </div>

                <p style={{ fontFamily: FONT, fontSize: '15px', color: '#64748B', lineHeight: 1.72, marginBottom: '28px' }}>
                  {domain.description}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {domain.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: MONO, fontSize: '9px', color: domain.color,
                      background: `${domain.color}10`, border: `1px solid ${domain.color}25`,
                      borderRadius: '4px', padding: '4px 10px', letterSpacing: '0.08em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Active indicator line */}
                <motion.div
                  animate={{ scaleX: activeId === domain.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute' as const,
                    bottom: 0, left: '16px', right: '16px', height: '2px',
                    background: `linear-gradient(to right, transparent, ${domain.color}, transparent)`,
                    transformOrigin: 'left',
                    borderRadius: '2px',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
