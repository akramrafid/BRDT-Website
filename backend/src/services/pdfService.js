import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use /tmp directory on serverless environments like Vercel
const isVercel = process.env.VERCEL || process.env.AWS_REGION;
const uploadsDir = isVercel ? '/tmp' : path.join(__dirname, '../../uploads/invoices');

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (error) {
  console.warn('Could not create uploads directory (expected in some serverless environments):', error);
}

// Generate Invoice PDF
export const generateInvoicePDF = async (donationData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      
      // Generate filename
      const invoiceNumber = donationData.invoiceNumber || `INV-${Date.now()}`;
      const filename = `BRDT-Invoice-${invoiceNumber}.pdf`;
      const filepath = path.join(uploadsDir, filename);

      // Create write stream
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // ==================== Header ====================
      doc.fontSize(20).font('Helvetica-Bold').text('BRDT', { align: 'left' });
      doc.fontSize(12).font('Helvetica').text('Belghar Rural Development Trust', { align: 'left' });
      doc.fontSize(10).text('Enriching Rural Communities Lives', { align: 'left' });
      
      doc.moveDown();

      // Organization Info
      doc.fontSize(9).text(`📞 Phone: ${process.env.ORG_PHONE || '+44 7540 253384'}`, { align: 'left' });
      doc.text(`📧 Email: ${process.env.BRDT_EMAIL || 'noreply@brdtrust.org'}`, { align: 'left' });
      doc.text(`🌐 Website: ${process.env.ORG_WEBSITE || 'https://www.brdtrust.org'}`, { align: 'left' });

      // ==================== Invoice Title ====================
      doc.moveTo(40, doc.y + 10).lineTo(550, doc.y + 10).stroke();
      doc.moveDown();
      doc.fontSize(16).font('Helvetica-Bold').text('INVOICE', { align: 'center' });
      doc.moveDown();

      // Invoice Meta Information
      doc.fontSize(10).font('Helvetica');
      const invoiceY = doc.y;
      
      doc.text(`Invoice #: ${invoiceNumber}`, 50);
      doc.text(`Date: ${new Date(donationData.invoiceDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`, 50);
      doc.text(`Status: ${donationData.status || 'PAID'}`, 300);

      doc.moveDown();

      // ==================== Bill To ====================
      doc.fontSize(11).font('Helvetica-Bold').text('DONOR INFORMATION', 50);
      doc.fontSize(10).font('Helvetica');
      doc.text(`Name: ${donationData.donorName}`, 50);
      doc.text(`Email: ${donationData.donorEmail}`, 50);
      if (donationData.donorPhone) {
        doc.text(`Phone: ${donationData.donorPhone}`, 50);
      }
      if (donationData.donorAddress) {
        doc.text(`Address: ${donationData.donorAddress}`, 50);
      }
      if (donationData.donorCountry) {
        doc.text(`Country: ${donationData.donorCountry}`, 50);
      }

      doc.moveDown();

      // ==================== Donation Details Table ====================
      const tableTop = doc.y + 10;
      const col1 = 50;
      const col2 = 300;
      const col3 = 450;

      // Table Header
      doc.fontSize(10).font('Helvetica-Bold');
      doc.rect(col1 - 10, tableTop, 500, 20).fill('#8c1d54');
      doc.fillColor('white');
      doc.text('Description', col1, tableTop + 5);
      doc.text('Amount', col2, tableTop + 5);
      doc.text('Total', col3, tableTop + 5);

      // Table Content
      doc.fillColor('black').font('Helvetica');
      const contentTop = tableTop + 25;

      doc.text(donationData.appealType || 'Donation', col1, contentTop);
      doc.text(`৳${donationData.amount}`, col2, contentTop);
      doc.text(`৳${donationData.amount}`, col3, contentTop);

      // Table Footer
      const footerTop = contentTop + 40;
      doc.moveTo(col1 - 10, footerTop).lineTo(550, footerTop).stroke();

      doc.fontSize(11).font('Helvetica-Bold');
      doc.text('TOTAL AMOUNT:', col1, footerTop + 10);
      doc.fontSize(14).font('Helvetica-Bold').text(`৳${donationData.amount}`, col3 - 30, footerTop + 10);

      doc.moveDown(3);

      // ==================== Donation Details ====================
      doc.fontSize(10).font('Helvetica-Bold').text('DONATION DETAILS', 50);
      doc.fontSize(9).font('Helvetica');
      doc.text(`Donation Type: ${donationData.donationType || 'One-Time'}`, 50);
      doc.text(`Appeal: ${donationData.appealType}`, 50);
      doc.text(`Payment Status: ${donationData.paymentStatus || 'COMPLETED'}`, 50);
      if (donationData.transactionId) {
        doc.text(`Transaction ID: ${donationData.transactionId}`, 50);
      }

      doc.moveDown();

      // ==================== Footer ====================
      doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      doc.fontSize(10).font('Helvetica-Bold').text('100% DONATION POLICY', 50);
      doc.fontSize(9).font('Helvetica').text(
        'BRDT ensures that 100% of your donation goes directly to helping rural communities. No administrative fees are deducted from your contribution.',
        50,
        doc.y,
        { width: 500, align: 'left' }
      );

      doc.moveDown();

      doc.fontSize(8).font('Helvetica').fillColor('#666');
      doc.text('Thank you for your generosity and support!', 50, doc.y, { align: 'center' });
      doc.text('© 2026 Belghar Rural Development Trust. All rights reserved.', 50, doc.y + 10, { align: 'center' });

      // Finalize PDF
      doc.end();

      stream.on('finish', () => {
        console.log(`✅ Invoice PDF generated: ${filename}`);
        resolve(filepath);
      });

      stream.on('error', (err) => {
        console.error('❌ Error creating PDF:', err);
        reject(err);
      });
    } catch (error) {
      console.error('❌ Error in PDF generation:', error);
      reject(error);
    }
  });
};

// Get Invoice URL
export const getInvoiceURL = (filename) => {
  return `${process.env.API_URL}/uploads/invoices/${filename}`;
};
