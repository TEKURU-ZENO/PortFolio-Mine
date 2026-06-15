import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

interface EcosystemNode {
  id: string;
  x: number;
  y: number;
  r: number;
  color: string;
  glowColor: string;
  label: string;
  type: string;
  description: string;
  stack: string[];
  status: string;
  isHub: boolean;
}

const NODES: EcosystemNode[] = [
  {
    id: 'ASTRAEA', x: 600, y: 200, r: 48,
    color: '#8B5CF6', glowColor: '#7C3AED',
    label: 'ASTRAEA', type: 'Autonomous Research AI',
    description: 'The flagship system. An autonomous multi-agent framework that conducts scientific research — from literature synthesis to peer-reviewed hypothesis generation — without human intervention.',
    stack: ['Claude 3.5', 'GPT-4o', 'RAG', 'Python', 'PostgreSQL'],
    status: 'Production',
    isHub: true,
  },
  {
    id: 'NYX', x: 230, y: 340, r: 34,
    color: '#A78BFA', glowColor: '#8B5CF6',
    label: 'NYX', type: 'Research Pipeline',
    description: 'The cognitive orchestrator. Manages the four-stage autonomous research pipeline: literature acquisition, hypothesis generation, experimental design, and self-critique.',
    stack: ['LangGraph', 'Celery', 'Redis', 'FastAPI'],
    status: 'Active Dev',
    isHub: false,
  },
  {
    id: 'HECATE', x: 370, y: 460, r: 26,
    color: '#22D3EE', glowColor: '#06B6D4',
    label: 'HECATE', type: 'Inference Engine',
    description: 'Specialised inference and reasoning engine powering hypothesis evaluation and logical consistency checking across the ASTRAEA ecosystem.',
    stack: ['vLLM', 'CUDA', 'Triton'],
    status: 'Stable',
    isHub: false,
  },
  {
    id: 'PERSEPHONE', x: 620, y: 470, r: 36,
    color: '#34D399', glowColor: '#10B981',
    label: 'PERSEPHONE', type: 'Oncology Digital Twin',
    description: 'A patient-specific digital twin platform for personalised oncology. Ingests multi-modal biological data to simulate tumour behaviour and predict treatment response.',
    stack: ['PyTorch', 'JAX', 'FHIR', 'TCGA'],
    status: 'Research',
    isHub: false,
  },
  {
    id: 'AETHRA-X', x: 870, y: 420, r: 26,
    color: '#22D3EE', glowColor: '#06B6D4',
    label: 'AETHRA-X', type: 'Multi-modal Processor',
    description: 'Unified multi-modal processing layer handling text, image, genomic sequences, and structured tabular data across all ecosystem components.',
    stack: ['CLIP', 'Flamingo', 'ESM-2', 'Pandas'],
    status: 'Stable',
    isHub: false,
  },
  {
    id: 'MNEMOSYNE', x: 980, y: 290, r: 30,
    color: '#A78BFA', glowColor: '#8B5CF6',
    label: 'MNEMOSYNE', type: 'Memory Architecture',
    description: 'Long-term persistent memory system for all ASTRAEA agents. Enables context continuity across sessions, experiment recall, and cross-domain knowledge transfer.',
    stack: ['Pinecone', 'Weaviate', 'Redis', 'SQLite'],
    status: 'Active Dev',
    isHub: false,
  },
];

// Edges: all connect to ASTRAEA as hub
const EDGES = [
  { from: 'ASTRAEA', to: 'NYX' },
  { from: 'ASTRAEA', to: 'HECATE' },
  { from: 'ASTRAEA', to: 'PERSEPHONE' },
  { from: 'ASTRAEA', to: 'AETHRA-X' },
  { from: 'ASTRAEA', to: 'MNEMOSYNE' },
  { from: 'NYX', to: 'HECATE' },
  { from: 'PERSEPHONE', to: 'HECATE' },
  { from: 'MNEMOSYNE', to: 'NYX' },
];

const STATUS_COLOR: Record<string, string> = {
  Production: '#10B981',
  'Active Dev': '#8B5CF6',
  Research: '#22D3EE',
  Stable: '#64748B',
};

