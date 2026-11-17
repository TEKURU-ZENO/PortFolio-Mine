import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { MONO } from '../theme';
import { FEATURED, type FeaturedProject } from '../data/projects';
import { Arrow, Chips, DrawOnView, SectionHead, useMedia } from './primitives';
import { ProjectIndex } from './ProjectIndex';

// ── Project diagrams (accent + neutrals; warm "alert" only marks an attack or failure) ──

function AstraeusDiagram() {
  // A transient's light curve: fast rise, slower decline.
  const pts = Array.from({ length: 15 }, (_, i) => {
    const t = i - 4;
    const flux = t < 0 ? Math.exp(-(t * t) / 4) : Math.exp(-t / 4.5);
    return [26 + i * 8.6, 132 - flux * 72] as const;
  });
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <marker id="astr-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#C6F36B" fillOpacity="0.7" />
        </marker>
      </defs>
      <text x={190} y={24} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">LIGHT CURVE TO CALIBRATED CLASS SET</text>

      {/* Light curve */}
      <line x1={20} y1={140} x2={156} y2={140} stroke="#787C85" strokeWidth="0.8" />
      <line x1={20} y1={50} x2={20} y2={140} stroke="#787C85" strokeWidth="0.8" />
      <polyline points={pts.map(p => p.join(',')).join(' ')} fill="none" stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.5" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#A1A4AC" strokeWidth="0.7" strokeOpacity="0.6" />
          <circle cx={x} cy={y} r={2.4} fill="#C6F36B" />
        </g>
      ))}
      <text x={88} y={156} textAnchor="middle" fill="#787C85" fontSize="8" fontFamily={MONO}>ZTF flux over time</text>

      {/* Model */}
      <line x1={162} y1={95} x2={184} y2={95} stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.6" markerEnd="url(#astr-arr)" />
      <rect x={188} y={70} width={70} height={50} rx="8" fill="rgba(198,243,107,0.06)" stroke="#C6F36B" strokeWidth="1" strokeOpacity="0.6" />
      <text x={223} y={92} textAnchor="middle" fill="#D4D6DB" fontSize="9" fontFamily={MONO}>Physical</text>
      <text x={223} y={106} textAnchor="middle" fill="#D4D6DB" fontSize="9" fontFamily={MONO}>features + RF</text>
      <line x1={260} y1={95} x2={282} y2={95} stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.6" markerEnd="url(#astr-arr)" />

      {/* Conformal prediction set */}
      <rect x={286} y={62} width={80} height={66} rx="8" fill="rgba(198,243,107,0.12)" stroke="#C6F36B" strokeWidth="1" />
      <text x={326} y={80} textAnchor="middle" fill="#C6F36B" fontSize="8" fontFamily={MONO}>90% SET</text>
      <text x={326} y={98} textAnchor="middle" fill="#EDEDEF" fontSize="10" fontFamily={MONO}>SN Ia</text>
      <text x={326} y={114} textAnchor="middle" fill="#A1A4AC" fontSize="10" fontFamily={MONO}>SN II</text>

      {/* Safe operating envelope */}
      <rect x={20} y={176} width={346} height={34} rx="6" fill="none" stroke="#A1A4AC" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="4 4" />
      <text x={193} y={197} textAnchor="middle" fill="#A1A4AC" fontSize="9" fontFamily={MONO} letterSpacing="0.06em">SAFE ENVELOPE: N ≥ 20 POINTS, DUAL-BAND</text>
    </svg>
  );
}

