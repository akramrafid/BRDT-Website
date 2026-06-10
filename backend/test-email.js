import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Found' : '❌ Missing');

const resend = new Resend(process.env.RESEND_API_KEY);

try {
  console.log('\nSending test email via Resend...');
  const { data, error } = await resend.emails.send({
    from: 'BRDT <onboarding@resend.dev>',
    to: ['brdtbd@gmail.com'],
    subject: 'BRDT Email Test - It Works!',
    html: '<h2>🎉 Your email system is working!</h2><p>Resend is successfully sending emails for your BRDT website.</p>'
  });

  if (error) {
    console.error('❌ Failed:', error);
  } else {
    console.log('✅ Email sent successfully!');
    console.log('Email ID:', data.id);
    console.log('\n🎉 Check your brdtbd@gmail.com inbox (or spam folder)!');
  }
} catch (err) {
  console.error('❌ Error:', err.message);
}

process.exit(0);
