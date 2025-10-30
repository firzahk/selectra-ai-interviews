import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building2, 
  Link as LinkIcon, 
  Users, 
  Calendar, 
  Plus, 
  Eye, 
  TrendingUp,
  LogOut,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import selectraLogo from "@/assets/selectra-logo.png";
import selectraBg from "@/assets/selectra-bg.jpg";

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [organizationName] = useState("Sample Organization");

  // Demo data
  const stats = {
    totalJobs: 5,
    activeInterviews: 12,
    totalApplications: 48,
    completedInterviews: 8
  };

  const recentJobs = [
    {
      id: "1",
      job_title: "Senior Software Engineer",
      created_at: "2024-03-15",
      status: "active",
      application_count: 15,
      interview_count: 5
    },
    {
      id: "2",
      job_title: "Product Manager",
      created_at: "2024-03-14",
      status: "active",
      application_count: 12,
      interview_count: 4
    },
    {
      id: "3",
      job_title: "UX Designer",
      created_at: "2024-03-13",
      status: "active",
      application_count: 21,
      interview_count: 3
    }
  ];

  const upcomingInterviews = [
    {
      id: "1",
      scheduled_date: "2024-03-20T10:00:00",
      status: "scheduled",
      candidate_name: "John Doe",
      job_title: "Senior Software Engineer"
    },
    {
      id: "2",
      scheduled_date: "2024-03-20T14:00:00",
      status: "scheduled",
      candidate_name: "Jane Smith",
      job_title: "Product Manager"
    },
    {
      id: "3",
      scheduled_date: "2024-03-21T09:00:00",
      status: "scheduled",
      candidate_name: "Mike Johnson",
      job_title: "UX Designer"
    }
  ];

  const handleSignOut = () => {
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account"
    });
    navigate("/");
  };

  const copyInterviewLink = (jobId: string) => {
    const link = `https://selectra.app/interview/${jobId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "Interview link copied to clipboard"
    });
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(213 94% 85% / 0.9), hsl(48 96% 89% / 0.9)), url(${selectraBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={selectraLogo} alt="SELECTRA" className="h-10 w-10" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-selectra-blue to-selectra-yellow bg-clip-text text-transparent">
                SELECTRA
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {organizationName}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
              <p className="text-muted-foreground">
                Here's what's happening with your recruitment
              </p>
            </div>
            <Button 
              onClick={() => navigate("/organization-landing")}
              className="bg-gradient-to-r from-selectra-blue to-selectra-blue-dark hover:from-selectra-blue-dark hover:to-selectra-blue text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Job
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Jobs
                </CardTitle>
                <Building2 className="h-4 w-4 text-selectra-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalJobs}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active job postings
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Applications
                </CardTitle>
                <Users className="h-4 w-4 text-selectra-yellow" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalApplications}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total candidates
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Interviews
                </CardTitle>
                <Calendar className="h-4 w-4 text-selectra-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeInterviews}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  In progress
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedInterviews}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Interviews done
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Job Posts */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Recent Job Posts</CardTitle>
              <CardDescription>Manage your active job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Interviews</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.job_title}</TableCell>
                      <TableCell>{new Date(job.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{job.application_count}</TableCell>
                      <TableCell>{job.interview_count}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => copyInterviewLink(job.id)}
                          >
                            <LinkIcon className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast({
                              title: "View Details",
                              description: "Job details view (demo)"
                            })}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Scheduled AI interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingInterviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">
                        {interview.candidate_name}
                      </TableCell>
                      <TableCell>{interview.job_title}</TableCell>
                      <TableCell>
                        {new Date(interview.scheduled_date).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-selectra-blue text-selectra-blue">
                          {interview.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrganizationDashboard;
