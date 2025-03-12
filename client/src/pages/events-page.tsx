import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import { EventCard } from "@/components/events/event-card";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

export default function EventsPage() {
  const { user } = useAuth();
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        {user?.role === "admin" && (
          <Button asChild>
            <Link href="/events/new">Create Event</Link>
          </Button>
        )}
      </div>

      {events?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No events found.</p>
          {user?.role === "admin" && (
            <Button asChild className="mt-4">
              <Link href="/events/new">Create First Event</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
