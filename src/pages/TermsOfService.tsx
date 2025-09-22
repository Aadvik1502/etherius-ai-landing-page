import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
              Terms of Service
            </h1>
            <p className="text-lg text-neutral-gray">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-8">

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-neutral-gray leading-relaxed">
                  Welcome to Etherius AI. These Terms of Service ("Terms") govern your access to and use of our website, AI consulting services, and related offerings (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Services</h2>
                <p className="text-neutral-gray leading-relaxed mb-4">
                  Etherius AI provides artificial intelligence consulting services, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-neutral-gray space-y-2">
                  <li>AI strategy development and implementation</li>
                  <li>Custom AI solution design and deployment</li>
                  <li>AI agent development and optimization</li>
                  <li>Voice and chat AI system implementation</li>
                  <li>Business process automation using AI</li>
                  <li>AI training, support, and ongoing optimization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Eligibility and Account Requirements</h2>
                <p className="text-neutral-gray leading-relaxed">
                  You must be at least 18 years old and have the legal authority to enter into agreements to use our Services. If you are using our Services on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. User Conduct and Prohibited Activities</h2>
                <p className="text-neutral-gray leading-relaxed mb-4">
                  When using our Services, you agree not to:
                </p>
                <ul className="list-disc list-inside text-neutral-gray space-y-2">
                  <li>Use the Services for any illegal or unauthorized purpose</li>
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Interfere with or disrupt the Services or servers</li>
                  <li>Attempt to gain unauthorized access to any portion of the Services</li>
                  <li>Use the Services to develop competing AI consulting services</li>
                  <li>Share confidential information or proprietary methodologies without authorization</li>
                  <li>Reverse engineer or attempt to extract our proprietary AI algorithms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property Rights</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Our Intellectual Property</h3>
                    <p className="text-neutral-gray leading-relaxed">
                      All content, features, and functionality of our Services, including but not limited to text, graphics, logos, AI models, algorithms, and software, are owned by Etherius AI and are protected by copyright, trademark, and other intellectual property laws.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">Client Data and Work Product</h3>
                    <p className="text-neutral-gray leading-relaxed">
                      You retain ownership of your data and information provided to us. Custom AI solutions developed specifically for your business remain your property upon full payment. We retain rights to general methodologies, frameworks, and non-client-specific improvements developed during our engagement.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Payment and Billing Terms</h2>
                <div className="space-y-4">
                  <p className="text-neutral-gray leading-relaxed">
                    Payment terms for our consulting services are as follows:
                  </p>
                  <ul className="list-disc list-inside text-neutral-gray space-y-2">
                    <li>Service fees are outlined in individual project agreements or statements of work</li>
                    <li>Payment is due according to the terms specified in your service agreement</li>
                    <li>Late payments may result in service suspension and additional fees</li>
                    <li>All fees are non-refundable unless otherwise specified in writing</li>
                    <li>You are responsible for any applicable taxes related to the Services</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Confidentiality and Data Protection</h2>
                <p className="text-neutral-gray leading-relaxed mb-4">
                  We understand the sensitive nature of business information shared during AI consulting engagements:
                </p>
                <ul className="list-disc list-inside text-neutral-gray space-y-2">
                  <li>All client information is treated as confidential and protected accordingly</li>
                  <li>We implement industry-standard security measures to protect your data</li>
                  <li>Data is used solely for providing the agreed-upon services</li>
                  <li>We do not share client information with third parties without explicit consent</li>
                  <li>Separate data processing agreements may be required for specific engagements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Service Level Agreements and Warranties</h2>
                <div className="space-y-4">
                  <p className="text-neutral-gray leading-relaxed">
                    We strive to provide high-quality AI consulting services, but we make no warranties that:
                  </p>
                  <ul className="list-disc list-inside text-neutral-gray space-y-2">
                    <li>The Services will meet your specific requirements or expectations</li>
                    <li>AI implementations will achieve particular performance metrics</li>
                    <li>The Services will be uninterrupted, timely, secure, or error-free</li>
                    <li>Results obtained from AI systems will be accurate or reliable in all circumstances</li>
                  </ul>
                  <p className="text-neutral-gray leading-relaxed mt-4">
                    Specific service level commitments, if any, will be outlined in individual service agreements.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
                <p className="text-neutral-gray leading-relaxed mb-4">
                  To the fullest extent permitted by law, Etherius AI shall not be liable for:
                </p>
                <ul className="list-disc list-inside text-neutral-gray space-y-2">
                  <li>Indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, revenue, data, or business opportunities</li>
                  <li>Damages resulting from AI system performance or decisions</li>
                  <li>Any damages exceeding the amount paid for our services in the preceding 12 months</li>
                  <li>Damages caused by factors beyond our reasonable control</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Indemnification</h2>
                <p className="text-neutral-gray leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Etherius AI and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Services, violation of these Terms, or infringement of any third-party rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">11. Termination</h2>
                <div className="space-y-4">
                  <p className="text-neutral-gray leading-relaxed">
                    Either party may terminate these Terms or any service agreement:
                  </p>
                  <ul className="list-disc list-inside text-neutral-gray space-y-2">
                    <li>For any reason with 30 days' written notice</li>
                    <li>Immediately for material breach of these Terms</li>
                    <li>Immediately if the other party becomes insolvent or bankrupt</li>
                  </ul>
                  <p className="text-neutral-gray leading-relaxed mt-4">
                    Upon termination, you remain responsible for any outstanding fees, and confidentiality obligations continue in effect.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">12. AI-Specific Terms</h2>
                <div className="space-y-4">
                  <p className="text-neutral-gray leading-relaxed mb-4">
                    Given the nature of AI technology, additional terms apply:
                  </p>
                  <ul className="list-disc list-inside text-neutral-gray space-y-2">
                    <li>AI systems may produce unexpected or unintended results</li>
                    <li>Client remains responsible for decisions made based on AI recommendations</li>
                    <li>Compliance with AI-related regulations is a shared responsibility</li>
                    <li>AI model performance may vary based on data quality and external factors</li>
                    <li>Ongoing monitoring and adjustment of AI systems may be necessary</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">13. Governing Law and Dispute Resolution</h2>
                <p className="text-neutral-gray leading-relaxed">
                  These Terms are governed by and construed in accordance with the laws of [Your State/Country]. Any disputes arising under these Terms will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive relief in court for intellectual property violations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">14. Changes to Terms</h2>
                <p className="text-neutral-gray leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website and updating the "Last updated" date. Your continued use of the Services after such modifications constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">15. Miscellaneous</h2>
                <ul className="list-disc list-inside text-neutral-gray space-y-2">
                  <li>These Terms constitute the entire agreement between you and Etherius AI</li>
                  <li>If any provision is found unenforceable, the remaining provisions remain in effect</li>
                  <li>Failure to enforce any right does not waive that right</li>
                  <li>You may not assign these Terms without our written consent</li>
                  <li>These Terms are binding upon successors and permitted assigns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">16. Contact Information</h2>
                <p className="text-neutral-gray leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-deep-blue p-6 rounded-lg border border-border/20">
                  <p className="text-white font-medium mb-2">Etherius AI</p>
                  <p className="text-neutral-gray">Email: legal@etheriusai.com</p>
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

export default TermsOfService;