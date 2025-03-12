import { useQuery } from "@tanstack/react-query";
import { Issue } from "@shared/schema";
import { IssueForm } from "@/components/issues/issue-form";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

export default function IssuesPage() {
  const { user } = useAuth();
  const { data: issues, isLoading } = useQuery<Issue[]>({
    queryKey: ["/api/issues"],
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Community Issues</h1>
          
          <div className="space-y-6">
            {issues?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No issues reported yet.</p>
              </div>
            ) : (
              issues?.map((issue) => (
                <Card key={issue.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {issue.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {issue.status === "resolved" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                      <span className="text-sm font-medium capitalize">
                        {issue.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    {issue.location && (
                      <span className="flex items-center gap-1">
                        📍 {issue.location}
                      </span>
                    )}
                    <span>
                      Reported on {format(new Date(issue.createdAt), "PPP")}
                    </span>
                  </div>
                  
                  {user?.role === "admin" && issue.status !== "resolved" && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Implement status update mutation
                        }}
                      >
                        Mark as Resolved
                      </Button>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Report an Issue</h2>
            <IssueForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
