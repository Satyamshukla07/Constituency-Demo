import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Event, Issue } from "@shared/schema";
import { EventCard } from "@/components/events/event-card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { user } = useAuth();

  const { data: events } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: issues } = useQuery<Issue[]>({
    queryKey: ["/api/issues"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Magatane Vidhansabha
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay connected with your constituency, participate in events, and help make our community better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events?.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
                <Button asChild className="w-full">
                  <Link href="/events">View All Events</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues?.slice(0, 5).map((issue) => (
                  <div key={issue.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {issue.description}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {issue.location}
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {issue.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Button asChild className="w-full">
                  <Link href="/issues">View All Issues</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user?.role === "admin" && (
                  <Button asChild className="w-full">
                    <Link href="/admin">Admin Dashboard</Link>
                  </Button>
                )}
                <Button asChild className="w-full" variant="outline">
                  <Link href="/issues/new">Report an Issue</Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/volunteer">Become a Volunteer</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
