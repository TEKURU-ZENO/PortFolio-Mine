import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CATEGORIES, INDEX, type Category, type IndexProject } from '../data/projects';
import { EASE } from '../theme';
import { Arrow, Chips, Reveal, trackSpotlight } from './primitives';

const COLLAPSED = 9;
type Filter = 'All' | Category;

function ProjectCard({ p }: { p: IndexProject }) {
  const body = (
    <>
      <div className="other-top">
        <h4>{p.name}</h4>
        {p.href && <Arrow />}
      </div>
      <p className="other-domain">{p.domain}</p>
      <p>{p.desc}</p>
      <Chips items={p.stack} />
    </>
  );
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className="card spot other" onMouseMove={trackSpotlight}
      aria-label={`${p.name}: ${p.domain} (opens repository)`}>
      {body}
    </a>
  ) : (
    <div className="card other">{body}</div>
  );
}

export function ProjectIndex() {
  const [filter, setFilter] = useState<Filter>('All');
  const [expanded, setExpanded] = useState(false);

  const matching = filter === 'All' ? INDEX : INDEX.filter(p => p.category === filter);
  const visible = expanded ? matching : matching.slice(0, COLLAPSED);
  const count = (f: Filter) => (f === 'All' ? INDEX.length : INDEX.filter(p => p.category === f).length);

  return (
    <div className="index">
      <Reveal className="index-head">
        <h3>More projects</h3>
        <div className="filters" role="group" aria-label="Filter projects by area">
          {(['All', ...CATEGORIES] as Filter[]).map(f => (
            <button
              key={f}
              type="button"
              className="filter"
              aria-pressed={filter === f}
              onClick={() => { setFilter(f); setExpanded(false); }}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span className="filter-label">{f}</span>
              <span className="filter-count tnum">{count(f)}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="other-grid" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, i) => (
            <motion.div
              key={p.name}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
              transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.03, ease: EASE }}
              style={{ display: 'flex' }}
            >
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {matching.length > COLLAPSED && (
        <div className="index-more">
          <button type="button" className="btn btn--ghost" aria-expanded={expanded} onClick={() => setExpanded(e => !e)}>
            {expanded ? 'Show fewer' : `Show all ${matching.length}`}
          </button>
        </div>
      )}
    </div>
  );
}
