const nodemailer = require("../config/nodemailer.js");

exports.newComment = async (comment) => {
   let htmlString = await nodemailer.renderTempelate("/comments/new_comment.ejs", comment);
   console.log(htmlString)
  nodemailer.transporter.sendMail({
    from: "triggertesting47@gmail.com",
    to: comment.user.email,
    subject: "New Comment Published",
    html: htmlString
  })
  .then(function(info){
      console.log("Message sent", info);
      return;
  })
  .catch(function(err){
      console.log("Error in sending mail", err);
      return;
  })
} 