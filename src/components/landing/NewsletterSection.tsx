import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("newsletter_subscriptions").insert({
        email,
      });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920')",
      }}
    >
      <div className="absolute inset-0 bg-primary/85" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Learn more about our listing process, as well as our additional staging and design work.
          </h2>
          <Button className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-6">
            Learn More
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-primary-foreground/20 pt-8 mt-16">
          <nav className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <a href="#home" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
              Home
            </a>
            <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
              Services
            </a>
            <a href="#projects" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
              Projects
            </a>
            <a href="#testimonials" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
              Testimonials
            </a>
            <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground text-sm">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <span className="text-primary-foreground text-sm">Subscribe Us</span>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-48 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-cta hover:bg-cta/90 text-cta-foreground"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-8 text-primary-foreground/60 text-sm">
          <p>© Real Trust 2024. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="text-primary-foreground/80">Email: info@realtrust.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
