require("dotenv").config();
const net = require('net');
const Telegraf = require("telegraf").Telegraf;
const bot = new Telegraf(process.env.telegram_bot);
const { default: axios } = require("axios");
const flatfile = require('flat-file-db');
const db = flatfile('./database.db');
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

/** server and socket  */

var app = express();
app.use(
    cors({
        credentials: true,
    })
);
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,content-type,Accept"
    );
    next();
});
var http_ = require('http').createServer(app);
var io = new Server(http_, {
    cors: {
        origin: "*"
    }
})

let socket_session = null;
app.get('*', function (req, res) {
    res.status(200).send("What are you looking for here");
});

http_.listen(3000, function () {
    var host = http_.address().address
    var port = http_.address().port
    console.log('App listening at https://%s:%s', host, port)
});

io.on('connection', function (socket) {
    console.log('Client connected to the WebSocket');
    socket_session = socket;

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('chat message', function (msg) {
        console.log("Received a chat message");
        io.emit('chat message', msg);
    });
})


/** telegram */
const numbersInit = db.get('numbers');
if (typeof (numbersInit) !== 'object') {
    db.put('numbers', [
        { mobile: "233205845096", network: "VODAFONE", "pin": 5050, name: 'Emmanuel', balance: 0 },
        { mobile: "233208712458", network: "VODAFONE", "pin": 5053, name: 'Godwin', balance: 0 },
        { mobile: "233500739159", network: "VODAFONE", "pin": 5052, name: 'Frank', balance: 0 },
        { mobile: "233500739155", network: "VODAFONE", "pin": 5051, name: 'Janet', balance: 0 },
        { mobile: "233531644806", network: "MTN", "pin": 1101, name: '', balance: 0 },
        { mobile: "233500297896", network: "VODAFONE", pin: 1703, name: 'Rita', balance: 0 },
        { mobile: "233205912400", network: "VODAFONE", pin: 2021, name: 'Rita', balance: 0 },
        { mobile: "233502054167", network: "VODAFONE", pin: 1011, name: 'Rita', balance: 0 },
        { mobile: "233502055429", network: "VODAFONE", pin: 2024, name: 'Rita', balance: 0 },
        { mobile: "233502053829", network: "VODAFONE", pin: 2023, name: 'Rita', balance: 0 },
        { mobile: "233500078488", network: "VODAFONE", pin: 4657, name: '', balance: 0 },
        { mobile: "233500078237", network: "VODAFONE", pin: 4657, name: '', balance: 0 },
        { mobile: "233500078486", network: "VODAFONE", pin: 4657, name: '', balance: 0 },
        { mobile: "233500078493", network: "VODAFONE", pin: 4657, name: '', balance: 0 },
        { mobile: "233500078189", network: "VODAFONE", pin: 4657, name: '', balance: 0 },
        { mobile: "233539342582", network: "MTN", pin: 9834, name: '', balance: 0 },
        { mobile: "233209845569", network: "VODAFONE", pin: 9834, name: '', balance: 0 },
        { mobile: "233209845420", network: "VODAFONE", pin: 9834, name: '', balance: 0 }
    ]);
}



const features = [{ name: 'Game Play', id: 1 }, { name: 'Show numbers', id: 2 }, { name: 'Redis Data', id: 3 }, { name: 'DB Data', id: 4 }, { name: 'Auto Play', id: 5 }, { name: 'Socket Commands', id: 6 }];
const httpAxios = axios.create({
    baseURL: process.env.api
});

const randomGen = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
const sessionGen = () => Array.from({ length: 3 }).map(m => randomGen(1000, 9999)).join("");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    messageType: 1,
    sessionId: '2161392607',
    msisdn: '233531644806',
    ussdString: '*766#',
    serviceCode: ''
}
const vf = { "shortCode": "766", "msIsdn": "233208444900", "text": "*766#", "imsi": "", "optional": "", "ussdGwId": "Vodafone", "language": "null", "sessId": "5927584357" }
const devices = [{ id: '0c9fb3219b69ca23', name: 'Samsung', ids: 1389 }, { id: '24689d7d8e361c46', name: 'Helen', ids: 9834 }, { id: '384cc34a3dc22149', name: 'Nana Adwoa', ids: 9834 }];

