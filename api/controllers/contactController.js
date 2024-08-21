import emailService from '../utils/mailer.js'; // Ensure the path is correct

export const handleContactMessage = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const subject = "New Inquiry: Request to List a Property";
  const text = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage: ${message}`;
  const html = `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>`;

  try {
    await emailService.sendEmail({
      to: process.env.EMAIL_USER,
      subject,
      text,
      html
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
};




export const handleContactMessageForSale = async (req, res) => {
  const { firstName, lastName, email, phone, message ,  listingAddress} = req.body;

  const subject = `New Inquiry: About a property at ${listingAddress} `;
  const text = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage: ${message}`;
  const html = `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>`;

  try {
    await emailService.sendEmail({
      to: process.env.EMAIL_USER,
      subject,
      text,
      html
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
};