function EvantheaDiagram() {
  const seq = ['M', 'S', 'K', 'G', 'E', 'E', 'L', 'F', 'T', 'G'];
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <marker id="evan-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#C6F36B" fillOpacity="0.7" />
        </marker>
      </defs>
      <text x={190} y={24} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">SEQUENCE TO FITNESS, IN A CLOSED LOOP</text>

      {/* Protein sequence with one proposed mutation */}
      {seq.map((aa, i) => {
        const mutated = i === 6;
        return (
          <g key={i}>
            <rect x={60 + i * 26} y={44} width={22} height={26} rx="4"
              fill={mutated ? 'rgba(198,243,107,0.16)' : 'rgba(255,255,255,0.03)'}
              stroke={mutated ? '#C6F36B' : '#787C85'} strokeWidth="1" />
            <text x={71 + i * 26} y={61} textAnchor="middle" fill={mutated ? '#C6F36B' : '#D4D6DB'} fontSize="11" fontFamily={MONO}>{mutated ? 'Y' : aa}</text>
          </g>
        );
      })}
      <text x={227} y={84} textAnchor="middle" fill="#C6F36B" fontSize="8" fontFamily={MONO}>L to Y</text>

      {/* Model chain */}
      {[
        { x: 40,  label: 'ESM',      sub: 'embeddings' },
        { x: 150, label: 'HistGBDT', sub: 'hybrid' },
      ].map(n => (
        <g key={n.label}>
          <rect x={n.x} y={110} width={92} height={42} rx="8" fill="rgba(198,243,107,0.06)" stroke="#C6F36B" strokeWidth="1" strokeOpacity="0.6" />
          <text x={n.x + 46} y={128} textAnchor="middle" fill="#D4D6DB" fontSize="10" fontFamily={MONO}>{n.label}</text>
          <text x={n.x + 46} y={143} textAnchor="middle" fill="#787C85" fontSize="8" fontFamily={MONO}>{n.sub}</text>
        </g>
      ))}
      <line x1={86} y1={74} x2={86} y2={106} stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.6" markerEnd="url(#evan-arr)" />
      <line x1={134} y1={131} x2={146} y2={131} stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.6" markerEnd="url(#evan-arr)" />
      <line x1={244} y1={131} x2={258} y2={131} stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.6" markerEnd="url(#evan-arr)" />

      {/* Results */}
      {[
        { y: 104, label: 'GFP',   v: 'ρ 0.655' },
        { y: 136, label: 'TEM-1', v: 'ρ 0.504' },
      ].map(r => (
        <g key={r.label}>
          <rect x={262} y={r.y} width={104} height={26} rx="6" fill="rgba(198,243,107,0.12)" stroke="#C6F36B" strokeWidth="1" />
          <text x={272} y={r.y + 17} fill="#A1A4AC" fontSize="9" fontFamily={MONO}>{r.label}</text>
          <text x={356} y={r.y + 17} textAnchor="end" fill="#EDEDEF" fontSize="10" fontFamily={MONO}>{r.v}</text>
        </g>
      ))}

      {/* Closed loop back to the sequence */}
      <path d="M314,166 L314,196 L30,196 L30,57 L54,57" fill="none" stroke="#A1A4AC" strokeWidth="1" strokeOpacity="0.6" markerEnd="url(#evan-arr)" />
      <text x={172} y={214} textAnchor="middle" fill="#787C85" fontSize="8" fontFamily={MONO}>evolution + RL propose the next variants</text>
    </svg>
  );
}

function A11yDiagram() {
  const stages = ['Audit', 'Fix', 'Test', 'Screen reader'];
  const roles = [
    { x: 64,  label: 'heading' },
    { x: 190, label: 'img (chart)' },
    { x: 316, label: 'table' },
  ];
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <marker id="a11y-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#C6F36B" fillOpacity="0.7" />
        </marker>
      </defs>
      <text x={190} y={24} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">EVERY FIX LOCKED IN BY A TEST</text>

      {stages.map((s, i) => {
        const x = 16 + i * 90;
        const w = i === 3 ? 92 : 74;
        return (
          <g key={s}>
            <rect x={x} y={42} width={w} height={32} rx="7" fill={i === 2 ? 'rgba(198,243,107,0.12)' : 'rgba(198,243,107,0.05)'} stroke="#C6F36B" strokeWidth="1" strokeOpacity={i === 2 ? 1 : 0.6} />
            <text x={x + w / 2} y={62} textAnchor="middle" fill="#D4D6DB" fontSize="9.5" fontFamily={MONO}>{s}</text>
            {i < 3 && <line x1={x + w + 2} y1={58} x2={x + 86} y2={58} stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.6" markerEnd="url(#a11y-arr)" />}
          </g>
        );
      })}

      {/* Accessibility tree of a dashboard panel */}
      <rect x={130} y={102} width={120} height={30} rx="6" fill="rgba(255,255,255,0.03)" stroke="#A1A4AC" strokeWidth="1" />
      <text x={190} y={121} textAnchor="middle" fill="#EDEDEF" fontSize="9.5" fontFamily={MONO}>region: panel</text>
      {roles.map(r => (
        <g key={r.label}>
          <line x1={190} y1={132} x2={r.x} y2={168} stroke="#787C85" strokeWidth="1" />
          <rect x={r.x - 52} y={168} width={104} height={28} rx="6" fill="rgba(198,243,107,0.06)" stroke="#C6F36B" strokeWidth="1" strokeOpacity="0.6" />
          <text x={r.x} y={186} textAnchor="middle" fill="#D4D6DB" fontSize="9.5" fontFamily={MONO}>{r.label}</text>
        </g>
      ))}
      <text x={190} y={222} textAnchor="middle" fill="#787C85" fontSize="8" fontFamily={MONO} letterSpacing="0.1em">WHAT NVDA AND VOICEOVER ANNOUNCE</text>
    </svg>
  );
}

function CounterDiagram() {
  const flow = [
    { x: 14,  label: 'Caller' },
    { x: 104, label: 'Twilio' },
    { x: 194, label: 'Agent' },
    { x: 284, label: 'PayPal' },
  ];
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <marker id="ctr-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#C6F36B" fillOpacity="0.7" />
        </marker>
      </defs>
      <text x={190} y={24} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">ORDERED BY VOICE, PAID, AUDITED</text>

      {flow.map((n, i) => (
        <g key={n.label}>
          <rect x={n.x} y={70} width={78} height={36} rx="8" fill={n.label === 'Agent' ? 'rgba(198,243,107,0.12)' : 'rgba(198,243,107,0.05)'} stroke="#C6F36B" strokeWidth="1" strokeOpacity={n.label === 'Agent' ? 1 : 0.6} />
          <text x={n.x + 39} y={92} textAnchor="middle" fill="#D4D6DB" fontSize="10" fontFamily={MONO}>{n.label}</text>
          {i < 3 && <line x1={n.x + 80} y1={88} x2={n.x + 86} y2={88} stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.6" markerEnd="url(#ctr-arr)" />}
        </g>
      ))}

      {/* Adversarial caller, stopped at the agent */}
      <path d="M40,46 Q130,30 222,66" fill="none" stroke="#FF7A59" strokeWidth="1" strokeDasharray="3 3" />
      <text x={36} y={42} fill="#FF7A59" fontSize="8" fontFamily={MONO}>adversarial caller</text>
      <text x={262} y={58} fill="#FF7A59" fontSize="8" fontFamily={MONO}>6/6 resisted</text>

      {/* Ledger watching the agent and the payment */}
      <rect x={150} y={150} width={166} height={34} rx="7" fill="rgba(255,255,255,0.03)" stroke="#A1A4AC" strokeWidth="1" />
      <text x={233} y={171} textAnchor="middle" fill="#EDEDEF" fontSize="9.5" fontFamily={MONO}>Ledger checks each step</text>
      <line x1={233} y1={108} x2={220} y2={148} stroke="#A1A4AC" strokeWidth="1" strokeDasharray="2 3" />
      <line x1={323} y1={108} x2={290} y2={148} stroke="#A1A4AC" strokeWidth="1" strokeDasharray="2 3" />
      <text x={190} y={218} textAnchor="middle" fill="#787C85" fontSize="8" fontFamily={MONO} letterSpacing="0.1em">2 MODELS EVALUATED, 128 TESTS</text>
    </svg>
  );
}

function RecoupDiagram() {
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <marker id="recoup-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#C6F36B" fillOpacity="0.7" />
        </marker>
      </defs>

      <text x={190} y={30} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">POLICY DECIDES, LLM ONLY WRITES</text>

      {[
        { x: 20,  w: 80, label: 'payment', sub: '.failed',   color: '#A1A4AC' },
        { x: 120, w: 92, label: 'State',   sub: 'machine',   color: '#C6F36B' },
        { x: 232, w: 64, label: 'LLM',     sub: 'copy only', color: '#C6F36B' },
        { x: 316, w: 50, label: 'Send',    sub: 'validated', color: '#C6F36B' },
      ].map((n, i, arr) => (
        <g key={n.label}>
          <rect x={n.x} y={78} width={n.w} height={52} rx="8" fill={`${n.color}12`} stroke={n.color} strokeWidth="1" strokeOpacity="0.7" />
          <text x={n.x + n.w / 2} y={100} textAnchor="middle" fill="#D4D6DB" fontSize="10" fontFamily={MONO}>{n.label}</text>
          <text x={n.x + n.w / 2} y={116} textAnchor="middle" fill={n.color} fontSize="8" fontFamily={MONO}>{n.sub}</text>
          {i < arr.length - 1 && (
            <line x1={n.x + n.w + 2} y1={104} x2={arr[i + 1].x - 4} y2={104} stroke="#C6F36B" strokeWidth="1.3" strokeOpacity="0.5" markerEnd="url(#recoup-arr)" />
          )}
        </g>
      ))}

      {/* Pydantic guard */}
      <rect x={226} y={142} width={140} height={22} rx="5" fill="none" stroke="#C6F36B" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3 3" />
      <text x={296} y={157} textAnchor="middle" fill="#C6F36B" fontSize="8" fontFamily={MONO}>Pydantic-validated payload</text>

      {/* Result strip */}
      <rect x={40} y={184} width={300} height={28} rx="6" fill="rgba(198,243,107,0.08)" stroke="rgba(198,243,107,0.3)" strokeWidth="1" />
      <text x={190} y={202} textAnchor="middle" fill="#C6F36B" fontSize="9" fontFamily={MONO} letterSpacing="0.06em">400 SIMULATED EVENTS, 100% POLICY-LEGAL</text>
    </svg>
  );
}

function PersephoneDiagram() {
  const nodes = [
    { id: 'case',  x: 50,  y: 120, label: 'Case' },
    { id: 'path',  x: 140, y: 70,  label: 'Pathology' },
    { id: 'gen',   x: 140, y: 170, label: 'Genomics' },
    { id: 'sim',   x: 240, y: 70,  label: 'Simulator' },
    { id: 'cf',    x: 240, y: 170, label: 'What-if' },
    { id: 'board', x: 330, y: 120, label: 'Board' },
  ];
  const edges = [['case', 'path'], ['case', 'gen'], ['path', 'sim'], ['gen', 'cf'], ['gen', 'sim'], ['sim', 'board'], ['cf', 'board']];
  const at = (id: string) => nodes.find(n => n.id === id)!;
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <marker id="pers-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#C6F36B" fillOpacity="0.7" />
        </marker>
      </defs>
      <text x={190} y={26} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">VIRTUAL TUMOR BOARD, AGENT DAG</text>
      {edges.map(([a, b]) => {
        const A = at(a), B = at(b);
        const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy);
        return (
          <line key={a + b} x1={A.x + dx / len * 24} y1={A.y + dy / len * 24} x2={B.x - dx / len * 26} y2={B.y - dy / len * 26}
            stroke="#C6F36B" strokeWidth="1" strokeOpacity="0.45" markerEnd="url(#pers-arr)" />
        );
      })}
      {nodes.map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={22} fill="rgba(198,243,107,0.08)" stroke="#C6F36B" strokeWidth="1.2" strokeOpacity={n.id === 'board' ? 1 : 0.6} />
          <text x={n.x} y={n.y + 3} textAnchor="middle" fill="#D4D6DB" fontSize="8" fontFamily={MONO}>{n.label}</text>
        </g>
      ))}
      <text x={190} y={222} textAnchor="middle" fill="#787C85" fontSize="8" fontFamily={MONO} letterSpacing="0.1em">VALIDATED ON 1,100+ UNSEEN TUMORS</text>
    </svg>
  );
}

