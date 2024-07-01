require("dotenv").config();
const Telegraf = require("telegraf").Telegraf;
const bot = new Telegraf(process.env.telegram_bot);
const { default: axios } = require("axios");
const flatfile = require('flat-file-db');
const db = flatfile('./database.db');

db.put('numbers', [
    { mobile: "233205845096", network: "VODAFONE", "pin": 5050 },
    { mobile: "233208712458", network: "VODAFONE", "pin": 5053 }
]);

const http = axios.create({
    baseURL: 'https://api.atenanla.com/api/v1.0/'
});

const ussd = {
    shortCode: '766',
    msIsdn: '233531644806',
    text: '*766#',
    imsi: '',
    optional: '',
    ussdGwId: 'Vodafone',
    language: 'null',
    sessId: '2161392607',
    network: 'MTN',
    sessionId: '2161392607',
    msisdn: '233531644806',
    ussdString: '*766#',
    serviceCode: ''
}

const logic = async (data) => {
    let response = "Tell me a secret and i will tell you my name";
    let currentSession = '';
    let start = 0;
    let respData = {};
    try {
        const { text, chat } = data?.update?.message;
        const key = `${chat?.id}`;

        if (text === '#') {
            db.put(key, {});
        } else {
            const session = db.get(key);
            if (!session?.step) {
                response = `Hello ${text}\nGive me access to your life. If you know you know`;
                session.step = 1;
                session.name = text;
            } else if (session?.step === 1) {
                const payload = text.split("|");
                const data = await http.post('admin/login', { mobile: payload[0], password: payload[1] });

                session.user = data?.data;
                session.step = 2;
                response = "Access granted to the kingdom.\n1. Game Play\n2 Show numbers";
            } else if (session?.step === 2) {
                if (text === '1' && !session.option) {
                    session.option = 1;
                    const numbers = db.get('numbers');
                    response = "Choose a number and proceed\n\n" + numbers?.map((n, i) => `${i + 1}. ${n.mobile} (${n.network})`).join("\n");
                    session.option = 2;
                    session.mobile = +text;
                } else if (session.option === 1) {
                    const numbers = db.get('numbers');

                    ussd.msisdn = numbers?.[session?.mobile]?.mobile;
                    const data = await http.post('user/ussd', { mobile: payload[0], password: payload[1] });
                }
            }

            db.put(key, session);

        }

    } catch (err) {
        console.log(err)
    } finally {
        data.reply(response);
    }
}

bot.start(async (ctx) => logic(ctx));
bot.on("text", (data) => logic(data));
bot.launch();