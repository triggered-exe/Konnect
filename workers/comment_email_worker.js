const queue = require("../config/kue.js");

const comentMailer = require("../mailers/comments_mailer.js");

queue.process("emails", function(job, done){
    comentMailer.newComment(job.data);
    console.log("comment email worker working"+ job.data)

    done();
})