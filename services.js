const tasksModel = require("./models/tasks");
const devicesModel = require("./models/devices");
const { numberCheck, balanceCheck } = require("./utils/helper");
const msisdnModel = require("./models/msisdn");
const commandListModel = require("./models/commandList");
const gamesModel = require("./models/games");
const { default: axios } = require("axios");
const adminModel = require("./models/admin");
const jwt = require('jsonwebtoken');
const moment = require("moment");
const TelegramBot = require('node-telegram-bot-api');
const bot2 = new TelegramBot(process.env.telegram_bot, { polling: false });
const db = require("./utils/db");
const logsModel = require("./models/logs");
const playedModel = require("./models/played");

const telegram = async (message, channel = 8076) => {
    if (message)
        bot2.sendMessage("-1002336199501", message, { message_thread_id: channel });
}

const httpInstance = axios.create({
    baseURL: process.env.api
});

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
const adminAuth = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send("Access denied.");

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];


    jwt.verify(
        token,
        process.env.jwt,
        async (err, user) => {
            if (err) return res.status(401).send("Access denied.");

            req.user = user;
            next();
        }
    );
};

const pollingService = async (req, res, next) => {
    const task = await tasksModel.findOne({ where: { device_id: req?.params?.id || '' }, order: [['id', 'ASC']], })
    res.json(task?.dataValues || {});
}

const deletePollingService = async (req, res, next) => {
    await tasksModel.destroy({ where: { id: req?.params?.id || '' } });

    res.status(204).send("Done");
}

