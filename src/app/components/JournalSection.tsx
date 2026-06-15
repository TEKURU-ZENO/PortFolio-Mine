import { motion } from 'motion/react';

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

const ENTRIES = [
  { title: 'Lessons from Building BioGPT-DDI', tag: 'Healthcare AI', tagColor: '#10B981', date: 'May 2026', readTime: '7 min',
    excerpt: "Fine-tuning a biomedical LLM taught me more about data quality than model architecture. What I learned building BioGPT-DDI — and what I'd do differently." },
  { title: 'Why Agentic AI Is Harder Than It Looks', tag: 'Agentic AI', tagColor: '#7C3AED', date: 'Apr 2026', readTime: '10 min',
    excerpt: "Building multi-agent systems that actually work in production is a different problem than building demos that look impressive. Here's what breaks and why." },
  { title: 'The Future of AI for Science', tag: 'Scientific AI', tagColor: '#22D3EE', date: 'Mar 2026', readTime: '8 min',
    excerpt: "AI won't replace scientists — it'll remove the friction between having a hypothesis and testing it. The bottleneck in science isn't intelligence, it's throughput." },
  { title: 'RAG in Production: What I Learned', tag: 'Engineering', tagColor: '#8B5CF6', date: 'Feb 2026', readTime: '6 min',
    excerpt: "Retrieval-augmented generation sounds simple. In production it's an entire system design problem. Chunking strategies, reranking, and why naive cosine similarity falls apart." },
];

export function JournalSection() {
  return (
    <section id="journal" style={{ background: '#050816', padding: '120px 48px', borderTop: '1px solid rgba(124,58,237,0.07)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}
        >
          <div>
            <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', color: '#7C3AED' }}>NOTES</span>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(32px,5vw,54px)', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.03em', marginTop: '16px', lineHeight: 1.08, marginBottom: 0 }}>
              What I'm Thinking About
            </h2>
          </div>
          <span style={{ fontFamily: MONO, fontSize: '11px', color: '#1E293B', letterSpacing: '0.1em' }}>4 ENTRIES</span>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
          {ENTRIES.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              whileHover={{ y: -4 } as any}
              style={{
                background: '#0B1020',
                border: '1px solid rgba(124,58,237,0.09)',
                borderRadius: '12px', padding: '36px',
                cursor: 'pointer', transition: 'border-color 0.3s',
              }}
              onMouseEnter={el => (el.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)')}
              onMouseLeave={el => (el.currentTarget.style.borderColor = 'rgba(124,58,237,0.09)')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontFamily: MONO, fontSize: '9px', color: e.tagColor, background: `${e.tagColor}14`, border: `1px solid ${e.tagColor}28`, borderRadius: '4px', padding: '4px 10px', letterSpacing: '0.1em' }}>
                  {e.tag}
                </span>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: '#1E293B', letterSpacing: '0.08em' }}>{e.date} · {e.readTime}</span>
              </div>

              <h3 style={{ fontFamily: FONT, fontSize: '18px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em', lineHeight: 1.32, marginBottom: '14px' }}>
                {e.title}
              </h3>
              <p style={{ fontFamily: FONT, fontSize: '14px', color: '#475569', lineHeight: 1.72, marginBottom: '24px' }}>
                {e.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: FONT, fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                Read essay <span style={{ fontSize: '11px' }}>→</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
