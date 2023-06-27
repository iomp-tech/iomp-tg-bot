const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

dotenv.config()

const token = "6067404818:AAHWBM7g1jfQjkbyPVu-K7rCIotIptRZcIo";
const app = express();

app.use(express.json());
app.use(cors());

const options = {
	key: fs.readFileSync('./ssl/key.pem'),
	cert: fs.readFileSync('./ssl/cert.pem'),
};

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text;

	if (text === "/start") {
		await bot.sendMessage(chatId, 'Ниже появится кнопка для покупки курсов', {
			reply_markup: {
				inline_keyboard: [
					[{ text: "Купить курс", web_app: { url: "https://bot.iomp.ru" } }]
				]
			}
		});
	}
});

app.post('/course-form', async (req, res) => {
	const { title, queryId } = req.body

	console.log(title, queryId)

	try {

		await bot.answerWebAppQuery(queryId, {
			type: 'article',
			id: queryId,
			title: 'Успешная покупка',
			input_message_content: {
				message_text: ` Вы записались на курс: ${title}`
			}
		})

		return res.status(200).json({});
	} catch (e) {
		return res.status(500).json({})
	}
})

const PORT = 8000;

https.createServer(options, app).listen(PORT, () => {
	console.log(`Server started :${PORT} PORT`)
})
// app.listen(PORT, () => console.log('server started on PORT ' + PORT))