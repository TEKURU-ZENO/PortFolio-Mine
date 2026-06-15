import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const NAV_LINKS = [
  { label: 'Projects',  href: '#projects' },
  { label: 'Focus',     href: '#focus'    },
  { label: 'Research',  href: '#research' },
  { label: 'Journey',   href: '#journey'  },
  { label: 'Notes',     href: '#journal'  },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(5,8,22,0.88)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(124,58,237,0.13)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <motion.div
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7C3AED', boxShadow: '0 0 10px #7C3AED' }}
          />
          <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.2em', color: '#A78BFA' }}>DEV MEHTA</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT, fontSize: '13px', fontWeight: 500, color: '#475569', padding: '4px 0', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#CBD5E1')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => scrollTo('#contact')}
            style={{
              fontFamily: FONT, fontSize: '12px', fontWeight: 600, color: '#ffffff',
              background: 'rgba(124,58,237,0.16)', border: '1px solid rgba(124,58,237,0.35)',
              borderRadius: '6px', padding: '8px 20px', cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.3)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.16)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'; }}
          >
            Connect
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
