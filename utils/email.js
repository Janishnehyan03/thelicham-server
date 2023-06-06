const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const dontenv = require("dotenv");

dontenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nehyanjanish@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
  port: 465,
  secure: true,
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: path.join(process.cwd(), "views"),
    },
    viewPath: path.join(process.cwd(), "views"),
    extName: ".hbs",
  })
);
module.exports = class Email {
  constructor({ email, url, name, subject, title, otpToken }) {
    this.email = email;
    this.url = url;
    this.from = `Thelicham Monthly`;
    this.subject = subject;
    this.title = title;
    this.name = name;
    this.otpToken = otpToken;
  }

  async send(template) {
    //1) render HTML based on pug
    try {
      const mailOptions = {
        from: "thelicham.com",
        to: this.email,
        subject: this.subject,
        template: template,
        context: {
          name: this.name,
          subject: this.subject,
          url: this.url,
          title: this.title,
          otpToken: this.otpToken,
        },
      };
      // 3) create a trasport and send
      let data = await transporter.sendMail(mailOptions); //sendMail is build in function
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async sendWelcome() {
    await this.send("welcome", "Welcome To Thelicham Family");
  }
  async sendVerification() {
    await this.send("token-verification", "Please Verify Your Email");
  }
};
