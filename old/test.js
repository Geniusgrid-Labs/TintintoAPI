
require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const msisdnModel = require("./models/msisdn");
const devicesModel = require("./models/devices");

// replace the value below with the Telegram token you receive from @BotFather
// const token = process.env.telegram_bot;
// console.log(token)

// // Create a bot that uses 'polling' to fetch new updates
// const bot1 = new TelegramBot(token, { polling: true });

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot1.on('message', (msg) => {
//     const chatId = msg.chat.id;

//     // send a message to the chat acknowledging receipt of their message
//     console.log(msg)
//     bot1.sendMessage("-1002336199501", 'Received your message', {
//         message_thread_id: 2
//     });
// });
// bot1.onText(/\/start/, (msg) => {
//     botChatId = msg.chat.id;
//     console.log(`Bot chat ID set: ${botChatId}`);
//     bot1.sendMessage(botChatId, 'Bot is set up to send messages to itself. Use /send_to_self command to test.');
// });
// msisdnModel.findAll({ where: { device_id: "5dba6cee2a7bf544" } }).then(res => {
//     console.log(res?.map(r => r?.dataValues));
// });


const db = require('./db');
const { autoPlayer } = require("./player");
// db.query('ALTER TABLE msisdn ADD plays int(1)').then(res => {
//     console.log(res);
// });

db.query('select * from devices').then(res => {
    console.log(res);
});

// db.query("update devices set device_id='c6e58bc927f72f0b' where id=2").then(res => {
//     console.log(res);
// });

// db.query("insert into msisdn values(NULL,'Nana','233502922670','VODAFONE','1389','',0,NULL,0)").then(res => {
//     console.log(res);
// });
msisdnModel.findAll().then(res => {
    console.log(res?.map(m => m.dataValues));
})

// db.query('desc msisdn').then(res => {
//     console.log(res);
// });

//
// const _ = "[Current Balance: GHS 29.86, Available Balance: GHS 29.86, OK]";
// const balance = _.match(/GHS\s+([\d.]+)/g)?.map(match => parseFloat(match.split(' ')[1]))[0];


// if (balance.slice(-1) === ',')
//     balance = balance.slice(0, -1);

// console.log(_.match(/GHS\s+([\d.]+)/g));
// autoPlayer();