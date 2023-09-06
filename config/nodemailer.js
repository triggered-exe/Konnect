const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "triggertesting47@gmail.com",
    pass: "lqrbduobasktxmxm",
  },
});

const renderTempelate = async (relativePath, comment) => {
  let mailHTML;

  await ejs
    .renderFile(path.join(__dirname, "../views/mailers", relativePath), {
      comment: comment,
    })
    .then(function (template) {
      mailHTML = template;
    })
    .catch((err) => {
      console.log(err);
      mailHTML = err;
    });
  return mailHTML;
};

module.exports = {
  transporter,
  renderTempelate,
};
