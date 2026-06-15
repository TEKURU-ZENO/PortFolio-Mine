import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

// Fixed topology mesh — deterministic node positions
const TOPO_NODES = [
  [120, 80], [280, 40], [480, 110], [660, 60], [820, 130], [940, 80], [1100, 50], [1200, 100],
  [60, 220], [200, 260], [380, 200], [560, 240], [720, 180], [900, 250], [1060, 220], [1160, 260],
  [140, 380], [310, 340], [500, 400], [680, 360], [840, 390], [1000, 350], [1140, 400],
  [80, 500], [250, 460], [440, 520], [630, 480], [800, 530], [960, 490], [1180, 520],
];

// Edges connecting nearby nodes
const TOPO_EDGES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],
  [0,8],[1,9],[2,10],[3,11],[4,12],[5,13],[6,14],[7,15],
  [8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],
  [8,16],[9,17],[10,18],[11,19],[12,20],[13,21],[14,22],
  [16,17],[17,18],[18,19],[19,20],[20,21],[21,22],
  [16,23],[17,24],[18,25],[19,26],[20,27],[21,28],[22,29],
  [23,24],[24,25],[25,26],[26,27],[27,28],[28,29],
  [1,10],[3,12],[5,14],[9,17],[11,19],[13,21],
];

export function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} style={{ position: 'relative', overflow: 'hidden', background: '#040816', padding: '140px 48px' }}>
      {/* Animated topology background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1280 600" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
          {TOPO_EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={TOPO_NODES[a][0]} y1={TOPO_NODES[a][1]}
              x2={TOPO_NODES[b][0]} y2={TOPO_NODES[b][1]}
              stroke="#7C3AED"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.2;0.6;0.2"
                dur={`${3 + (i % 5)}s`}
                begin={`${(i % 7) * 0.4}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
          {TOPO_NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#8B5CF6" opacity="0.7">
              <animate
                attributeName="opacity"
                values="0.3;0.9;0.3"
                dur={`${2 + (i % 4)}s`}
                begin={`${(i % 6) * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Purple gradient overlay left */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%',
        background: 'linear-gradient(to right, #040816, transparent)',
        pointerEvents: 'none',
      }} />
      {/* Purple gradient overlay right */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%',
        background: 'linear-gradient(to left, #040816, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '24px' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.25em', color: '#7C3AED', textTransform: 'uppercase' }}>
            Mission
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: FONT,
            fontSize: 'clamp(36px, 6vw, 76px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#FFFFFF',
            marginBottom: '32px',
          }}
        >
          Building Autonomous<br />
          <span style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Intelligence
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: FONT, fontSize: '18px', fontWeight: 400,
            color: '#64748B', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto 48px',
          }}
        >
          The most important problems in science, medicine, and infrastructure are too complex for any single mind.
          I build the systems that never sleep — autonomous agents that hypothesize, experiment, and discover.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ display: 'flex', gap: '48px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {[
            { label: 'Scientific Discovery', color: '#7C3AED' },
            { label: 'Biological Intelligence', color: '#10B981' },
            { label: 'Cloud Infrastructure', color: '#22D3EE' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
              <span style={{ fontFamily: FONT, fontSize: '14px', color: '#94A3B8', fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
