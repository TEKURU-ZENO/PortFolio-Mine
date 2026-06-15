import '../styles/fonts.css';
import { NavBar }                  from './components/NavBar';
import { HeroSection }             from './components/HeroSection';
import { NumbersSection }          from './components/NumbersSection';
import { FocusAreasSection }       from './components/FocusAreasSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { ResearchSection }         from './components/ResearchSection';
import { JourneySection }          from './components/JourneySection';
import { SkillsSection }           from './components/SkillsSection';
import { JournalSection }          from './components/JournalSection';
import { ContactSection }          from './components/ContactSection';

export default function App() {
  return (
    <div style={{ background: '#050816', color: '#F8FAFC', overflowX: 'hidden', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <NavBar />
      <HeroSection />
      <NumbersSection />
      <FocusAreasSection />
      <FeaturedProjectsSection />
      <ResearchSection />
      <JourneySection />
      <SkillsSection />
      <JournalSection />
      <ContactSection />
    </div>
  );
}
