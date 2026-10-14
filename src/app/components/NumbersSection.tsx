import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { EASE } from '../theme';
import { Eyebrow, Reveal } from './primitives';

const STATS = [
  { value: 4,    prefix: '',    label: 'Publications',      desc: 'Peer-reviewed papers across surgical AI, single-cell biology, oncology and drug safety' },
  { value: 3,    prefix: '',    label: 'Internships',       desc: 'Regacore, Airawat Research Foundation (IIT Kanpur CoE), Sri Jayaram Infotech' },
  { value: 3,    prefix: '',    label: 'Hackathon podiums', desc: 'Winner, Wobble Designverse · 3rd, AceInt · Top 4 of 300+, Swan Botanicals' },
  { value: 1000, prefix: 'Top', label: 'OpenAI × Outskill', desc: 'Selected builder in the OpenAI developer cohort' },
];

function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(target); return; }
    let t0: number | null = null;
    const tick = (ts: number) => {
      t0 ??= ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, target, duration]);

  return count;
}

function Stat({ value, prefix, label, desc, index }: typeof STATS[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      className="stat"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
    >
      <div className="stat-value tnum" aria-label={`${prefix} ${value}`.trim()}>
        {prefix && <small>{prefix}</small>}{count}
      </div>
      <div className="stat-label">{label}</div>
      <p className="stat-desc">{desc}</p>
    </motion.div>
  );
}

export function NumbersSection() {
  return (
    <section className="section" aria-label="By the numbers" style={{ paddingBlock: 'clamp(72px, 9vw, 112px)' }}>
      <div className="container">
        <Reveal style={{ marginBottom: 'clamp(40px, 5vw, 56px)' }}>
          <Eyebrow index="01">By the numbers</Eyebrow>
        </Reveal>
        <div className="stats-grid">
          {STATS.map((s, i) => <Stat key={s.label} {...s} index={i} />)}
        </div>
      </div>
    </section>
  );
}