const DIAGRAMS: Record<string, ReactNode> = {
  astraeus:   <AstraeusDiagram />,
  persephone: <PersephoneDiagram />,
  evanthea:   <EvantheaDiagram />,
  a11ylab:    <A11yDiagram />,
  counter:    <CounterDiagram />,
  recoup:     <RecoupDiagram />,
};

// ── Sticky card stack ──────────────────────────────────────────────────────────

function StackCard({ project, i, n, progress, stacking }: {
  project: FeaturedProject; i: number; n: number; progress: MotionValue<number>; stacking: boolean;
}) {
  // Earlier cards shrink slightly as later ones slide over them.
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.03]);

  return (
    <div className="stack-slot" style={stacking ? { top: `calc(var(--nav-h) + 20px + ${i * 14}px)` } : undefined}>
      <motion.article
        className="card stack-card"
        style={stacking ? { scale, transformOrigin: '50% 0%' } : undefined}
        aria-labelledby={`p-${project.id}`}
      >
        <div className="stack-copy">
          <p className="stack-domain">{project.domain}</p>
          <h3 id={`p-${project.id}`}>{project.name}</h3>
          <p className="project-desc">{project.desc}</p>
          <ul className="tick-list">
            {project.impact.map(item => <li key={item}>{item}</li>)}
          </ul>
          <Chips items={project.stack} />
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-arrow">
              View code on GitHub <Arrow />
            </a>
          )}
        </div>

        <DrawOnView className="stack-visual dot-grid" label={`${project.name} architecture diagram`}>
          {DIAGRAMS[project.id]}
        </DrawOnView>
      </motion.article>
    </div>
  );
}

export function FeaturedProjectsSection() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });
  const tallEnough = useMedia('(min-width: 1024px) and (min-height: 760px)');
  const reduce = useReducedMotion();
  const stacking = tallEnough && !reduce;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead
          title={<>Selected <em>work</em></>}
          intro="Six systems in depth, then everything else. Each diagram shows how the system actually works."
        />

        <div ref={stackRef} className={`stack${stacking ? ' is-stacking' : ''}`}>
          {FEATURED.map((p, i) => (
            <StackCard key={p.id} project={p} i={i} n={FEATURED.length} progress={scrollYProgress} stacking={stacking} />
          ))}
        </div>

        <ProjectIndex />
      </div>
    </section>
  );
}
