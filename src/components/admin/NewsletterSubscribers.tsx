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

interface Subscription {
  id: string;
  email: string;
  created_at: string;
}

const NewsletterSubscribers = () => {
  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ["newsletter-subscriptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Subscription[];
    },
  });

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-primary">Newsletter Subscribers</h2>
        <p className="text-muted-foreground text-sm">
          View all email subscriptions ({subscriptions?.length || 0} total)
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : subscriptions?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No subscribers yet.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email Address</TableHead>
              <TableHead>Subscribed On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions?.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">
                  <a
                    href={`mailto:${subscription.email}`}
                    className="text-accent hover:underline"
                  >
                    {subscription.email}
                  </a>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(subscription.created_at), "MMM d, yyyy 'at' h:mm a")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default NewsletterSubscribers;
