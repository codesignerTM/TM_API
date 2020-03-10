import nodemailer from "nodemailer";

class EmailHelper {
  constructor() {
    this.mailOption = {
      from: "hello@tamasmezo.com",
      to: "mezotamas0612@gmail.com",
      subject: "Password Reset",
      text: `Your new password: 1211 Please change it after log in!`
    };
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACC,
        pass: process.env.GMAIL_PWD
      }
    });
  }

  sendEmail() {
    this.transporter.sendMail(this.mailOption, (err, data) => {
      if (err) {
        console.log("Error in pwd reset", err);
      } else {
        console.log("email sent");
        return data;
      }
    });
  }
}

export default EmailHelper;
