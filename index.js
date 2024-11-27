require('dotenv').config();
const TGBot = require("node-telegram-bot-api");

const token = process.env.TG_TOKEN;

const bot = new TGBot(token, {polling: true});

bot.on("message", async (msg) => { /* (реагируем на входящее сообщение) */
    const chatId = msg.chat.id; /* (получаем из сообщения id сессии) */
    const text = msg.text;  /* (получаем текст сообщения) */
    // bot.sendMessage(chatId, "Received your message"); /* (пример вывода сообщения - сессия, сообщение, третим аргументом можно добавить опции) */

    if (text === '/start') {
        /* (при сообщении start предложим заполнить форму) */
        await bot.sendMessage(chatId, "Button will appear below, fill out the form", {
            reply_markup: { /* (опции) */
                keyboard: [ /* (клавиатура с одной кнопкой) */
                    [{text: "Fill out the form"}] /* (при нажатии вернет текст сообщения на сервер) */
                ]
            }
        })
    }
})