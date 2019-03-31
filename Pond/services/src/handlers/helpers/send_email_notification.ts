const nodemailer = require("nodemailer");

//example mailOptions object
/*let mailOptions = {
        from: 'The Signpost Team',
        to: req.body.email,
        subject: 'Welcome to Signpost!',
        html: '<h1>Welcome to Signpost!</h1></div><p>Dear ' + req.body.first_name + ',</p><p>Thank you for joining Signpost! Signpost is built with the user in mind - we want to make your life better. ' +
        'Therefore, if you have any suggestions, questions, complaints or feedback feel free to contact either of the Signpost founders directly:</p>' +
        '<p>Benjamin du Preez: benjamin@signpost.app</p><p>Chrisjan Wust: chrisjan@signpost.app</p><p>Regards,</p><p>The Signpost Team</p><p><a href="http://www.signpost.app">www.signpost.app</a></p>'
    };*/

let sendMatchEmailNotification = async (mailOptions) => {
    try{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pond.app.contact@gmail.com',
                pass: 'Letsmakefriends8*'
            },
            tls: { rejectUnauthorized: false }
        });

        transporter.sendMail(mailOptions, (err, result) => {
            if (err) {
                console.log(err);
                //res.status(500).send(err);
            } else {
                console.log(result);
                //res.status(200).send(result);
            }
        });

    } catch (err) {
        console.log(`Error in send match email notification:  ${err.message} `);
    }
};

module.exports = sendMatchEmailNotification;