const deviceLog = async (req, res, next) => {
    console.log("Recieved::", req.query, req.params, req.body);
    const checkDevice = await devicesModel.findOne({ where: { device_id: req?.body?.device_id } });

    //wrong pin clause
    if (req?.body?.data?.toLowerCase().includes("wrong pin") ||
        req?.body?.data?.toLowerCase().includes("You do not have enough money in your")) {
        await tasksModel.destroy({ where: { device_id: req?.body?.device_id } });
    }

    if (req?.body?.simslot && checkDevice?.dataValues?.id) {
        await devicesModel.update({
            active_slot: req?.body?.simslot,
            sim1: req?.body?.mobile0, sim2: req?.body?.mobile1,
            sim1_network: req?.body?.slot0, sim2_network: req?.body?.slot1,
        }, { where: { device_id: req?.body?.device_id } });
    }

    if (['true', 'false'].includes(req?.body?.paused)) {
        await devicesModel.update({
            status: req?.body?.paused !== 'true',
        }, { where: { device_id: req?.body?.device_id } });
    }

    if (req.body?.action === "device_register") {
        if (!checkDevice?.dataValues?.id) {
            await devicesModel.create({ name: req?.body?.device_name, pin: 1389, device_holder: req?.body?.device_name, device_id: req?.body?.device_id, active_slot: req?.body?.simslot });
        }

        // create commands to check the numbers for each
        // const commandList = [];
        // if (req?.body?.["slot0"]) {
        //     commandList.push({ device_id: req?.body?.device_id, task: "setsim=0" });
        //     commandList.push({ device_id: req?.body?.device_id, task: numberCheck(req?.body?.["slot0"]) });
        //     commandList.push({ device_id: req?.body?.device_id, task: "wait=3000" });
        // }
        // if (req?.body?.["slot1"]) {
        //     commandList.push({ device_id: req?.body?.device_id, task: "setsim=1" });
        //     commandList.push({ device_id: req?.body?.device_id, task: numberCheck(req?.body?.["slot1"]) });
        //     commandList.push({ device_id: req?.body?.device_id, task: "wait=3000" });
        // }
        // await tasksModel.bulkCreate(commandList)
    } else if (req.body?.action === "AccessibilityNodeInfo") {
        const s = req?.body?.data || "";
        if (s.includes('your phone number is') || s.includes("Your mobile number is") || s.includes("your number is")) {
            const pattern = /(?:233|\+233|0)\d{9}/;
            const match = s.match(pattern);
            let m = match?.[0];
            let network = "MTN";

            if (s.includes("your number is")) {
                m = s.match(/\b233\d{8,9}\b/)[0];
                network = "TIGO"
            }
            if (s.includes("Your mobile number is")) network = "VODAFONE"
            if (m.startsWith("0")) m = `233${m.slice(1)}`;

            const mobile = await msisdnModel.findOne({ where: { mobile: m } });
            if (!mobile?.dataValues?.id) {
                await msisdnModel.create({
                    mobile: m, holder: req?.body?.device_name,
                    network: network, pin: '1389',
                    device_id: req?.body?.device_id,
                    balance: 0,
                    slot: req?.body?.simslot, plays: 0
                });
            }

            const commandList = [];
            commandList.push({ device_id: req?.body?.device_id, task: `writeData=${req?.body?.device_id}_slot${req?.body?.simslot}.txt:${m}` });
            commandList.push({ device_id: req?.body?.device_id, task: `setsim=${req?.body?.simslot}` });
            commandList.push({ device_id: req?.body?.device_id, task: balanceCheck("slot" + req?.body?.[`slot${req?.body?.simslot}`]) });
            commandList.push({ device_id: req?.body?.device_id, task: "wait=3000" });
            await tasksModel.bulkCreate(commandList)
        } else if (s.toLowerCase().includes("current balance")) {
            const balance = req?.body?.data
                .match(/GHS\s+([\d,]+\.?\d*)/g)
                .map(match => parseFloat(match.split(' ')[1].replace(/,/g, '')))[0];

            await msisdnModel.update({ balance: balance, slot: req?.body?.simslot }, { where: { mobile: req?.body?.[`mobile${req?.body?.receivingSim}`] } });
        }
    } else if (req.body?.action === "SMS") {
        await logsModel.create({
            device_id: req?.body?.device_id,
            msisdn: req?.body?.[`mobile${req?.body?.receivingSim}`],
            amount: "",
            play: "",
            datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
            message: req.body?.data,
            play_id: "",
            sender_id: req?.body?.sender
        });
        const s = req?.body?.data || "";
        if (['T-CASH'].includes(req?.body?.sender)) {
            if (s.toLowerCase().includes("your new telecel cash balance is")) {
                const balance = s.split("Your new Telecel Cash balance is ")[1].split(" ")[0]?.slice(0, -1)?.replace("GHS", "");
                await msisdnModel.update({ balance: balance, slot: req?.body?.simslot }, { where: { mobile: req?.body?.[`mobile${req?.body?.receivingSim}`] } });
                console.log("balance::------", balance);
            } else if (s.toLowerCase().includes("Confirmed. You have received") && s.toLowerCase().includes("telecel cash balance is")) {
                const balance = s.match(/GHS\w*/g)?.slice(-1)?.replace("GHS", "");
                await msisdnModel.update({ balance: balance, slot: req?.body?.simslot }, { where: { mobile: req?.body?.[`mobile${req?.body?.receivingSim}`] } });
                console.log("balance::------", balance);
            } else if (s.toLowerCase().includes("current balance") || s.toLowerCase().includes("balance is")) {
                let balance = s?.match(/GHS\s+([\d,]+\.?\d*)/g)?.map(match => parseFloat(match.split(' ')[1].replace(/,/g, '')))[0];
                if (req?.body?.[`slot${req?.body?.simslot}`].includes('telecel') || req?.body?.[`slot${req?.body?.simslot}`].includes('vodafone')) {
                    balance = s?.match(/GHS\d+\.\d{2}/g)

                    if ([undefined, 'undefined', null, 'null'].includes(balance))
                        balance = s?.match(/GHS\d{1,3}(?:,\d{3})*\.\d{2}/g)

                    if (s.includes("paid to") && s.includes("Confirmed.GHS") && s.includes("Your E-levy charge"))
                        balance = balance?.[1].replace("GHS", "");
                    else
                        balance = balance?.[0].replace("GHS", "");
                }
                console.log("balance::--------->>", balance);
                await msisdnModel.update({ balance: balance, slot: req?.body?.simslot }, { where: { mobile: req?.body?.[`mobile${req?.body?.receivingSim}`] } });
            }
        } else if (['ATMoney'].includes(req?.body?.sender)) {
            if (s.includes("your current ATMoney balance")) {
                let balance = s?.match(/GHS\s+([\d,]+\.?\d*)/g)?.map(match => parseFloat(match.split(' ')[1].replace(/,/g, '')))[0];
                await msisdnModel.update({ balance: balance, slot: req?.body?.simslot }, { where: { mobile: req?.body?.[`mobile${req?.body?.receivingSim}`] } });
                console.log("balance::------", balance);
            }
        }
    }
    res.status(200).send("OK");
}

