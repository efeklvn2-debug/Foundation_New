interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class EmailService {
  private async sendEmail(data: EmailData): Promise<EmailResponse> {
    try {
      // For production, integrate with services like SendGrid, Mailgun, or AWS SES
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Failed to send email',
        };
      }

      return {
        success: true,
        message: 'Email sent successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Email service error',
      };
    }
  }

  async sendContactEmail(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<EmailResponse> {
    const subject = 'New Contact Form Submission - Pa J.I. Emerhana Foundation';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${this.escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${this.escapeHtml(data.email)}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0;">
            ${this.escapeHtml(data.message).replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          This email was sent from the Pa J.I. Emerhana Foundation website.
        </p>
      </div>
    `;

    return this.sendEmail({
      to: 'info@emerhana-foundation.org',
      subject,
      html,
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    });
  }

  async sendDonationConfirmation(data: {
    name: string;
    email: string;
    amount: number;
    paymentMethod: string;
  }): Promise<EmailResponse> {
    const subject = 'Thank You for Your Donation - Pa J.I. Emerhana Foundation';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Thank You for Your Support!</h2>
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
          <p>Dear ${this.escapeHtml(data.name)},</p>
          <p>Thank you for your generous donation of ₦${data.amount.toLocaleString()} to the Pa J.I. Emerhana Foundation.</p>
          <p>Your contribution will help us in our mission to develop visionary leaders for the sustainable development of the Niger Delta.</p>
        </div>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0;">Donation Details</h3>
          <p><strong>Amount:</strong> ₦${data.amount.toLocaleString()}</p>
          <p><strong>Payment Method:</strong> ${this.escapeHtml(data.paymentMethod)}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          This is an automated confirmation. For tax receipts or additional information, please contact us at info@emerhana-foundation.org.
        </p>
      </div>
    `;

    return this.sendEmail({
      to: data.email,
      subject,
      html,
      text: `Thank you for your donation of ₦${data.amount.toLocaleString()} to the Pa J.I. Emerhana Foundation.`,
    });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export const emailService = new EmailService();