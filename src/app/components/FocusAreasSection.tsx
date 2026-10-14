import { Chips, Reveal, SectionHead, trackSpotlight } from './primitives';

const AREAS = [
  {
    title: 'Agentic AI Systems',
    items: ['LangGraph', 'Tool Calling', 'RAG', 'Pydantic', 'Critique Loops', 'Eval Harnesses'],
    desc: 'Building multi-agent architectures capable of planning, reasoning, memory retention, adversarial critique, and autonomous execution.',
  },
  {
    title: 'Voice AI',
    items: ['Whisper', 'LiveKit', 'WebRTC', 'Twilio', 'Telnyx'],
    desc: 'Real-time voice agents with streaming speech, barge-in, turn-taking and tool calls in the middle of a live phone call.',
  },
  {
    title: 'Reliability & Distributed Systems',
    items: ['Kafka', 'Kubernetes', 'Spark', 'Prometheus', 'Grafana', 'Jaeger'],
    desc: 'Event-driven systems that detect, explain and fix failures. Kafka, Kubernetes, Spark and real observability, not slideware.',
  },
  {
    title: 'Biomedical AI',
    items: ['BioGPT', 'BioBERT', 'GNNs', 'Clinical NLP', 'Single-Cell AI', 'Causal ML', 'Surgical CV'],
    desc: 'Applying language models, graph learning, causal modelling and computer vision to drug safety, single-cell biology, oncology and the operating room.',
  },
];

export function FocusAreasSection() {
  return (
    <section id="focus" className="section">
      <div className="container">
        <SectionHead
          index="02"
          label="Focus areas"
          title={<>What I <em>build</em></>}
          intro="Four areas I keep coming back to. They share one habit: decide what the system is allowed to do, then measure whether it did."
        />

        <div className="focus-grid">
          {AREAS.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.06} style={{ display: 'flex' }}>
              <article className="card spot area" onMouseMove={trackSpotlight} style={{ flex: 1 }}>
                <div className="area-top">
                  <h3>{area.title}</h3>
                  <span className="area-index">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p>{area.desc}</p>
                <Chips items={area.items} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