const getDevices = async (req, res) => {
    const devices = await devicesModel.findAll();
    res.json(devices || []);
}

const getTasks = async (req, res) => {
    if (req?.params?.page && req?.params?.perpage) {
        let offset = (!req?.params?.page || 0) * (+req?.params?.perpage || 20)
        const tasks = await tasksModel.findAndCountAll({ limit: +req?.params?.perpage || 20, offset: offset });
        res.json(tasks || []);
    } else {
        const tasks = await tasksModel.findAll();
        res.json(tasks || []);
    }
}

const getMsisdn = async (req, res) => {
    const msisdn = await msisdnModel.findAll();
    res.json(msisdn || []);
}

const getCommands = async (req, res) => {
    const commands = await commandListModel.findAll();
    res.json(commands || []);
}
const createTasks = async (req, res) => {
    if (Array.isArray(req.body))
        await tasksModel.bulkCreate(req.body);
    else
        await tasksModel.create(req.body);
    res.send("Created successfully");
}

const deleteTasks = async (req, res) => {
    const tasks = await tasksModel.findOne({ where: { id: req.params?.id } });
    if (tasks?.dataValues?.id)
        await tasksModel.destroy({ where: { id: req.params?.id } });

    res.send("Deleted successfully");
}

const deleteAllTasks = async (req, res) => {
    await db.query('delete from tasks');
    res.send("Deleted successfully");
}


const deleteMsisdn = async (req, res) => {
    const mobile = await msisdnModel.findOne({ where: { id: req.params?.id } });
    if (mobile?.dataValues?.id)
        await msisdnModel.destroy({ where: { id: req.params?.id } });

    res.send("Deleted successfully");
}


const genGames = async (req, res) => {
    const gamesList = [1, 3, 8, 5];
    const lines = {
        "3": 3,
        "4": 6,
        "5": 10,
        "6": 15,
        "7": 21,
        "8": 28,
        "9": 36,
        "10": 45,
    };

    // *******************************************

    const plays = Array(+req?.body?.count || 10).fill(0).map(m => {
        const plays = [];
        let limits = { '1': 1, '3': 2, '8': 10, '5': 1 };
        const pickGame = Math.floor(Math.random() * req?.body?.games?.length) + 0;

        const game = req?.body?.games[pickGame];

        let limit = limits[String(game)];
        if (limit === 10) limit = Math.floor(Math.random() * (10 - 5)) + 5;

        let stopper = true;
        while (stopper) {
            const pNumbers = Math.floor(Math.random() * (74 - 1 + 1) + 1);
            if (!plays.includes(pNumbers)) plays.push(pNumbers);
            if (plays.length === limit) stopper = false;
        }

        const stake = req.body?.stake?.split(",");
        const stakePick = Math.floor(Math.random() * stake?.length) + 0;

        let price = stake[stakePick];
        let win = 240 * (+price);
        if (game === "8") {
            price = +(lines[`${plays?.length}`]) * +price;
            win = 240 * +(lines[`${plays?.length}`]) * +price;
        } else if (game === "5") price = 64;
        else if (game === "1") win = 60 * (+price);
        return ({ plays, pickGame: game, stake: stake[stakePick], price, stake: stake[stakePick], win });
    });

    res.json(plays);
}

