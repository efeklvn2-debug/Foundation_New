import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { apiClient, useApi } from "@/lib/api";
import { emailService } from "@/lib/email";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.message) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send contact form data to backend
      const response = await apiClient.sendContactForm(form);
      
      if (response.success) {
        // Send email to foundation
        await emailService.sendContactEmail(form);
        
        setSubmitStatus("success");
        // Reset form
        setForm({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact — Pa J.I. Emerhana Foundation</title>
        <meta name="description" content="Get in touch with the Pa J.I. Emerhana Foundation." />
      </Helmet>

      <section className="pt-32 pb-16 bg-primary">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            Contact Us
          </motion.h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            We welcome inquiries from partners, media, and individuals interested in our mission.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground font-sans">Address</h3>
                    <p className="text-muted-foreground text-sm">Niger Delta, Nigeria</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground font-sans">Email</h3>
                    <p className="text-muted-foreground text-sm">info@emerhana-foundation.org</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground font-sans">Phone</h3>
                    <p className="text-muted-foreground text-sm">08055551696</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 aspect-[16/9] rounded-xl bg-muted flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Map integration coming soon</p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card rounded-xl shadow-card p-8">
              {submitStatus === "success" ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2 font-sans">Message Sent Successfully!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. We will respond within 48 hours.</p>
                </div>
              ) : submitStatus === "error" ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2 font-sans">Submission Error</h3>
                  <p className="text-muted-foreground">There was an error sending your message. Please try again or contact us directly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !form.name || !form.email || !form.message}
                    className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
