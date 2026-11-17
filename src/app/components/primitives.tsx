import { useRef, useState, useSyncExternalStore, type CSSProperties, type MouseEvent, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'motion/react';
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

/** Text that rises out of a clipping mask: used for headings so they arrive as one deliberate beat. */
export function MaskText({ children, delay = 0, onMount = false }: { children: ReactNode; delay?: number; onMount?: boolean }) {
  const anim = { y: '0%' };
  return (
    <span className="mask">
      <motion.span
        className="mask-inner"
        initial={{ y: '108%' }}
        {...(onMount ? { animate: anim } : { whileInView: anim, viewport: { once: true, margin: '-40px' } })}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow"><span>{children}</span></div>;
}

export function SectionHead({ title, intro }: { title: ReactNode; intro?: ReactNode }) {
  return (
    <div className="section-head">
      <h2 className="h2"><MaskText>{title}</MaskText></h2>
      {intro && <Reveal delay={0.1}><p className="lede">{intro}</p></Reveal>}
    </div>
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

/** Subscribe to a media query. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    cb => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Pulls its child gently toward a mouse pointer; inert for touch and reduced motion. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.span ref={ref} style={{ x: sx, y: sy, display: 'inline-flex' }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}

/** Thin accent bar showing how far down the page the reader is. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/** Wraps an SVG diagram so its strokes draw themselves the first time it scrolls into view. */
export function DrawOnView({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const [drawn, setDrawn] = useState(false);
  return (
    <motion.div
      className={`${className ?? ''} diagram${drawn ? ' is-drawn' : ''}`}
      role="img"
      aria-label={label}
      onViewportEnter={() => setDrawn(true)}
      viewport={{ once: true, amount: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