export function EcosystemSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const getNode = (id: string) => NODES.find(n => n.id === id)!;
  const activeInfo = activeNode ? NODES.find(n => n.id === activeNode) : null;

  // Check if an edge is connected to hovered node
  const isEdgeActive = (from: string, to: string) =>
    activeNode === from || activeNode === to;

  return (
    <section id="ecosystem" style={{ background: '#040816', padding: '120px 0', borderTop: '1px solid rgba(124,58,237,0.08)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px 64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.25em', color: '#7C3AED' }}>ECOSYSTEM MAP</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.1, marginBottom: '16px' }}>
            The Autonomous Lab
          </h2>
          <p style={{ fontFamily: FONT, fontSize: '16px', color: '#475569', maxWidth: '500px' }}>
            Six interconnected systems forming a complete autonomous intelligence infrastructure. Hover any node to explore.
          </p>
        </motion.div>
      </div>

      {/* Graph + Info panel layout */}
      <div style={{ display: 'flex', gap: '0', alignItems: 'stretch', position: 'relative' }}>
        {/* SVG Graph */}
        <div style={{ flex: 1, position: 'relative' }}>
          <svg
            viewBox="0 0 1200 600"
            style={{ width: '100%', height: 'auto', display: 'block', cursor: 'default' }}
          >
            <defs>
              <filter id="eco-glow-purple" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="eco-glow-cyan" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="eco-glow-emerald" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Edges */}
            {EDGES.map(({ from, to }, i) => {
              const a = getNode(from);
              const b = getNode(to);
              const active = isEdgeActive(from, to);
              return (
                <g key={`${from}-${to}`}>
                  {/* Base line */}
                  <line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={active ? a.color : '#1E293B'}
                    strokeWidth={active ? 1.5 : 1}
                    strokeOpacity={active ? 0.6 : 0.4}
                    style={{ transition: 'stroke 0.3s, stroke-opacity 0.3s, stroke-width 0.3s' }}
                  />
                  {/* Animated dash */}
                  {active && (
                    <line
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={a.color}
                      strokeWidth="1"
                      strokeOpacity="0.8"
                      strokeDasharray="6 12"
                    >
                      <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="1s" repeatCount="indefinite" />
                    </line>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => {
              const isActive = activeNode === node.id;
              const isDimmed = activeNode && !isActive && !EDGES.some(e => (e.from === node.id && e.to === activeNode) || (e.to === node.id && e.from === activeNode));
              const filterId = node.id === 'PERSEPHONE' ? 'eco-glow-emerald' : (node.id === 'HECATE' || node.id === 'AETHRA-X') ? 'eco-glow-cyan' : 'eco-glow-purple';

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  style={{ cursor: 'pointer', opacity: isDimmed ? 0.2 : 1, transition: 'opacity 0.3s' }}
                >
                  {/* Pulse ring */}
                  <motion.circle
                    cx={node.x} cy={node.y}
                    r={node.r + (isActive ? 16 : 8)}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1"
                    strokeOpacity={isActive ? 0.5 : 0.1}
                    animate={{ r: isActive ? [node.r + 12, node.r + 20, node.r + 12] : [node.r + 6, node.r + 12, node.r + 6] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    style={{ transition: 'stroke-opacity 0.3s' }}
                  />

                  {/* Main circle */}
                  <motion.circle
                    cx={node.x} cy={node.y} r={node.r}
                    fill={isActive ? `${node.color}22` : `${node.color}0D`}
                    stroke={node.color}
                    strokeWidth={isActive ? 2 : 1.5}
                    strokeOpacity={isActive ? 1 : 0.6}
                    filter={isActive ? `url(#${filterId})` : undefined}
                    style={{ transition: 'fill 0.3s, stroke-opacity 0.3s, stroke-width 0.3s' }}
                  />

                  {/* Label */}
                  <text
                    x={node.x} y={node.y + (node.isHub ? 6 : 5)}
                    textAnchor="middle"
                    fill={isActive ? '#FFFFFF' : '#94A3B8'}
                    fontSize={node.isHub ? '14' : '11'}
                    fontFamily={MONO}
                    fontWeight={node.isHub ? '600' : '400'}
                    letterSpacing="0.1em"
                    style={{ transition: 'fill 0.3s', pointerEvents: 'none' }}
                  >
                    {node.label}
                  </text>

                  {/* Sub-label */}
                  <text
                    x={node.x} y={node.y + node.r + 18}
                    textAnchor="middle"
                    fill={isActive ? node.color : '#334155'}
                    fontSize="9"
                    fontFamily={MONO}
                    letterSpacing="0.1em"
                    style={{ transition: 'fill 0.3s', pointerEvents: 'none' }}
                  >
                    {node.type}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info Panel */}
        <div style={{ width: '360px', flexShrink: 0, padding: '0 48px 0 0', display: 'flex', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            {activeInfo ? (
              <motion.div
                key={activeInfo.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#070B1A',
                  border: `1px solid ${activeInfo.color}30`,
                  borderRadius: '16px',
                  padding: '36px',
                  width: '100%',
                }}
              >
                {/* Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: STATUS_COLOR[activeInfo.status] ?? '#64748B', boxShadow: `0 0 8px ${STATUS_COLOR[activeInfo.status] ?? '#64748B'}` }} />
                  <span style={{ fontFamily: MONO, fontSize: '9px', color: STATUS_COLOR[activeInfo.status] ?? '#64748B', letterSpacing: '0.18em' }}>{activeInfo.status.toUpperCase()}</span>
                </div>

                {/* Name */}
                <h3 style={{ fontFamily: FONT, fontSize: '28px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: '6px' }}>{activeInfo.label}</h3>
                <div style={{ fontFamily: MONO, fontSize: '10px', color: activeInfo.color, letterSpacing: '0.12em', marginBottom: '20px' }}>{activeInfo.type}</div>

                {/* Divider */}
                <div style={{ height: '1px', background: `linear-gradient(to right, ${activeInfo.color}30, transparent)`, marginBottom: '20px' }} />

                {/* Description */}
                <p style={{ fontFamily: FONT, fontSize: '14px', color: '#64748B', lineHeight: 1.72, marginBottom: '24px' }}>{activeInfo.description}</p>

                {/* Stack */}
                <div style={{ fontFamily: MONO, fontSize: '9px', color: '#334155', letterSpacing: '0.18em', marginBottom: '10px' }}>STACK</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {activeInfo.stack.map(s => (
                    <span key={s} style={{
                      fontFamily: MONO, fontSize: '9px', color: activeInfo.color,
                      background: `${activeInfo.color}10`, border: `1px solid ${activeInfo.color}25`,
                      borderRadius: '4px', padding: '4px 8px', letterSpacing: '0.06em'
                    }}>{s}</span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', textAlign: 'center' }}
              >
                <div style={{ fontFamily: MONO, fontSize: '10px', color: '#1E293B', letterSpacing: '0.2em' }}>
                  HOVER A NODE
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
