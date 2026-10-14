import { Chips, Reveal, SectionHead } from './primitives';

const TIMELINE: { year: string; title: string; desc: string; tags: string[]; active?: boolean; future?: boolean }[] = [
  {
    year: '2023',
    title: 'Full Stack Development',
    desc: 'Started with full-stack engineering. Built responsive web applications and backend API integrations. Mastered React, Node.js, and cloud hosting.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST APIs'],
  },
  {
    year: '2024',
    title: 'Machine Learning & LLMs',
    desc: 'Transitioned to machine learning. Built retrieval-augmented generation (RAG) pipelines, worked with embeddings, and fine-tuned LLMs on custom domain datasets.',
    tags: ['PyTorch', 'HuggingFace', 'Transformers', 'LangChain'],
  },
  {
    year: '2025',
    title: 'Biomedical AI & Research',
    desc: 'Applied deep learning to healthcare. Published drug-drug interaction research and simulated oncological biological systems using graph neural networks.',
    tags: ['BioGPT', 'Clinical NLP', 'PyTorch Geometric', 'GNNs'],
  },
  {
    year: '2026',
    title: 'Agentic, Voice & Reliability Systems',
    desc: 'Multi-agent systems on LangGraph, a real-time voice agent, and Kafka/Kubernetes reliability tooling with real eval harnesses.',
    tags: ['LangGraph', 'Voice AI', 'Kafka', 'Kubernetes', 'Eval Harnesses'],
    active: true,
  },
  {
    year: 'Future',
    title: 'AI Scientists & Digital Twins',
    desc: 'Exploring the horizon of AI for Science. Creating simulation-driven digital twins and automated hypothesis formulation networks to accelerate scientific discovery.',
    tags: ['Digital Twins', 'Causal ML', 'AI for Science', 'Autonomous Labs'],
    future: true,
  },
];

const EXPERIENCES = [
  {
    role: 'Technical and Creative Intern',
    company: 'Regacore',
    duration: 'JUN 2026 — PRESENT',
    desc: 'Biomarker research platform for longevity and healthcare. Built S3-backed PDF storage and backend authentication, and ML pipelines that track biomarkers.',
    tags: ['AWS S3', 'Authentication', 'ML Pipelines', 'Healthcare AI'],
  },
  {
    role: 'Full Stack AI Engineer Intern',
    company: 'Airawat Research Foundation (IIT Kanpur CoE)',
    duration: 'JUL 2026 — SEP 2026',
    desc: 'Built and deployed LLM systems behind Python APIs, investigated failures from traces, wrote tests that reproduced them, and fixed the root cause.',
    tags: ['LLM Systems', 'Python', 'FastAPI', 'Tracing', 'Testing'],
  },
  {
    role: 'AI/ML Developer Intern',
    company: 'Sri Jayaram Infotech Pvt Ltd',
    duration: 'JAN 2026 — JUN 2026',
    desc: 'Worked on AksharabyasaAI, an AI-powered handwriting assessment platform. Built OCR and computer vision pipelines for handwritten character recognition and automated feedback generation. Shipped to a live client.',
    tags: ['OCR', 'Computer Vision', 'PyTorch', 'Image Processing', 'Automated Feedback'],
  }
];

const ACHIEVEMENTS = [
  { title: 'Rank 1', detail: 'Overall Proficiency Annual Day Award (2025-26)' },
  { title: 'Top 1000 Builders', detail: 'OpenAI × Outskill Program (2026)' },
  { title: 'Winner', detail: 'Wobble Designverse (2025)' },
  { title: '3rd Place', detail: 'AceInt Website Redesign (2025)' },
  { title: 'Top 4 of 300+', detail: 'Swan Botanicals Website Challenge (2025)' },
  { title: 'Top 50 Teams', detail: 'Web of Innovation Hackathon (2026)' },
  { title: 'Google Gemini Student Ambassador', detail: 'Developer Relations Program (2026)' },
  { title: 'President', detail: 'Design & Innovation Club' },
];

export function JourneySection() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <SectionHead
          index="05"
          label="Experience & achievements"
          title={<>Journey &amp; <em>track record</em></>}
          intro="Three internships shipping to real users, alongside a full-time B.Tech in Computer Science."
        />

        {/* ── Work experience ── */}
        <div>
          {EXPERIENCES.map((exp, idx) => {
            const [from, to] = exp.duration.split(/\s+—\s+/);
            return (
              <Reveal key={exp.company} delay={idx * 0.05}>
                <article className="exp">
                  <div className="exp-when tnum">
                    {from} — {to === 'PRESENT' ? <span className="now">Present</span> : to}
                  </div>
                  <div>
                    <h3>{exp.role}</h3>
                    <div className="exp-company">{exp.company}</div>
                    <p>{exp.desc}</p>
                    <Chips items={exp.tags} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="journey-split">
          {/* ── Trajectory ── */}
          <Reveal>
            <h3 className="sub-h">Trajectory <span>2023 → next</span></h3>
            <ol className="tl">
              {TIMELINE.map((m, idx) => (
                <li key={m.year} className={m.active ? 'is-now' : m.future ? 'is-future' : undefined}>
                  <div className="tl-year">{m.year}</div>
                  <div className="tl-spine" aria-hidden="true">
                    <span className="tl-dot" />
                    {idx < TIMELINE.length - 1 && <span className="tl-line" />}
                  </div>
                  <div className="tl-body">
                    <h4>
                      {m.title}
                      {m.active && <span className="chip chip--accent">Now</span>}
                      {m.future && <span className="chip">Horizon</span>}
                    </h4>
                    <p>{m.desc}</p>
                    <Chips items={m.tags} />
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* ── Honors ── */}
          <Reveal delay={0.08}>
            <h3 className="sub-h">Honors &amp; achievements <span>{ACHIEVEMENTS.length}</span></h3>
            <ul className="honors">
              {ACHIEVEMENTS.map(a => {
                const year = a.detail.match(/\((\d{4}(?:-\d{2})?)\)/)?.[1];
                return (
                  <li key={a.title + a.detail}>
                    <strong>{a.title}</strong>
                    {year && <em className="tnum">{year}</em>}
                    <span>{a.detail.replace(/\s*\(\d{4}(?:-\d{2})?\)/, '')}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
