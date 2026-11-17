import '../styles/fonts.css';
import { MotionConfig } from 'motion/react';
import { NavBar }                  from './components/NavBar';
import { HeroSection }             from './components/HeroSection';
import { DomainsMarquee }          from './components/DomainsMarquee';
import { NumbersSection }          from './components/NumbersSection';
import { FocusAreasSection }       from './components/FocusAreasSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { ResearchSection }         from './components/ResearchSection';
import { JourneySection }          from './components/JourneySection';
import { SkillsSection }           from './components/SkillsSection';
import { ContactSection }          from './components/ContactSection';
import { ScrollProgress }          from './components/primitives';

export default function App() {
  return (
    // reducedMotion="user": transform animations collapse to fades for people who ask for less motion.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <NavBar />
      <main id="main" style={{ overflowX: 'clip' }}>
        <HeroSection />
        <DomainsMarquee />
        <NumbersSection />
        <FocusAreasSection />
        <FeaturedProjectsSection />
        <ResearchSection />
        <JourneySection />
        <SkillsSection />
        <ContactSection />
      </main>
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
