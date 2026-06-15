import { useState } from 'react';
import { motion } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

// ── Project Visuals ───────────────────────────────────────────────────────────

function NexusDiagram() {
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <filter id="nexus-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      
      {/* Central hub */}
      <circle cx={190} cy={120} r={28} fill="rgba(124,58,237,0.15)" stroke="#7C3AED" strokeWidth="2" filter="url(#nexus-glow)" />
      <text x={190} y={124} textAnchor="middle" fill="#F8FAFC" fontSize="10" fontFamily={MONO} fontWeight="600" letterSpacing="0.05em">PLANNER</text>

      {/* 5 Agent nodes around the center */}
      {[
        { cx: 80,  cy: 70,  label: 'Execution', color: '#8B5CF6' },
        { cx: 300, cy: 70,  label: 'Critique',  color: '#22D3EE' },
        { cx: 80,  cy: 170, label: 'Memory',    color: '#6366F1' },
        { cx: 300, cy: 170, label: 'Retrieval', color: '#10B981' },
        { cx: 190, cy: 40,  label: 'Synthesis', color: '#A78BFA' },
      ].map((agent) => (
        <g key={agent.label}>
          <line x1={190} y1={120} x2={agent.cx} y2={agent.cy} stroke={agent.color} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
          <circle cx={agent.cx} cy={agent.cy} r={20} fill="rgba(255,255,255,0.03)" stroke={agent.color} strokeWidth="1.5" />
          <text x={agent.cx} y={agent.cy + 3} textAnchor="middle" fill="#CBD5E1" fontSize="8" fontFamily={MONO}>{agent.label}</text>
        </g>
      ))}

      <text x={190} y={220} textAnchor="middle" fill="#475569" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">MULTI-AGENT COORDINATION WORKFLOW</text>
    </svg>
  );
}

function SeleneDiagram() {
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <filter id="selene-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Layer stack */}
      {[
        { y: 45,  label: 'TRUST & SECURITY',  sub: 'Auditing, verification & constraints', color: '#EF4444' },
        { y: 95,  label: 'COGNITIVE ROUTING',  sub: 'Memory & planning dispatchers',        color: '#6366F1' },
        { y: 145, label: 'DISTRIBUTED EXEC',   sub: 'Lease-bound DAG execution engine',     color: '#22D3EE' },
      ].map((layer) => (
        <g key={layer.label}>
          <rect x={30} y={layer.y} width={320} height={34} rx="6" fill="rgba(255,255,255,0.02)" stroke={layer.color} strokeWidth="1" strokeOpacity="0.4" />
          <text x={44} y={layer.y + 16} fill="#CBD5E1" fontSize="9" fontFamily={MONO} fontWeight="600" letterSpacing="0.05em">{layer.label}</text>
          <text x={44} y={layer.y + 27} fill="#475569" fontSize="8" fontFamily={FONT}>{layer.sub}</text>
          <circle cx={330} cy={layer.y + 17} r={4} fill={layer.color} filter="url(#selene-glow)" />
        </g>
      ))}

      <text x={190} y={210} textAnchor="middle" fill="#475569" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">3-LAYER COGNITIVE OPERATING ARCHITECTURE</text>
    </svg>
  );
}

function AtlasDiagram() {
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <filter id="atlas-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      
      {/* Cellular structure - graph */}
      {[[90, 70], [130, 110], [80, 140], [200, 130], [250, 80], [290, 130], [180, 70]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={i === 3 ? 12 : 8} fill={i === 3 ? 'rgba(16,185,129,0.2)' : 'rgba(34,211,238,0.1)'} stroke={i === 3 ? '#10B981' : '#22D3EE'} strokeWidth="1.5" />
          {i > 0 && (
            <line x1={cx} y1={cy} x2={180} y2={70} stroke="#475569" strokeWidth="0.8" strokeOpacity="0.4" />
          )}
        </g>
      ))}
      <line x1={90} y1={70} x2={130} y2={110} stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.5" />
      <line x1={130} y1={110} x2={80} y2={140} stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.5" />
      <line x1={130} y1={110} x2={200} y2={130} stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1={200} y1={130} x2={250} y2={80} stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1={250} y1={80} x2={290} y2={130} stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.5" />
      <line x1={200} y1={130} x2={290} y2={130} stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.5" />

      {/* Target state transition arrow */}
      <path d="M 230,170 Q 270,170 300,150" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x={230} y={185} fill="#10B981" fontSize="9" fontFamily={MONO}>CAUSAL TRANSITION</text>

      <text x={190} y={215} textAnchor="middle" fill="#475569" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">SINGLE-CELL STATE GNN TRANSITIONS</text>
    </svg>
  );
}

