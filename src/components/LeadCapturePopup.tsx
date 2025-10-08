import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LeadCapturePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: ""
  });

  useEffect(() => {
    // Check if user has already seen popup in this session
    const hasSeenPopup = sessionStorage.getItem('leadPopupSeen');

    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('leadPopupSeen', 'true');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('📝 Submitting quick inquiry form...');

      // Validate required fields
      const requiredFields = ['fullName', 'email', 'phoneNumber', 'companyName'];
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');

      if (missingFields.length > 0) {
        console.error('❌ Missing required fields:', missingFields);
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      const apiUrl = 'https://etherius-ai-backend.onrender.com/api/contact';
      console.log('🌐 Submitting to:', apiUrl);

      // Submit to same backend endpoint as main form
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          // Set defaults for fields not in popup
          industry: "Not specified",
          companySize: "Not specified",
          aiExperience: "Not specified",
          primaryInterest: "Quick Inquiry",
          businessChallenge: "Quick inquiry from popup form",
          timeline: "Not specified",
          investmentRange: "Not specified",
          pageUrl: window.location.href,
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
          formType: "popup" // Tag to identify popup submissions
        })
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('📡 Response body:', result);

      if (!response.ok) {
        throw new Error(result.error || result.message || `HTTP error! status: ${response.status}`);
      }

      console.log('✅ Quick inquiry submitted successfully:', result);
      setSubmitStatus('success');

      // Track conversion in GA4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Lead Generation',
          event_label: 'Popup Quick Inquiry',
          form_type: 'popup',
          value: 1
        });
      }

      // Close popup after 2 seconds on success
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error) {
      console.error('❌ Quick inquiry submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-gradient-to-br from-darker-surface via-background to-deep-blue border-2 border-neon-yellow/30 rounded-2xl shadow-2xl shadow-neon-yellow/20 max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            aria-label="Close popup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-3">
                <span className="bg-gradient-to-r from-neon-yellow to-green-400 bg-clip-text text-transparent">
                  Unlock Your AI Advantage
                </span>
              </h2>
              <p className="text-white/80 text-lg">
                Get a free 30-minute AI strategy consultation
              </p>
            </div>

            {/* Form */}
            {submitStatus === 'success' ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-400 font-medium text-lg">
                  Thank you! We'll contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="popup-fullName" className="text-white font-medium mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="popup-fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 h-12"
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="popup-email" className="text-white font-medium mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="popup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 h-12"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="popup-phoneNumber" className="text-white font-medium mb-2 block">
                    Phone Number *
                  </Label>
                  <Input
                    id="popup-phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 h-12"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="popup-companyName" className="text-white font-medium mb-2 block">
                    Company Name *
                  </Label>
                  <Input
                    id="popup-companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="bg-background/50 border-border/30 focus:border-neon-yellow focus:ring-neon-yellow/20 text-white placeholder:text-white/40 h-12"
                    placeholder="Acme Inc."
                    required
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-lg">
                    <p className="text-red-400 text-sm text-center">
                      ❌ Something went wrong. Please try again or contact us at hello@etheriusai.com
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-neon-yellow to-green-400 text-black hover:from-neon-yellow/90 hover:to-green-400/90 px-6 py-6 text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-neon-yellow/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    'Get Free Consultation'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
