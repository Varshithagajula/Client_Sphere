const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cta/20 rounded-full" />
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600"
                alt="Real estate consultation"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="absolute bottom-8 right-8 bg-card rounded-xl p-4 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300"
                alt="Property"
                className="w-32 h-24 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-1 bg-accent rounded-full" />
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                About Us
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
              Not Your Average Realtor
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              With over 15 years of experience in the real estate market, we've helped thousands
              of families find their dream homes. Our approach combines traditional values with
              modern technology to deliver exceptional results.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We believe in building lasting relationships with our clients, going beyond the
              transaction to become your trusted advisor in all real estate matters.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary block">15+</span>
                <span className="text-sm text-muted-foreground">Years Experience</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary block">500+</span>
                <span className="text-sm text-muted-foreground">Properties Sold</span>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-primary block">98%</span>
                <span className="text-sm text-muted-foreground">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
