import { DOMAINS } from '../data/projects';

/** One slow strip under the hero that shows the breadth of domains at a glance. */
export function DomainsMarquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {DOMAINS.map(d => <li key={d}>{d}</li>)}
    </ul>
  );
  return (
    <section className="marquee" aria-label="Domains I have built in">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
