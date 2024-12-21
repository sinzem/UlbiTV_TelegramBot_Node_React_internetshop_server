require('dotenv').config();
const TGBot = require("node-telegram-bot-api");

const token = process.env.TG_TOKEN;

const bot = new TGBot(token, {polling: true});

const webAppUrl = "https://admirable-lolly-8888b2.netlify.app"; /* (cвое реакт-приложение) */

bot.on("message", async (msg) => { /* (реагируем на входящее сообщение) */
    const chatId = msg.chat.id; /* (получаем из сообщения id сессии) */
    const text = msg.text;  /* (получаем текст сообщения) */
    // bot.sendMessage(chatId, "Received your message"); /* (пример вывода сообщения - сессия, сообщение, третим аргументом можно добавить опции) */
// -----------------------------------------
    // if (text === '/example') {
    //     /* (в ответ на входящее сообщение '/example' бот отправит сообщение, передаем id чата, текст сообщения, опции) */
    //     await bot.sendMessage(chatId, "Button will appear below, fill out the form", {
    //         reply_markup: { /* (опции) */
    //             /* (пример с keyboard-кнопками) */
    //             keyboard: [ /* (клавиатура с одной кнопкой, добавляем больше, если нужно, каждый массив выдаст ряд кнопок) */
    //                 // [{text: "Fill out the form"}] /* (при нажатии вернет текст сообщения на сервер) */
    //                 [{text: "Fill out the form", web_app: {url: webAppUrl + "/form"}}] /* (при нажатии у пользователя выдаст окно подтверждения перехода в приложение) */
    //             ]
    //         }
    //     })
    // }
// -----------------------------------------
    if (text === '/start') {
        await bot.sendMessage(chatId, "TButton will appear below, fill out the form", {
            reply_markup: { 
                keyboard: [ 
                    [{text: "Fill out the form", web_app: {url: webAppUrl + "/form"}}] 
                ]
            }
        })

        await bot.sendMessage(chatId, "The button to go to the online store is located below", {
            reply_markup: { /* (опции) */
                /* (пример с inline_keyboard-кнопками ) */
                inline_keyboard: [ 
                    [{text: "Make an order", web_app: {url: webAppUrl}}] /* (при нажатии вернет текст сообщения на сервер) */
                ]
            }
        })

        if (msg?.web_app_data?.data) { /* (данные из формы) */
            try {
                const data = JSON.parse(msg?.web_app_data?.data);

                await bot.sendMessage(chatId, "Thanks for your order!");
                await bot.sendMessage(chatId, `Yours country - ${data?.country}, yours street - ${data?.street}`);

                setTimeout(async () => {
                    await bot.sendMessage(chatId, "You can get all the information in this chat");
                })
            } catch (e) {
                console.log(e);
            }
        }
    }
// -----------------------------------------
    // Третий вид кнопки - /setmenubutton  - встраивается в панель возле строки ввода - в botfather пишем /setmenubutton, выдаст выбор доступных ботов(моих), выбираем нужный, в строку ввода вносим адрес стороннего приложения для перехода, после отправки вводим текст для кнопки, после отправки добавится через несколько секунд
})
