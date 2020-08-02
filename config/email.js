const nodemailer = require("nodemailer");
const keys = require("./keys");

let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: keys.EMAIL,
    pass: keys.EMAIL_PASS
  }
});

/*

let emailOptions = {
  from: keys.EMAIL,
  to: "",
  subject: "",
  text: ""
};

transporter.sendMail(emailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
});

*/

module.exports = transport;