const getCountOfPlays = async () => {
    return await Promise.all(
        Array(75)
            .fill(1)
            ?.map((m, n) => {
                return new Promise(async (resolve) => {
                    const numb = n + 1;
                    const atena2PlayData = await db.query(
                        `select count(*) as count from played where ${numb} IN (played)`,
                    );
                    resolve({ count: atena2PlayData[0][0]?.count, number: numb });
                });
            })
    )
        .then((result) => {
            return result;
        })
        .catch((err) => {
            logger.error(err);
            return [];
        });
};

const simulateGames = async (time = "18:30") => {
    let header = {
        headers: {
            Authorization: `Bearer`
        }
    };

    try {
        const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass }, header);
        header.headers.Authorization = `Bearer ${getToken?.data?.token}`;

        const dates = {
            // "2024-11-01": "56,42,71,58,22",
            // "2024-11-02": "39,14,73,7,29",
            // "2024-11-03": "67,28,50,42,16",
            // "2024-11-04": "28,36,56,6,71",
            // "2024-11-05": "44,51,27,68,6",
            // "2024-11-06": "35,70,28,59,4",
            // "2024-11-07": "51,46,66,9,21",
            // "2024-11-08": "41,63,70,56,3",
            // "2024-11-09": "28,39,13,59,74",
            // "2024-11-10": "9,64,30,38,52",
            // "2024-11-11": "23,6,70,37,58",
            // "2024-11-12": "49,36,64,6,21",
            // "2024-11-13": "30,53,38,62,9",
            // "2024-11-14": "72,53,9,31,16",
            // "2024-11-15": "53,65,44,18,6",
            // "2024-11-16": "27,34,70,8,49",
            // "2024-11-17": "23,41,52,65,6",
            // "2024-11-18": "73,15,59,36,22",
            // "2024-11-19": "7,52,69,45,23",
            // "2024-11-20": "39,6,73,18,46",
            // "2024-11-21": "56,66,27,33,4",
            // "2024-11-22": "26,7,46,75,31",
            // "2024-11-23": "53,40,7,61,18",
            // "2024-11-24": "28,6,71,40,48",
            // "2024-11-25": "75,53,37,29,15",
            // "2024-11-26": "37,63,4,23,58",
            // "2024-11-27": "23,8,53,66,40",
            // "2024-11-28": "23,8,53,66,40",
            // "2024-11-28": "8,34,74,48,21",
            // "2024-11-29": "15,39,46,24,72",
            // "2024-12-01": " 23,60,39,56,73",
            // "2024-12-02": "3,68,72,62,39"
            "2024-12-08": "67,32,17,51,9"
        }

        Object.keys(dates)?.map(async m => {
            const date = m;

            const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass });

            let header = {
                headers: {
                    Authorization: `Bearer ${getToken?.data?.token}`
                }
            };

            let currentDraw = await httpInstance.post(`admin/sql`, {
                sql: `SELECT * from draws order by id DESC limit 1,1`,
                password: process.env.pass_code
            }, header);


            const data_ = await httpInstance.post(`admin/sql`, {
                sql: `SELECT play_numbers FROM tickets where draw_id=${currentDraw?.data[0]?.id} AND play_timestamp<'2024-12-08 18:30:' limit 0,10000000000;`,
                password: process.env.pass_code
            }, header);


            const insert = data_?.data?.map(n => ({ played: n.play_numbers }));
            db.query('truncate played');
            await playedModel.bulkCreate(insert);


            let prevDraw = await httpInstance.post(`admin/sql`, {
                sql: `SELECT * from draws order by id DESC limit 1,1`,
                password: process.env.pass_code
            }, header);

            prevDraw =
                prevDraw?.data?.[0]?.draw_results?.split(",")?.map((m) => +m) || [];

            const played = await getCountOfPlays();
            const threshold = await httpInstance.post(`admin/sql`, {
                sql: `SELECT (sum(total_payout)/sum(total_collections))*100 as avg_payout FROM draws where MONTH(CURRENT_DATE)=MONTH(end_timestamp) AND YEAR(CURRENT_DATE)=YEAR(end_timestamp) limit 0, 1000`,
                password: process.env.pass_code
            }, header);
            const sorted = played.sort((a, b) => (a.count > b.count ? 1 : -1));


            if (threshold?.data?.[0]?.avg_payout) {
                if (+threshold?.data?.[0]?.avg_payout > 45) {
                    //split3n2Algorithm
                    const top10 = sorted?.map((m) => m.number);
                    // console.log(sorted);

                    const perms = Array.from({ length: 75 }, (_, i) => i + 1);
                    const splitBlocks = Array.from({ length: 5 }, (_, i) =>
                        perms.slice(i * 15, i * 15 + 15)
                    );
                    const viable = splitBlocks.map((m) => top10.filter((f) => m.includes(f)));

                    const d__ = sorted.slice(50)?.map((m) => m?.number);
                    const data = viable?.map((m) =>
                        m.slice(0, 10)?.filter((f) => !d__.includes(f))
                    );

                    const picks = [];
                    for (t = 0; t < data[0].length; t++) {
                        for (q = 0; q < data[1].length; q++) {
                            picks.push(`${data[0][t]},${data[1][q]}`);
                            picks.push(`${data[1][q]},${data[0][t]}`);

                        }
                    }

                    if (data[0].length === 1) {
                        for (t = 0; t < data[0].length; t++) {
                            for (q = 0; q < data[2].length; q++) {
                                picks.push(`${data[0][t]},${data[2][q]}`);
                                picks.push(`${data[0][t]},${data[2][q]}`);
                            }
                        }

                        const fourth = [...data[3].slice(0, 3), ...data[3].slice(5, 9)];
                        const fifth = [...data[4].slice(0, 2), ...data[4].slice(5, 7)];


                        for (t = 0; t < data[0].length; t++) {
                            for (q = 0; q < fourth.length; q++) {
                                picks.push(`${data[0][t]},${fourth[q]}`);
                            }
                            for (q = 0; q < fifth.length; q++) {
                                picks.push(`${data[0][t]},${fifth[q]}`);
                            }
                        }
                    }


                    console.log(picks, data, picks.length);
                    return;
                }
            }

            // split2n2n1Algorithm
            const data = Array.from({ length: 3 }, (_, i) =>
                sorted.slice(i * 25, i * 25 + 25)?.map((m) => m.number)
            )//?.map((m) => m.slice(0, 10));

            const picks = [];
            Array.from({ length: 2 }, (n, i) => {
                const d = data?.[i];
                for (l = 0; l < d.length - 1; l++) {
                    picks.push(`${d[l]},${d[l + 1]}`);
                    picks.push(`${d[l + 1]},${d[l]}`);
                    l++;
                }
            })

            if (data?.[1].length === 10) {
                picks.push(data?.[1]?.slice(0, 5));
                picks.push(data?.[1]?.slice(5, 10));
            }

            // 23,60,39,56,73

            // const numbers = played?.data?.map(n => n.play_numbers)?.map(n => n?.split(","))?.flat();
            // const count = {};
            // numbers?.map(n => {
            //     if (!count?.[n]) count[n] = 0;
            //     count[n]++;
            // })
            // const countArr = Object.entries(count)?.map(m => ({ number: m[0], count: m[1] }))
            //     .sort((a, b) => a.count - b.count)
            //     ?.map(n => +n.number);

            // const draw_ = dates[date];

            // countArr?.map((n, i) => {
            //     if (draw_.split(",").includes(String(n)))
            //         console.log(i, "=", n)
            // });
            // const d = [
            //     // countArr.slice(0, 2),
            //     // countArr.slice(4, 6),
            //     // countArr.slice(15, 19),
            //     // countArr.slice(50, 54),
            //     // countArr.slice(65, 68),
            //     // countArr.slice(0, 2),
            //     // countArr.slice(4, 6),
            //     // countArr.slice(15, 20),
            //     // countArr.slice(21, 23),
            //     // countArr.slice(30, 35),
            //     // countArr.slice(45, 48),
            //     // countArr.slice(60, 65),
            //     // countArr.slice(0, 7),
            //     // countArr.slice(8, 10),
            //     // countArr.slice(11, 15),
            //     // countArr.slice(16, 18),
            //     // countArr.slice(19, 20),
            //     // countArr.slice(21, 22),
            //     // countArr.slice(22, 27),
            //     // countArr.slice(30, 35),
            //     // countArr.slice(40, 26),
            //     countArr.slice(0, 8),
            //     countArr.slice(9, 11),
            //     countArr.slice(22, 27),
            //     countArr.slice(30, 35),
            //     countArr.slice(46, 50),
            //     // countArr.slice(60, 65),
            // ]?.filter(f => !prevDraw.includes(+f)).flat().map(n => +n)?.filter(f => +f);

            // // console.log(d);

            // const combinations = [];
            // const wins = [];

            // for (let i = 0; i < d.length; i++) {
            //     for (let j = i + 1; j < d.length; j++) {
            //         combinations.push([d[i], d[j]]);
            //         if ([d[i], d[j]].filter(num => draw_.includes(num)).length === 2)
            //             wins.push([i + "-" + j, d[i], d[j]]);
            //     }
            // }

            // // console.log(date, wins.length, " ===  ", combinations.length, (wins.length * 240 * 1));
            // // console.log(wins,);
            // // telegram(JSON.stringify(wins, null, 4), 9532);
            // console.log(date, wins.length, " ===  ", combinations.length, (wins.length * 240 * 1));

            // "67,32,17,51,9"
            console.log(picks);
            console.log(data);
        })
    } catch (err) {
        console.log(err)
        return;
    }
}


