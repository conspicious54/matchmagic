import { useEffect } from 'react';
import { Navigation } from '../components/layout/Navigation';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { Testimonials } from '../components/home/Testimonials';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { PacksSection } from '../components/home/PacksSection';
import { PhotoWall } from '../components/home/PhotoWall';
import { ComparisonSection } from '../components/home/ComparisonSection';
import { CustomerReviews } from '../components/home/CustomerReviews';
import { TinderMatches } from '../components/home/TinderMatches';

function HomePage() {
  useEffect(() => {
    document.title = 'PhotoMatchAI | Optimize Your Dating Photos With AI';
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100">
      <Navigation />
      <HeroSection />
      <Testimonials />
      <TinderMatches />
      <FeaturesSection />
      <HowItWorks />
      <PacksSection />
      <PhotoWall />
      <ComparisonSection />
      <CustomerReviews />
      <Footer />
    </div>
  );
}

export default HomePage;