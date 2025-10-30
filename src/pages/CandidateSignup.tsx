import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import selectraLogo from "@/assets/selectra-logo.png";
import selectraBg from "@/assets/selectra-bg.jpg";
import { useNavigate } from "react-router-dom";

const CandidateSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Account created successfully. Welcome to SELECTRA!",
      });
      setIsLoading(false);
      navigate("/cv-upload");
    }, 800);
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(213 94% 85% / 0.9), hsl(48 96% 89% / 0.9)), url(${selectraBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={selectraLogo} alt="SELECTRA" className="h-10 w-10" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-selectra-blue to-selectra-yellow bg-clip-text text-transparent">
              SELECTRA
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            AI-Powered Interview Platform
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card className="max-w-md w-full shadow-[var(--shadow-selectra)] bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="absolute left-4 top-4 text-muted-foreground"
            >
              ← Back
            </Button>
            <CardTitle className="text-2xl">Candidate Sign Up</CardTitle>
            <p className="text-muted-foreground">Create your account to apply for jobs</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="John Doe" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-selectra-blue to-selectra-blue-dark hover:from-selectra-blue-dark hover:to-selectra-blue text-white" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal"
                  onClick={() => navigate("/candidate-login")}
                >
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CandidateSignup;