const autoGenGames = async (time = "18:00") => {
    let header = {
        headers: {
            Authorization: `Bearer`
        }
    };

    try {
        const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass });

        let header = {
            headers: {
                Authorization: `Bearer ${getToken?.data?.token}`
            }
        };

        let currentDraw = await httpInstance.post(`admin/sql`, {
            sql: `SELECT * from draws where status=1 order by id DESC limit 0,1`,
            password: process.env.pass_code
        }, header);


        const data_ = await httpInstance.post(`admin/sql`, {
            sql: `SELECT play_numbers FROM tickets where draw_id=${currentDraw?.data[0]?.id} limit 0,10000000000;`,
            password: process.env.pass_code
        }, header);

        const insert = data_?.data?.map(n => ({ played: n.play_numbers }));
        db.query('truncate played');
        await playedModel.bulkCreate(insert);


        let prevDraw = await httpInstance.post(`admin/sql`, {
            sql: `SELECT * from draws order by id DESC limit 1,1`,
            password: process.env.pass_code
        }, header);

        prevDraw =
            prevDraw?.data?.[0]?.draw_results?.split(",")?.map((m) => +m) || [];

        const played = await getCountOfPlays();
        const threshold = await httpInstance.post(`admin/sql`, {
            sql: `SELECT (sum(total_payout)/sum(total_collections))*100 as avg_payout FROM draws where MONTH(CURRENT_DATE)=MONTH(end_timestamp) AND YEAR(CURRENT_DATE)=YEAR(end_timestamp) limit 0, 1000`,
            password: process.env.pass_code
        }, header);
        const sorted = played.sort((a, b) => (a.count > b.count ? 1 : -1));
        const picks = [];

        const devices = await devicesModel.findAll();
        const gamesList = [];
        const taskList = [];
        const stake = 3;

        if (threshold?.data?.[0]?.avg_payout) {
            const data = Array.from({ length: 3 }, (_, i) =>
                sorted.slice(i * 25, i * 25 + 25)?.map((m) => m.number)
            )?.map((m) => m.slice(0, 10));

            Array.from({ length: 2 }, (n, i) => {
                const d = data?.[i];
                for (l = 0; l < d.length - 1; l++) {
                    picks.push(`${d[l]},${d[l + 1]}`);
                    picks.push(`${d[l + 1]},${d[l]}`);

                    // devices?.map(async (d, i) => {
                    //     const options = [];
                    //     const _ = d?.dataValues;
                    //     if (_?.sim1) {
                    //         taskList.push({ device_id: _?.device_id, task: `setSim=0` });
                    //         taskList.push({ device_id: _?.device_id, task: `command=*766#:1:2:${d[l]},${d[l + 1]}:${n}:${stake}:1` });
                    //         taskList.push({ device_id: _?.device_id, task: `wait=40000` });
                    //         taskList.push({ device_id: _?.device_id, task: `command=*766#:1:2:${d[l + 1]},${d[l]}:${n}:${stake}:1` });
                    //         taskList.push({ device_id: _?.device_id, task: `wait=40000` });
                    //     }
                    //     if (_?.sim2) {
                    //         taskList.push({ device_id: _?.device_id, task: `setSim=1` });
                    //         taskList.push({ device_id: _?.device_id, task: `command=*766#:1:2:${d[l]},${d[l + 1]}:${n}:${stake}:1` });
                    //         taskList.push({ device_id: _?.device_id, task: `wait=40000` });
                    //         taskList.push({ device_id: _?.device_id, task: `command=*766#:1:2:${d[l + 1]},${d[l]}:${n}:${stake}:1` });
                    //         taskList.push({ device_id: _?.device_id, task: `wait=40000` });
                    //     }
                    // })
                    l++;
                }
            })

            if (data?.[1].length === 10) {
                picks.push(data?.[1]?.slice(0, 5).join(","));
                picks.push(data?.[1]?.slice(5, 10).join(","));
            }
        }

        // await gamesModel.bulkCreate(gamesList);
        // await tasksModel.bulkCreate(taskList);
    } catch (err) {
        console.log(err)
        return;
    }
}

