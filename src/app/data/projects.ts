// Project content. Featured projects get a diagram (see FeaturedProjectsSection);
// everything else lives in the filterable index.

export type Category = 'AI & Agents' | 'Bio & Science' | 'Systems' | 'Web & Product';

export type FeaturedProject = {
  id: string;
  name: string;
  domain: string;
  desc: string;
  impact: string[];
  stack: string[];
  github?: string;
};

export type IndexProject = {
  name: string;
  domain: string;
  category: Category;
  desc: string;
  stack: string[];
  href?: string;
};

const GH = 'https://github.com/TEKURU-ZENO/';

export const FEATURED: FeaturedProject[] = [
  {
    id: 'astraeus',
    name: 'ASTRAEUS',
    domain: 'Scientific intelligence for astronomy',
    desc: 'Classifies astronomical transients from survey light curves, with calibrated uncertainty and an explicit envelope for when its predictions can be trusted.',
    impact: [
      'Physical-feature random forest outperforms the Astromer sequence model (0.59 vs 0.53)',
      '90% conformal prediction sets with a defined safe operating envelope',
      'External-validity audit on the BTS benchmark plus a sealed spatial hold-out',
      '27 of 27 tests passing on a frozen champion model',
    ],
    stack: ['Python', 'Random Forest', 'Conformal prediction', 'Astromer', 'ZTF', 'LangGraph'],
    github: GH + 'ASTRAEUS',
  },
  {
    id: 'persephone',
    name: 'PERSEPHONE',
    domain: 'Precision oncology decision support',
    desc: 'A virtual tumor board. Agents run as a DAG over a biomedical knowledge graph, with a tumor-dynamics simulator and counterfactual “what if we changed therapy” reasoning.',
    impact: [
      'External validation on 1,100+ unseen tumors, reported with confidence intervals',
      'Leakage-controlled benchmark: evidence and answer key come from different sources',
      'Safety gate holds at 0% unsafe recommendations',
      'Tumor-dynamics simulator with causal counterfactuals',
    ],
    stack: ['Python', 'PyTorch', 'Knowledge graph', 'Ollama', 'Docker'],
    github: GH + 'PERSEPHONE',
  },
  {
    id: 'evanthea',
    name: 'EVANTHEA',
    domain: 'Protein engineering with language models',
    desc: 'Closed-loop protein sequence optimisation: protein language-model features, multi-objective evolution and reinforcement learning, behind structural quality gates.',
    impact: [
      'Two ProteinGym deep-mutational-scanning targets under one leakage-controlled protocol',
      'GFP fitness prediction at Spearman ρ 0.655 with a hybrid gradient-boosted model',
      'TEM-1 β-lactamase at ρ 0.504, and 0.45 with whole positions held out',
      'Baselines, top-10 enrichment and a biological account of how each target transfers',
    ],
    stack: ['Python', 'PyTorch', 'ESM', 'ProteinGym', 'HistGBDT', 'PPO'],
    github: GH + 'EVANTHEA',
  },
  {
    id: 'a11ylab',
    name: 'A11YLab',
    domain: 'Accessibility engineering on Grafana',
    desc: 'Finds and fixes accessibility defects in a data-dense observability app, then locks each fix in with regression tests and real screen-reader passes.',
    impact: [
      'Defects and fixes verified against live upstream Grafana code',
      'Regression tests with Playwright and axe-core',
      'Hands-on NVDA and VoiceOver testing',
      'WCAG and ARIA patterns for dense dashboards and charts',
    ],
    stack: ['TypeScript', 'React', 'Playwright', 'axe-core', 'NVDA', 'VoiceOver'],
    github: GH + 'A11YLab-Accessibility-Engineering-for-Complex-Web-Applications',
  },
  {
    id: 'counter',
    name: 'COUNTER',
    domain: 'Real-time voice agent for ordering and payments',
    desc: 'A phone ordering agent for independent takeaway restaurants. It takes the order by voice, handles interruptions and turn-taking, calls tools mid-call and gets it paid, with a ledger that checks every step.',
    impact: [
      'Adversarial LLM-caller evaluation across 2 models, with confidence intervals',
      '6 of 6 attack scenarios resisted',
      'End-to-end timing pipeline for measured latency',
      '128 tests green',
    ],
    stack: ['Python', 'Whisper', 'OpenAI', 'Twilio', 'Telnyx', 'PayPal', 'Postgres'],
    github: GH + 'COUNTER',
  },
  {
    id: 'recoup',
    name: 'Recoup',
    domain: 'Payment recovery engine',
    desc: 'A deterministic state machine decides what’s allowed on a failed payment. The LLM only writes the message, inside a validated payload.',
    impact: [
      'Paired common-random-numbers benchmark with confidence intervals and a null test',
      'State machine with regulatory guards, plus audit and refusal ledgers',
      '100% policy legality across 400 simulated payment.failed events',
      '132 tests',
    ],
    stack: ['Python', 'FastAPI', 'Pydantic', 'Razorpay API', 'Next.js', 'LiveKit'],
    github: GH + 'Recoup',
  },
];

