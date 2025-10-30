import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Building2, FileText, Link as LinkIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import selectraLogo from "@/assets/selectra-logo.png";
import selectraBg from "@/assets/selectra-bg.jpg";

interface OrganizationFormData {
  organizationName: string;
  legalDocument: string;
  websiteLink: string;
  companyDescription: string;
  address: string;
  contactNumber: string;
  contactPerson: string;
  jobTitle: string;
  jobDescription: string;
  skills: string;
  experience: string;
  qualification: string;
  responsibilities: string;
  employmentType: string;
  location: string;
}

const OrganizationLanding = () => {
  const [step, setStep] = useState(1);
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preAssessmentQuestions, setPreAssessmentQuestions] = useState<string[]>([""]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<OrganizationFormData>({
    defaultValues: {
      organizationName: "",
      legalDocument: "",
      websiteLink: "",
      companyDescription: "",
      address: "",
      contactNumber: "",
      contactPerson: "",
      jobTitle: "",
      jobDescription: "",
      skills: "",
      experience: "",
      qualification: "",
      responsibilities: "",
      employmentType: "",
      location: "",
    },
  });

  const onSubmit = async (data: OrganizationFormData) => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsLoading(true);
      
      setTimeout(() => {
        const interviewLink = `https://selectra.app/interview/${Math.random().toString(36).substr(2, 9)}`;
        setGeneratedLink(interviewLink);
        setIsLoading(false);
        setStep(3);
        
        toast({
          title: "Success!",
          description: "Job posting and interview link created successfully!",
        });
      }, 1000);
    }
  };

  const addQuestion = () => {
    setPreAssessmentQuestions([...preAssessmentQuestions, ""]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = preAssessmentQuestions.filter((_, i) => i !== index);
    setPreAssessmentQuestions(newQuestions);
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...preAssessmentQuestions];
    newQuestions[index] = value;
    setPreAssessmentQuestions(newQuestions);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: "Copied!",
      description: "Interview link copied to clipboard",
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
              SELECTRA
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Organization Dashboard
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s
                        ? "bg-gradient-to-r from-selectra-blue to-selectra-blue-dark text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && <div className={`w-16 h-1 ${step > s ? "bg-selectra-blue" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              <span>Organization Info</span>
              <span>Job Details</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Step 1: Organization Details */}
          {step === 1 && (
            <Card className="shadow-[var(--shadow-selectra)] bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-selectra-blue" />
                  Organization Details
                </CardTitle>
                <CardDescription>
                  Tell us about your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter organization name" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="legalDocument"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Legal Document URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="websiteLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website Link</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourcompany.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your company..." 
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter organization address" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-selectra-blue to-selectra-blue-dark hover:from-selectra-blue-dark hover:to-selectra-blue text-white"
                      size="lg"
                    >
                      Continue to Job Details
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Job Details */}
          {step === 2 && (
            <Card className="shadow-[var(--shadow-selectra)] bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-selectra-blue" />
                  Job Posting Details
                </CardTitle>
                <CardDescription>
                  Provide details about the position you're hiring for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Senior Software Engineer" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the role and what you're looking for..." 
                              rows={4}
                              {...field}
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="employmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employment Type *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full-time, Part-time, Contract" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location *</FormLabel>
                            <FormControl>
                              <Input placeholder="Remote, New York, etc." {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Required Skills *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List the key skills required for this position..." 
                              rows={3}
                              {...field}
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Required Experience *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 3-5 years" {...field} required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="qualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Required Qualifications *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Educational qualifications and certifications..." 
                              rows={3}
                              {...field}
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="responsibilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Responsibilities *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Main duties and responsibilities..." 
                              rows={4}
                              {...field}
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Pre-Assessment Questions */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <FormLabel>Pre-Assessment Questions (Optional)</FormLabel>
                        <Button 
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addQuestion}
                          className="text-selectra-blue border-selectra-blue hover:bg-selectra-blue-light"
                        >
                          + Add Question
                        </Button>
                      </div>
                      {preAssessmentQuestions.map((question, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder={`Question ${index + 1}`}
                            value={question}
                            onChange={(e) => updateQuestion(index, e.target.value)}
                          />
                          {preAssessmentQuestions.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeQuestion(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-gradient-to-r from-selectra-blue to-selectra-blue-dark hover:from-selectra-blue-dark hover:to-selectra-blue text-white"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          "Generate Interview Link"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Success & Link */}
          {step === 3 && (
            <Card className="shadow-[var(--shadow-selectra)] bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  ✓ Interview Link Generated!
                </CardTitle>
                <CardDescription>
                  Share this link with candidates to start the interview process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-selectra-blue-light/20 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Your Interview Link:</p>
                  <div className="flex gap-2">
                    <Input 
                      value={generatedLink} 
                      readOnly 
                      className="font-mono text-sm bg-white"
                    />
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>✓ Job posting created successfully</p>
                  <p>✓ AI interview configured</p>
                  <p>✓ Link ready to share with candidates</p>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setStep(1);
                      setGeneratedLink("");
                      form.reset();
                    }}
                    className="flex-1"
                  >
                    Create Another Job
                  </Button>
                  <Button 
                    onClick={() => navigate("/organization-dashboard")}
                    className="flex-1 bg-gradient-to-r from-selectra-blue to-selectra-blue-dark hover:from-selectra-blue-dark hover:to-selectra-blue text-white"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrganizationLanding;
