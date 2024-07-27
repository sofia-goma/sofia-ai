import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';


dotenv.config();

const API = process.env.GEMINI_API_KEY;

// generative ai instance

const genAI = new GoogleGenerativeAI(API);

// post a question to gemini

export async function askQuestion(req, res) {
   try {
      if (!req.body.message) {
         res.status(403).json({ error: 'some fields are missing' });
         return;
      }
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = req.body.message;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      res.status(200).send(text);

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// start a chat history with gemini

export async function startChat(req, res) {
   try {
      const model = genAI.getGenerativeModel({ 'model': 'gemini-pro' });
      if (!req.body.message) {
         res.status(403).json({ error: 'some fields are missing' });
         return;
      }

      const chat = model.startChat({
         history: req.body.history
      });
      const message = req.body.message;

      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = await response.text();
      res.status(200).send(text);

   } catch (error) {
      res.status(500).json({ error: error.message });
   }
}