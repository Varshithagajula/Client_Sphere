import { Target, Paintbrush, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Potential ROI",
    description:
      "We identify high-value opportunities that maximize your investment returns through strategic market analysis.",
  },
  {
    icon: Paintbrush,
    title: "Design",
    description:
      "Our design team transforms properties into stunning spaces that attract buyers and command premium prices.",
  },
  {
    icon: TrendingUp,
    title: "Marketing",
    description:
      "Cutting-edge marketing strategies ensure maximum exposure and faster sales for your property.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-elevated text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Image */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-accent/5 rounded-2xl transform rotate-1" />
          <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
              alt="Modern property"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
              <div className="text-primary-foreground">
                <h3 className="font-serif text-2xl font-bold mb-2">
                  Your Dream Property Awaits
                </h3>
                <p className="text-primary-foreground/80">
                  Discover exceptional properties tailored to your lifestyle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