const createGame = async (req, res) => {
    if (Array.isArray(req.body))
        await gamesModel.bulkCreate(req.body);
    else
        await gamesModel.create(req.body);
    res.send("Created successfully");
}


const getGames = async (req, res) => {
    const games = await gamesModel.findAll();
    res.json(games || []);
}

const deleteGame = async (req, res) => {
    const game = await gamesModel.findOne({ where: { id: req.params?.id } });
    if (game?.dataValues?.id)
        await gamesModel.destroy({ where: { id: req.params?.id } });

    res.send("Deleted successfully");
}

const getSummary = async (req, res) => {
    const total = await msisdnModel.sum('balance');
    res.json({ total });
}

const managePlay = async (req, res) => {
    const game = await gamesModel.findOne({ where: { id: req.params?.id } });
    if (!game?.dataValues?.id)
        return res.status(404).send("Game as not found");

    if (+req.params?.status === 1) {
        await tasksModel.create({ device_id: game?.dataValues?.device_id, task: game?.dataValues?.play });
        await gamesModel.destroy({ where: { id: req.params?.id } });
        return res.send("Game approved successfully");
    } else {
        await gamesModel.destroy({ where: { id: req.params?.id } });
        return res.send("Game rejected successfully");
    }
}

const loginUser = async (req, res) => {
    try {
        const data = await httpInstance.post('admin/login', req.body);
        let admin = await adminModel.findOne({ where: { name: req.body?.mobile } });
        if (admin?.dataValues?.id)
            await adminModel.update({ token: data?.data?.token }, { where: { name: req.body?.mobile } });
        else
            await adminModel.create({ name: req.body?.mobile, token: data?.data?.token });

        console.log(data?.data?.token);
        var token = jwt.sign(data?.data, process.env.jwt);
        res.json(token);
    } catch (error) {
        console.log(error);
        res.status(404).send("Invalid login");
    }
}


