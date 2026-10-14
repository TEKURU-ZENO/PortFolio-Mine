import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Focus',    id: 'focus'    },
  { label: 'Work',     id: 'projects' },
  { label: 'Research', id: 'research' },
  { label: 'Journey',  id: 'journey'  },
  { label: 'Skills',   id: 'skills'   },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently crossing the upper third of the viewport.
  useEffect(() => {
    const sections = [...NAV_LINKS.map(l => l.id), 'contact']
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-30% 0px -65% 0px' },
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = NAV_LINKS.map(link => (
    <a
      key={link.id}
      href={`#${link.id}`}
      className="nav-link"
      aria-current={active === link.id ? 'true' : undefined}
      onClick={() => setOpen(false)}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <nav className="container nav-inner" aria-label="Primary">
        <a href="#top" className="nav-logo" onClick={() => setOpen(false)}>
          <i aria-hidden="true" /> Dev Mehta
        </a>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="nav-links">{links}</div>
          <div className="nav-actions">
            <a href="/resume.pdf" download="Dev_Mehta_Resume.pdf" className="btn btn--ghost btn--sm">Resume</a>
            <a href="#contact" className="btn btn--primary btn--sm">Get in touch</a>
          </div>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open
                ? <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                : <path d="M2.5 6h13M2.5 12h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </nav>

      <div id="nav-sheet" className="nav-sheet">
        {links}
        <a href="#contact" className="btn btn--primary" onClick={() => setOpen(false)}>Get in touch</a>
        <a href="/resume.pdf" download="Dev_Mehta_Resume.pdf" className="btn btn--ghost">Download resume</a>
      </div>
    </header>
  );
}
