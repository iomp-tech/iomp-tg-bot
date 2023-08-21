import dotenv from "dotenv";
import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
import https from "https";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

import CronService from "./Services/CronService.js";

import apiRouter from "./Routers/apiRouter.js";

dotenv.config()

const token = process.env.BOT_TOKEN;
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({}))
app.use(cors({
	credentials: true,
	origin: true
}));
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10000mb' }));
app.use(express.static('storage/public'))

app.use("/api", apiRouter)

const options = {
	key: fs.readFileSync('./ssl/key.pem'),
	cert: fs.readFileSync('./ssl/cert.pem'),
};

// const bot = new TelegramBot(token, { polling: true });

// bot.on('message', async (msg) => {
// 	const chatId = msg.chat.id;
// 	const text = msg.text;

// 	if (text === "/start") {
// 		await bot.sendMessage(chatId, 'Ниже появится кнопка для покупки курсов', {
// 			reply_markup: {
// 				inline_keyboard: [
// 					[{ text: "Купить курс", web_app: { url: "https://bot.iomp.ru" } }]
// 				]
// 			}
// 		});
// 	}
// });

const PORT = 5000;

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })

		// https.createServer(options, app).listen(PORT, () => {
		// 	CronService.startCronTask()
			
		// 	console.log(`Server started :${PORT} PORT`)
		// })
		app.listen(PORT, () => {
			CronService.startCronTask()

			console.log(`Server started :${PORT} PORT`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()