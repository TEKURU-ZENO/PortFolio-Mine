import { useState } from 'react';
import { motion } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const PUBLICATIONS = [
  {
    id: 'biogpt-di',
    title: 'Graph-Augmented LLM Framework for Drug Interaction Prediction and Explainable Clinical Reports',
    journal: 'Published in IJIREEICE (2025)',
    status: 'PEER REVIEWED',
    year: '2025',
    abstract: 'An explainable AI framework combining graph representation learning with biomedical language models. Evaluated on the DDI-2013 benchmark, the model achieves high accuracy in predicting drug-drug interactions while generating human-readable clinical rationale to support pharmacy decision-making.',
    highlights: ['F1 Score: 86.64% on DDI-2013', 'BioGPT & BioBERT Graph Augmentation', 'Explainable Clinical Reports'],
    tags: ['Biomedical NLP', 'Graph Neural Networks', 'Explainable AI', 'Clinical NLP'],
    color: '#8B5CF6',
  },
  {
    id: 'atlas-pub',
    title: 'A Causal Digital Twin Framework for Single-Cell State Simulation',
    journal: 'Published in Wiley ICISD Proceedings (2026)',
    status: 'CONFERENCE PROCEEDINGS',
    year: '2026',
    abstract: 'A computational biology framework combining graph neural networks, temporal simulation, and causal reasoning to predict cellular state transitions. Serves as a digital twin for simulating cells under active-learning experimentation.',
    highlights: ['Biological Digital Twin', 'TRRUST Causal Networks Integration', 'Active-Learning Experimentation'],
    tags: ['Computational Biology', 'Causal ML', 'Digital Twins', 'Scanpy'],
    color: '#10B981',
  },
  {
    id: 'cerep-pub',
    title: 'Graph-Constrained Explainable Reasoning Engine for Multi-Omics Precision Oncology',
    journal: 'Preprint · Research Project (2026)',
    status: 'PREPRINT / RESEARCH',
    year: '2026',
    abstract: 'A graph-constrained machine learning engine designed for precision oncology. Integrates multi-omics data profiles with cellular pathway graphs to deliver explainable patient-specific drug sensitivity reasoning.',
    highlights: ['Multi-Omics Profiling', 'Precision Oncology', 'Knowledge Graph Constrained'],
    tags: ['Precision Medicine', 'Knowledge Graphs', 'Multi-Omics', 'XAI'],
    color: '#22D3EE',
  },
];

export function ResearchSection() {
  const [hoveredPub, setHoveredPub] = useState<string | null>(null);

  return (
    <section id="research" style={{ background: '#040816', padding: '120px 48px', borderTop: '1px solid rgba(124,58,237,0.07)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#7C3AED' }}>RESEARCH</span>
          <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px,5vw,54px)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.1 }}>
            Publications &amp; Preprints
          </h2>
        </motion.div>

        {/* Stack of publications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {PUBLICATIONS.map((pub, idx) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredPub(pub.id)}
              onMouseLeave={() => setHoveredPub(null)}
              style={{
                background: '#070B1A',
                border: '1px solid rgba(124,58,237,0.1)',
                borderLeft: `4px solid ${pub.color}`,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: hoveredPub === pub.id ? `0 12px 40px rgba(124,58,237,0.06)` : 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                transform: hoveredPub === pub.id ? 'translateY(-2px)' : 'none',
              }}
            >
              {/* Top bar */}
              <div style={{ padding: '16px 32px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pub.color, boxShadow: `0 0 8px ${pub.color}` }} />
                <span style={{ fontFamily: MONO, fontSize: '9px', color: pub.color, letterSpacing: '0.18em', fontWeight: 600 }}>{pub.status}</span>
                <span style={{ fontFamily: MONO, fontSize: '9px', color: '#475569', marginLeft: 'auto' }}>{pub.journal}</span>
              </div>

              {/* Body */}
              <div style={{ padding: '32px' }}>
                <h3 style={{ fontFamily: FONT, fontSize: '22px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '16px' }}>
                  {pub.title}
                </h3>

                <p style={{ fontFamily: FONT, fontSize: '14px', color: '#64748B', lineHeight: 1.7, marginBottom: '24px' }}>
                  {pub.abstract}
                </p>

                {/* Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {pub.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ color: pub.color, fontFamily: MONO, fontSize: '10px' }}>↗</span>
                      <span style={{ fontFamily: FONT, fontSize: '13px', color: '#CBD5E1' }}>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  {pub.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: MONO, fontSize: '9px', color: '#475569',
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '4px', padding: '4px 10px', letterSpacing: '0.06em',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '20px' }}>
                  <a href="https://github.com/TEKURU-ZENO" target="_blank" rel="noopener noreferrer" style={{
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: FONT, fontSize: '13px', fontWeight: 600, color: pub.color,
                    background: `${pub.color}0D`, border: `1px solid ${pub.color}22`,
                    borderRadius: '6px', padding: '8px 18px', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${pub.color}18`; e.currentTarget.style.borderColor = `${pub.color}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${pub.color}0D`; e.currentTarget.style.borderColor = `${pub.color}22`; }}
                  >
                    Read Paper <span style={{ fontSize: '10px' }}>↗</span>
                  </a>
                  <a href="https://github.com/TEKURU-ZENO" target="_blank" rel="noopener noreferrer" style={{
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: FONT, fontSize: '13px', fontWeight: 600, color: '#475569',
                    borderRadius: '6px', padding: '8px 18px', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#CBD5E1')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                  >
                    GitHub Repo <span style={{ fontSize: '10px' }}>↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
