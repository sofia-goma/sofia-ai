import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
// import twilio from 'twilio';
import chatsRouter from './routes/chats.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import sendSMSRouter from './routes/sms.js';
import makeCallRouter from './routes/call.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api', chatsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

/* TWILIO LOGIC */

// Twilio credentials from environment variables for security
// const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
// const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

// const client = new twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint to initiate an SMS
app.use('/send-sms', sendSMSRouter);

// Endpoint to initiate a call
app.use('/make-call', makeCallRouter);

// TWILIO LOGIC

app.all('/', function (req, res) {
   res.json({ 'error': "welcome to chat twilio ai server" });
});

app.listen(port, () => {
   console.log(`Server is running on port http://localhost:${port}`);
});
