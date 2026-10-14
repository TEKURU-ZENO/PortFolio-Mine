import { Arrow, Chips, Eyebrow, Reveal } from './primitives';

const LINKS = [
  { label: 'Email',    value: 'devmehta060505@gmail.com',            href: 'mailto:devmehta060505@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/dev-mehta-1861bb2a0', href: 'https://www.linkedin.com/in/dev-mehta-1861bb2a0' },
  { label: 'GitHub',   value: 'github.com/TEKURU-ZENO',              href: 'https://github.com/TEKURU-ZENO' },
  { label: 'Resume',   value: 'Download PDF',                        href: '/resume.pdf', download: 'Dev_Mehta_Resume.pdf' },
];

const ROLES = ['AI / ML Engineer', 'GenAI & Agentic AI', 'Bio-AI', 'SDE / SWE', 'Forward Deployed Engineer'];

export function ContactSection() {
  return (
    <section id="contact" className="section" style={{ paddingBottom: 40 }}>
      <div className="container">
        <div className="contact-grid">
          <Reveal>
            <Eyebrow index="07">Contact</Eyebrow>
            <h2 className="contact-title">
              Let’s build something <em>meaningful.</em>
            </h2>
            <p className="lede">
              I’m open to research collaborations, engineering roles, and ambitious projects at the
              intersection of AI and real-world impact.
            </p>

            <div className="contact-meta">
              <div><span className="status-dot" aria-hidden="true" /> Open to roles now · Chennai, open to relocation</div>
              <div>Languages: English, Hindi, Tamil</div>
            </div>

            <div style={{ marginTop: 28 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Roles I’m looking for</div>
              <Chips items={ROLES} accent />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="contact-links">
              {LINKS.map(lk => (
                <li key={lk.label}>
                  <a
                    href={lk.href}
                    {...(lk.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(lk.download ? { download: lk.download } : {})}
                  >
                    <span className="k">{lk.label}</span>
                    <span className="v">{lk.value}</span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <footer className="footer">
          <span>Dev Mehta · AI/ML Engineer · Chennai</span>
          <span>© 2026 · <a href="#top">Back to top ↑</a></span>
        </footer>
      </div>
    </section>
  );
}
