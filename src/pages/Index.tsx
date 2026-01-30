import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import NewsletterSection from "@/components/landing/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Index;
