import { Arrow, Chips, Reveal, SectionHead } from './primitives';

const PUBLICATIONS: {
  id: string; title: string; journal: string; status: string; year: string; abstract: string;
  highlights: string[]; tags: string[]; repo?: string;
}[] = [
  {
    id: 'orion-pub',
    title: 'ORION: A Hierarchical Surgical World Model for Real-Time, Multi-Agent Operating-Room Intelligence',
    journal: 'JUCCT / IRO (2026)',
    status: 'PEER REVIEWED',
    year: '2026',
    abstract: '12-layer surgical world model: real-time perception, scene graphs, a Gaussian-splatting digital twin and LangGraph clinical reasoning.',
    highlights: ['94.6% / 89.5% phase recognition on Cholec80 / AutoLaparo', 'Runs at 238.7 FPS', 'Post-op notes cut from 20 minutes to under 30 seconds'],
    tags: ['Surgical AI', 'Computer Vision', 'Digital Twins', 'Multi-Agent Systems'],
  },
  {
    id: 'atlas-pub',
    title: 'ATLAS: A Causal Digital Twin Framework for Single-Cell State Simulation',
    journal: 'Published in Wiley ICISD Proceedings (2026)',
    status: 'PEER REVIEWED',
    year: '2026',
    abstract: 'A computational biology framework combining graph neural networks, temporal simulation, and causal reasoning to predict cellular state transitions. Serves as a digital twin for simulating cells under active-learning experimentation.',
    highlights: ['Biological Digital Twin', 'TRRUST Causal Networks Integration', 'Active-Learning Experimentation'],
    tags: ['Computational Biology', 'Causal ML', 'Digital Twins', 'Scanpy'],
  },
  {
    id: 'cerep-pub',
    title: 'CEREP: Graph-Constrained Explainable Reasoning Engine for Multi-Omics Precision Oncology',
    journal: 'Published in IJARCCE',
    status: 'PEER REVIEWED',
    year: '2026',
    abstract: 'A graph-constrained machine learning engine designed for precision oncology. Integrates multi-omics data profiles with cellular pathway graphs to deliver explainable patient-specific drug sensitivity reasoning.',
    highlights: ['Multi-Omics Profiling', 'Precision Oncology', 'Knowledge Graph Constrained'],
    tags: ['Precision Medicine', 'Knowledge Graphs', 'Multi-Omics', 'XAI'],
  },
  {
    id: 'biogpt-ddi',
    title: 'BioGPT-DDI: An AI-Powered System for Drug Interaction Prediction and Explainable Clinical Report Generation',
    journal: 'Published in IJIREEICE (2025)',
    status: 'PEER REVIEWED',
    year: '2025',
    abstract: 'An explainable AI framework combining graph representation learning with biomedical language models. Evaluated on the DDI-2013 benchmark, the model achieves high accuracy in predicting drug-drug interactions while generating human-readable clinical rationale to support pharmacy decision-making.',
    highlights: ['F1 Score: 86.64% on DDI-2013', 'BioGPT & BioBERT Graph Augmentation', 'Explainable Clinical Reports'],
    tags: ['Biomedical NLP', 'Graph Neural Networks', 'Explainable AI', 'Clinical NLP'],
    repo: 'https://github.com/TEKURU-ZENO/BioGPT-DDI',
  },
];

/** Split "ORION: A Hierarchical…" into a highlighted short name and the rest. */
function splitTitle(title: string) {
  const k = title.indexOf(': ');
  return k > 0 && k < 24 ? [title.slice(0, k), title.slice(k + 2)] : [null, title];
}

export function ResearchSection() {
  return (
    <section id="research" className="section">
      <div className="container">
        <SectionHead
          index="04"
          label="Research"
          title={<>Peer-reviewed <em>publications</em></>}
          intro="Four papers across surgical AI, single-cell biology, precision oncology and drug safety."
        />

        <div>
          {PUBLICATIONS.map((pub, idx) => {
            const [name, rest] = splitTitle(pub.title);
            return (
              <Reveal key={pub.id} delay={idx * 0.04}>
                <article className="pub" aria-labelledby={pub.id}>
                  <div className="pub-side">
                    <div className="pub-year tnum">{pub.year}</div>
                    <div className="pub-venue">{pub.journal.replace(/^Published in /, '')}</div>
                  </div>
                  <div>
                    <span className="chip chip--accent">{pub.status.toLowerCase().replace(/^./, c => c.toUpperCase())}</span>
                    <h3 id={pub.id}>
                      {name && <><span className="pub-name">{name}</span>: </>}{rest}
                    </h3>
                    <p className="pub-abstract">{pub.abstract}</p>
                    <ul className="tick-list">
                      {pub.highlights.map(h => <li key={h}>{h}</li>)}
                    </ul>
                    <Chips items={pub.tags} />
                    {pub.repo && (
                      <div style={{ marginTop: 24 }}>
                        <a href={pub.repo} target="_blank" rel="noopener noreferrer" className="link-arrow">
                          Code on GitHub <Arrow />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
