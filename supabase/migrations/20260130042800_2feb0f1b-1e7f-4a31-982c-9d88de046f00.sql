-- Create projects table
CREATE TABLE public.projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'Consultation',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clients table (for testimonials)
CREATE TABLE public.clients (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    city TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter_subscriptions table
CREATE TABLE public.newsletter_subscriptions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Projects: Public read, authenticated write
CREATE POLICY "Anyone can view projects"
ON public.projects FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert projects"
ON public.projects FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON public.projects FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete projects"
ON public.projects FOR DELETE
TO authenticated
USING (true);

-- Clients: Public read, authenticated write
CREATE POLICY "Anyone can view clients"
ON public.clients FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert clients"
ON public.clients FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients"
ON public.clients FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete clients"
ON public.clients FOR DELETE
TO authenticated
USING (true);

-- Contact submissions: Anyone can insert, authenticated can view
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (true);

-- Newsletter: Anyone can subscribe, authenticated can view
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscriptions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscriptions"
ON public.newsletter_subscriptions FOR SELECT
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample projects
INSERT INTO public.projects (name, description, image_url, category) VALUES
('Luxury Estate, Beverly Hills', 'A stunning 5-bedroom estate with panoramic city views and modern amenities.', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'Consultation'),
('Modern Villa, Malibu', 'Contemporary beachfront property featuring floor-to-ceiling windows.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 'Design'),
('Family Home, Santa Monica', 'Charming family residence with a beautiful garden and spacious interiors.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', 'Marketing & Design'),
('Penthouse Suite, Downtown LA', 'Exclusive penthouse offering luxury living in the heart of the city.', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'Consultation & Marketing'),
('Colonial Mansion, Pasadena', 'Historic property with classic architecture and modern upgrades.', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', 'Consultation');

-- Insert sample clients
INSERT INTO public.clients (name, designation, description, image_url) VALUES
('Rowhan Smith', 'CEO, Foreclosure', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('Shipra Kayak', 'Brand Designer', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
('John Lepore', 'CEO, Foreclosure', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
('Marry Freeman', 'Marketing Manager at Mixit', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'),
('Lucy', 'Sales Rep at Alibaba', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');