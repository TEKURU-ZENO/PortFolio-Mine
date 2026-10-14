import { useState } from 'react';
import { motion } from 'motion/react';
import { C, MONO } from '../theme';
import { Chips, Reveal, SectionHead } from './primitives';

interface Node {
  id: string; x: number; y: number; r: number;
  label: string; color: string; category: string; isHub: boolean;
}
interface Edge { a: string; b: string }

// Each hub's tools are laid out on a ring around it, starting at `start` degrees.
const HUBS = [
  { id: 'agentic', x: 138, y: 140, label: 'Agentic AI', color: '#C6F36B', ring: 92,  start: -90,
    items: ['LangGraph', 'LLM Systems', 'RAG', 'Pydantic', 'Tool Calling'] },
  { id: 'voice',   x: 365, y: 140, label: 'Voice AI',   color: '#C6F36B', ring: 88,  start: -135,
    items: ['Whisper', 'LiveKit', 'WebRTC', 'Twilio/Telnyx'] },
  { id: 'ml',      x: 610, y: 140, label: 'ML',         color: '#C6F36B', ring: 92,  start: -90,
    items: ['PyTorch', 'HuggingFace', 'GNNs', 'XAI', 'Computer Vision'] },
  { id: 'bio',     x: 855, y: 140, label: 'Bio AI',     color: '#C6F36B', ring: 92,  start: -90,
    items: ['BioGPT', 'BioBERT', 'Scanpy', 'PyTorch Geometric', 'NetworkX'] },
  { id: 'lang',    x: 190, y: 400, label: 'Languages',  color: '#C6F36B', ring: 98,  start: -90,
    items: ['Python', 'TypeScript/JS', 'Go', 'C#', 'Java', 'C++', 'R'] },
  { id: 'infra',   x: 490, y: 400, label: 'Infra',      color: '#C6F36B', ring: 98,  start: -90,
    items: ['Kafka', 'Kubernetes', 'Docker', 'Spark/Databricks', 'Redis', 'Prometheus'] },
  { id: 'web',     x: 790, y: 400, label: 'Web',        color: '#C6F36B', ring: 108, start: -90,
    items: ['React', 'Next.js', 'Angular', 'React Native', 'Redux Toolkit', 'Tailwind', 'FastAPI', 'Django', '.NET'] },
];

const slug = (label: string) => label.toLowerCase().replace(/#/g, 'sharp').replace(/\+/g, 'p').replace(/[^a-z0-9]+/g, '');

const NODES: Node[] = HUBS.flatMap(h => [
  { id: h.id, x: h.x, y: h.y, r: 30, label: h.label, color: h.color, category: h.id, isHub: true },
  ...h.items.map((label, k) => {
    const a = (h.start + (360 / h.items.length) * k) * Math.PI / 180;
    return {
      id: slug(label), x: Math.round(h.x + Math.cos(a) * h.ring), y: Math.round(h.y + Math.sin(a) * h.ring),
      r: 14, label, color: h.color, category: h.id, isHub: false,
    };
  }),
]);

const EDGES: Edge[] = [
  // Hub -> Child connections
  ...HUBS.flatMap(h => h.items.map(label => ({ a: h.id, b: slug(label) }))),

  // Cross-category connections
  { a: 'python', b: 'ml' }, { a: 'python', b: 'agentic' }, { a: 'python', b: 'voice' },
  { a: 'langgraph', b: 'ml' }, { a: 'rag', b: 'ml' }, { a: 'toolcalling', b: 'voice' },
  { a: 'whisper', b: 'ml' }, { a: 'livekit', b: 'web' },
  { a: 'kafka', b: 'agentic' }, { a: 'redis', b: 'agentic' },
  { a: 'python', b: 'bio' }, { a: 'biogpt', b: 'huggingface' }, { a: 'pytorchgeometric', b: 'gnns' },
  { a: 'fastapi', b: 'agentic' }, { a: 'typescriptjs', b: 'web' }, { a: 'csharp', b: 'web' },
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
    <section id="skills" className="section">
      <div className="container">
        <SectionHead
          index="06"
          label="Skills architecture"
          title={<>The <em>toolkit</em></>}
          intro="Grouped by what they're used for. Hover a node to see how the pieces connect."
        />

        {/* Small screens: plain grouped list instead of the graph. */}
        <div className="skills-list">
          {HUBS.map(h => (
            <div key={h.id}>
              <h3>{h.label}</h3>
              <Chips items={h.items} />
            </div>
          ))}
        </div>

        <Reveal className="skills-graph card dot-grid">
          <svg
            viewBox="0 0 980 540"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            <defs>
              <filter id="sk-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Edges */}
            {EDGES.map((e, i) => {
              const a = getNode(e.a), b = getNode(e.b);
              const active = isEdgeActive(e);
              return (
                <line key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={active ? C.accent : 'rgba(255,255,255,0.09)'}
                  strokeWidth={active ? 1.5 : 0.8}
                  strokeOpacity={active ? 0.75 : 1}
                  style={{ transition: 'stroke 0.25s, stroke-opacity 0.25s, stroke-width 0.25s' }}
                />
              );
            })}

            {/* Nodes */}
            {NODES.map((node, i) => {
              const conn = isConnected(node.id);
              const isHov = hovered === node.id;

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'default', opacity: conn ? 1 : 0.15, transition: 'opacity 0.25s' }}
                >
                  {/* Pulse ring for hubs */}
                  {node.isHub && (
                    <circle
                      className="hub-pulse"
                      cx={node.x} cy={node.y} r={node.r + 8}
                      fill="none" stroke={C.accent} strokeWidth="1"
                      style={{ animationDelay: `${i * -0.4}s`, opacity: isHov ? 0.8 : undefined }}
                    />
                  )}

                  <motion.circle
                    cx={node.x} cy={node.y} r={node.r}
                    fill={node.isHub ? (isHov ? 'rgba(198,243,107,0.16)' : 'rgba(198,243,107,0.06)') : (isHov ? 'rgba(198,243,107,0.12)' : C.surface2)}
                    stroke={node.isHub || isHov ? C.accent : 'rgba(255,255,255,0.16)'}
                    strokeWidth={node.isHub ? (isHov ? 2 : 1.5) : (isHov ? 1.5 : 1)}
                    strokeOpacity={isHov ? 1 : node.isHub ? 0.6 : 1}
                    filter={isHov ? 'url(#sk-glow)' : undefined}
                    style={{ transition: 'all 0.25s' }}
                  />

                  <text
                    x={node.x} y={node.y + (node.isHub ? 5 : 4)}
                    textAnchor="middle"
                    fill={isHov ? C.text : node.isHub ? C.text : C.text2}
                    fontSize={node.isHub ? '12' : '10'}
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
        </Reveal>
      </div>
    </section>
  );
}
