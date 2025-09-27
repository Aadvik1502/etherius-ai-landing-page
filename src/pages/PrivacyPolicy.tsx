import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PrivacySEO } from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PrivacySEO />
      <Navigation />

      {/* Main Content */}
      <main className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back to Home Button */}
          <Button
            variant="ghost"
            onClick={() => window.location.href = '/'}
            className="mb-8 text-white hover:text-neon-yellow"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neon-yellow bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-lg text-neutral-gray">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-8">

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                <p className="text-neutral-gray leading-relaxed">
                  Etherius AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our AI consulting services, or engage with our business. This policy applies to all users of our website and clients of our AI consulting services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Personal Information</h3>
                    <p className="text-neutral-gray leading-relaxed">
                      We may collect personal information that you voluntarily provide, including:
                    </p>
                    <ul className="list-disc list-inside text-neutral-gray mt-2 space-y-1">
                      <li>Name, email address, phone number, and company information</li>
                      <li>Business requirements and project details during consultations</li>
                      <li>Communication preferences and contact information</li>
                      <li>Payment and billing information for our services</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Usage Information</h3>
                    <p className="text-neutral-gray leading-relaxed">
                      We automatically collect certain information about your device and usage:
                    </p>
                    <ul className="list-disc list-inside text-neutral-gray mt-2 space-y-1">
                      <li>IP address, browser type, and operating system</li>
                      <li>Pages visited, time spent on site, and referral sources</li>
                      <li>Device information and browsing patterns</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-neutral-gray leading-relaxed mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc list-inside text-neutral-gray space-y-2">
                  <li>Provide, maintain, and improve our AI consulting services</li>
                  <li>Communicate with you about our services, updates, and promotional offers</li>
                  <li>Process transactions and manage client relationships</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Comply with legal obligations and protect our rights</li>
                  <li>Develop and implement AI solutions tailored to your business needs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. AI-Specific Privacy Considerations</h2>
                <div className="space-y-4">
                  <p className="text-neutral-gray leading-relaxed">
                    As an AI consulting company, we handle data with special considerations:
                  </p>
                  <ul className="list-disc list-inside text-neutral-gray space-y-2">
                    <li>Client data used in AI model development is anonymized and aggregated</li>
                    <li>We implement strict data governance protocols for AI training and testing</li>
                    <li>Machine learning models are designed with privacy-by-design principles</li>
                    <li>We do not use client data to train third-party AI models without explicit consent</li>
                    <li>All AI-generated insights maintain client confidentiality and data protection</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Information Sharing and Disclosure</h2>
                <p className="text-neutral-gray leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information. We may share information in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-neutral-gray space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                  <li>To protect our rights, privacy, safety, or property, and that of our clients</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Data Security</h2>
                <p className="text-neutral-gray leading-relaxed">
                  We implement industry-standard security measures to protect your information, including:
                </p>
                <ul className="list-disc list-inside text-neutral-gray mt-2 space-y-1">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection and privacy</li>
                  <li>Secure cloud infrastructure and backup systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-neutral-gray leading-relaxed">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings. Our website may include third-party analytics tools (such as Google Analytics) to help us understand user behavior.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibred text-white mb-4">8. Your Privacy Rights</h2>
                <p className="text-neutral-gray leading-relaxed mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc list-inside text-neutral-gray space-y-2">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate or incomplete data</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction or objection to processing</li>
                  <li>Data portability</li>
                  <li>Withdrawal of consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Third-Party Services</h2>
                <p className="text-neutral-gray leading-relaxed">
                  Our website may contain links to third-party services (such as Calendly for scheduling). We are not responsible for the privacy practices of these external services. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Children's Privacy</h2>
                <p className="text-neutral-gray leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to This Privacy Policy</h2>
                <p className="text-neutral-gray leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
                <p className="text-neutral-gray leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-deep-blue p-6 rounded-lg border border-border/20">
                  <p className="text-white font-medium mb-2">Etherius AI</p>
                  <p className="text-neutral-gray">Email: privacy@etheriusai.com</p>
                  <p className="text-neutral-gray">Website: www.etheriusai.com</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;