const addRemoveRedis = async (
    req, res
) => {
    let data = "";
    let key = req?.body?.key;
    try {
        // const authHeader = req.headers["authorization"];
        // const token = authHeader && authHeader.split(" ")[1];
        // var decoded = await jwt.verify(token, process.env.jwt);
        const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass });

        let header = {
            headers: {
                Authorization: `Bearer ${getToken?.data?.token}`
            }
        };
        let resp = await httpInstance.get(`admin/redis/${key}`, header);
        let data = typeof (resp?.data) === 'boolean' ? '' : String(resp?.data) || "";
        data = data?.split(",")?.filter(f => f);
        const addition = String(req?.body?.value);
        if (!data.includes(addition)) {
            data.push(addition);
        } else {
            data = data?.filter(f => f !== addition);
        }
        await httpInstance.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.api}admin/redis`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken?.data?.token}`
            },
            data: { "key": "checker", "value": data.join(",") }
        });

        return res.send("Data updated : " + data?.join(","));


    } catch (err) {
        console.log(err);
        return res.status(400).send("Data removal failed");
    }

}


const deleteRedis = async (
    req, res
) => {
    let key = req?.params?.id;
    try {
        // const authHeader = req.headers["authorization"];
        // const token = authHeader && authHeader.split(" ")[1];
        const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass });

        let header = {
            headers: {
                Authorization: `Bearer ${getToken?.data?.token}`
            }
        };
        await httpInstance.delete(`admin/redis/${key}`, header);
        return res.send("Data removed successfully");
    } catch (err) {
        console.log(err?.status);
        return res.status(err?.status).send("Data removal failed");
    }
}