export const CATEGORIES: Category[] = ['AI & Agents', 'Bio & Science', 'Systems', 'Web & Product'];

export const INDEX: IndexProject[] = [
  {
    name: 'BioGPT-DDI', domain: 'Drug-interaction intelligence', category: 'Bio & Science',
    desc: 'Mechanism-aware drug interaction engine covering CYP and P-gp pathways, pharmacokinetics and CPIC phenoconversion, with source-cited reports. Published in IJIREEICE; 250 tests.',
    stack: ['Python', 'FastAPI', 'React', 'CPIC'], href: GH + 'BioGPT-DDI',
  },
  {
    name: 'AMORA', domain: 'Agentic matchmaking', category: 'AI & Agents',
    desc: 'Agents build evidence-backed profiles and run turn-by-turn simulated dates. A live LLM study cut prediction error by 27%, and an O(N²) fix removes 99.4% of comparisons at 1,000 users.',
    stack: ['Python', 'Claude', 'Ollama', 'FastAPI', 'Pydantic'], href: GH + 'AMORA',
  },
  {
    name: 'ARBITER', domain: 'LLM-as-judge evaluation', category: 'AI & Agents',
    desc: 'Evaluation infrastructure for LLM judges with uncertainty bounds, agreement correction (Cohen’s kappa) and a sandboxed HumanEval benchmark. 154 tests.',
    stack: ['Python', 'LangGraph', 'FastAPI', 'Postgres', 'Qdrant'], href: GH + 'ARBITER',
  },
  {
    name: 'SELENE-OS', domain: 'Multi-agent operating system', category: 'AI & Agents',
    desc: 'Governed agent runtime with MCP tools, human-in-the-loop, sandboxing and hybrid BM25 retrieval. On its benchmark: 100% task success and a 2.71× parallel-DAG speedup.',
    stack: ['Python', 'LangGraph', 'FastAPI', 'PostgreSQL', 'Redis'], href: GH + 'SELENE-OS',
  },
  {
    name: 'HECATE', domain: 'Self-healing SRE platform', category: 'Systems',
    desc: 'Seven agents on a Kafka bus detect, diagnose and remediate incidents on Kubernetes. A retrained isolation forest raised precision from 46.8% to 99.3% on a realistic trace.',
    stack: ['Python', 'Kafka', 'Kubernetes', 'Prometheus', 'Jaeger'], href: GH + 'HECATE',
  },
  {
    name: 'TERRAMIND', domain: 'Geospatial flood intelligence', category: 'Bio & Science',
    desc: 'Uncertainty-aware flood mapping from Sentinel-1 and Sentinel-2 imagery: a U-Net ensemble with confidence intervals, held-out generalisation tests and an RL planner in simulation.',
    stack: ['PyTorch', 'U-Net', 'Sentinel-1/2', 'PPO', 'LangGraph'], href: GH + 'TERRAMIND',
  },
  {
    name: 'ATLASC', domain: 'Causal perturbation genomics', category: 'Bio & Science',
    desc: 'Intervention-aware simulation of single-cell dynamics under gene perturbations, with a 12-seed active-learning benchmark (paired t-test, Wilcoxon, bootstrap CIs) and calibration analysis.',
    stack: ['Python', 'Causal ML', 'FastAPI', 'Next.js'], href: GH + 'ATLASC',
  },
  {
    name: 'PSYCHE', domain: 'Mental-health cognitive twin', category: 'Bio & Science',
    desc: 'A GRU trained on public EMA mood data beats the Holt forecasting baseline on every held-out metric, on a participant-disjoint split. A crisis circuit breaker guards every entry point.',
    stack: ['Python', 'GRU', 'FastAPI', 'PostgreSQL', 'Next.js'], href: GH + 'PSYCHE-Predictive-System-for-Cognition-Habits-Evolution',
  },
  {
    name: 'SIDEQUEST', domain: 'Real-time creator tooling', category: 'Web & Product',
    desc: 'Twitch community world engine on an event-sourced DDD monorepo, with a transactional outbox and EventSub de-duplication. Builds and tests green out of the box.',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Twitch EventSub'], href: GH + 'SIDEQUEST',
  },
  {
    name: 'FAULTLINE', domain: 'Agentic incident RCA', category: 'Systems',
    desc: 'A multi-agent incident commander whose memory lives in a graph database, using real Cypher queries and graph algorithms to trace root causes.',
    stack: ['Python', 'FalkorDB', 'LangGraph', 'FastAPI', 'OpenTelemetry'], href: GH + 'FAULTLINE',
  },
  {
    name: 'ATLAS-SENTINEL', domain: 'Industrial safety intelligence', category: 'Systems',
    desc: 'Compound-risk scoring over 9,000 rows of simulated sensor data, validated against incident windows for lead time, precision and false-alarm rate.',
    stack: ['Python', 'FastAPI', 'SQLite', 'Next.js'], href: GH + 'ATLAS-SENTINEL',
  },
  {
    name: 'Protea', domain: 'Protein-interaction networks', category: 'Bio & Science',
    desc: 'GraphSAGE over the STRING interaction network, scoring about 0.79 with ROC-AUC and PR-AUC computed from real held-out predictions.',
    stack: ['Python', 'GraphSAGE', 'ESM', 'FastAPI', 'Next.js'], href: GH + 'Protea',
  },
  {
    name: 'MIRROR', domain: 'Field incident assessment', category: 'Web & Product',
    desc: 'Offline-first progressive web app for field incident reports, with evidence provenance and documented architecture decisions.',
    stack: ['TypeScript', 'React', 'Vite', 'Firebase', 'PWA'], href: GH + 'MIRROR',
  },
  {
    name: 'NEXUS GRID', domain: 'Infrastructure intelligence', category: 'Systems',
    desc: 'Streams infra telemetry through Spark, models the system as a Neo4j dependency graph, and forecasts anomalies and capacity before they hit.',
    stack: ['Spark', 'Kafka', 'Delta Lake', 'Neo4j', 'Go'],
  },
  {
    name: 'FORGE / Nexus Studio', domain: 'Collaborative AI workspace', category: 'AI & Agents',
    desc: 'Collaborative AI dev workspace. I own the agent layer, including a browser agent that drives web actions on its own.',
    stack: ['Python', 'LangGraph', 'React'], href: 'https://github.com/anjali-0404/Multiagent',
  },
  {
    name: 'OCR Document Reading System', domain: 'Hospital records, with SIMS Chennai', category: 'AI & Agents',
    desc: 'Hospital Information System plugin that reads printed and handwritten medical documents, then digitises and summarises them.',
    stack: ['PaddleOCR', 'TrOCR', 'Gemini', 'FastAPI'],
  },
  {
    name: 'VeriX', domain: 'Resilience testing', category: 'Web & Product',
    desc: 'Full-stack app with a network failure simulator built in, so resilience is tested, not assumed.',
    stack: ['Angular 17', 'TypeScript', 'Node', 'MongoDB', 'Docker'], href: GH + 'VeriX',
  },
  {
    name: 'Diagnostic Booking Backend', domain: 'Healthcare payments', category: 'Systems',
    desc: 'Test booking with mock payments and idempotent webhooks. Built as a take-home for EVE Healthcare.',
    stack: ['Backend', 'Payments', 'Webhooks'], href: GH + 'Diagnostic-Healthcare-Booking-Payment-Backend',
  },
  {
    name: 'Aperture 3.0', domain: 'Open source', category: 'Systems',
    desc: 'Upstream open-source contribution, merged.',
    stack: ['Open Source'],
  },
  {
    name: 'NOVA', domain: 'Desktop utility', category: 'Web & Product',
    desc: 'Windows desktop file organiser that watches folders and sorts in real time, with full undo history.',
    stack: ['C#', '.NET', 'WPF', 'SQLite'],
  },
  {
    name: 'DesignVerse', domain: 'Hackathon winner', category: 'Web & Product',
    desc: 'A natural language to UI generator that converts plain English descriptions into React elements.',
    stack: ['React', 'TypeScript', 'OpenAI API', 'Next.js'], href: GH + 'Designverse',
  },
  {
    name: 'Luxury Peaks', domain: 'Hospitality booking', category: 'Web & Product',
    desc: 'A premium hospitality and booking platform with a high-end, responsive booking interface.',
    stack: ['React', 'Node.js', 'Tailwind CSS'], href: GH + 'Luxury_Peaks',
  },
];

/** Breadth strip under the hero: one entry per domain the work actually covers. */
export const DOMAINS = [
  'Astronomy', 'Precision oncology', 'Protein engineering', 'Drug safety', 'Single-cell genomics',
  'Surgical AI', 'Mental health', 'Flood mapping', 'Payments', 'Voice agents', 'Site reliability',
  'Accessibility', 'Industrial safety', 'Creator tools',
];
