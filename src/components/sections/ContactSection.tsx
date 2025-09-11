import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    aiExperience: "",
    timeline: "",
    goals: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <section id="contact" className="py-24 px-6 bg-darker-surface">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to <span className="text-neon-yellow">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed mb-8">
            Schedule your free AI strategy session and discover how we can help you achieve measurable results with AI.
          </p>
          <p className="text-lg font-semibold text-foreground">
            30-minute consultation to discuss your AI goals and explore how we can help
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="bg-deep-blue border-border/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Schedule Your Free AI Strategy Session
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-foreground">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="bg-background border-border/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyName" className="text-foreground">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      className="bg-background border-border/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-background border-border/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-background border-border/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companySize" className="text-foreground">Company Size</Label>
                    <Select onValueChange={(value) => handleInputChange("companySize", value)}>
                      <SelectTrigger className="bg-background border-border/20 focus:border-primary">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">1-10 employees</SelectItem>
                        <SelectItem value="small">11-50 employees</SelectItem>
                        <SelectItem value="medium">51-200 employees</SelectItem>
                        <SelectItem value="large">201-1000 employees</SelectItem>
                        <SelectItem value="enterprise">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="industry" className="text-foreground">Industry</Label>
                    <Select onValueChange={(value) => handleInputChange("industry", value)}>
                      <SelectTrigger className="bg-background border-border/20 focus:border-primary">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="retail">Retail/E-commerce</SelectItem>
                        <SelectItem value="professional">Professional Services</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="aiExperience" className="text-foreground">AI Experience Level</Label>
                    <Select onValueChange={(value) => handleInputChange("aiExperience", value)}>
                      <SelectTrigger className="bg-background border-border/20 focus:border-primary">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No experience</SelectItem>
                        <SelectItem value="basic">Basic understanding</SelectItem>
                        <SelectItem value="intermediate">Some implementation</SelectItem>
                        <SelectItem value="advanced">Advanced user</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeline" className="text-foreground">Project Timeline</Label>
                    <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                      <SelectTrigger className="bg-background border-border/20 focus:border-primary">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (1-3 months)</SelectItem>
                        <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long">Long-term (12+ months)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="goals" className="text-foreground">Tell us about your AI goals *</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange("goals", e.target.value)}
                    placeholder="Describe your AI objectives, challenges, and what you hope to achieve..."
                    className="bg-background border-border/20 focus:border-primary min-h-[120px]"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow px-8 py-6 text-lg font-semibold group"
                >
                  Book Your Free AI Strategy Session
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Get in Touch
              </h3>
              <p className="text-white leading-relaxed mb-8">
                Ready to transform your business with AI? We're here to help. Schedule a free consultation or reach out directly using the contact information below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-white">hello@etheriusai.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <p className="text-white">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Office</h4>
                  <p className="text-white">Available for virtual consultations worldwide</p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-primary/30 pl-6">
              <p className="text-primary font-semibold mb-2">Free 30-Minute Consultation</p>
              <p className="text-white leading-relaxed">
                During our call, we'll discuss your business goals, assess your AI readiness, and provide actionable insights you can implement immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};