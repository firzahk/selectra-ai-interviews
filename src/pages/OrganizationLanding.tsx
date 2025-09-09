import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Building2, FileText, Link as LinkIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import selectraLogo from "@/assets/selectra-logo.png";
import selectraBg from "@/assets/selectra-bg.jpg";

interface OrganizationFormData {
  organizationName: string;
  businessAddress: string;
  email: string;
  contactInfo: string;
  representativeName: string;
  whySelectra: string;
  legalDocument: File | null;
  jobDescription: string;
}

const OrganizationLanding = () => {
  const [step, setStep] = useState(1);
  const [generatedLink, setGeneratedLink] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<OrganizationFormData>({
    defaultValues: {
      organizationName: "",
      businessAddress: "",
      email: "",
      contactInfo: "",
      representativeName: "",
      whySelectra: "",
      legalDocument: null,
      jobDescription: "",
    },
  });

  const onSubmitOrgInfo = (data: Partial<OrganizationFormData>) => {
    console.log("Organization info:", data);
    setStep(2);
    toast({
      title: "Organization Information Saved",
      description: "Now please provide the job description.",
    });
  };

  const onSubmitJobDescription = (data: OrganizationFormData) => {
    console.log("Job description:", data.jobDescription);
    setStep(3);
    toast({
      title: "Job Description Saved",
      description: "You can now generate your recruitment link.",
    });
  };

  const generateLink = () => {
    const linkId = Math.random().toString(36).substr(2, 9);
    const link = `https://selectra.app/apply/${linkId}`;
    setGeneratedLink(link);
    setStep(4);
    toast({
      title: "Link Generated Successfully!",
      description: "Your recruitment link is ready to share.",
    });
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
                SELECTRA - Organization
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Step 1: Organization Information */}
            {step === 1 && (
              <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Building2 className="h-12 w-12 text-selectra-blue" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-selectra-blue">
                    Organization Registration
                  </CardTitle>
                  <CardDescription>
                    Please provide your organization details to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitOrgInfo)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="organizationName"
                        rules={{ required: "Organization name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your organization name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessAddress"
                        rules={{ required: "Business address is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Address *</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter your complete business address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        rules={{ 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="business@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactInfo"
                        rules={{ required: "Contact information is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Information *</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone number and other contact details" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="representativeName"
                        rules={{ required: "Representative name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Representative Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Name of the person representing the organization" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="whySelectra"
                        rules={{ required: "Please tell us why you're choosing SELECTRA" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Why are you choosing SELECTRA? *</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tell us about your recruitment needs and why you chose SELECTRA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <Label htmlFor="legal-doc">Legal Document (Business Registration/License) *</Label>
                        <div className="mt-2 flex items-center justify-center w-full">
                          <label htmlFor="legal-doc" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-gray-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> legal document
                              </p>
                              <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 10MB)</p>
                            </div>
                            <input id="legal-doc" type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                          </label>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-selectra-blue hover:bg-selectra-blue/90 text-white">
                        Continue to Job Description
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Job Description */}
            {step === 2 && (
              <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <FileText className="h-12 w-12 text-selectra-blue" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-selectra-blue">
                    Job Description
                  </CardTitle>
                  <CardDescription>
                    Provide detailed job description for the position you're hiring for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitJobDescription)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="jobDescription"
                        rules={{ required: "Job description is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter detailed job description including:
- Job title and role summary
- Key responsibilities
- Required qualifications and skills
- Experience requirements
- Salary range (optional)
- Benefits and perks
- Company culture information"
                                className="min-h-[300px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                          Back
                        </Button>
                        <Button type="submit" className="flex-1 bg-selectra-blue hover:bg-selectra-blue/90 text-white">
                          Continue to Generate Link
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Generate Link */}
            {step === 3 && (
              <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <LinkIcon className="h-12 w-12 text-selectra-yellow" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-selectra-blue">
                    Generate Recruitment Link
                  </CardTitle>
                  <CardDescription>
                    Create a unique link for candidates to apply for this position
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-6">
                    <p className="text-gray-600">
                      Click the button below to generate a unique recruitment link that you can share with potential candidates.
                    </p>
                    
                    <Button 
                      onClick={generateLink}
                      className="w-full bg-selectra-yellow hover:bg-selectra-yellow/90 text-black font-bold py-4 text-lg"
                    >
                      GENERATE LINK
                    </Button>

                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(2)}
                      className="w-full"
                    >
                      Back to Job Description
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Link Generated */}
            {step === 4 && (
              <Card className="bg-white/95 backdrop-blur-sm border shadow-xl">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <LinkIcon className="h-12 w-12 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-selectra-blue">
                    Link Generated Successfully!
                  </CardTitle>
                  <CardDescription>
                    Your recruitment link is ready to be shared
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Your Recruitment Link:
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input value={generatedLink} readOnly className="bg-white" />
                      <Button 
                        onClick={() => navigator.clipboard.writeText(generatedLink)}
                        variant="outline"
                        size="sm"
                      >
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <p className="text-gray-600">
                      Share this link with potential candidates. They can use it to apply for the position and go through the AI interview process.
                    </p>
                    
                    <Button 
                      onClick={() => navigate("/organization-dashboard")}
                      className="w-full bg-selectra-blue hover:bg-selectra-blue/90 text-white"
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationLanding;