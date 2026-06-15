import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const TIMELINE = [
  {
    year: '2023',
    title: 'Full Stack Development',
    desc: 'Started with full-stack engineering. Built responsive web applications and backend API integrations. Mastered React, Node.js, and cloud hosting.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
    color: '#8B5CF6',
  },
  {
    year: '2024',
    title: 'Machine Learning & LLMs',
    desc: 'Transitioned to machine learning. Built retrieval-augmented generation (RAG) pipelines, worked with embeddings, and fine-tuned LLMs on custom domain datasets.',
    tags: ['PyTorch', 'HuggingFace', 'Transformers', 'LangChain'],
    color: '#7C3AED',
  },
  {
    year: '2025',
    title: 'Biomedical AI & Research',
    desc: 'Applied deep learning to healthcare. Published drug-drug interaction research and simulated oncological biological systems using graph neural networks.',
    tags: ['BioGPT', 'Clinical NLP', 'PyTorch Geometric', 'GNNs'],
    color: '#10B981',
  },
  {
    year: '2026',
    title: 'Agentic AI & Autonomous Systems',
    desc: 'Focusing on autonomous intelligence. Building multi-agent systems using LangGraph orchestration, persistent memory architectures, and critique feedback loops.',
    tags: ['LangGraph', 'Multi-Agent Systems', 'Memory', 'Reflective Loops'],
    color: '#22D3EE',
    active: true,
  },
  {
    year: 'Future',
    title: 'AI Scientists & Digital Twins',
    desc: 'Exploring the horizon of AI for Science. Creating simulation-driven digital twins and automated hypothesis formulation networks to accelerate scientific discovery.',
    tags: ['Digital Twins', 'Causal ML', 'AI for Science', 'Autonomous Labs'],
    color: '#6366F1',
    future: true,
  },
];

const ACHIEVEMENTS = [
  { title: 'Top 1000 Builders', detail: 'OpenAI × Outskill Program', icon: '🤖', glow: 'rgba(124,58,237,0.15)', color: '#7C3AED' },
  { title: 'Top 50 Teams', detail: 'Web of Innovation Hackathon', icon: '🏆', glow: 'rgba(34,211,238,0.15)', color: '#22D3EE' },
  { title: 'Rank 1', detail: 'Overall Proficiency Annual Day Award (2025-26)', icon: '🥇', glow: 'rgba(16,185,129,0.15)', color: '#10B981' },
  { title: 'President', detail: 'Design & Innovation Club', icon: '🎨', glow: 'rgba(139,92,246,0.15)', color: '#8B5CF6' },
  { title: 'Google Gemini Student Ambassador', detail: 'Developer Relations Program', icon: '✨', glow: 'rgba(99,102,241,0.15)', color: '#6366F1' },
];

