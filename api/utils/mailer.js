import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import dotenv from 'dotenv';
dotenv.config();


// Create the transport using the SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});




// Function to send email
const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: "esantaiwo77@gmail.com", // Replace with your sender email
    to: to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // rethrow to handle it in the calling function
  }
};

// Generate Email With Mailgen
const generateEmail = (intro, name, otp) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "TmeechEstate",
      link: "https://your-product-link.com",
    },
  });

  const email = {
    body: {
      name: name,
      intro: intro,
      action: {
        instructions: "Please use the verification code below to reset password",
        button: {
          color: "#22BC66", // Optional action button color
          text: `${otp}`,
        },
      },
      outro: "If you didn't request this, you can ignore this email.",
    },
  };

  const emailBody = mailGenerator.generate(email);
  const emailText = mailGenerator.generatePlaintext(email);

  return { emailBody, emailText };
};

// Function to send OTP by email
const sendOTPByEmail = async (email, userName, otp) => {
  const subject = "OTP Request";
  const intro = "You received this email because you want to rest your password";
  const { emailBody, emailText } = generateEmail(intro, userName, otp);
  return sendEmail({
    to: email,
    subject,
    text: emailText,
    html: emailBody,
  });
};

export default { sendEmail, generateEmail, sendOTPByEmail };
