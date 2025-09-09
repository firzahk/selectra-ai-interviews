import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Link as LinkIcon, 
  Users, 
  Calendar, 
  Plus, 
  Eye, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import selectraLogo from "@/assets/selectra-logo.png";
import selectraBg from "@/assets/selectra-bg.jpg";

interface LinkData {
  id: string;
  jobTitle: string;
  createdDate: string;
  applications: number;
  interviews: number;
  status: "active" | "paused" | "closed";
}

const OrganizationDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in real app, this would come from API
  const [dashboardStats] = useState({
    totalLinks: 5,
    totalApplications: 47,
    totalInterviews: 23,
    pendingInterviews: 8,
    completedInterviews: 15,
  });

  const [recentLinks] = useState<LinkData[]>([
    {
      id: "1",
      jobTitle: "Senior Frontend Developer",
      createdDate: "2024-01-15",
      applications: 15,
      interviews: 8,
      status: "active"
    },
    {
      id: "2", 
      jobTitle: "Product Manager",
      createdDate: "2024-01-10",
      applications: 12,
      interviews: 6,
      status: "active"
    },
    {
      id: "3",
      jobTitle: "Data Scientist",
      createdDate: "2024-01-08",
      applications: 20,
      interviews: 9,
      status: "paused"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${selectraBg})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="text-muted-foreground hover:text-selectra-blue"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-border mx-2" />
              <img src={selectraLogo} alt="SELECTRA" className="h-10 w-10" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-selectra-blue to-selectra-yellow bg-clip-text text-transparent">
                SELECTRA Dashboard
              </h1>
            </div>
            <Button 
              onClick={() => navigate("/organization-landing")}
              className="bg-selectra-yellow hover:bg-selectra-yellow/90 text-black font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Link
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building2 className="h-8 w-8 text-selectra-blue" />
                  <div>
                    <CardTitle className="text-2xl text-selectra-blue">
                      Welcome to Your Dashboard
                    </CardTitle>
                    <CardDescription>
                      Monitor your recruitment activities and track candidate progress
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Links Generated</p>
                    <p className="text-3xl font-bold text-selectra-blue">{dashboardStats.totalLinks}</p>
                  </div>
                  <LinkIcon className="h-8 w-8 text-selectra-blue" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-3xl font-bold text-green-600">{dashboardStats.totalApplications}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
                    <p className="text-3xl font-bold text-orange-600">{dashboardStats.totalInterviews}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-3xl font-bold text-purple-600">68%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interview Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Interview Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pending Interviews</span>
                  <span className="text-sm text-gray-600">{dashboardStats.pendingInterviews}</span>
                </div>
                <Progress value={(dashboardStats.pendingInterviews / dashboardStats.totalInterviews) * 100} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completed Interviews</span>
                  <span className="text-sm text-gray-600">{dashboardStats.completedInterviews}</span>
                </div>
                <Progress value={(dashboardStats.completedInterviews / dashboardStats.totalInterviews) * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Applications
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Links */}
          <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Recent Recruitment Links
              </CardTitle>
              <CardDescription>
                Track performance of your active recruitment links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLinks.map((link, index) => (
                  <div key={link.id}>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{link.jobTitle}</h3>
                          <Badge className={getStatusColor(link.status)}>
                            {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Created: {link.createdDate}</p>
                      </div>
                      
                      <div className="flex items-center gap-6 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">{link.applications}</p>
                          <p className="text-xs text-gray-600">Applications</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-orange-600">{link.interviews}</p>
                          <p className="text-xs text-gray-600">Interviews</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                    {index < recentLinks.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;