function BioGPTDiagram() {
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <filter id="bg-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#8B5CF6" fillOpacity="0.7" />
        </marker>
      </defs>

      {/* Nodes */}
      {[
        { x: 30,  label: 'PubMed',       sub: '40K papers', color: '#7C3AED' },
        { x: 130, label: 'BioGPT',       sub: 'Base model', color: '#8B5CF6' },
        { x: 230, label: 'Fine-tune',    sub: 'DDICorpus', color: '#A78BFA'  },
        { x: 330, label: 'Classifier',   sub: '86.64% F1', color: '#22D3EE' },
      ].map((node, i) => (
        <g key={node.label}>
          <rect x={node.x - 38} y={80} width={76} height={48} rx="8"
            fill={`${node.color}12`} stroke={node.color} strokeWidth="1" strokeOpacity="0.7"
            filter="url(#bg-glow)"
          />
          <text x={node.x} y={99} textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily={MONO} letterSpacing="0.04em">{node.label}</text>
          <text x={node.x} y={115} textAnchor="middle" fill={node.color} fontSize="9" fontFamily={MONO} letterSpacing="0.04em" opacity="0.8">{node.sub}</text>
          {i < 3 && (
            <line x1={node.x + 38} y1={104} x2={node.x + 54} y2={104}
              stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.5" markerEnd="url(#arr)" />
          )}
        </g>
      ))}

      {/* Result bar */}
      <rect x={60} y={168} width={260} height={32} rx="6" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.25)" strokeWidth="1" />
      <rect x={60} y={168} width={220} height={32} rx="6" fill="rgba(34,211,238,0.12)" />
      <text x={190} y={189} textAnchor="middle" fill="#22D3EE" fontSize="10" fontFamily={MONO} letterSpacing="0.08em">DDI DETECTION · F1 86.64%</text>

      <text x={190} y={30} textAnchor="middle" fill="#475569" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">BIOGPT-DDI PIPELINE</text>
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

const FEATURED = [
  {
    id: 'nexus',
    index: '01',
    name: 'NEXUS',
    tagline: 'Multi-Agent Strategic Intelligence Platform',
    accent: '#7C3AED',
    bg: 'linear-gradient(135deg, #08081a 0%, #0c0a20 100%)',
    desc: 'An enterprise-scale agentic platform coordinating specialized AI agents through centralized planning, execution, memory, and critique workflows. Designed to transform fragmented information into decision-ready strategic intelligence.',
    impact: ['5 specialized AI agents', 'Persistent memory architecture', 'Adversarial critique loops', 'Cross-session knowledge retention'],
    stack: ['Python', 'FastAPI', 'LangGraph', 'Redis', 'React', 'Vector Databases'],
    diagram: <NexusDiagram />,
    github: 'https://github.com/TEKURU-ZENO',
  },
  {
    id: 'selene',
    index: '02',
    name: 'SELENE',
    tagline: 'Ambient Cognitive Operating Layer',
    accent: '#6366F1',
    bg: 'linear-gradient(135deg, #06091b 0%, #090e29 100%)',
    desc: 'A distributed AI operating layer built around trust, memory, execution, planning and reflection. Designed to make autonomous systems auditable, safe and scalable.',
    impact: ['5 autonomous subsystems', '3-layer trust architecture', 'DAG-based execution', 'Lease-bound orchestration'],
    stack: ['Kafka', 'Redis', 'Kubernetes', 'FastAPI', 'React'],
    diagram: <SeleneDiagram />,
    github: 'https://github.com/TEKURU-ZENO',
  },
  {
    id: 'atlas',
    index: '03',
    name: 'ATLAS',
    tagline: 'Causal Digital Twin for Single-Cell Simulation',
    accent: '#10B981',
    bg: 'linear-gradient(135deg, #050d0a 0%, #081510 100%)',
    desc: 'A computational biology framework combining graph neural networks, temporal simulation and causal reasoning to predict cellular state transitions.',
    impact: ['Biological digital twin', 'Active-learning experimentation', 'TRUST causal networks', 'Published research project'],
    stack: ['PyTorch Geometric', 'Scanpy', 'NetworkX', 'Causal ML', 'Python'],
    diagram: <AtlasDiagram />,
    github: 'https://github.com/TEKURU-ZENO',
  },
  {
    id: 'biogpt',
    index: '04',
    name: 'BioGPT-DDI',
    tagline: 'Drug Interaction Intelligence System',
    accent: '#8B5CF6',
    bg: 'linear-gradient(135deg, #080820 0%, #0a0d28 100%)',
    desc: 'Graph-augmented biomedical NLP platform for drug-drug interaction prediction and explainable clinical reporting.',
    impact: ['F1 Score: 86.64%', 'DDI-2013 Benchmark', 'Explainable Reports', 'Published Research'],
    stack: ['BioGPT', 'BioBERT', 'PyTorch', 'FastAPI', 'React'],
    diagram: <BioGPTDiagram />,
    github: 'https://github.com/TEKURU-ZENO',
  },
];

const OTHER_PROJECTS = [
  { name: 'Luxury Peaks',    desc: 'A premium hospitality and booking platform designed with a high-end, responsive booking interface.',  stack: ['React', 'Node.js', 'Tailwind CSS'], color: '#8B5CF6' },
  { name: 'DesignVerse',     desc: 'A natural language to UI generator that converts plain English descriptions into React elements.',   stack: ['React', 'TypeScript', 'OpenAI API', 'Next.js'], color: '#7C3AED' },
  { name: 'Harry Potter Sorting System', desc: 'An interactive frontend sorting ceremony application using classification reasoning.', stack: ['JavaScript', 'CSS', 'HTML5'], color: '#22D3EE' },
  { name: 'Missing Value Prediction ML', desc: 'Machine learning pipeline optimizing data cleaning via custom predictive imputers.',   stack: ['Python', 'scikit-learn', 'Pandas'], color: '#10B981' },
  { name: 'MedIntel AI',                 desc: 'A clinical reasoning dashboard that synthesizes patient symptoms for diagnostic assistance.', stack: ['Python', 'FastAPI', 'React', 'Transformers'], color: '#6366F1' },
];

export function FeaturedProjectsSection() {
  const [hoveredOther, setHoveredOther] = useState<string | null>(null);

  return (
    <section id="projects" style={{ background: '#050816', borderTop: '1px solid rgba(124,58,237,0.07)' }}>
      {/* Section header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 48px 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#7C3AED' }}>FEATURED PROJECTS</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px,5vw,54px)', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.08 }}>
            Selected Work
          </h2>
        </motion.div>
      </div>

      {/* Featured cards */}
      {FEATURED.map((project, pi) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{
            background: project.bg,
            borderTop: `1px solid ${project.accent}14`,
            padding: '72px 48px',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: pi % 2 === 0 ? '1fr 420px' : '420px 1fr', gap: '72px', alignItems: 'center' }}>

            {/* Left / Right based on index */}
            <motion.div
              initial={{ opacity: 0, x: pi % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.1 }}
              style={{ order: pi % 2 === 0 ? 0 : 1 }}
            >
              <div style={{ fontFamily: MONO, fontSize: '10px', color: project.accent, letterSpacing: '0.18em', opacity: 0.6, marginBottom: '16px' }}>
                {project.index} / 04
              </div>
              <h3 style={{ fontFamily: FONT, fontSize: 'clamp(32px,4vw,56px)', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px' }}>
                {project.name}
              </h3>
              <div style={{ fontFamily: MONO, fontSize: '11px', color: project.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
                {project.tagline}
              </div>
              <p style={{ fontFamily: FONT, fontSize: '16px', color: '#64748B', lineHeight: 1.78, marginBottom: '28px', maxWidth: '480px' }}>
                {project.desc}
              </p>

              {/* Impact */}
              <div style={{ marginBottom: '28px' }}>
                {project.impact.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                    <span style={{ color: project.accent, fontFamily: MONO, fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>↗</span>
                    <span style={{ fontFamily: FONT, fontSize: '14px', color: '#CBD5E1' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                {project.stack.map(t => (
                  <span key={t} style={{
                    fontFamily: MONO, fontSize: '10px', color: '#475569',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '4px', padding: '5px 12px', letterSpacing: '0.06em',
                  }}>{t}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: FONT, fontSize: '13px', fontWeight: 600, color: project.accent,
                    background: `${project.accent}12`, border: `1px solid ${project.accent}28`,
                    borderRadius: '7px', padding: '10px 22px', textDecoration: 'none',
                    transition: 'background 0.2s, border-color 0.2s',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}22`; e.currentTarget.style.borderColor = `${project.accent}50`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}12`; e.currentTarget.style.borderColor = `${project.accent}28`; }}
                >
                  GitHub <span style={{ fontSize: '11px' }}>↗</span>
                </a>
              </div>
            </motion.div>

            {/* Diagram panel */}
            <motion.div
              initial={{ opacity: 0, x: pi % 2 === 0 ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.18 }}
              style={{
                order: pi % 2 === 0 ? 1 : 0,
                background: `${project.accent}05`,
                border: `1px solid ${project.accent}14`,
                borderRadius: '16px',
                padding: '32px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '240px',
              }}
            >
              {project.diagram}
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Other projects grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 48px 120px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '40px' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#334155' }}>OTHER WORK</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
          {OTHER_PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              onMouseEnter={() => setHoveredOther(p.name)}
              onMouseLeave={() => setHoveredOther(null)}
              style={{
                background: '#0B1020',
                border: `1px solid ${hoveredOther === p.name ? `${p.color}35` : 'rgba(124,58,237,0.08)'}`,
                borderRadius: '12px', padding: '28px',
                transition: 'border-color 0.3s, transform 0.3s',
                transform: hoveredOther === p.name ? 'translateY(-3px)' : 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{ fontFamily: FONT, fontSize: '16px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em' }}>{p.name}</span>
                <a href={`https://github.com/TEKURU-ZENO`} target="_blank" rel="noopener noreferrer"
                  style={{ color: '#334155', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = p.color)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#334155')}
                >↗</a>
              </div>
              <p style={{ fontFamily: FONT, fontSize: '13px', color: '#475569', lineHeight: 1.68, marginBottom: '16px' }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {p.stack.map(t => (
                  <span key={t} style={{ fontFamily: MONO, fontSize: '9px', color: p.color, background: `${p.color}0D`, border: `1px solid ${p.color}20`, borderRadius: '3px', padding: '3px 8px', letterSpacing: '0.05em' }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
