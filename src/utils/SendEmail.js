import nodemailer from "nodemailer";


async function SendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAILSENDER,
          pass: process.env.PASSSENDER,
        },
      });
      const info = await transporter.sendMail({
        from: `"Infinity Light 👻" <${process.env.EMAILSENDER}>`, // sender address
        to, // list of receivers
        subject,
        html, // html body
      });
    
};
export default SendEmail;