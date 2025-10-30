import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Building2 } from "lucide-react";
import selectraBg from "@/assets/selectra-bg.jpg";

const OrganizationLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Login successful",
        description: "Welcome back to SELECTRA!"
      });
      setIsLoading(false);
      navigate("/organization-dashboard");
    }, 800);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(213 94% 85% / 0.9), hsl(48 96% 89% / 0.9)), url(${selectraBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Card className="w-full max-w-md shadow-[var(--shadow-selectra)] bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-12 w-12 text-selectra-blue" />
          </div>
          <CardTitle className="text-2xl text-center">Organization Login</CardTitle>
          <CardDescription className="text-center">
            Sign in to manage your job postings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                placeholder="organization@example.com" 
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                name="password"
                placeholder="••••••••" 
                type="password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-selectra-blue to-selectra-blue-dark hover:from-selectra-blue-dark hover:to-selectra-blue text-white" 
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/organization-signup" className="text-selectra-blue hover:underline">
              Sign up
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            <Link to="/" className="text-muted-foreground hover:text-selectra-blue">
              Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationLogin;
