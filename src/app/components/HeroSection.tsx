import { motion } from 'motion/react';
import { EASE } from '../theme';
import { Chips } from './primitives';

const STATS = [
  { val: '15+',     label: 'Projects shipped' },
  { val: '4',       label: 'Peer-reviewed publications' },
  { val: '3',       label: 'Internships' },
  { val: 'Rank #1', label: '2025-26 Annual Day Award' },
];

const FOCUS = ['Agentic AI Systems', 'Voice AI', 'Distributed Systems', 'Biomedical AI'];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export function HeroSection() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-grid">
        {/* ── Intro ── */}
        <div>
          <motion.div className="eyebrow" {...rise(0)}>
            <span className="status-dot" aria-hidden="true" />
            <span>AI/ML Engineer · Chennai, open to relocation</span>
          </motion.div>

          <motion.h1 id="hero-title" className="hero-name" {...rise(0.06)}>
            Dev Mehta
          </motion.h1>

          <motion.p className="hero-tag" {...rise(0.12)}>
            Building autonomous systems for <em>science &amp; society.</em>
          </motion.p>

          <motion.p className="lede" {...rise(0.18)}>
            I build agent systems, real-time voice agents and reliability tooling, and I test them against
            evaluation harnesses rather than demos. My research is in biomedical AI, from drug safety to the
            operating room.
          </motion.p>

          <motion.div className="hero-ctas" {...rise(0.24)}>
            <a href="#projects" className="btn btn--primary">See selected work</a>
            <a href="/resume.pdf" download="Dev_Mehta_Resume.pdf" className="btn btn--ghost">Download resume</a>
            <a href="#research" className="link-arrow">Read the research <span className="arr" aria-hidden="true">↘</span></a>
          </motion.div>

          <motion.dl className="hero-stats" {...rise(0.3)}>
            {STATS.map(s => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd className="tnum">{s.val}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── Portrait + current focus ── */}
        <motion.aside
          className="hero-aside"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          aria-label="Profile summary"
        >
          <figure className="portrait">
            <img
              src="/dev_mehta_profile.jpg"
              alt="Dev Mehta, smiling, outdoors among trees"
              width={800}
              height={920}
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <figcaption>
              <strong>SRM IST · B.Tech CSE ’27</strong>
              <span className="tnum">CGPA 9.86 · Rank 1</span>
            </figcaption>
          </figure>

          <div className="card focus-card">
            <h2>Current focus</h2>
            <Chips items={FOCUS} accent />
            <div className="status">
              <span className="status-dot" aria-hidden="true" />
              <span>
                Open to AI/ML, GenAI &amp; agentic, Bio-AI, SDE/SWE and forward-deployed engineering roles,
                plus research collaborations · Chennai, open to relocation
              </span>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
