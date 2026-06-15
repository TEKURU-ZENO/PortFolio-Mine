import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

// ─── ASTRAEA: Architecture Blueprint diagram ─────────────────────────────────
function AstraeaDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const boxes = [
    { id: 'LIT',   x: 30,  y: 40,  w: 140, h: 48, label: 'Literature Synthesis',  color: '#7C3AED' },
    { id: 'HYP',   x: 240, y: 40,  w: 140, h: 48, label: 'Hypothesis Generator',  color: '#8B5CF6' },
    { id: 'MEM',   x: 30,  y: 160, w: 140, h: 48, label: 'Memory (MNEMOSYNE)',     color: '#22D3EE' },
    { id: 'EXP',   x: 240, y: 160, w: 140, h: 48, label: 'Experiment Planner',     color: '#8B5CF6' },
    { id: 'ANAL',  x: 240, y: 280, w: 140, h: 48, label: 'Result Analyzer',         color: '#7C3AED' },
    { id: 'PEER',  x: 30,  y: 280, w: 140, h: 48, label: 'Peer Review Agent',       color: '#A78BFA' },
  ];

  const arrows = [
    { x1: 170, y1: 64,  x2: 240, y2: 64  },
    { x1: 310, y1: 88,  x2: 310, y2: 160 },
    { x1: 100, y1: 88,  x2: 100, y2: 160 },
    { x1: 170, y1: 184, x2: 240, y2: 184 },
    { x1: 310, y1: 208, x2: 310, y2: 280 },
    { x1: 240, y1: 304, x2: 170, y2: 304 },
  ];

  return (
    <div ref={ref} style={{ width: '100%' }}>
    <svg viewBox="0 0 440 360" style={{ width: '100%', maxWidth: '440px', height: 'auto', overflow: 'visible' }}>
      <defs>
        <filter id="box-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#7C3AED" fillOpacity="0.6" />
        </marker>
      </defs>

      {/* Grid paper bg */}
      <rect width="440" height="360" fill="none" stroke="rgba(124,58,237,0.04)" strokeWidth="1" />
      {Array.from({ length: 22 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 20} y1={0} x2={i * 20} y2={360} stroke="rgba(124,58,237,0.04)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 20} x2={440} y2={i * 20} stroke="rgba(124,58,237,0.04)" strokeWidth="0.5" />
      ))}

      {/* Arrows */}
      {arrows.map((a, i) => (
        <motion.line
          key={i}
          x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
          stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.6"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
        />
      ))}

      {/* Boxes */}
      {boxes.map((box, i) => (
        <motion.g
          key={box.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          style={{ transformOrigin: `${box.x + box.w / 2}px ${box.y + box.h / 2}px` }}
        >
          <rect
            x={box.x} y={box.y} width={box.w} height={box.h} rx="6"
            fill={`${box.color}12`} stroke={box.color} strokeWidth="1" strokeOpacity="0.6"
            filter="url(#box-glow)"
          />
          <text
            x={box.x + box.w / 2} y={box.y + box.h / 2 + 4}
            textAnchor="middle" fill="#CBD5E1"
            fontSize="11" fontFamily={MONO} letterSpacing="0.05em"
          >
            {box.label}
          </text>
        </motion.g>
      ))}

      {/* ASTRAEA central label */}
      <motion.text
        x="220" y="340"
        textAnchor="middle" fill="#7C3AED" fontSize="10" fontFamily={MONO} letterSpacing="0.3em"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.6 } : {}} transition={{ delay: 1 }}
      >
        ASTRAEA ARCHITECTURE v2.4
      </motion.text>
    </svg>
    </div>
  );
}