function TimelineItem({ m, index }: { m: typeof TIMELINE[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{ display: 'flex', gap: '30px' }}
    >
      {/* Year */}
      <div style={{ width: '64px', flexShrink: 0, paddingTop: '4px', textAlign: 'right' }}>
        <span style={{ fontFamily: MONO, fontSize: '13px', fontWeight: 600, color: m.future ? '#475569' : m.active ? m.color : '#CBD5E1', letterSpacing: '0.05em' }}>
          {m.year}
        </span>
      </div>

      {/* Spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <motion.div
          animate={m.active ? { boxShadow: [`0 0 10px ${m.color}`, `0 0 24px ${m.color}`, `0 0 10px ${m.color}`] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: m.active ? '14px' : '10px', height: m.active ? '14px' : '10px',
            borderRadius: '50%', marginTop: '5px',
            background: m.future ? 'transparent' : m.color,
            border: m.future ? `2px dashed #475569` : `2px solid ${m.color}`,
            zIndex: 2, flexShrink: 0,
          }}
        />
        {index < TIMELINE.length - 1 && (
          <div style={{
            width: '1px', flex: 1, minHeight: '80px', marginTop: '8px',
            background: `linear-gradient(to bottom, ${m.color}35, ${TIMELINE[index + 1].color}18)`,
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: '48px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <h4 style={{ fontFamily: FONT, fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: m.future ? '#475569' : '#FFFFFF' }}>
            {m.title}
          </h4>
          {m.active && (
            <span style={{ fontFamily: MONO, fontSize: '8px', color: '#22D3EE', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.25)', borderRadius: '4px', padding: '2px 8px', letterSpacing: '0.15em' }}>
              NOW
            </span>
          )}
          {m.future && (
            <span style={{ fontFamily: MONO, fontSize: '8px', color: '#475569', border: '1px dashed #475569', borderRadius: '4px', padding: '2px 8px', letterSpacing: '0.15em' }}>
              HORIZON
            </span>
          )}
        </div>
        <p style={{ fontFamily: FONT, fontSize: '14px', color: m.future ? '#334155' : '#64748B', lineHeight: 1.65, marginBottom: '12px', maxWidth: '480px' }}>
          {m.desc}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {m.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: MONO, fontSize: '9px',
              color: m.future ? '#334155' : m.color,
              background: m.future ? 'transparent' : `${m.color}0D`,
              border: `1px solid ${m.future ? 'rgba(255,255,255,0.03)' : `${m.color}22`}`,
              borderRadius: '4px', padding: '3px 8px', letterSpacing: '0.06em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function JourneySection() {
  const [hoveredAch, setHoveredAch] = useState<number | null>(null);

  return (
    <section id="journey" style={{ background: '#050816', padding: '120px 48px', borderTop: '1px solid rgba(124,58,237,0.07)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#7C3AED' }}>EXPERIENCE &amp; ACHIEVEMENTS</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px,5vw,54px)', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.08 }}>
            Journey &amp; Track Record
          </h2>
        </motion.div>

        {/* ── SECTION 1: WORK EXPERIENCE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75 }}
          style={{
            background: 'linear-gradient(145deg, rgba(11,16,32,0.8) 0%, rgba(5,8,22,0.8) 100%)',
            border: '1px solid rgba(124,58,237,0.15)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '64px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: '#7C3AED' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <span style={{ fontFamily: MONO, fontSize: '10px', color: '#7C3AED', letterSpacing: '0.14em', fontWeight: 600 }}>WORK EXPERIENCE</span>
              <h3 style={{ fontFamily: FONT, fontSize: '24px', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em', marginTop: '8px', margin: 0 }}>
                AI/ML Developer Intern
              </h3>
              <div style={{ fontFamily: FONT, fontSize: '15px', color: '#A78BFA', marginTop: '4px', fontWeight: 600 }}>
                Jayaram Infotech
              </div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: '11px', color: '#475569', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '6px 14px' }}>
              NOV 2024 — PRESENT
            </div>
          </div>

          <p style={{ fontFamily: FONT, fontSize: '16px', color: '#CBD5E1', lineHeight: 1.7, marginBottom: '20px', maxWidth: '800px' }}>
            Worked on <strong>AksharabyasaAI</strong>, an AI-powered handwriting assessment platform.
            Built OCR and computer vision pipelines for handwritten character recognition and automated feedback generation.
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['OCR', 'Computer Vision', 'PyTorch', 'Image Processing', 'Automated Feedback'].map(tag => (
              <span key={tag} style={{
                fontFamily: MONO, fontSize: '10px', color: '#CBD5E1',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '4px', padding: '4px 10px', letterSpacing: '0.05em'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── SECTION 2: TIMELINE & ACHIEVEMENTS GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'start' }}>
          
          {/* Left Column: Timeline */}
          <div>
            <h3 style={{ fontFamily: FONT, fontSize: '20px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em', marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: '#7C3AED' }}>●</span> Trajectory Timeline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {TIMELINE.map((step, idx) => (
                <TimelineItem key={step.year} m={step} index={idx} />
              ))}
            </div>
          </div>

          {/* Right Column: Achievements */}
          <div>
            <h3 style={{ fontFamily: FONT, fontSize: '20px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em', marginBottom: '36px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: '#10B981' }}>🏆</span> Honors &amp; Achievements
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ACHIEVEMENTS.map((ach, idx) => (
                <motion.div
                  key={ach.title}
                  onMouseEnter={() => setHoveredAch(idx)}
                  onMouseLeave={() => setHoveredAch(null)}
                  whileHover={{ y: -2 }}
                  style={{
                    background: '#0B1020',
                    border: `1px solid ${hoveredAch === idx ? `${ach.color}33` : 'rgba(124,58,237,0.09)'}`,
                    borderRadius: '12px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    boxShadow: hoveredAch === idx ? `0 8px 30px ${ach.glow}` : 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                    cursor: 'default',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: `${ach.color}14`,
                    border: `1px solid ${ach.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}>
                    {ach.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: '16px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.01em' }}>
                      {ach.title}
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: '10px', color: '#475569', marginTop: '2px', letterSpacing: '0.02em' }}>
                      {ach.detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
