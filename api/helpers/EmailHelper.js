import nodemailer from "nodemailer";
import EmailTemplate from "../models/EmailTemplate";

class EmailHelper {
  constructor() {
    this.mailOption = {};
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACC,
        pass: process.env.GMAIL_PWD
      }
    });
  }

  static async getEmailTemplate(emailTemplateName) {
    try {
      let emailTemplate = await EmailTemplate.find({
        emailCustomName: emailTemplateName
      });
      return emailTemplate;
    } catch (error) {
      console.log(error);
    }
  }

  static changeEmailTemplateContent(emailTemplate, name, data, sender) {
    let content;
    if (!emailTemplate) {
      return;
    }
    content = emailTemplate.replace(/{sender}/g, sender);
    content = emailTemplate.replace(/{name}/g, name);
    content = emailTemplate.replace(/{password}/g, data);

    return content;
  }

  async sendEmail(mailOptions) {
    this.mailOption = mailOptions;
    return new Promise((res, rej) => {
      this.transporter.sendMail(this.mailOption, (error, info) => {
        if (error) {
          res(error);
          console.log(error);
        }
        res(true);
      });
    });
  }
}

export default EmailHelper;
