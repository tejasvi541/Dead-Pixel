import { createTransport } from "nodemailer";

const transport = createTransport({
  service: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
