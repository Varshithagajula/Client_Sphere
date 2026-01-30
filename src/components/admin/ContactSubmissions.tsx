import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  mobile_number: string;
  city: string;
  created_at: string;
}

const ContactSubmissions = () => {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ContactSubmission[];
    },
  });

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-primary">Contact Form Submissions</h2>
        <p className="text-muted-foreground text-sm">
          View all inquiries from the contact form
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : submissions?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No contact submissions yet.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions?.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">{submission.full_name}</TableCell>
                <TableCell>
                  <a
                    href={`mailto:${submission.email}`}
                    className="text-accent hover:underline"
                  >
                    {submission.email}
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={`tel:${submission.mobile_number}`}
                    className="text-accent hover:underline"
                  >
                    {submission.mobile_number}
                  </a>
                </TableCell>
                <TableCell>{submission.city}</TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(submission.created_at), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ContactSubmissions;
