import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, CheckCircle, AlertCircle } from "lucide-react";
import { apiClient } from "@/lib/api";
import { emailService } from "@/lib/email";

const presetAmounts = [5000, 10000, 50000];

const Donate = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "online">("bank_transfer");

  const selectedAmount = amount || (customAmount ? Number(customAmount) : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!', { selectedAmount, name, email, paymentMethod });
    
    if (!selectedAmount || !name || !email) {
      console.log('Validation failed');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Submit donation to backend
      const donationData = {
        amount: selectedAmount,
        name,
        email,
        paymentMethod,
      };

      const response = await apiClient.submitDonation(donationData);
      
      if (response.success) {
        // Send confirmation email
        try {
          await emailService.sendDonationConfirmation({
            name,
            email,
            amount: selectedAmount,
            paymentMethod: paymentMethod === "bank_transfer" ? "Bank Transfer" : "Online Payment",
          });
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          // Continue anyway - donation was recorded
        }

        setSubmitStatus("success");
        // Reset form
        setAmount("");
        setCustomAmount("");
        setName("");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Donation submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Donate — Pa J.I. Emerhana Foundation</title>
        <meta name="description" content="Support the Pa J.I. Emerhana Foundation's mission to develop visionary leaders in the Niger Delta." />
      </Helmet>

      <section className="pt-32 pb-16 bg-primary">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            Invest in Leadership
          </motion.h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl">
            Your contribution directly supports scholarships, leadership training, and community development across the Niger Delta.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container max-w-2xl">
          <div className="bg-card rounded-xl shadow-card p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground font-sans">Make a Donation</h2>
                <p className="text-muted-foreground text-sm">Every contribution makes a difference.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">Select Amount (₦)</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {presetAmounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setAmount(a); setCustomAmount(""); }}
                      className={`py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                        amount === a
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-primary/10"
                      }`}
                    >
                      ₦{a.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank_transfer")}
                    className={`py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                      paymentMethod === "bank_transfer"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-primary/10"
                    }`}
                  >
                    Bank Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                      paymentMethod === "online"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-primary/10"
                    }`}
                  >
                    Online Payment
                  </button>
                </div>
              </div>

              {/* Bank Transfer Details */}
              {paymentMethod === "bank_transfer" && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="text-lg font-bold text-foreground mb-4 font-sans">Bank Transfer Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Bank:</span> <span className="font-semibold text-foreground">Stanbic IBTC BANK</span></p>
                    <p><span className="text-muted-foreground">Account Name:</span> <span className="font-semibold text-foreground">EMERHANA ONORIODE PAUL</span></p>
                    <p><span className="text-muted-foreground">Account Number:</span> <span className="font-semibold text-foreground">0032641445</span></p>
                    <p><span className="text-muted-foreground">Reference:</span> <span className="font-semibold text-foreground">EMERHANA-{Date.now()}</span></p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Please use the reference number above when making your transfer and email proof of payment to pemerhana@yahoo.co.uk
                  </p>
                </div>
              )}

              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2 font-sans">Donation Successful!</h3>
                  <p className="text-muted-foreground mb-4">Thank you for your generous donation of ₦{selectedAmount.toLocaleString()}. A confirmation email has been sent to {email}.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus("idle")}
                    className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:brightness-90 transition-all duration-200"
                  >
                    Make Another Donation
                  </button>
                </div>
              ) : submitStatus === "error" ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2 font-sans">Submission Error</h3>
                  <p className="text-muted-foreground mb-4">There was an error processing your donation. Please try again or contact us directly.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus("idle")}
                    className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all duration-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!selectedAmount || !name || !email || isSubmitting}
                  className="w-full py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:brightness-90 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : selectedAmount ? `Donate ₦${selectedAmount.toLocaleString()}` : "Select an amount"}
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donate;
