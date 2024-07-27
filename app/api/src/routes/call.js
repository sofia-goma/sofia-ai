import { Router } from "express";
import twilio from 'twilio';
import dotenv from 'dotenv';


dotenv.config();
const makeCallRouter = Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

makeCallRouter.post('/', (req, res) => {
   const to = req.body.to;

   client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER
   })
      .then((call) => {
         console.log(call.sid);
         res.send('Call initiated!');
      })
      .catch((error) => {
         console.error(error);
         res.status(500).send('Failed to initiate call');
      });
});

export default makeCallRouter;