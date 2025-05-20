const express = require("express");
const router = express.Router();
const twilio = require('twilio');

// Replace with your credentials
const accountSid = 'ACfdaef053686531eabbd5ef72967f4ca6';
const authToken = '942a70831299aa408cf9e1015dfdf09e';

const client = twilio(accountSid, authToken);


router
    .route("/send-sms")
    .post(async (req, res) => {

        await client.messages
            .create({
                body: 'Hello from Node.js!',
                from: '+15856678949',        // Your Twilio phone number in E.164 format
                to: '+8801708784404'          // Recipient's phone number in E.164 format
            })
            .then(message => console.log('Message sent, SID:', message.sid))
            .catch(error => console.error('Error sending message:', error));


        res.status(200).json({ message: "SMS sent successfully" });
    })

module.exports = router;
