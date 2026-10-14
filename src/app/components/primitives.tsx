import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { motion } from 'motion/react';
import { EASE } from '../theme';

/** Fade-and-rise on first scroll into view. */
export function Reveal({ children, delay = 0, y = 18, className, style }: {
  children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <div className="eyebrow">
      {index && <b>{index}</b>}
      {index && <span className="rule" />}
      <span>{children}</span>
    </div>
  );
}

export function SectionHead({ index, label, title, intro }: {
  index: string; label: string; title: ReactNode; intro?: ReactNode;
}) {
  return (
    <Reveal className="section-head">
      <div>
        <Eyebrow index={index}>{label}</Eyebrow>
        <h2 className="h2">{title}</h2>
      </div>
      {intro && <p className="lede">{intro}</p>}
    </Reveal>
  );
}

export function Chips({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return (
    <div className="chips">
      {items.map(t => <span key={t} className={accent ? 'chip chip--accent' : 'chip'}>{t}</span>)}
    </div>
  );
}

/** Feeds the cursor position to `.spot` cards so their border can light up under it. */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export const Arrow = () => <span className="arr" aria-hidden="true">↗</span>;
