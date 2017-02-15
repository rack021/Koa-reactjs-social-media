const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {user: "rack021@gmail.com", pass: "gamze@21"}
});
class Mail {
  constructor(to, text) {
    this.to = to;
    this.text = text;
    console.log("dfcvcvc");
  }

  send() {
    let mailOptions = {
      from: "\"versailles Support\" <rack021@gmail.com>",
      // sender address
      to: this.to,
      // list of receivers
      subject: "Versailles activation mail",
      // Subject line
      text: "You Activation mail",
      // plaintext body
      // html body
      html: ""
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
    });
  }
}

module.exports = Mail;
