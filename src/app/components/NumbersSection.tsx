import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const STATS = [
  { value: 4,  prefix: '',    suffix: '+', label: 'Research Systems',  desc: 'Advanced autonomous agents and simulation architectures developed' },
  { value: 3,  prefix: '',    suffix: '',  label: 'Publications',      desc: 'Peer-reviewed research and proceedings on AI for Science and drug discovery' },
  { value: 8,  prefix: '',    suffix: '+', label: 'Hackathons',        desc: 'Competed and placed across AI, biomedical, and systems engineering challenges' },
  { value: 1000, prefix: 'Top ', suffix: '',  label: 'OpenAI × Outskill', desc: 'Recognized builders selected globally for the OpenAI Developer cohort' },
];

function useCountUp(target: number, inView: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  const t0  = useRef<number | null>(null);
  const raf = useRef(0);

  useEffect(() => {
    if (!inView) return;
    t0.current = null;
    const tick = (ts: number) => {
      if (!t0.current) t0.current = ts;
      const p = Math.min((ts - t0.current) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, target, duration]);

  return count;
}

function Stat({ value, prefix, suffix, label, desc, index }: typeof STATS[0] & { index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count  = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
      style={{ textAlign: 'center', padding: '0 24px' }}
    >
      <div style={{
        fontFamily: FONT, fontSize: 'clamp(38px, 5vw, 68px)',
        fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, #C4B5FD 0%, #7C3AED 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        marginBottom: '16px',
      }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontFamily: FONT, fontSize: '15px', fontWeight: 600, color: '#CBD5E1', marginBottom: '10px', letterSpacing: '-0.01em' }}>
        {label}
      </div>
      <div style={{ fontFamily: FONT, fontSize: '13px', color: '#334155', lineHeight: 1.65, maxWidth: '210px', margin: '0 auto' }}>
        {desc}
      </div>
    </motion.div>
  );
}

export function NumbersSection() {
  return (
    <section style={{ background: '#050816', padding: '120px 48px', borderTop: '1px solid rgba(124,58,237,0.07)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#7C3AED' }}>BY THE NUMBERS</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ position: 'relative' }}>
              {i > 0 && (
                <div style={{
                  position: 'absolute', left: 0, top: '15%', height: '70%', width: '1px',
                  background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.18), transparent)',
                }} />
              )}
              <Stat {...s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