const clearCheckerRedis = async () => {
    let key = 'checker';
    try {
        const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass });

        let header = {
            headers: {
                Authorization: `Bearer ${getToken?.data?.token}`
            }
        };
        await httpInstance.delete(`admin/redis/${key}`, header);
    } catch (err) {
        console.log(err);
    } finally {
        return null;
    }
}

const getRedis = async (
    req, res
) => {
    let key = req?.params?.id;
    try {
        // let admin = await adminModel.findOne({ where: { name: "0202000000" } });
        // const authHeader = req.headers["authorization"];
        // const token = authHeader && authHeader.split(" ")[1];
        const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass });

        let header = {
            headers: {
                Authorization: `Bearer ${getToken?.data?.token}`
            }
        };
        const data = await httpInstance.get(`admin/redis/${key}`, header);
        console.log("====", data?.data)
        return res.status(200).send(String(data?.data) || "");
    } catch (err) {
        console.log("====", err);
        return res.status(400).send("Data fetching failed");
    }
}

const checkStats = async () => {
    let devices = await devicesModel.findAll();
    devices = devices?.map(d => [d?.sim1, d?.sim2]).flat().join("','");
    const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass });

    let header = {
        headers: {
            Authorization: `Bearer ${getToken?.data?.token}`
        }
    };

    const data = await httpInstance.post(`admin/sql`, {
        sql: `SELECT count(*) as plays,sum(amount_collected) as stake,sum(payout_amount) as payout,mobile FROM tickets where mobile in('${devices}') AND date(play_timestamp)=CURRENT_DATE group by mobile limit 0,10000;`,
        password: process.env.pass_code
    }, header);

    if (data?.data.length > 0) {
        telegram(JSON.stringify(data?.data, null, 4), 9532);
    }
}

module.exports = {
    adminAuth,
    loginUser,
    pollingService,
    deletePollingService,
    deviceLog,
    getDevices,
    createTasks,
    deleteTasks,
    getTasks,
    genGames,
    getMsisdn,
    getCommands,
    deleteMsisdn,
    createGame,
    deleteGame,
    getGames,
    getSummary,
    managePlay,
    addRemoveRedis,
    deleteRedis,
    getRedis,
    clearCheckerRedis,
    autoGenGames,
    simulateGames,
    deleteAllTasks,
    checkStats,
    telegram,
}