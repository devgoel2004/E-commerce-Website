const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
  //Transporter is responsible to connect to the email server
  const transporter = nodeMailer.createTransport({
    service: process.env.APP_HOST,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  //These are all the mail options that need to be send.
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
