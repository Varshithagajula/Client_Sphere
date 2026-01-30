import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        full_name: formData.fullName,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        city: formData.city,
      });

      if (error) throw error;

      toast.success("Thank you! We'll get back to you soon.");
      setFormData({ fullName: "", email: "", mobileNumber: "", city: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground animate-fade-up">
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
              Welcome to Real Trust
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Consultation,<br />
              Design,<br />
              <span className="text-accent">&amp; Marketing</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-md mb-8">
              We help you find the perfect property that matches your lifestyle and investment goals.
            </p>
            <Button className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-6 text-lg">
              Explore Properties
            </Button>
          </div>

          {/* Contact Form */}
          <div className="bg-primary/90 backdrop-blur-sm rounded-2xl p-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-2">
              Get a Free Consultation
            </h2>
            <p className="text-primary-foreground/70 mb-6 text-sm">
              Fill out the form and we'll contact you shortly
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Input
                type="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Input
                type="tel"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Input
                type="text"
                placeholder="Area, City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cta hover:bg-cta/90 text-cta-foreground py-6 text-lg font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Get Quick Quote"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
