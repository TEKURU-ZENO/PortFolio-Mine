import { useState } from 'react';
import { motion } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

interface Node {
  id: string; x: number; y: number; r: number;
  label: string; color: string; category: string; isHub: boolean;
}
interface Edge { a: string; b: string }

const NODES: Node[] = [
  // Hubs
  { id: 'lang',    x: 175, y: 180, r: 30, label: 'Languages',      color: '#7C3AED', category: 'lang',    isHub: true },
  { id: 'agentic', x: 490, y: 100, r: 30, label: 'Agentic AI',      color: '#8B5CF6', category: 'agentic', isHub: true },
  { id: 'ml',      x: 810, y: 180, r: 30, label: 'Machine Learning',color: '#22D3EE', category: 'ml',      isHub: true },
  { id: 'cloud',   x: 230, y: 390, r: 30, label: 'Cloud',          color: '#6366F1', category: 'cloud',   isHub: true },
  { id: 'compbio', x: 760, y: 390, r: 30, label: 'Comp. Biology',  color: '#10B981', category: 'compbio', isHub: true },

  // Languages child nodes
  { id: 'py',   x: 72,  y: 110, r: 16, label: 'Python',     color: '#7C3AED', category: 'lang', isHub: false },
  { id: 'java', x: 180, y: 72,  r: 16, label: 'Java',       color: '#7C3AED', category: 'lang', isHub: false },
  { id: 'cpp',  x: 80,  y: 240, r: 14, label: 'C++',        color: '#7C3AED', category: 'lang', isHub: false },
  { id: 'js',   x: 270, y: 130, r: 14, label: 'JavaScript',  color: '#7C3AED', category: 'lang', isHub: false },

  // Agentic AI child nodes
  { id: 'langgraph',  x: 540, y: 168, r: 16, label: 'LangGraph',   color: '#8B5CF6', category: 'agentic', isHub: false },
  { id: 'llmsystems', x: 390, y: 45,  r: 16, label: 'LLM Systems', color: '#8B5CF6', category: 'agentic', isHub: false },
  { id: 'rag',        x: 490, y: 28,  r: 14, label: 'RAG',         color: '#8B5CF6', category: 'agentic', isHub: false },
  { id: 'memory',     x: 590, y: 52,  r: 14, label: 'Memory',      color: '#8B5CF6', category: 'agentic', isHub: false },
  { id: 'planning',   x: 610, y: 128, r: 14, label: 'Planning',    color: '#8B5CF6', category: 'agentic', isHub: false },

  // Machine Learning child nodes
  { id: 'pytorch',     x: 760, y: 95,  r: 16, label: 'PyTorch',     color: '#22D3EE', category: 'ml', isHub: false },
  { id: 'huggingface', x: 870, y: 95,  r: 16, label: 'HuggingFace', color: '#22D3EE', category: 'ml', isHub: false },
  { id: 'gnns',        x: 920, y: 190, r: 14, label: 'GNNs',        color: '#22D3EE', category: 'ml', isHub: false },
  { id: 'causalml',    x: 855, y: 275, r: 14, label: 'Causal ML',   color: '#22D3EE', category: 'ml', isHub: false },
  { id: 'xai',         x: 750, y: 275, r: 14, label: 'XAI',         color: '#22D3EE', category: 'ml', isHub: false },

  // Cloud child nodes
  { id: 'k8s',           x: 265, y: 460, r: 16, label: 'Kubernetes',   color: '#6366F1', category: 'cloud', isHub: false },
  { id: 'kafka',         x: 110, y: 340, r: 16, label: 'Kafka',        color: '#6366F1', category: 'cloud', isHub: false },
  { id: 'redis',         x: 185, y: 330, r: 14, label: 'Redis',        color: '#6366F1', category: 'cloud', isHub: false },
  { id: 'docker',        x: 145, y: 440, r: 14, label: 'Docker',       color: '#6366F1', category: 'cloud', isHub: false },
  { id: 'microservices', x: 345, y: 365, r: 14, label: 'Microservices',color: '#6366F1', category: 'cloud', isHub: false },

  // Computational Biology child nodes
  { id: 'scanpy',       x: 665, y: 345, r: 16, label: 'Scanpy',       color: '#10B981', category: 'compbio', isHub: false },
  { id: 'networkx',     x: 870, y: 340, r: 16, label: 'NetworkX',     color: '#10B981', category: 'compbio', isHub: false },
  { id: 'multiomics',   x: 685, y: 445, r: 14, label: 'Multi-Omics',  color: '#10B981', category: 'compbio', isHub: false },
  { id: 'biogpt',       x: 820, y: 450, r: 14, label: 'BioGPT',       color: '#10B981', category: 'compbio', isHub: false },
  { id: 'digitaltwins', x: 800, y: 490, r: 14, label: 'Digital Twins',color: '#10B981', category: 'compbio', isHub: false },
];

