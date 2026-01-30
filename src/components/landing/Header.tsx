import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">RT</span>
          </div>
          <span className="font-serif text-xl font-bold text-primary-foreground">
            Real<span className="text-accent">Trust</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            Home
          </a>
          <a href="#services" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            Services
          </a>
          <a href="#projects" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            Projects
          </a>
          <a href="#testimonials" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            Contact
          </a>
        </nav>

        <Link to="/admin">
          <Button className="bg-cta hover:bg-cta/90 text-cta-foreground">
            Admin Panel
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
