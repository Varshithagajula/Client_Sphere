import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Client {
  id: string;
  name: string;
  designation: string;
  description: string;
  image_url: string;
}

const TestimonialsSection = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Client[];
    },
  });

  return (
    <section id="testimonials" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-title text-primary-foreground">Happy Clients</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6">
                  <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-4 w-24 mx-auto mb-2" />
                  <Skeleton className="h-3 w-32 mx-auto" />
                </div>
              ))
            : clients?.map((client) => (
                <div
                  key={client.id}
                  className="bg-card rounded-xl p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-accent">
                    <AvatarImage src={client.image_url} alt={client.name} />
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {client.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                    {client.description}
                  </p>
                  <h4 className="font-semibold text-accent">{client.name}</h4>
                  <p className="text-muted-foreground text-xs">{client.designation}</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
