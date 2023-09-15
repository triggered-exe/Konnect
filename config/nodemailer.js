const nodemailer = require("nodemailer");
const env = require("./environment");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport(env.smtp);

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
