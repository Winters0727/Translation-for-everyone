const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');

const sendEmail = function(req, res, title, context) {
    const config = {
        mailer: {
          service: 'Gmail',
          host: 'localhost',
          port: process.env.MAIL_PORT,
          user: process.env.ADMIN_MAIL_ID,
          password: process.env.ADMIN_MAIL_PASSWORD
        },
      };
    
    const from = process.env.ADMIN_MAIL_ID;
    const to = req.body.kakaoEmail
    const title = title;
    const context = context;
    
    const mailOptions = {
        from,
        to,
        title,
        context,
    };
    
    const transporter = nodemailer.createTransport(smtpPool({
        service: config.mailer.service,
        host: config.mailer.host,
        port: config.mailer.port,
        auth: {
            user: config.mailer.user,
            pass: config.mailer.password,
        },
        tls: {
            rejectUnauthorize: false,
        },
        maxConnections: 5,
        maxMessages: 100,
    }));

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log('failed... => ', error);
            res.json({"mailError" : "Fail to send mail."})
        } else {
            console.log('succeed... => ', response);
            res.json({"result" : "Success to send mail"});
        }
        
        transporter.close();
        });

}

module.exports = { sendEmail }