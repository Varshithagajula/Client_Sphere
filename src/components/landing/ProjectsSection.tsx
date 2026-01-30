import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
}

const ProjectsSection = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Projects</h2>
          <p className="section-subtitle">
            We know what buyers are looking for and suggest projects that will bring
            clients top dollar for the sale of their homes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="card-elevated">
                  <Skeleton className="h-48 w-full rounded-lg mb-4" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-28" />
                </div>
              ))
            : projects?.map((project) => (
                <div
                  key={project.id}
                  className="card-elevated group overflow-hidden"
                >
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-accent text-sm font-semibold">
                    {project.category}
                  </span>
                  <h3 className="font-medium text-primary mt-1 mb-1 line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-cta hover:bg-cta/90 text-cta-foreground"
                  >
                    READ MORE
                  </Button>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
