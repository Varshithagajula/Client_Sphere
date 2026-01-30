import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ProjectsManager from "@/components/admin/ProjectsManager";
import ClientsManager from "@/components/admin/ClientsManager";
import ContactSubmissions from "@/components/admin/ContactSubmissions";
import NewsletterSubscribers from "@/components/admin/NewsletterSubscribers";
import { LogOut, LayoutDashboard, FolderKanban, Users, Mail, Newspaper } from "lucide-react";
import { User } from "@supabase/supabase-js";

const AdminPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold">Admin Dashboard</h1>
              <p className="text-primary-foreground/70 text-sm">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
              View Website
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger value="projects" className="flex items-center gap-2 data-[state=active]:bg-cta data-[state=active]:text-cta-foreground">
              <FolderKanban className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2 data-[state=active]:bg-cta data-[state=active]:text-cta-foreground">
              <Users className="w-4 h-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2 data-[state=active]:bg-cta data-[state=active]:text-cta-foreground">
              <Mail className="w-4 h-4" />
              Contact Forms
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center gap-2 data-[state=active]:bg-cta data-[state=active]:text-cta-foreground">
              <Newspaper className="w-4 h-4" />
              Newsletter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="clients">
            <ClientsManager />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactSubmissions />
          </TabsContent>

          <TabsContent value="newsletter">
            <NewsletterSubscribers />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;
