import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test Connection
export const testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email service configured successfully');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration failed:', error.message);
    return false;
  }
};

// Send Email
export const sendEmail = async (to, subject, html, attachments = []) => {
  try {
    const mailOptions = {
      from: `"${process.env.BRDT_DISPLAY_NAME}" <${process.env.BRDT_EMAIL}>`,
      to,
      subject,
      html,
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send Donation Confirmation Email
export const sendDonationConfirmation = async (donor, donationDetails, invoicePath) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Outfit', Arial, sans-serif; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8c1d54; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f8fafc; }
          .details { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .btn { background-color: #1d3b82; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
          .thank-you { color: #8c1d54; font-weight: bold; font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 BRDT - Belghar Rural Development Trust</h1>
            <p>Enriching Rural Communities Lives</p>
          </div>

          <div class="content">
            <p>Dear <strong>${donor.fullName}</strong>,</p>

            <p class="thank-you">Thank you for your generous donation! ❤️</p>

            <p>We are deeply grateful for your support. Your contribution will make a direct impact on the lives of those in need in rural Bangladesh.</p>

            <div class="details">
              <h3>Donation Details</h3>
              <div class="detail-row">
                <span><strong>Donation ID:</strong></span>
                <span>${donationDetails.donationId}</span>
              </div>
              <div class="detail-row">
                <span><strong>Amount:</strong></span>
                <span>৳${donationDetails.amount}</span>
              </div>
              <div class="detail-row">
                <span><strong>Type:</strong></span>
                <span>${donationDetails.donationType}</span>
              </div>
              <div class="detail-row">
                <span><strong>Appeal:</strong></span>
                <span>${donationDetails.appealType}</span>
              </div>
              <div class="detail-row">
                <span><strong>Date:</strong></span>
                <span>${new Date(donationDetails.dateDonated).toLocaleDateString('en-GB', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div class="detail-row">
                <span><strong>Receipt Number:</strong></span>
                <span>${donationDetails.receiptNumber}</span>
              </div>
            </div>

            <p>Your detailed invoice is attached to this email. Please keep it for your records.</p>

            <p>
              <strong>100% Donation Policy:</strong> We ensure that 100% of your donation goes directly to helping our communities. No administrative fees are deducted.
            </p>

            <p style="text-align: center; margin: 20px 0;">
              <a href="https://www.brdtrust.org" class="btn">Visit Our Website</a>
            </p>

            <p>If you have any questions about your donation, please don't hesitate to contact us:</p>
            <p>
              📧 Email: ${process.env.BRDT_EMAIL}<br>
              📞 Phone: ${process.env.ORG_PHONE}
            </p>
          </div>

          <div class="footer">
            <p>© 2026 Belghar Rural Development Trust. All rights reserved.</p>
            <p>
              Follow us on social media:<br>
              <a href="https://www.facebook.com/share/1Cfr31FKAz/">Facebook</a> | 
              <a href="https://www.instagram.com/brdtrust/">Instagram</a> | 
              <a href="https://x.com/brdtbd">Twitter</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const attachmentsArray = [];
  if (invoicePath) {
    attachmentsArray.push({
      filename: `BRDT-Invoice-${donationDetails.receiptNumber}.pdf`,
      path: invoicePath
    });
  }

  return sendEmail(
    donor.email,
    `Donation Receipt - Invoice #${donationDetails.receiptNumber}`,
    htmlContent,
    attachmentsArray
  );
};

// Send Invoice to BRDT Admin
export const sendInvoiceToAdmin = async (donationDetails, invoicePath) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Outfit', Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #8c1d54; color: white; }
        </style>
      </head>
      <body>
        <h2>New Donation Received - Invoice #${donationDetails.receiptNumber}</h2>
        
        <h3>Donation Details:</h3>
        <table>
          <tr><th>Field</th><th>Value</th></tr>
          <tr><td>Donor Name</td><td>${donationDetails.donorName}</td></tr>
          <tr><td>Donor Email</td><td>${donationDetails.donorEmail}</td></tr>
          <tr><td>Amount</td><td>৳${donationDetails.amount}</td></tr>
          <tr><td>Type</td><td>${donationDetails.donationType}</td></tr>
          <tr><td>Appeal</td><td>${donationDetails.appealType}</td></tr>
          <tr><td>Payment Status</td><td>${donationDetails.paymentStatus}</td></tr>
          <tr><td>Transaction ID</td><td>${donationDetails.transactionId || 'N/A'}</td></tr>
          <tr><td>Date</td><td>${new Date(donationDetails.dateDonated).toLocaleString()}</td></tr>
        </table>

        <p>The invoice has been attached to this email.</p>
      </body>
    </html>
  `;

  const attachmentsArray = [];
  if (invoicePath) {
    attachmentsArray.push({
      filename: `BRDT-Invoice-${donationDetails.receiptNumber}.pdf`,
      path: invoicePath
    });
  }

  return sendEmail(
    process.env.BRDT_EMAIL,
    `New Donation Received - Invoice #${donationDetails.receiptNumber}`,
    htmlContent,
    attachmentsArray
  );
};

// Send Contact Form Response
export const sendContactResponse = async (contactEmail, name, responseMessage) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Outfit', Arial, sans-serif; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1d3b82; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f8fafc; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>BRDT - Response to Your Inquiry</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for contacting us. Here is our response:</p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
              ${responseMessage}
            </div>
            <p>If you have further questions, please feel free to contact us.</p>
            <p>Best regards,<br>BRDT Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail(
    contactEmail,
    'Response to Your Inquiry - BRDT',
    htmlContent
  );
};