const EDGES: Edge[] = [
  // Hub -> Child connections
  { a: 'lang', b: 'py' }, { a: 'lang', b: 'java' }, { a: 'lang', b: 'cpp' }, { a: 'lang', b: 'js' },
  { a: 'agentic', b: 'langgraph' }, { a: 'agentic', b: 'llmsystems' }, { a: 'agentic', b: 'rag' }, { a: 'agentic', b: 'memory' }, { a: 'agentic', b: 'planning' },
  { a: 'ml', b: 'pytorch' }, { a: 'ml', b: 'huggingface' }, { a: 'ml', b: 'gnns' }, { a: 'ml', b: 'causalml' }, { a: 'ml', b: 'xai' },
  { a: 'cloud', b: 'k8s' }, { a: 'cloud', b: 'kafka' }, { a: 'cloud', b: 'redis' }, { a: 'cloud', b: 'docker' }, { a: 'cloud', b: 'microservices' },
  { a: 'compbio', b: 'scanpy' }, { a: 'compbio', b: 'networkx' }, { a: 'compbio', b: 'multiomics' }, { a: 'compbio', b: 'biogpt' }, { a: 'compbio', b: 'digitaltwins' },

  // Cross-category connections
  { a: 'py', b: 'ml' }, { a: 'py', b: 'compbio' },
  { a: 'pytorch', b: 'agentic' }, { a: 'langgraph', b: 'ml' }, { a: 'rag', b: 'ml' },
  { a: 'biogpt', b: 'ml' }, { a: 'digitaltwins', b: 'ml' },
  { a: 'docker', b: 'cloud' }, { a: 'kafka', b: 'agentic' }, { a: 'redis', b: 'agentic' }
];

function getNode(id: string): Node { return NODES.find(n => n.id === id)!; }

export function SkillsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  const isConnected = (nodeId: string): boolean => {
    if (!hovered) return true;
    if (nodeId === hovered) return true;
    return EDGES.some(e => (e.a === hovered && e.b === nodeId) || (e.b === hovered && e.a === nodeId));
  };

  const isEdgeActive = (e: Edge): boolean => {
    if (!hovered) return false;
    return e.a === hovered || e.b === hovered;
  };

  return (
    <section id="skills" style={{ background: '#050816', padding: '120px 48px', borderTop: '1px solid rgba(124,58,237,0.07)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#7C3AED' }}>SKILLS ARCHITECTURE</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px,5vw,54px)', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.08 }}>
            The Toolkit
          </h2>
          <p style={{ fontFamily: FONT, fontSize: '15px', color: '#475569', marginTop: '12px' }}>
            Hover any node to explore connections.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            background: '#070D1C',
            border: '1px solid rgba(124,58,237,0.1)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 980 540"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <defs>
              {['purple','blue','cyan','indigo','emerald'].map((name) => {
                return (
                  <filter key={name} id={`sk-glow-${name}`} x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                );
              })}
            </defs>

            {/* Edges */}
            {EDGES.map((e, i) => {
              const a = getNode(e.a), b = getNode(e.b);
              const active = isEdgeActive(e);
              return (
                <line key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={active ? a.color : '#1E293B'}
                  strokeWidth={active ? 1.5 : 0.8}
                  strokeOpacity={active ? 0.7 : 0.5}
                  style={{ transition: 'stroke 0.25s, stroke-opacity 0.25s, stroke-width 0.25s' }}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => {
              const conn = isConnected(node.id);
              const isHov = hovered === node.id;
              const glowMap: Record<string, string> = { lang: 'purple', agentic: 'blue', ml: 'cyan', cloud: 'indigo', compbio: 'emerald' };
              const filterId = `sk-glow-${glowMap[node.category]}`;

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer', opacity: conn ? 1 : 0.12, transition: 'opacity 0.25s' }}
                >
                  {/* Pulse ring for hubs */}
                  {node.isHub && (
                    <motion.circle
                      cx={node.x} cy={node.y} r={node.r + 8}
                      fill="none" stroke={node.color} strokeWidth="1"
                      animate={{ r: [node.r + 6, node.r + 14, node.r + 6], strokeOpacity: isHov ? [0.5, 0.8, 0.5] : [0.06, 0.14, 0.06] }}
                      transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}

                  <motion.circle
                    cx={node.x} cy={node.y} r={node.r}
                    fill={isHov ? `${node.color}22` : `${node.color}0E`}
                    stroke={node.color}
                    strokeWidth={node.isHub ? (isHov ? 2 : 1.5) : (isHov ? 1.5 : 1)}
                    strokeOpacity={isHov ? 1 : 0.55}
                    filter={isHov ? `url(#${filterId})` : undefined}
                    style={{ transition: 'all 0.25s' }}
                  />

                  <text
                    x={node.x} y={node.y + (node.isHub ? 5 : 4)}
                    textAnchor="middle"
                    fill={isHov ? '#F8FAFC' : conn ? '#64748B' : '#1E293B'}
                    fontSize={node.isHub ? '11' : '9'}
                    fontFamily={MONO}
                    fontWeight={node.isHub ? '600' : '400'}
                    letterSpacing="0.06em"
                    style={{ transition: 'fill 0.25s', pointerEvents: 'none' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
