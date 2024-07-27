import { Router } from "express";
import { startChat, askQuestion } from '../api/chats.js';


const chatsRouter = Router();

chatsRouter.post('/questions', askQuestion);
chatsRouter.post('/chats', startChat);

chatsRouter.use('*', function(req, res){
   res.status(200).json({ message: 'not found' });
});

export default chatsRouter;