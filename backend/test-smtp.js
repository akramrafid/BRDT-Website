import nodemailer from 'nodemailer';

const EMAIL = 'brdtbd@gmail.com';
const PASS = 'icwifzcfgzrijbvp';

console.log(`Testing SMTP connection for ${EMAIL}...`);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL, pass: PASS }
});

try {
  await transporter.verify();
  console.log('✅ Connection SUCCESSFUL!');
  
  const info = await transporter.sendMail({
    from: `"BRDT Test" <${EMAIL}>`,
    to: EMAIL,
    subject: 'BRDT Test - Working!',
    html: '<h2>Email works!</h2>'
  });
  console.log('✅ Test email sent:', info.messageId);
  process.exit(0);
} catch (e) {
  console.log('❌ Connection FAILED:');
  console.log(e.message);
  process.exit(1);
}
