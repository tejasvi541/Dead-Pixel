import { createTransport } from "nodemailer";

const transport = createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async (emails: string[], trackingId: string) => {
  const trackingURL = `${process.env.BASE_URL}/api/track-mail/${trackingId}`;

  const mailOption = {
    from: process.env.EMAIL_USER,
    to: emails,
    subject: "Tracking Dead Pixel",
    html: `
    <h1>Tracking Id : ${trackingId}</h1>
    <img 
     src="${trackingURL}"
     alt="Dead Pixel"
     style="display:none"
    />    
    `,
  };

  try {
    await transport.sendMail(mailOption);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send mail");
  }
};
