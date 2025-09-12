import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import FeaturedTours from '@/components/FeaturedTours';
import CuisineSection from '@/components/CuisineSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedDestinations />
        <FeaturedTours />
        <CuisineSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;