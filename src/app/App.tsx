import '../styles/fonts.css';
import { NavBar }                  from './components/NavBar';
import { HeroSection }             from './components/HeroSection';
import { NumbersSection }          from './components/NumbersSection';
import { FocusAreasSection }       from './components/FocusAreasSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { ResearchSection }         from './components/ResearchSection';
import { JourneySection }          from './components/JourneySection';
import { SkillsSection }           from './components/SkillsSection';
import { ContactSection }          from './components/ContactSection';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <NavBar />
      <main id="main" style={{ overflowX: 'clip' }}>
        <HeroSection />
        <NumbersSection />
        <FocusAreasSection />
        <FeaturedProjectsSection />
        <ResearchSection />
        <JourneySection />
        <SkillsSection />
        <ContactSection />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
