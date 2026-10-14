// Design tokens shared by components that need raw values (SVG diagrams, motion).
// Mirrors the CSS custom properties in src/styles/site.css.
export const C = {
  bg: '#0B0C0E',
  surface: '#121317',
  surface2: '#18191E',
  line: 'rgba(255,255,255,0.07)',
  lineStrong: 'rgba(255,255,255,0.12)',
  text: '#EDEDEF',
  text2: '#A1A4AC',
  text3: '#787C85',
  accent: '#C6F36B',
  accentRgb: '198,243,107',
  alert: '#FF7A59',
};

export const FONT = "'Geist', system-ui, sans-serif";
export const MONO = "'Geist Mono', ui-monospace, monospace";
export const SERIF = "'Instrument Serif', Georgia, serif";

export const EASE = [0.16, 1, 0.3, 1] as const;