// const commandList = {
//     checkbalance: 'command=checkbalance', changePin: "command=*170#:6:6:1:1388:1389:1389",
//     allowCashOut: "command=*170#:4:1",
//     transfer: "command=*170#:1:1:0531644805:0531644805:1:cash:#:1389"
// }
const displayCommands = [
    "\nVF-MTN transfer \ncommand=*110#:1:2:1:0531644806:0531644806:1:1:cash:9834",
    '\nMTN-MTN transfer \ncommand=*170#:1:1:0531644805:0531644805:1:cash:#:1389',
]
const commandList = [
    { name: 'VF Check Number', command: 'command=*127#:1' },
    { name: 'MTN Check Number', command: 'command=*156#:1' },
    { name: 'MTN Balance Check', command: 'command=*170#:6:1:pincode' },
    { name: 'MTN Pin Change', command: 'command=*170#:6:6:1:1388:1389:1389' },
    { name: 'MTN Allow Cash Out', command: 'command=*170#:4:1' },
    { name: 'MTN transfer', command: '' },
    { name: 'VF Balance Check', command: 'command=*110#:6:1:1:pincode' },
    { name: 'VF Balance Check', command: 'command=*110#:6:1:1:pincode' }
]

const logic = async (data) => {
    const { text, chat } = data?.update?.message;

    if (![1209002201].includes(chat?.id)) {
        data.reply("Fuck off intruder");
        return;
    }
    let response = "Tell me a secret and i will tell you my name";
    let currentSession = '';
    let start = 0;
    let respData = {};
    try {
        const key = `${chat?.id}`;


        if (text === '#') {
            db.put(key, {});
            const check = db.get('adminSession');
            if (check?.id) {
                const session = db.get(key);
                session.step = 2;
                response = `Access granted to the kingdom.\n\n${features?.map(m => `${m.id}. ${m.name}`).join("\n")}`;
            }
        } else {
            const session = db.get(key);
            if (!session?.step) {
                response = `Hello ${text}\nGive me access to your life. If you know you know`;
                session.step = 1;
                session.name = text;
            } else if (session?.step === 1) {
                const payload = text.split("|");
                const data = await httpAxios.post('admin/login', { mobile: payload[0], password: payload[1] });

                db.put('adminSession', data?.data);
                session.step = 2;
                response = `Access granted to the kingdom.\n\n${features?.map(m => `${m.id}. ${m.name}`).join("\n")}`;
            } else if (session?.step === 2) {
                if (text === '1') {
                    session.option = 1;
                    const numbers = db.get('numbers');
                    response = "Choose a number and proceed\n\n" + numbers?.map((n, i) => `${i + 1}. ${n.mobile} (${n.network})`).join("\n");
                    session.action = +text;
                    session.step = 3;
                } else if (text === '2') {
                    const numbers = db.get('numbers');
                    response = `List of numbers \n\n${numbers?.map(m => `${m.mobile}  |  ${m.network.toLowerCase()}  | ${m.name} | Ghs ${m.balance}`).join("\n")}`
                } else if (text === '3') {
                    session.step = 4;
                    response = `Redis menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n0. For redis menu`;
                } else if (text === '4') {
                    session.step = 5;
                    response = `Database menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n4. Append to existing \n0. For DB menu`;
                } else if (text === '5') {
                    session.step = 6;
                    const numbers = db.get('numbers');
                    response = "Choose a number and proceed\n\n" + numbers?.map((n, i) => `${i + 1}. ${n.mobile} (${n.network})`).join("\n");
                } else if (text === '6') {
                    session.step = 7;
                    session.command = { step: 1 };
                    response = `Choose the device to process this command\n${devices?.map((m, i) => `${i + 1}. ${m.name}`).join("\n")}`;
                }
            } else if (session?.step === 3) {
                if (session.option === 1) {
                    const numbers = db.get('numbers');
                    const selectedMobile = numbers[+text - 1];
                    let data_ = ussd;
                    if (selectedMobile?.network === 'VODAFONE') {
                        data_ = vf;
                        data_.msIsdn = selectedMobile?.mobile;
                        data_.sessId = sessionGen();
                    } else {
                        data_.msisdn = selectedMobile?.mobile;
                        data_.msIsdn = selectedMobile?.mobile;
                        data_.sessionId = sessionGen();
                    }
                    session.payload = data_;
                    session.selectedMobile = selectedMobile;
                    const data = await httpAxios.post(`user/ussd/ticket/${session.selectedMobile?.network === 'MTN' ? '' : 'vodafone'}`, data_);
                    response = data?.data?.data?.inboundResponse || data?.data?.ussdMenu;
                    session.option = 2;
                } else if (session.option === 2) {
                    if (session.selectedMobile?.network === 'MTN')
                        session.payload.ussdString = text;
                    else
                        session.payload.text = text;

                    const inputs = text.split(" ");
                    if (inputs.length > 1) {
                        let l = 0;
                        while (l < inputs.length) {
                            if (session.selectedMobile?.network === 'MTN')
                                session.payload.ussdString = inputs[l];
                            else
                                session.payload.text = inputs[l];

                            l++;

                            const resp = await httpAxios.post(`user/ussd/ticket/${session.selectedMobile?.network === 'MTN' ? '' : 'vodafone'}`, session.payload);
                            response = resp?.data?.data?.inboundResponse || resp?.data?.ussdMenu;
                            response = `${session.selectedMobile?.mobile}\n\n${response}`
                            if (response.includes("1. Confirm")) break;
                            else data.reply(response);

                            await sleep(1000);
                        }
                    } else {
                        const resp = await httpAxios.post(`user/ussd/ticket/${session.selectedMobile?.network === 'MTN' ? '' : 'vodafone'}`, session.payload);
                        response = resp?.data?.data?.inboundResponse || resp?.data?.ussdMenu;
                        response = `${session.selectedMobile?.mobile}\n\n${response}`
                    }
                }
            } else if (session?.step === 4) {
                if (text === '0') {
                    response = `Redis menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n0. For redis menu`;
                    delete session.subStep;
                } else {
                    if (!session.subStep) {
                        response = 'What key are we working with';
                        session.subStep = text;
                    } else {
                        const adminSession = db.get("adminSession");
                        let resp = {};
                        let header = {
                            headers: {
                                Authorization: `Bearer ${adminSession?.token}`
                            }
                        };

                        if (session.subStep === '1')
                            resp = await httpAxios.get(`admin/redis/${text}`, header);
                        else if (session.subStep === '2') {
                            const d = text.split("=");
                            resp = await httpAxios.post(`admin/redis`, { key: d[0], value: d[1] }, header);
                        } else if (session.subStep === '3')
                            resp = await httpAxios.delete(`admin/redis/${text}`, header);

                        console.log(resp);
                        response = resp?.data ?? 'Something went wrong retry';
                        response = response + '\n\n0. Back';
                        delete session.subStep;
                    }
                }
            } else if (session?.step === 5) {
                if (text === '0') {
                    response = `Redis menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n4. Append to existing \n0. For redis menu`;
                    delete session.subStep;
                } else {
                    if (!session.subStep) {
                        response = 'What DB key or data are we working with';
                        session.subStep = text;
                    } else {
                        if (session.subStep === '1') {
                            resp = db.get(text);
                            response = JSON.stringify(resp, null, 3);
                        } else if (session.subStep === '2') {
                            const d = text.split("=");
                            try {
                                const obj = JSON.parse(d[1]);
                                resp = db.put(d[0], obj);
                            } catch (err) {
                                resp = db.put(d[0], d[1]);
                            }
                            resp = db.get(d[0]);
                            response = JSON.stringify(resp, null, 3);
                        } else if (session.subStep === '3') {
                            db.del(text);
                            response = "done";
                        } else if (session.subStep === '4') {
                            const d = text.split("=");
                            let existingData = db.get(d[0]);
                            if (existingData !== 'undefinde') {
                                db.put(d[0], d[1]);
                            } else if (typeof existingData === 'string')
                                existingData += d[1];
                            else if (typeof existingData === 'object') {
                                if (Array.isArray(existingData)) {
                                    existingData.push(d[1]);
                                } else
                                    existingData[d[1]] = d[2];
                                db.put(d[0], existingData);
                            }
                            response = "done";
                        }

                        response += '\n\n0. Back';
                        delete session.subStep;
                    }
                }
            } else if (session?.step === 6) {
                if (!session?.auto) {
                    session.auto = { done: 0 };
                    const numbers = db.get('numbers');
                    const selectedMobile = numbers[+text - 1];
                    session.auto.number = selectedMobile;
                    response = "How many games do you want to play in total\neg 1";
                } else if (!session?.auto?.count) {
                    response = "How much do you want to spend on each game\neg. 3,2,5";
                    session.auto.count = +text;
                } else if (!session?.auto?.stake) {
                    response = "Which games fo you want to include in the plays\nOptions \n1. A1\n2. A2\n3. P2\n4. B\n\neg 1,2,3,4";
                    session.auto.stake = text.split(",");
                } else if (!session?.auto?.games) {
                    response = "Do you want to confirm each iteration? \n1. Yes\n0. No\n";
                    session.auto.games = text;
                } else {
                    if (text === 'exit') {
                        delete session.auto;
                        session.step = 1;
                        data.reply("1");
                        return;
                    } else {
                        if (!session?.auto?.confirm) session.auto.confirm = ['1', 'yes', 'Yes', 'YES'].includes(text) ? 1 : 0;

                        //Confirmation 
                        if (session?.auto.confirmData) {
                            session.auto.done++;
                            if (text === '1') {
                                session.auto.confirmData[session.auto.number?.network === 'VODAFONE' ? 'text' : 'ussdString'] = '1';
                                const resps = await httpAxios.post(`user/ussd/ticket/${session.auto.number?.network === 'MTN' ? '' : 'vodafone'}`, session?.auto.confirmData);
                                data.reply(resps?.data?.data?.inboundResponse || resps?.data?.ussdMenu);
                            } else data.reply("Cancelled and moving to the next");
                            delete session?.auto.confirmData;
                            session.auto.waiting = true;
                            db.put(key, session);
                            response = 'Waiting for next trigger';
                            return;
                        }

                        if (session?.auto.waiting) {
                            delete session.auto.waiting;
                        }

                        //Total games to play 
                        let earlyExit = true;
                        while (session.auto.done < +session.auto.count && earlyExit) {
                            let data_ = ussd;
                            if (session.auto?.number?.network === 'VODAFONE') {
                                data_ = vf;
                                data_.msIsdn = session.auto?.number?.mobile;
                                data_.sessId = sessionGen();
                            } else {
                                data_.msisdn = session.auto?.number?.mobile;
                                data_.msIsdn = session.auto?.number?.mobile;
                                data_.sessionId = sessionGen();
                            }

                            let loop = 0;
                            let pickGame = null;
                            let keyValue = session.auto.number?.network === 'VODAFONE' ? 'text' : 'ussdString';
                            while (loop < 5) {
                                if (loop === 0) data_.ussdString = '1';
                                else if (loop === 1) data_[keyValue] = '1';
                                else if (loop === 2) {
                                    const games = session?.auto?.games?.split(",");
                                    pickGame = Math.floor(Math.random() * (games.length - 0 + 1) + 0);
                                    data_[keyValue] = games?.[pickGame] ?? games[0];
                                    pickGame = +data_[keyValue];
                                } else if (loop === 3) {
                                    const plays = [];
                                    let limits = [0, 1, 2, 10, 1];
                                    let limit = limits[pickGame];
                                    if (limit === 10) limit = Math.floor(Math.random() * (limit - 3 + 1) + 3);
                                    while (plays.length != limit) {
                                        const pNumbers = Math.floor(Math.random() * (74 - 1 + 1) + 1);
                                        if (!plays.includes(pNumbers)) plays.push(pNumbers);
                                    }
                                    data_[keyValue] = plays?.join(",");
                                } else if (loop === 4) {
                                    const pi = Math.floor(Math.random() * (session?.auto?.stake.length - 1 - 0 + 1) + 0);
                                    data_[keyValue] = session?.auto?.stake[pi] ?? 1;
                                }

                                let resps = await httpAxios.post(`user/ussd/ticket/${session.auto.number?.network === 'MTN' ? '' : 'vodafone'}`, data_);
                                response = resps?.data?.data?.inboundResponse || resps?.data?.ussdMenu;

                                if (loop === 4) {
                                    if (session.auto.confirm) {
                                        session.auto.confirmData = data_;
                                        loop += 1000;
                                        earlyExit = false;
                                    } else {
                                        session.auto.done++;
                                        data_[keyValue] = 1;
                                        data.reply(response);
                                        resps = await httpAxios.post(`user/ussd/ticket/${session.auto.number?.network === 'MTN' ? '' : 'vodafone'}`, data_);
                                        response = resps?.data?.data?.inboundResponse || resps?.data?.ussdMenu;
                                        data.reply(response);
                                        await sleep(10000);
                                        // session.auto.waiting = true;
                                        // loop += 1000;
                                        // earlyExit = false;
                                    }
                                }

                                await sleep(200);
                                loop++;
                            }
                        }

                        if (session.auto.done >= +session.auto.count) {
                            delete session.auto;
                            session.step = 2;
                            response = `Access granted to the kingdom.\n\n${features?.map(m => `${m.id}. ${m.name}`).join("\n")}`;
                        }
                    }
                }
            } else if (session?.step === 7) {
                if (session?.command?.step === 1) {
                    session.command.device = devices?.[+text - 1];
                    session.command.step = 2;
                    response = session.command.device?.name + ` Device\n\nEnter the command to send \n${commandList?.map((m, i) => `${i + 1}. ${m?.name}`).join('\n')
                        } \n\n${displayCommands?.join("\n")}\n\n0.To change device`;
                } else if (session?.command?.step === 2) {
                    if (text === "0") {
                        session.command.step = 1;
                        response = `${session.command.device?.name} Device\n\nChoose the device to process this command\n${devices?.map((m, i) => `${i + 1}. ${m.name}`).join("\n")} `;
                    } else {
                        if (io) {
                            if (commandList?.[+text]) {
                                let cmd = commandList?.[+text]?.command.replace('pincode', session.command.device?.ids);
                                io.emit("new_message", session.command.device?.id + "=" + cmd);
                                io.emit(session.command.device?.id, session.command.device?.id + "=" + cmd);

                                response = `Command sent to ${session.command.device?.name} processing \n0 To change device`;
                            } else {
                                io.emit("new_message", session.command.device?.id + "=" + text);
                                io.emit(session.command.device?.id, session.command.device?.id + "=" + text);

                                response = `Command sent to ${session.command.device?.name} processing \n0 To change device`;
                            }
                        } else
                            response = "Socket is null and should be restarted";
                    }
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

