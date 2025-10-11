
// import nodemailer from "nodemailer";

// // async..await is not allowed in global scope, must use a wrapper
// const sendEmail = async function (email, subject, message) {
//   // create reusable transporter object using the default SMTP transport
//   console.log(`📧 [${new Date().toISOString()}] Starting email send process`);
//   console.log(`📧 Recipient: ${email}`);
//   console.log(`📧 Subject: ${subject}`);
//   console.log(`📧 Message length: ${message ? message.length : 0} characters`);
  
//   // Log SMTP configuration (without sensitive data)
//   console.log(`📧 SMTP Configuration:`);
//   console.log(`   Host: ${process.env.SMTP_HOST}`);
//   console.log(`   Port: ${process.env.SMTP_PORT}`);
//   console.log(`   Username: ${process.env.SMTP_USERNAME ? '***configured***' : 'NOT SET'}`);
//   console.log(`   Password: ${process.env.SMTP_PASSWORD ? '***configured***' : 'NOT SET'}`);
//   console.log(`   From Email: ${process.env.SMTP_FROM_EMAIL}`);
  
//   try{
//     console.log(`📧 Creating transporter...`);

  
//   let transporter = nodemailer.createTransport({
    
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: process.env.SMTP_USERNAME,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   });

//   console.log(`📧 Transporter created successfully. Verifying connection...`);
  
//   // Verify connection configuration
//   await transporter.verify();
//   console.log(`✅ SMTP connection verified successfully`);

//   console.log(`📧 Sending email...`);
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: process.env.SMTP_FROM_EMAIL, // sender address
//     to: email, // user email
//     subject: subject, // Subject line
//     html: message, // html body
//   });
  
//   console.log(`✅ [${new Date().toISOString()}] Email sent successfully!`);
//   console.log(`📧 Message ID: ${info.messageId}`);
//   console.log(`📧 Response: ${info.response}`);
  
//   return { success: true, messageId: info.messageId };
// }
// catch(error)
// {
//     console.error(`❌ [${new Date().toISOString()}] Email sending failed:`);
//     console.error(`❌ Error Type: ${error.name}`);
//     console.error(`❌ Error Message: ${error.message}`);
//     console.error(`❌ Error Code: ${error.code}`);
//     console.error(`❌ Full Error:`, error);
    
//     // Specific error handling for common SMTP issues
//     if (error.code === 'EAUTH') {
//       console.error(`❌ Authentication failed - check SMTP username/password`);
//     } else if (error.code === 'ECONNECTION') {
//       console.error(`❌ Connection failed - check SMTP host/port`);
//     } else if (error.code === 'ETIMEDOUT') {
//       console.error(`❌ Connection timeout - check network/firewall`);
//     }
    
//     throw error; // Re-throw to be handled by calling function
// }
// };


// export default sendEmail;

 import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async function (email, subject, message) {
  console.log(`📧 [${new Date().toISOString()}] Starting email send process`);
  console.log(`📧 Recipient: ${email}`);
  console.log(`📧 Subject: ${subject}`);
  console.log(`📧 Message length: ${message?.length || 0} characters`);

  try {
    console.log(`📧 Sending email via Resend...`);
    const { data, error } = await resend.emails.send({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject,
      html: message,
    });

    if (error) throw error;

    console.log(`✅ [${new Date().toISOString()}] Email sent successfully!`);
    console.log(`📧 ID: ${data.id}`);

    return { success: true, id: data.id };
  } catch (error) {
    console.error(`❌ Email sending failed: ${error.message}`);
    throw error;
  }
};

export default sendEmail;
