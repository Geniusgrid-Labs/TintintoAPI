require("dotenv").config();
const net = require('net');
const Telegraf = require("telegraf").Telegraf;
const bot = new Telegraf(process.env.telegram_bot);
const { default: axios } = require("axios");
const flatfile = require('flat-file-db');
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const db = require('./db');
const msisdnModel = require("./models/msisdn");
const { DBCheck } = require("./helper");
const { features } = require("process");
const featuresModel = require("./models/features");
const adminModel = require("./models/admin");
const devicesModel = require("./models/devices");
const commandListModel = require("./models/commandList");
const routes = require("./routes");
const { validate, setDevice, setBalance } = require("./services");
const TelegramBot = require('node-telegram-bot-api');
const bot2 = new TelegramBot(process.env.telegram_bot, { polling: false });
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
app.use(express.json());
// app.use('/api/v1/device', routes);
app.post('/api/v1/device/set-device', validate, setDevice);
app.get('*', function (req, res) {
    res.status(200).send("What are you looking for here");
});

http_.listen(process.env.PORT || 3000, function () {
    var host = http_.address().address
    var port = http_.address().port
    console.log('App listening at https://%s:%s', host, port)
});

io.on('connection', function (socket) {
    // console.log('Client connected to the WebSocket');
    socket_session = socket;

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // socket.on('chat message', function (msg) {
    //     console.log("Received a chat message");
    //     io.emit('chat message', msg);
    // });

    socket.onAny(async (eventName, ...args) => {
        console.log(`Received event: ${eventName}`);
        console.log('Arguments:', args, typeof args);

        // You can handle specific events here if needed
        if (eventName === 'chat message') {
            //     // Broadcast the message to all connected clients
            //     io.emit('chat message', args[0]);
        } else {
            try {
                const obj_ = args[0];
                const req = {};
                req.body = obj_;
                const validation = await validate(req);
                if (validation) {
                    if (obj_.command === 'set-device')
                        await setDevice(req);
                    else if (obj_.command === 'set-balance') {
                        const balance = obj_.message.match(/GHS\s+([\d.]+)/g)?.map(match => parseFloat(match.split(' ')[1]))[0];

                        if (+balance) {
                            req.body.balance = balance;
                            await setBalance(req);
                        }
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }

    });

})

/**DB sync */
DBCheck();

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

const EventEmitter = require('events');

class MemoryDB extends EventEmitter {
    constructor() {
        super();
        this.data = {};
    }

    set(key, value) {
        this.data[key] = value;
        this.emit('set', key, value);
        return true;
    }

    get(key) {
        return this.data[key];
    }

    delete(key) {
        if (key in this.data) {
            delete this.data[key];
            this.emit('delete', key);
            return true;
        }
        return false;
    }

    list() {
        return Object.keys(this.data);
    }

    clear() {
        this.data = {};
        this.emit('clear');
    }
}
const memDB = new MemoryDB();

const logic = async (data) => {

    let features = await featuresModel.findAll();
    features = features?.map(m => m.dataValues);

    const { text, chat } = data?.update?.message;

    if (![1209002201].includes(chat?.id)) {
        data.reply("Fuck off intruder");
        return;
    }
    let response = "Who the fuck are you?";
    let currentSession = '';
    let start = 0;
    let respData = {};
    try {
        const key = `${chat?.id}`;

        // await bot2.sendMessage("1209002201", message);

        if (text.startsWith("customerCommand")) {
            const cmd = text.split("|");
            if (cmd?.[1] === 'registerDevice')
                msisdnModel.update({ device_id: cmd?.[3] }, { where: { mobile: cmd?.[2] } });
            else if (cmd?.[1] === 'recordBalance')
                msisdnModel.update({ device_id: cmd?.[3] }, { where: { mobile: cmd?.[2] } });

            data.reply("Completed");
            return;
        } else if (text === '#') {
            const user = await adminModel.findOne({ where: { name: key } });
            if (user?.dataValues?.id)
                await adminModel.update({ session: '{}', name: key }, { where: { name: key } });
            else
                await adminModel.create({ session: '{}', name: key, token: '' });

            let check = await adminModel.findOne({ where: { name: key } });
            if (check?.dataValues?.token) {
                const session = JSON.parse(check?.dataValues.session ?? '{}');
                session.step = 2;
                response = `Access granted to the kingdom.\n\n${features?.map(m => `${m.id}. ${m.name}`).join("\n")}`;
                await adminModel.update({ session: JSON.stringify(session) }, { where: { name: key } });
            }
            data.reply(response);
            return;
        } else {
            const user = await adminModel.findOne({ where: { name: key } });
            const session = JSON.parse(user?.dataValues.session ?? '{}');

            if (!session?.step) {
                response = `Hello ${text}\nGive me access to your life. If you know you know`;
                session.step = 1;
                session.name = text;
            } else if (session?.step === 1) {
                const payload = text.split("|");
                const data = await httpAxios.post('admin/login', { mobile: payload[0], password: payload[1] });
                await adminModel.update({ token: data?.data?.token }, { where: { name: key } });

                session.step = 2;
                response = `Access granted to the kingdom.\n\n${features?.map(m => `${m.id}. ${m.name}`).join("\n")}`;
            } else if (session?.step === 2) {
                let numbers = await msisdnModel.findAll();
                numbers = numbers?.map(m => m.dataValues);

                if (text === '1') {
                    session.option = 1;
                    response = "Choose a number and proceed\n\n" + numbers?.map((n, i) => `${i + 1}. ${n.mobile} (${n.network})`).join("\n");
                    session.action = +text;
                    session.step = 3;
                } else if (text === '2') {
                    response = `List of numbers \n\n${numbers?.map(m => `${m.mobile}  |  ${m.network.toLowerCase()}  | ${m.holder} | ${m.pin}`).join("\n")}`
                } else if (text === '3') {
                    session.step = 4;
                    response = `Redis menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n0. For redis menu`;
                } else if (text === '4') {
                    session.step = 5;
                    response = `Database menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n4. Append to existing \n0. For DB menu`;
                } else if (text === '5') {
                    session.step = 6;
                    response = "Choose a number and proceed\n\n" + numbers?.map((n, i) => `${i + 1}. ${n.mobile} (${n.network})`).join("\n");
                } else if (text === '6') {
                    session.step = 7;
                    session.command = { step: 1 };
                    let devices = await devicesModel.findAll();
                    devices = devices?.map(m => m.dataValues);
                    response = `Choose the device to process this command\n${devices?.map((m, i) => `${m.id}. ${m.device_holder}`).join("\n")}`;
                }
            } else if (session?.step === 3) {
                if (session.option === 1) {
                    let numbers = await msisdnModel.findAll();
                    numbers = numbers?.map(m => m.dataValues);
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
                        let admin = await adminModel.findOne({ where: { name: key } });
                        let resp = {};
                        let header = {
                            headers: {
                                Authorization: `Bearer ${admin?.dataVales?.token}`
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
                    let numbers = await msisdnModel.findAll();
                    numbers = numbers?.map(m => m.dataValues);

                    const selectedMobile = numbers[+text - 1];
                    session.auto.number = selectedMobile;

                    let admin = await adminModel.findOne({ where: { name: key } });
                    let header = {
                        headers: {
                            Authorization: `Bearer ${admin?.dataVales?.token}`
                        }
                    };

                    resp = await httpAxios.get(`admin/redis/checker`, header);
                    const check_ = resp?.data;

                    if (!String(resp?.data).includes(selectedMobile?.mobile)) {
                        await httpAxios.post(`admin/redis`, { key: "checker", value: String(resp?.data) === 'false' ? `${selectedMobile?.mobile}` : `${String(resp?.data)},${selectedMobile?.mobile}` }, header);
                        resp = await httpAxios.get(`admin/redis/checker`, header);
                        console.log(resp?.data);
                    }


                    response = "How many games do you want to play in total\neg 1";
                } else if (!session?.auto?.count) {
                    response = "How much do you want to spend on each game\neg. 3,2,5";
                    session.auto.count = +text;
                } else if (!session?.auto?.stake) {
                    response = "Which games do you want to include in the plays\nOptions \n1. A1\n2. A2\n3. P2\n4. B\n\neg 1,2,3,4";
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
                            await adminModel.update({ session: JSON.stringify(session) }, { where: { name: key } });
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
                                        data.reply("----");
                                    } else {
                                        session.auto.done++;
                                        data_[keyValue] = 1;
                                        data.reply(response);
                                        resps = await httpAxios.post(`user/ussd/ticket/${session.auto.number?.network === 'MTN' ? '' : 'vodafone'}`, data_);
                                        response = resps?.data?.data?.inboundResponse || resps?.data?.ussdMenu;
                                        data.reply(response);
                                        await sleep(15000);
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
                let devices = await devicesModel.findAll();
                devices = devices?.map(m => m.dataValues);

                let device = await devicesModel.findByPk(text);
                device = device?.dataValues;

                if (session?.command?.step === 1) {
                    session.command.device = device;
                    session.command.step = 2;
                    const commandList = await commandListModel.findAll();
                    const list = commandList?.sort()?.map(({ dataValues }) => "*" + dataValues?.name + "*\n`" + dataValues?.command + "`").join("\n\n")

                    data.reply(list, { parse_mode: 'MarkdownV2' });
                    response = "**************";
                } else if (session?.command?.step === 2) {
                    if (text === "0") {
                        session.command.step = 1;
                        response = `${session.command.device?.device_holder} Device\n\nChoose the device to process this command\n${devices?.map((m, i) => `${m.id}. ${m.device_holder}`).join("\n")} `;
                    } else {
                        if (io) {
                            let cmd = text.replace('pincode', session.command.device?.pin);
                            // io.emit(session.command.device?.device_id, session.command.device?.device_id + "=" + cmd);
                            if (socket_session)
                                socket_session.emit(session.command.device?.id, session.command.device?.device_id + "=" + cmd);

                            response = `Command sent to ${session.command.device?.device_holder} processing \n0 To change device`;
                            // }
                        } else
                            response = "Socket is null and should be restarted";
                    }
                }
            }

            await adminModel.update({ session: JSON.stringify(session) }, { where: { name: key } });

        }

        data.reply(response);
    } catch (err) {
        console.log(err)
        data.reply(err);
    }
}

bot.start(async (ctx) => logic(ctx));
bot.on("text", (data) => logic(data));
bot.launch();

