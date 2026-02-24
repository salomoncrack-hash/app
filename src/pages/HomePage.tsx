import { HeroSection } from '@/sections/HeroSection';
import { GamesSection } from '@/sections/GamesSection';
import { WhyChooseUsSection } from '@/sections/WhyChooseUsSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { CTASection } from '@/sections/CTASection';

export function HomePage() {
  return (
    <main className="w-full">
      <HeroSection />
      <GamesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
