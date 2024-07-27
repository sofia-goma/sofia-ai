import { Router } from "express";
import twilio from 'twilio';
import dotenv from 'dotenv';


dotenv.config();
const sendSMSRouter = Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

sendSMSRouter.post('/', (req, res) => {
   const to = req.body.to;
   const message = req.body.message;

   client.messages.create({
      body: message,
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER
   })
      .then((message) => {
         console.log(message.sid);
         res.send('Message sent!');
      })
      .catch((error) => {
         console.error(error);
         res.status(500).send('Failed to send message');
      });
});

export default sendSMSRouter;