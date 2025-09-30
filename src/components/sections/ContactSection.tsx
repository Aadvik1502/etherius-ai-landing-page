import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    industry: "",
    companySize: "",
    aiExperience: "",
    primaryInterest: "",
    businessChallenge: "",
    aiMotivation: "",
    timeline: "",
    investmentRange: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('📝 Submitting contact form...');
      console.log('Form data:', formData);

      // Validate required fields locally first
      const requiredFields = ['fullName', 'email', 'companyName', 'phoneNumber', 'industry', 'companySize', 'aiExperience', 'timeline', 'investmentRange'];
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

      if (missingFields.length > 0) {
        console.error('❌ Missing required fields:', missingFields);
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      const apiUrl = 'https://etherius-ai-backend.onrender.com/api/contact';
      console.log('🌐 Submitting to:', apiUrl);

      // Submit form to backend API directly
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          pageUrl: window.location.href,
          referrer: document.referrer,
          timestamp: new Date().toISOString()
        })
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

      const result = await response.json();
      console.log('📡 Response body:', result);

      if (!response.ok) {
        throw new Error(result.error || result.message || `HTTP error! status: ${response.status}`);
      }

      console.log('✅ Form submitted successfully:', result);
      setSubmitStatus('success');

      // Track conversion in GA4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Lead Generation',
          event_label: 'Contact Form Submission',
          company_size: formData.companySize,
          industry: formData.industry,
          investment_range: formData.investmentRange,
          timeline: formData.timeline,
          value: 1
        });
      }

      // Clear form after successful submission
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        industry: "",
        companySize: "",
        aiExperience: "",
        primaryInterest: "",
        businessChallenge: "",
        aiMotivation: "",
        timeline: "",
        investmentRange: ""
      });

    } catch (error) {
      console.error('❌ Form submission failed:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-32 px-6 bg-gradient-to-br from-darker-surface via-background to-darker-surface overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-24 h-24 bg-gradient-to-br from-neon-yellow/20 to-green-400/20 rounded-full blur-2xl opacity-40" />
        <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-400/20 to-neon-yellow/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-gradient-to-br from-neon-yellow/30 to-green-400/30 rounded-full blur-2xl opacity-50" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-3 bg-grid-pattern" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Ready to{" "}
            <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">
              Transform
            </span>
            {" "}Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed">
            Connect with us and discover how we can<br />help you achieve{" "}
            <span className="text-neon-yellow font-semibold">measurable results</span> with AI.
          </p>
        </div>

        {/* Main Contact Box with Neon Theme */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-transparent via-neon-yellow/8 to-transparent p-8 md:p-12 rounded-3xl border border-neon-yellow/20 hover:border-neon-yellow/40 transition-all duration-500 hover:shadow-2xl hover:shadow-neon-yellow/10 backdrop-blur-sm">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-yellow/5 via-transparent to-green-400/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              {/* Contact Form - Single Box Design - Mobile optimized */}
              <div className="p-4 md:p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 lg:space-y-8">
                    {/* Essential Contact Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName" className="text-white font-medium mb-3 block text-base">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 h-12 md:h-12 text-base min-h-[48px]"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white font-medium mb-3 block text-base">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 h-12 md:h-12 text-base min-h-[48px]"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="companyName" className="text-white font-medium mb-3 block text-base">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                          className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 h-12 md:h-12 text-base min-h-[48px]"
                          placeholder="Your company name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phoneNumber" className="text-white font-medium mb-3 block text-base">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 h-12 md:h-12 text-base min-h-[48px]"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>

                    {/* Business Context */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="industry" className="text-white font-medium mb-3 block text-base">Industry *</Label>
                        <Select onValueChange={(value) => handleInputChange("industry", value)}>
                          <SelectTrigger className="bg-background/50 border-border/30 focus:border-neon-yellow text-white h-12 md:h-12 text-base min-h-[48px]">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="finance">Finance & Banking</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="retail">Retail & E-commerce</SelectItem>
                            <SelectItem value="professional">Professional Services</SelectItem>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="logistics">Logistics & Supply Chain</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="companySize" className="text-white font-medium mb-3 block text-base">Company Size *</Label>
                        <Select onValueChange={(value) => handleInputChange("companySize", value)} required>
                          <SelectTrigger className="bg-background/50 border-border/30 focus:border-neon-yellow text-white h-12 md:h-12 text-base min-h-[48px]">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                            <SelectItem value="small">Small Business (11-50 employees)</SelectItem>
                            <SelectItem value="mid-market">Mid-Market (51-250 employees)</SelectItem>
                            <SelectItem value="enterprise">Enterprise (251-1000 employees)</SelectItem>
                            <SelectItem value="large-enterprise">Large Enterprise (1000+ employees)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* AI-Specific Discovery */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="aiExperience" className="text-white font-medium mb-3 block text-base">Current AI Experience *</Label>
                        <Select onValueChange={(value) => handleInputChange("aiExperience", value)} required>
                          <SelectTrigger className="bg-background/50 border-border/30 focus:border-neon-yellow text-white h-12 md:h-12 text-base min-h-[48px]">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No AI experience</SelectItem>
                            <SelectItem value="exploring">Exploring AI possibilities</SelectItem>
                            <SelectItem value="pilot">Pilot projects/testing</SelectItem>
                            <SelectItem value="some">Some AI implementations</SelectItem>
                            <SelectItem value="advanced">Advanced AI user</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="primaryInterest" className="text-white font-medium mb-3 block text-base">Primary AI Interest Area</Label>
                        <Select onValueChange={(value) => handleInputChange("primaryInterest", value)}>
                          <SelectTrigger className="bg-background/50 border-border/30 focus:border-neon-yellow text-white h-12 md:h-12 text-base min-h-[48px]">
                            <SelectValue placeholder="Select interest area" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automation">Process Automation</SelectItem>
                            <SelectItem value="customer-service">Customer Service & Support</SelectItem>
                            <SelectItem value="data-analysis">Data Analysis & Insights</SelectItem>
                            <SelectItem value="sales-marketing">Sales & Marketing AI</SelectItem>
                            <SelectItem value="operational">Operational Efficiency</SelectItem>
                            <SelectItem value="custom">Custom AI Solutions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessChallenge" className="text-white font-medium mb-3 block text-base">How would you like to use AI in your business?</Label>
                      <Textarea
                        id="businessChallenge"
                        value={formData.businessChallenge}
                        onChange={(e) => handleInputChange("businessChallenge", e.target.value)}
                        placeholder="Describe any business challenges you're facing, processes you'd like to automate, or ways you're considering using AI to improve your operations..."
                        className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 min-h-[100px] text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="aiMotivation" className="text-white font-medium mb-3 block text-base">What's driving your AI interest?</Label>
                      <Textarea
                        id="aiMotivation"
                        value={formData.aiMotivation}
                        onChange={(e) => handleInputChange("aiMotivation", e.target.value)}
                        placeholder="What sparked your interest in AI? Competitive pressure, efficiency needs, new opportunities?"
                        className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 min-h-[100px] text-base"
                      />
                    </div>

                    {/* Project Context */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="timeline" className="text-white font-medium mb-3 block text-base">Expected Timeline *</Label>
                        <Select onValueChange={(value) => handleInputChange("timeline", value)} required>
                          <SelectTrigger className="bg-background/50 border-border/30 focus:border-neon-yellow text-white h-12 md:h-12 text-base min-h-[48px]">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
                            <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                            <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                            <SelectItem value="long">Long-term (12+ months)</SelectItem>
                            <SelectItem value="not-sure">Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="investmentRange" className="text-white font-medium mb-3 block text-base">Investment Range *</Label>
                        <Select onValueChange={(value) => handleInputChange("investmentRange", value)} required>
                          <SelectTrigger className="bg-background/50 border-border/30 focus:border-neon-yellow text-white h-12 md:h-12 text-base min-h-[48px]">
                            <SelectValue placeholder="Select investment range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-10k">Under $10K</SelectItem>
                            <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                            <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                            <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                            <SelectItem value="100k-plus">$100K+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90 px-4 py-6 md:px-8 md:py-7 text-base md:text-lg lg:text-xl font-bold group transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-neon-yellow/30 min-h-[48px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send an Inquiry
                            <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                          </>
                        )}
                      </Button>

                      {/* Success/Error Messages */}
                      {submitStatus === 'success' && (
                        <div className="mt-4 p-4 bg-green-500/20 border border-green-500/40 rounded-lg">
                          <p className="text-green-400 font-medium text-center">
                            ✅ Thank you! Your inquiry has been sent successfully. We'll get back to you within 24 hours.
                          </p>
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
                          <p className="text-red-400 font-medium text-center">
                            ❌ Something went wrong. Please try again or contact us directly at hello@etheriusai.com
                          </p>
                        </div>
                      )}
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};