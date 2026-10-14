import { MONO } from '../theme';
import { Arrow, Chips, Reveal, SectionHead, trackSpotlight } from './primitives';

// ── Project diagrams (accent + neutrals; warm "alert" only marks a failure) ──

function HecateDiagram() {
  const agents = [
    { x: 40,  label: 'Detect' },  { x: 90,  label: 'Triage' },
    { x: 140, label: 'RCA' },     { x: 190, label: 'Plan' },
    { x: 240, label: 'Act' },     { x: 290, label: 'Verify' },
    { x: 340, label: 'Report' },
  ];
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <filter id="hecate-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <text x={190} y={30} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">7 AGENTS · ONE KAFKA BUS</text>

      {/* Agents */}
      {agents.map(a => (
        <g key={a.label}>
          <line x1={a.x} y1={86} x2={a.x} y2={116} stroke="#C6F36B" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 3" />
          <circle cx={a.x} cy={70} r={16} fill="rgba(198,243,107,0.08)" stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.7" />
          <text x={a.x} y={73} textAnchor="middle" fill="#D4D6DB" fontSize="7" fontFamily={MONO}>{a.label}</text>
        </g>
      ))}

      {/* Kafka bus */}
      <rect x={20} y={116} width={340} height={22} rx="11" fill="rgba(198,243,107,0.1)" stroke="#C6F36B" strokeWidth="1" strokeOpacity="0.5" filter="url(#hecate-glow)" />
      <text x={190} y={131} textAnchor="middle" fill="#C6F36B" fontSize="9" fontFamily={MONO} letterSpacing="0.12em">KAFKA EVENT BUS</text>

      {/* Targets */}
      {[
        { x: 40,  label: 'Kubernetes' },
        { x: 150, label: 'Prometheus' },
        { x: 260, label: 'Jaeger' },
      ].map(t => (
        <g key={t.label}>
          <line x1={t.x + 40} y1={138} x2={t.x + 40} y2={170} stroke="#787C85" strokeWidth="1" strokeOpacity="0.5" />
          <rect x={t.x} y={170} width={80} height={28} rx="6" fill="rgba(255,255,255,0.02)" stroke="#787C85" strokeWidth="1" strokeOpacity="0.5" />
          <text x={t.x + 40} y={188} textAnchor="middle" fill="#A1A4AC" fontSize="9" fontFamily={MONO}>{t.label}</text>
        </g>
      ))}
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

      <text x={190} y={30} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">POLICY DECIDES · LLM ONLY WRITES</text>

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
      <text x={190} y={202} textAnchor="middle" fill="#C6F36B" fontSize="9" fontFamily={MONO} letterSpacing="0.06em">400 EVENTS · 100% LEGAL · 0% UNGROUNDED</text>
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
      <text x={190} y={26} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">VIRTUAL TUMOR BOARD · AGENT DAG</text>
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
      <text x={190} y={222} textAnchor="middle" fill="#787C85" fontSize="8" fontFamily={MONO} letterSpacing="0.1em">OVER A BIOMEDICAL KNOWLEDGE GRAPH</text>
    </svg>
  );
}

function NexusGridDiagram() {
  const pts = [[110, 140], [170, 120], [230, 145], [150, 185], [210, 195], [270, 180]];
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <marker id="grid-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#C6F36B" fillOpacity="0.7" />
        </marker>
      </defs>
      <text x={190} y={26} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">TELEMETRY → DIGITAL TWIN → FORECAST</text>

      {/* Pipeline */}
      {[
        { x: 20,  label: 'Kafka' },
        { x: 110, label: 'Spark SS' },
        { x: 200, label: 'Delta' },
      ].map(n => (
        <g key={n.label}>
          <rect x={n.x} y={52} width={70} height={30} rx="6" fill="rgba(198,243,107,0.08)" stroke="#C6F36B" strokeWidth="1" strokeOpacity="0.6" />
          <text x={n.x + 35} y={71} textAnchor="middle" fill="#D4D6DB" fontSize="9" fontFamily={MONO}>{n.label}</text>
          <line x1={n.x + 72} y1={67} x2={n.x + 86} y2={67} stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.5" markerEnd="url(#grid-arr)" />
        </g>
      ))}
      <rect x={290} y={52} width={70} height={30} rx="6" fill="rgba(198,243,107,0.14)" stroke="#C6F36B" strokeWidth="1" />
      <text x={325} y={71} textAnchor="middle" fill="#C6F36B" fontSize="9" fontFamily={MONO}>Forecast</text>

      {/* Neo4j dependency graph */}
      <line x1={110} y1={140} x2={150} y2={185} stroke="#787C85" strokeWidth="0.9" strokeOpacity="0.6" />
      {pts.map(([cx, cy], i) => (
        <g key={i}>
          {i > 0 && <line x1={pts[i - 1][0]} y1={pts[i - 1][1]} x2={cx} y2={cy} stroke="#787C85" strokeWidth="0.9" strokeOpacity="0.6" />}
          <circle cx={cx} cy={cy} r={i === 2 ? 10 : 7} fill={i === 2 ? 'rgba(255,122,89,0.2)' : 'rgba(198,243,107,0.1)'} stroke={i === 2 ? '#FF7A59' : '#C6F36B'} strokeWidth="1.2" />
        </g>
      ))}
      <text x={244} y={133} fill="#FF7A59" fontSize="8" fontFamily={MONO}>anomaly</text>
      <text x={190} y={226} textAnchor="middle" fill="#787C85" fontSize="8" fontFamily={MONO} letterSpacing="0.1em">NEO4J INFRASTRUCTURE TWIN</text>
    </svg>
  );
}

function VoiceAgentDiagram() {
  const bars = Array.from({ length: 34 }, (_, i) => 6 + Math.abs(Math.sin(i * 0.7) * 22) + (i % 3) * 3);
  return (
    <svg viewBox="0 0 380 240" style={{ width: '100%', height: 'auto' }}>
      <text x={190} y={26} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">LIVE CALL · STREAMING TURNS</text>

      {/* Caller waveform */}
      <text x={20} y={66} fill="#787C85" fontSize="8" fontFamily={MONO}>CALLER</text>
      {bars.slice(0, 20).map((h, i) => (
        <rect key={'c' + i} x={70 + i * 7} y={62 - h / 2} width={3} height={h} rx="1.5" fill="#A1A4AC" fillOpacity="0.6" />
      ))}

      {/* Agent waveform, cut by barge-in */}
      <text x={20} y={126} fill="#C6F36B" fontSize="8" fontFamily={MONO}>AGENT</text>
      {bars.slice(10, 28).map((h, i) => (
        <rect key={'a' + i} x={140 + i * 7} y={122 - h / 2} width={3} height={h} rx="1.5" fill="#C6F36B" fillOpacity={i > 9 ? 0.2 : 0.8} />
      ))}
      <line x1={210} y1={40} x2={210} y2={150} stroke="#FF7A59" strokeWidth="1" strokeDasharray="3 3" />
      <text x={214} y={48} fill="#FF7A59" fontSize="8" fontFamily={MONO}>barge-in</text>

      {/* Pipeline */}
      {[
        { x: 20,  label: 'Twilio' },
        { x: 110, label: 'Whisper' },
        { x: 200, label: 'Agent' },
        { x: 290, label: 'Tools' },
      ].map((n, i) => (
        <g key={n.label}>
          <rect x={n.x} y={176} width={70} height={28} rx="6" fill="rgba(198,243,107,0.08)" stroke="#C6F36B" strokeWidth="1" strokeOpacity="0.6" />
          <text x={n.x + 35} y={194} textAnchor="middle" fill="#D4D6DB" fontSize="9" fontFamily={MONO}>{n.label}</text>
          {i < 3 && <line x1={n.x + 72} y1={190} x2={n.x + 88} y2={190} stroke="#C6F36B" strokeWidth="1.2" strokeOpacity="0.5" />}
        </g>
      ))}
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
          <path d="M0,0 L6,3 L0,6 Z" fill="#C6F36B" fillOpacity="0.7" />
        </marker>
      </defs>

      {/* Nodes */}
      {[
        { x: 30,  label: 'PubMed',       sub: '40K papers', color: '#C6F36B' },
        { x: 130, label: 'BioGPT',       sub: 'Base model', color: '#C6F36B' },
        { x: 230, label: 'Fine-tune',    sub: 'DDICorpus', color: '#C6F36B'  },
        { x: 330, label: 'Classifier',   sub: '86.64% F1', color: '#C6F36B' },
      ].map((node, i) => (
        <g key={node.label}>
          <rect x={node.x - 38} y={80} width={76} height={48} rx="8"
            fill={`${node.color}12`} stroke={node.color} strokeWidth="1" strokeOpacity="0.7"
            filter="url(#bg-glow)"
          />
          <text x={node.x} y={99} textAnchor="middle" fill="#D4D6DB" fontSize="10" fontFamily={MONO} letterSpacing="0.04em">{node.label}</text>
          <text x={node.x} y={115} textAnchor="middle" fill={node.color} fontSize="9" fontFamily={MONO} letterSpacing="0.04em" opacity="0.8">{node.sub}</text>
          {i < 3 && (
            <line x1={node.x + 38} y1={104} x2={node.x + 54} y2={104}
              stroke="#C6F36B" strokeWidth="1.5" strokeOpacity="0.5" markerEnd="url(#arr)" />
          )}
        </g>
      ))}

      {/* Result bar */}
      <rect x={60} y={168} width={260} height={32} rx="6" fill="rgba(198,243,107,0.06)" stroke="rgba(198,243,107,0.25)" strokeWidth="1" />
      <rect x={60} y={168} width={220} height={32} rx="6" fill="rgba(198,243,107,0.12)" />
      <text x={190} y={189} textAnchor="middle" fill="#C6F36B" fontSize="10" fontFamily={MONO} letterSpacing="0.08em">DDI DETECTION · F1 86.64%</text>

      <text x={190} y={30} textAnchor="middle" fill="#787C85" fontSize="9" fontFamily={MONO} letterSpacing="0.14em">BIOGPT-DDI PIPELINE</text>
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

type Featured = {
  id: string; index: string; name: string; tagline: string;
  desc: string; impact: string[]; stack: string[]; diagram: JSX.Element; github?: string;
};

const FEATURED: Featured[] = [
  {
    id: 'hecate',
    index: '01',
    name: 'HECATE',
    tagline: 'Autonomous Reliability Platform',
    desc: 'Seven agents talk over a Kafka bus to catch incidents, find the root cause and remediate on Kubernetes.',
    impact: ['7 coordinating agents', 'Isolation Forest anomaly detection', 'Graph-based root cause analysis', 'Seed-controlled evaluation harness'],
    stack: ['Python', 'Kafka', 'Kubernetes', 'Prometheus', 'Grafana', 'Jaeger'],
    diagram: <HecateDiagram />,
    github: 'https://github.com/TEKURU-ZENO/HECATE',
  },
  {
    id: 'recoup',
    index: '02',
    name: 'Recoup',
    tagline: 'Payment Recovery Engine',
    desc: 'A deterministic state machine decides what’s allowed on a failed payment. The LLM only writes the message, inside a validated payload.',
    impact: ['132 tests', '20-seed paired benchmark', 'Shadow run over 400 payment.failed events, 100% policy legality', '0% ungrounded facts'],
    stack: ['Python', 'FastAPI', 'Pydantic', 'Razorpay API', 'Next.js', 'LiveKit'],
    diagram: <RecoupDiagram />,
    github: 'https://github.com/TEKURU-ZENO/Recoup',
  },
  {
    id: 'persephone',
    index: '03',
    name: 'PERSEPHONE',
    tagline: 'Precision Oncology Decision Support',
    desc: 'A virtual tumor board. Agents run as a DAG over a biomedical knowledge graph, with a tumor-dynamics simulator and counterfactual “what if we changed therapy” reasoning.',
    impact: ['Multi-agent tumor board DAG', 'Tumor dynamics simulator', 'Causal counterfactual engine', 'Biomedical knowledge graph'],
    stack: ['JavaScript', 'HTML/CSS', 'Node.js'],
    diagram: <PersephoneDiagram />,
    github: 'https://github.com/TEKURU-ZENO/PERSEPHONE',
  },
  {
    id: 'nexus-grid',
    index: '04',
    name: 'NEXUS GRID',
    tagline: 'Infrastructure Intelligence',
    desc: 'Streams infra telemetry through Spark, models the system as a dependency graph, and forecasts anomalies and capacity before they hit.',
    impact: ['Spark Structured Streaming over Kafka', 'Neo4j infrastructure digital twin', 'PySpark ML anomaly and capacity forecasting', 'LLM + RAG infra copilot'],
    stack: ['Spark', 'Kafka', 'Delta Lake', 'Neo4j', 'FastAPI', 'Go', 'Next.js', 'Three.js'],
    diagram: <NexusGridDiagram />,
  },
  {
    id: 'voice-agent',
    index: '05',
    name: 'Real-Time Voice Agent',
    tagline: 'Telephony Voice AI',
    desc: 'A phone agent that listens, gets interrupted, recovers, and calls tools while the call is still going.',
    impact: ['Streaming Whisper STT', 'Barge-in and turn-taking', 'Mid-call tool calling', 'Twilio and Telnyx telephony'],
    stack: ['Python', 'Whisper', 'LiveKit', 'WebRTC', 'Twilio', 'Telnyx'],
    diagram: <VoiceAgentDiagram />,
  },
  {
    id: 'biogpt',
    index: '06',
    name: 'BioGPT-DDI',
    tagline: 'Drug Interaction Intelligence System',
    desc: 'Graph-augmented biomedical NLP platform for drug-drug interaction prediction and explainable clinical reporting.',
    impact: ['F1 Score: 86.64%', 'DDI-2013 Benchmark', 'Explainable Reports', 'Published Research'],
    stack: ['BioGPT', 'BioBERT', 'PyTorch', 'FastAPI', 'React'],
    diagram: <BioGPTDiagram />,
    github: 'https://github.com/TEKURU-ZENO/BioGPT-DDI',
  },
];

const OTHER_PROJECTS: { name: string; desc: string; stack: string[]; href?: string }[] = [
  { name: 'VeriX',                       desc: 'Full-stack app with a network failure simulator built in, so resilience is tested, not assumed.', stack: ['Angular 17', 'TypeScript', 'Node', 'MongoDB', 'Docker'], href: 'https://github.com/TEKURU-ZENO/VeriX' },
  { name: 'NOVA',                        desc: 'Windows desktop file organiser that watches folders and sorts in real time, with full undo history.', stack: ['C#', '.NET', 'WPF', 'SQLite'] },
  { name: 'Diagnostic Booking Backend',  desc: 'Test booking with mock payments and idempotent webhooks. Built as a take-home for EVE Healthcare.', stack: ['Backend', 'Payments', 'Webhooks'], href: 'https://github.com/TEKURU-ZENO/Diagnostic-Healthcare-Booking-Payment-Backend' },
  { name: 'FORGE / Nexus Studio',        desc: 'Collaborative AI dev workspace. I own the agent layer, including a browser agent that drives web actions on its own.', stack: ['Python', 'LangGraph', 'React'], href: 'https://github.com/anjali-0404/Multiagent' },
  { name: 'OCR Document Reading System', desc: 'Hospital Information System plugin built with SIMS Chennai. Reads printed and handwritten medical documents, then digitises and summarises them.', stack: ['PaddleOCR', 'TrOCR', 'Gemini', 'React', 'FastAPI'] },
  { name: 'Aperture 3.0',                desc: 'Upstream open-source contribution, merged.', stack: ['Open Source'] },
  { name: 'DesignVerse',                 desc: 'A natural language to UI generator that converts plain English descriptions into React elements.', stack: ['React', 'TypeScript', 'OpenAI API', 'Next.js'], href: 'https://github.com/TEKURU-ZENO/Designverse' },
  { name: 'Luxury Peaks',                desc: 'A premium hospitality and booking platform designed with a high-end, responsive booking interface.', stack: ['React', 'Node.js', 'Tailwind CSS'], href: 'https://github.com/TEKURU-ZENO/Luxury_Peaks' },
];

export function FeaturedProjectsSection() {
  const total = String(FEATURED.length).padStart(2, '0');

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead
          index="03"
          label="Featured projects"
          title={<>Selected <em>work</em></>}
          intro="Six systems, each with a diagram of how it actually works. Repos are linked where the code is public."
        />

        {FEATURED.map((project, pi) => (
          <article key={project.id} className={`project${pi % 2 ? ' project--flip' : ''}`} aria-labelledby={`p-${project.id}`}>
            <Reveal>
              <div className="project-meta">
                <b>{project.index}</b><span>/ {total}</span>
              </div>
              <h3 id={`p-${project.id}`}>{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
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
            </Reveal>

            <Reveal delay={0.1} className="project-visual card dot-grid">
              <div role="img" aria-label={`${project.name} architecture diagram`} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {project.diagram}
              </div>
            </Reveal>
          </article>
        ))}

        <Reveal className="other-head">
          <h3>Other work</h3>
          <span className="eyebrow">{OTHER_PROJECTS.length} projects</span>
        </Reveal>

        <div className="other-grid">
          {OTHER_PROJECTS.map((p, i) => {
            const body = (
              <>
                <div className="other-top">
                  <h4>{p.name}</h4>
                  {p.href && <Arrow />}
                </div>
                <p>{p.desc}</p>
                <Chips items={p.stack} />
              </>
            );
            return (
              <Reveal key={p.name} delay={(i % 3) * 0.05} style={{ display: 'flex' }}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="card spot other" onMouseMove={trackSpotlight} style={{ flex: 1 }}
                    aria-label={`${p.name} (opens repository)`}>
                    {body}
                  </a>
                ) : (
                  <div className="card other" style={{ flex: 1 }}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
