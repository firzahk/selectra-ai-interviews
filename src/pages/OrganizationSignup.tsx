import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Building2 } from "lucide-react";
import selectraBg from "@/assets/selectra-bg.jpg";

const OrganizationSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Account created successfully",
        description: "Welcome to SELECTRA! Please complete your organization profile"
      });
      setIsLoading(false);
      navigate("/organization-landing");
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
          <CardTitle className="text-2xl text-center">Create Organization Account</CardTitle>
          <CardDescription className="text-center">
            Sign up to start posting jobs and managing candidates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword"
                name="confirmPassword"
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
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/organization-login" className="text-selectra-blue hover:underline">
              Sign in
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

export default OrganizationSignup;
