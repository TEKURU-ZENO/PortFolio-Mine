import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE } from '../theme';
import { Chips, Magnetic, MaskText } from './primitives';

const STATS = [
  { val: '25+',     label: 'Projects built' },
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
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Portrait drifts a little slower than the page as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.14]);

  return (
    <section ref={ref} id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />

      <div className="container hero-grid">
        {/* ── Intro ── */}
        <div>
          <motion.div className="eyebrow" {...rise(0)}>
            <span className="status-dot" aria-hidden="true" />
            <span>AI/ML Engineer, open to roles</span>
          </motion.div>

          <h1 id="hero-title" className="hero-name">
            <MaskText onMount delay={0.05}>Dev</MaskText>
            <MaskText onMount delay={0.14}>Mehta</MaskText>
          </h1>

          <motion.p className="hero-tag" {...rise(0.3)}>
            Building autonomous systems for <em>science and society.</em>
          </motion.p>

          <motion.p className="lede" {...rise(0.38)}>
            Agents, voice AI and reliability tooling, measured with real evaluation harnesses. Research in biomedical and scientific AI.
          </motion.p>

          <motion.div className="hero-ctas" {...rise(0.46)}>
            <Magnetic>
              <a href="#projects" className="btn btn--primary">View work</a>
            </Magnetic>
            <a href="/resume.pdf" download="Dev_Mehta_Resume.pdf" className="btn btn--ghost">Resume</a>
          </motion.div>

          <motion.dl className="hero-stats" {...rise(0.54)}>
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
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          aria-label="Profile summary"
        >
          <motion.figure
            className="portrait"
            initial={{ clipPath: 'inset(12% 12% 12% 12% round 22px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 22px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          >
            <motion.img
              src="/dev_mehta_profile.jpg"
              alt="Dev Mehta, smiling, outdoors among trees"
              width={800}
              height={920}
              style={{ y: photoY, scale: photoScale }}
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <figcaption>
              <strong>SRM IST, B.Tech CSE ’27</strong>
              <span className="tnum">CGPA 9.86, Rank 1</span>
            </figcaption>
          </motion.figure>

          <div className="card focus-card">
            <h2>Current focus</h2>
            <Chips items={FOCUS} accent />
            <p className="status">
              Open to AI/ML, GenAI and agentic, Bio-AI, SDE/SWE and forward-deployed engineering roles, plus research
              collaborations. Chennai, open to relocation.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
