import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, CheckCircle } from "lucide-react";

interface CreateCaseTabProps {
  onCaseSubmitted: () => void;
}

export function CreateCaseTab({ onCaseSubmitted }: CreateCaseTabProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessEmail: "",
    organization: "",
    industry: "",
    phoneNumber: "",
    jobTitle: "",
    location: "United States",
    preferredLanguage: "English (US)",
    jobRole: "",
    question: "",
    newsletter: false,
    captcha: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");

  const quickFillTags = [
    {
      label: "🎮 College Student - Gaming Performance",
      data: {
        firstName: "Alex",
        lastName: "Chen",
        businessEmail: "alex.chen@student.edu",
        organization: "State University",
        industry: "education",
        phoneNumber: "+1 (555) 123-4567",
        jobTitle: "student",
        jobRole: "student",
        question: "I'm a college student and my new RTX 4060 laptop is only getting 40fps in Cyberpunk 2077. Is this normal? I expected higher performance for gaming."
      }
    },
    {
      label: "🎓 Student - CUDA Development Help",
      data: {
        firstName: "Sarah",
        lastName: "Johnson",
        businessEmail: "sarah.j@university.edu",
        organization: "Tech University",
        industry: "education",
        phoneNumber: "+1 (555) 234-5678",
        jobTitle: "student",
        jobRole: "student",
        question: "I'm a computer science student trying to set up CUDA for my machine learning class. The installation keeps failing on Ubuntu 22.04. Can someone help?"
      }
    },
    {
      label: "🎮 Gamer - RTX Upgrade Question",
      data: {
        firstName: "Mike",
        lastName: "Rodriguez",
        businessEmail: "mike.gamer@gmail.com",
        organization: "",
        industry: "gaming",
        phoneNumber: "+1 (555) 345-6789",
        jobTitle: "other",
        jobRole: "enthusiast",
        question: "I'm upgrading from GTX 1070 and want to game at 1440p. Should I get RTX 4070 or spend extra for 4070 Ti? I mainly play Fortnite, Valorant, and some AAA titles."
      }
    },
    {
      label: "🎬 Student Creator - Streaming Setup",
      data: {
        firstName: "Emma",
        lastName: "Davis",
        businessEmail: "emma.creator@student.edu",
        organization: "Community College",
        industry: "education",
        phoneNumber: "+1 (555) 456-7890",
        jobTitle: "student",
        jobRole: "content_creator",
        question: "I'm a college student who wants to start streaming and making YouTube videos. I have a limited budget but want good performance. What RTX card would you recommend?"
      }
    },
    {
      label: "🏢 Research Lab - DGX Spark Setup",
      data: {
        firstName: "Jennifer",
        lastName: "Martinez",
        businessEmail: "j.martinez@research.edu",
        organization: "Stanford AI Research Institute",
        industry: "research",
        phoneNumber: "+1 (555) 987-6543",
        jobTitle: "researcher",
        jobRole: "research_scientist",
        question: "Our university research lab just acquired a DGX Spark system for large language model training and computer vision research. We need guidance on initial setup, network configuration, and integration with our existing SLURM cluster."
      }
    }
  ];

  const industries = [
    { value: "aerospace", label: "Aerospace & Defense" },
    { value: "architecture", label: "Architecture, Engineering & Construction" },
    { value: "automotive", label: "Automotive & Transportation" },
    { value: "education", label: "Education & Research" },
    { value: "energy", label: "Energy & Utilities" },
    { value: "financial", label: "Financial Services" },
    { value: "gaming", label: "Gaming & Entertainment" },
    { value: "government", label: "Government & Public Sector" },
    { value: "healthcare", label: "Healthcare & Life Sciences" },
    { value: "manufacturing", label: "Manufacturing & Industrial" },
    { value: "media", label: "Media & Entertainment" },
    { value: "research", label: "Research & Development" },
    { value: "retail", label: "Retail & Consumer" },
    { value: "telecom", label: "Telecommunications" },
    { value: "other", label: "Other" }
  ];

  const jobTitles = [
    { value: "ceo", label: "CEO/President" },
    { value: "cto", label: "CTO/CIO" },
    { value: "director", label: "Director" },
    { value: "manager", label: "Manager" },
    { value: "engineer", label: "Engineer" },
    { value: "developer", label: "Developer" },
    { value: "researcher", label: "Researcher" },
    { value: "student", label: "Student" },
    { value: "consultant", label: "Consultant" },
    { value: "other", label: "Other" }
  ];

  const jobRoles = [
    { value: "ai_researcher", label: "AI/ML Researcher" },
    { value: "data_scientist", label: "Data Scientist" },
    { value: "software_engineer", label: "Software Engineer" },
    { value: "research_scientist", label: "Research Scientist" },
    { value: "student", label: "Student" },
    { value: "content_creator", label: "Content Creator" },
    { value: "enthusiast", label: "Gaming Enthusiast" },
    { value: "it_professional", label: "IT Professional" },
    { value: "business_decision_maker", label: "Business Decision Maker" },
    { value: "other", label: "Other" }
  ];

  const handleQuickFill = async (tagData: any) => {
    setIsAutoFilling(true);
    setCurrentStep("Simulating user input...");
    
    // Reset form first
    setFormData({
      firstName: "",
      lastName: "",
      businessEmail: "",
      organization: "",
      industry: "",
      phoneNumber: "",
      jobTitle: "",
      location: "United States",
      preferredLanguage: "English (US)",
      jobRole: "",
      question: "",
      newsletter: false,
      captcha: false
    });
    
    // Simulate typing each field with delays
    const fields = [
      { key: 'firstName', value: tagData.firstName, label: 'First Name' },
      { key: 'lastName', value: tagData.lastName, label: 'Last Name' },
      { key: 'businessEmail', value: tagData.businessEmail, label: 'Business Email' },
      { key: 'organization', value: tagData.organization, label: 'Organization' },
      { key: 'industry', value: tagData.industry, label: 'Industry' },
      { key: 'phoneNumber', value: tagData.phoneNumber, label: 'Phone Number' },
      { key: 'jobTitle', value: tagData.jobTitle, label: 'Job Title' },
      { key: 'jobRole', value: tagData.jobRole, label: 'Job Role' },
      { key: 'question', value: tagData.question, label: 'Question' }
    ];
    
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      setCurrentStep(`Filling ${field.label}...`);
      
      if (field.key === 'question') {
        // Simulate typing effect for question
        let currentText = "";
        const fullText = field.value;
        for (let j = 0; j <= fullText.length; j++) {
          currentText = fullText.slice(0, j);
          setFormData(prev => ({ ...prev, [field.key]: currentText }));
          await new Promise(resolve => setTimeout(resolve, 30));
        }
      } else {
        // Instant fill for other fields
        setFormData(prev => ({ ...prev, [field.key]: field.value }));
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Auto-check captcha and newsletter
    setFormData(prev => ({ ...prev, captcha: true, newsletter: true }));
    
    setCurrentStep("Ready to submit!");
    setIsAutoFilling(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.captcha) {
      alert("Please verify that you are human.");
      return;
    }
    setSubmitted(true);

    // Switch to AI SDR inbox after 2 seconds
    setTimeout(() => {
      onCaseSubmitted();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-2xl w-full border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Thank You for Contacting NVIDIA!</CardTitle>
            <CardDescription className="text-green-600 text-lg">
              Your inquiry has been successfully submitted and assigned ID: <strong>NVDA-2024-001847</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-green-700 mb-4">
              An NVIDIA representative will contact you within 24 hours to discuss your needs and provide personalized recommendations.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 rounded-lg text-green-800">
              <CheckCircle className="h-5 w-5" />
              We'll be in touch soon at {formData.businessEmail}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#76B900] mb-4">Contact Sales</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact an NVIDIA Enterprise Sales Representative
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'll answer your questions and help with your organization's needs.
          </p>
        </div>
      </div>

      {/* Demo Quick Fill Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-800 font-semibold">Demo Mode: Quick Fill Common Scenarios</span>
          </div>
          
          {isAutoFilling && (
            <div className="mb-4 p-3 bg-blue-100 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-800 font-medium">Demo in progress:</span>
                <span className="text-blue-600">{currentStep}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {quickFillTags.map((tag, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleQuickFill(tag.data)}
                disabled={isAutoFilling}
                className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-blue-200"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex gap-8">
          {/* Contact Form */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-8">CONTACT FORM</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="mt-1 border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="mt-1 border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessEmail" className="text-gray-700 font-medium">Business Email Address</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessEmail: e.target.value }))}
                      className="mt-1 border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization" className="text-gray-700 font-medium">Organization / University Name</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                      className="mt-1 border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="industry" className="text-gray-700 font-medium">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                      <SelectTrigger className="mt-1 border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map(industry => (
                          <SelectItem key={industry.value} value={industry.value}>
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      className="mt-1 border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="jobTitle" className="text-gray-700 font-medium">Job Title</Label>
                    <Select value={formData.jobTitle} onValueChange={(value) => setFormData(prev => ({ ...prev, jobTitle: value }))}>
                      <SelectTrigger className="mt-1 border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]">
                        <SelectValue placeholder="Select job title" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTitles.map(title => (
                          <SelectItem key={title.value} value={title.value}>
                            {title.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-gray-700 font-medium">Location</Label>
                    <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                      <SelectTrigger className="mt-1 border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredLanguage" className="text-gray-700 font-medium">Preferred Language</Label>
                    <Select value={formData.preferredLanguage} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredLanguage: value }))}>
                      <SelectTrigger className="mt-1 border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English (US)">English (US)</SelectItem>
                        <SelectItem value="English (UK)">English (UK)</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="jobRole" className="text-gray-700 font-medium">Job Role</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Select value={formData.jobRole} onValueChange={(value) => setFormData(prev => ({ ...prev, jobRole: value }))}>
                        <SelectTrigger className="border-gray-300 focus:border-[#76B900] focus:ring-[#76B900]">
                          <SelectValue placeholder="Select job role" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobRoles.map(role => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm text-gray-500">Optional</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="question" className="text-gray-700 font-medium">What is your question about?</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Textarea
                      id="question"
                      value={formData.question}
                      onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                      className="border-gray-300 focus:border-[#76B900] focus:ring-[#76B900] min-h-[120px]"
                      placeholder="Tell us about your needs and how we can help..."
                    />
                  </div>
                  <span className="text-sm text-gray-500 mt-1 block">Optional</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="captcha"
                      checked={formData.captcha}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, captcha: checked as boolean }))}
                    />
                    <Label htmlFor="captcha" className="text-gray-700">
                      I am human
                    </Label>
                    <div className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      reCAPTCHA
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: checked as boolean }))}
                    />
                    <Label htmlFor="newsletter" className="text-gray-700 text-sm leading-relaxed">
                      Send me the latest enterprise news, announcements, and more from NVIDIA. I can unsubscribe at any time.
                    </Label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <a href="#" className="text-gray-700 underline text-sm">
                    NVIDIA Privacy Policy
                  </a>
                  <Button
                    type="submit"
                    className="bg-[#76B900] hover:bg-[#76B900]/90 text-white px-8 py-3 text-lg font-semibold"
                    disabled={isAutoFilling}
                  >
                    {isAutoFilling ? "Demo in Progress..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#76B900] rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#76B900] mb-3">
                  NEED PRODUCT SUPPORT?
                </h3>
                <p className="text-gray-600 mb-6">
                  Get help with your existing NVIDIA products and services.
                </p>
                <Button className="bg-[#76B900] hover:bg-[#76B900]/90 text-white px-6 py-3 text-lg font-semibold w-full">
                  GET SUPPORT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}