// ─── NYX: Research Pipeline diagram ─────────────────────────────────────────
function NyxDiagram() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });

  const steps = [
    { label: 'Literature',  sublabel: '40K+ papers indexed', color: '#7C3AED' },
    { label: 'Hypothesis',  sublabel: 'Novelty-scored candidates', color: '#8B5CF6' },
    { label: 'Experiment',  sublabel: 'Automated protocol design', color: '#A78BFA' },
    { label: 'Critique',    sublabel: 'Self-review + external validation', color: '#22D3EE' },
  ];

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const iv = setInterval(() => {
      current = (current + 1) % steps.length;
      setActiveStep(current);
    }, 1200);
    return () => clearInterval(iv);
  }, [inView]);

  return (
    <div ref={ref} style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}>
      {steps.map((step, i) => (
        <div key={step.label}>
          <motion.div
            animate={{
              borderColor: activeStep === i ? `${step.color}80` : 'rgba(124,58,237,0.1)',
              boxShadow: activeStep === i ? `0 0 32px ${step.color}30, inset 0 0 16px ${step.color}10` : 'none',
            }}
            transition={{ duration: 0.4 }}
            style={{
              background: '#0A1022',
              border: `1px solid rgba(124,58,237,0.1)`,
              borderRadius: '10px',
              padding: '20px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <motion.div
              animate={{
                background: activeStep === i ? step.color : 'rgba(124,58,237,0.15)',
                boxShadow: activeStep === i ? `0 0 16px ${step.color}` : 'none',
              }}
              transition={{ duration: 0.3 }}
              style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 }}
            />
            <div>
              <div style={{ fontFamily: FONT, fontSize: '16px', fontWeight: 700, color: activeStep === i ? '#FFFFFF' : '#475569', transition: 'color 0.3s' }}>
                {step.label}
              </div>
              <div style={{ fontFamily: MONO, fontSize: '10px', color: activeStep === i ? step.color : '#1E293B', letterSpacing: '0.08em', marginTop: '4px', transition: 'color 0.3s' }}>
                {step.sublabel}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: '10px', color: activeStep === i ? step.color : '#1E293B' }}>
              {activeStep === i ? '●' : '○'}
            </div>
          </motion.div>

          {i < steps.length - 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <motion.div
                animate={{ opacity: activeStep === i ? 1 : 0.2 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}
              >
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ width: '1px', height: '6px', background: '#7C3AED', opacity: 1 - j * 0.25 }} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── PERSEPHONE: Digital Twin diagram ────────────────────────────────────────
function PersephoneDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const dataPoints = [
    { label: 'Genomics', x: 60,  y: 100, color: '#10B981' },
    { label: 'Proteomics', x: 60, y: 160, color: '#10B981' },
    { label: 'Clinical',  x: 60,  y: 220, color: '#34D399' },
    { label: 'Imaging',   x: 60,  y: 280, color: '#34D399' },
  ];

  const tumorPath = 'M 280 260 C 310 240, 330 200, 320 170 C 310 140, 290 120, 270 130 C 250 140, 240 160, 250 190 C 260 220, 270 240, 280 260 Z';

  return (
    <div ref={ref} style={{ width: '100%' }}>
    <svg viewBox="0 0 440 360" style={{ width: '100%', maxWidth: '440px', height: 'auto', overflow: 'visible' }}>
      <defs>
        <filter id="twin-glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="tumor-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* Data source boxes */}
      {dataPoints.map((dp, i) => (
        <motion.g key={dp.label} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.12 }}>
          <rect x={dp.x - 44} y={dp.y - 16} width="88" height="32" rx="6"
            fill={`${dp.color}12`} stroke={dp.color} strokeWidth="1" strokeOpacity="0.5" />
          <text x={dp.x} y={dp.y + 5} textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily={MONO} letterSpacing="0.05em">
            {dp.label}
          </text>
          {/* Connector */}
          <motion.line x1={dp.x + 44} y1={dp.y} x2={170} y2={190}
            stroke={dp.color} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 6"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }} />
        </motion.g>
      ))}

      {/* Digital Twin hub */}
      <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.6, duration: 0.5 }}
        style={{ transformOrigin: '190px 190px' }}>
        <rect x={140} y={162} width="100" height="56" rx="10"
          fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1.5" filter="url(#twin-glow)" />
        <text x={190} y={184} textAnchor="middle" fill="#34D399" fontSize="9" fontFamily={MONO} letterSpacing="0.1em">DIGITAL</text>
        <text x={190} y={200} textAnchor="middle" fill="#34D399" fontSize="9" fontFamily={MONO} letterSpacing="0.1em">TWIN</text>
        <text x={190} y={214} textAnchor="middle" fill="#10B981" fontSize="8" fontFamily={MONO} letterSpacing="0.06em">PERSEPHONE</text>
      </motion.g>

      {/* Connector to tumor */}
      <motion.line x1={240} y1={190} x2={270} y2={190}
        stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ delay: 1.0, duration: 0.4 }} />

      {/* Tumor model */}
      <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}>
        <path d={tumorPath} fill="url(#tumor-grad)" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.7" filter="url(#twin-glow)" />
        <text x={295} y={190} textAnchor="middle" fill="#34D399" fontSize="9" fontFamily={MONO} letterSpacing="0.06em">TUMOR</text>
        <text x={295} y={202} textAnchor="middle" fill="#34D399" fontSize="9" fontFamily={MONO} letterSpacing="0.06em">MODEL</text>
      </motion.g>

      {/* Treatment output */}
      <motion.g initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3 }}>
        <rect x={310} y={300} width="120" height="36" rx="6"
          fill="rgba(16,185,129,0.12)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.5" />
        <text x={370} y={320} textAnchor="middle" fill="#34D399" fontSize="10" fontFamily={MONO} letterSpacing="0.06em">Treatment Plan</text>
        <line x1={295} y1={265} x2={370} y2={300} stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 6" />
      </motion.g>

      {/* Timeline axis */}
      <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 0.5 } : {}} transition={{ delay: 1.5 }}>
        <line x1={60} y1={340} x2={430} y2={340} stroke="#1E293B" strokeWidth="1" />
        {[0, 1, 2, 3, 4, 5, 6].map(t => (
          <g key={t}>
            <line x1={60 + t * 54} y1={336} x2={60 + t * 54} y2={344} stroke="#1E293B" strokeWidth="1" />
            <text x={60 + t * 54} y={354} textAnchor="middle" fill="#1E293B" fontSize="8" fontFamily={MONO}>
              T+{t * 2}w
            </text>
          </g>
        ))}
      </motion.g>
    </svg>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'ASTRAEA',
    index: '01',
    name: 'ASTRAEA',
    tagline: 'Autonomous Scientific Research AI',
    description: 'A multi-agent system that conducts scientific research end-to-end — from literature synthesis and hypothesis generation to experiment design and peer review. Built to operate without human guidance for weeks at a time.',
    status: 'Production · v2.4',
    stack: ['GPT-4o', 'Claude 3.5', 'RAG', 'Python', 'PostgreSQL', 'Redis'],
    bg: 'linear-gradient(135deg, #040816 0%, #0D0B2A 50%, #050D1A 100%)',
    accent: '#7C3AED',
    accentLight: '#A78BFA',
    diagram: <AstraeaDiagram />,
  },
  {
    id: 'NYX',
    index: '02',
    name: 'NYX',
    tagline: 'Research Pipeline Orchestrator',
    description: 'The cognitive backbone of ASTRAEA. NYX orchestrates specialized agents across a four-stage research pipeline — acquiring literature, generating hypotheses, designing experiments, and running self-critique cycles that improve output quality with each iteration.',
    status: 'Active Development · v1.8',
    stack: ['LangGraph', 'Claude 3.5', 'Pinecone', 'FastAPI', 'Celery', 'Docker'],
    bg: 'linear-gradient(135deg, #040816 0%, #0C0A28 50%, #040816 100%)',
    accent: '#8B5CF6',
    accentLight: '#C4B5FD',
    diagram: <NyxDiagram />,
  },
  {
    id: 'PERSEPHONE',
    index: '03',
    name: 'PERSEPHONE',
    tagline: 'Oncology Digital Twin Platform',
    description: 'A patient-specific digital twin system for personalised oncology. PERSEPHONE ingests multi-modal biological data — genomic, proteomic, imaging, and clinical — to simulate tumour behaviour and predict treatment response before the first dose is administered.',
    status: 'Research Phase · v0.7',
    stack: ['PyTorch', 'JAX', 'TCGA Data', 'GEO', 'HL7 FHIR', 'Nextflow'],
    bg: 'linear-gradient(135deg, #040816 0%, #051A0F 50%, #040816 100%)',
    accent: '#10B981',
    accentLight: '#34D399',
    diagram: <PersephoneDiagram />,
  },
];

export function FlagshipSection() {
  return (
    <section id="flagship" style={{ background: '#040816' }}>
      {/* Section label */}
      <div style={{ padding: '80px 48px 0', maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.25em', color: '#7C3AED' }}>FLAGSHIP SYSTEMS</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.1 }}>
            The Lab
          </h2>
        </motion.div>
      </div>

      {PROJECTS.map((project, pi) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            background: project.bg,
            borderTop: pi === 0 ? 'none' : `1px solid ${project.accent}18`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: '50%', left: pi % 2 === 0 ? '60%' : '40%',
            transform: 'translate(-50%, -50%)',
            width: '600px', height: '600px',
            background: `radial-gradient(circle, ${project.accent}08 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{
            maxWidth: '1280px', width: '100%', margin: '0 auto',
            padding: '80px 48px',
            display: 'grid',
            gridTemplateColumns: pi % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}>
            {/* Left: description */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ order: pi % 2 === 0 ? 0 : 1 }}
            >
              {/* Index */}
              <div style={{ fontFamily: MONO, fontSize: '11px', color: project.accent, letterSpacing: '0.2em', marginBottom: '20px', opacity: 0.7 }}>
                {project.index} / {String(PROJECTS.length).padStart(2, '0')}
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: FONT, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 800,
                letterSpacing: '-0.04em', lineHeight: 1, color: '#FFFFFF', marginBottom: '8px',
              }}>
                {project.name}
              </h3>

              {/* Tagline */}
              <div style={{ fontFamily: MONO, fontSize: '12px', color: project.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px' }}>
                {project.tagline}
              </div>

              {/* Description */}
              <p style={{ fontFamily: FONT, fontSize: '17px', color: '#64748B', lineHeight: 1.78, marginBottom: '36px', maxWidth: '480px' }}>
                {project.description}
              </p>

              {/* Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.accent, boxShadow: `0 0 10px ${project.accent}` }}
                />
                <span style={{ fontFamily: MONO, fontSize: '10px', color: project.accent, letterSpacing: '0.15em' }}>{project.status}</span>
              </div>

              {/* Stack */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.stack.map(tech => (
                  <span key={tech} style={{
                    fontFamily: MONO, fontSize: '10px', color: '#475569',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '4px', padding: '5px 12px', letterSpacing: '0.06em',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: diagram */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                order: pi % 2 === 0 ? 1 : 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px',
                background: `${project.accent}05`,
                border: `1px solid ${project.accent}15`,
                borderRadius: '16px',
                minHeight: '360px',
              }}
            >
              {project.diagram}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
