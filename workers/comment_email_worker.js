// const queue = require("../config/kue.js");

// const commentMailer = require("../mailers/comments_mailer.js");

// queue.process("emails", function(job, done){
//     commentMailer.newComment(job.data);
//     console.log("comment email worker working"+ job.data)

//     done();
// })