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
    const task = await tasksModel.findOne({ where: { device_id: req?.params?.id || '' } })
    res.json(task?.dataValues || {});
}

const deletePollingService = async (req, res, next) => {
    const task = await tasksModel.destroy({ where: { id: req?.params?.id || '' } })
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

            await msisdnModel.update({ balance: balance, slot: req?.body?.simslot }, { where: { mobile: req?.body?.[`mobile${req?.body?.simslot}`] } });
        }
    } else if (req.body?.action === "SMS") {
        const s = req?.body?.data || "";
        if (['T-CASH'].includes(req?.body?.sender)) {
            if (s.toLowerCase().includes("current balance") || s.toLowerCase().includes("balance is")) {
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
                await msisdnModel.update({ balance: balance, slot: req?.body?.simslot }, { where: { mobile: req?.body?.[`mobile${req?.body?.simslot}`] } });
            }
        } else if (['ATMoney'].includes(req?.body?.sender)) {
            if (s.includes("your current ATMoney balance")) {
                let balance = s?.match(/GHS\s+([\d,]+\.?\d*)/g)?.map(match => parseFloat(match.split(' ')[1].replace(/,/g, '')))[0];
                await msisdnModel.update({ balance: balance, slot: req?.body?.simslot }, { where: { mobile: req?.body?.[`mobile${req?.body?.simslot}`] } });
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
    const tasks = await tasksModel.findAll();
    res.json(tasks || []);
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
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    // var decoded = await jwt.verify(token, process.env.jwt);
    // let header = {
    //     headers: {
    //         Authorization: `Bearer ${decoded?.token}`
    //     }
    // };

    // try {
    //     const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass }, header);
    //     header.headers.Authorization = `Bearer ${getToken?.data?.token}`
    // } catch (err) {
    //     return;
    // }

    // const dates = {
    //     // "2024-10-30": "65,43,31,20,39",
    //     // "2024-10-31": "61,47,6,70,45",
    //     // "2024-11-01": "56,42,71,58,22",
    //     // "2024-11-02": "39,14,73,7,29",
    //     // "2024-11-03": "67,28,50,42,16",
    //     // "2024-11-04": "28,36,56,6,71",
    //     // "2024-11-05": "44,51,27,68,6",
    //     // "2024-11-06": "35,70,28,59,4",
    //     // "2024-11-07": "51,46,66,9,21",
    //     "2024-11-08": "41,63,70,56,3",
    //     "2024-11-09": "28,39,13,59,74",
    //     "2024-11-10": "9,64,30,38,52",
    //     "2024-11-11": "23,6,70,37,58",
    //     "2024-11-12": "49,36,64,6,21",
    //     "2024-11-13": "30,53,38,62,9",
    //     "2024-11-14": "72,53,9,31,16",
    //     "2024-11-15": "53,65,44,18,6",
    // }

    // Object.keys(dates)?.map(async m => {
    //     const date = m;

    //     const data_ = await httpInstance.post(`admin/sql`, {
    //         sql: `SELECT play_numbers FROM tickets where DATE(play_timestamp)='${date}' AND play_timestamp<'${date} 19:30' limit 0,10000000;`,
    //         password: process.env.pass_code
    //     }, header);

    //     let prevDraw = await httpInstance.post(`admin/sql`, {
    //         sql: `SELECT * from draws order by id DESC limit 1,1`,
    //         password: process.env.pass_code
    //     }, header);

    //     prevDraw =
    //         prevDraw?.data?.[0]?.draw_results?.split(",")?.map((m) => +m) || [];

    //     const numbers = data_?.data?.map(n => n.play_numbers)?.map(n => n?.split(","))?.flat();
    //     const count = {};
    //     numbers?.map(n => {
    //         if (!count?.[n]) count[n] = 0;
    //         count[n]++;
    //     })
    //     const countArr = Object.entries(count)?.map(m => ({ number: m[0], count: m[1] }))
    //         .sort((a, b) => a.count - b.count)
    //         ?.map(n => +n.number);

    //     const d = [countArr.slice(0, 2),
    //     countArr.slice(8, 10),
    //     countArr.slice(12, 14),
    //     countArr.slice(16, 18),
    //     countArr.slice(18, 20),
    //     countArr.slice(21, 23),
    //     countArr.slice(24, 26)
    //     ].flat().map(n => +n)?.filter(f => +f);

    //     const draw_ = dates[date];
    //     // console.log(countArr.slice(0, 2), countArr.slice(0, 2).filter(num => draw_.includes(num)).length);
    //     // console.log(countArr.slice(8, 10), countArr.slice(8, 10).filter(num => draw_.includes(num)).length);
    //     // console.log(countArr.slice(12, 15), countArr.slice(12, 15).filter(num => draw_.includes(num)).length);
    //     // console.log(countArr.slice(16, 20), countArr.slice(16, 20).filter(num => draw_.includes(num)).length);
    //     // console.log(countArr.slice(18, 20), countArr.slice(18, 20).filter(num => draw_.includes(num)).length);

    //     const combinations = [];
    //     const wins = [];

    //     for (let i = 0; i < d.length; i++) {
    //         for (let j = i + 1; j < d.length; j++) {
    //             combinations.push([d[i], d[j]]);
    //             if ([d[i], d[j]].filter(num => draw_.includes(num)).length === 2)
    //                 wins.push([d[i], d[j]]);
    //         }
    //     }

    //     console.log(d.filter(num => draw_.includes(num)).length, " ===  ", combinations.length, (wins.length * 240 * 1));
    // })



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

const autoGenGames = async (time = "19:30") => {
    let header = {
        headers: {
            Authorization: `Bearer`
        }
    };

    try {
        const getToken = await httpInstance.post(`admin/login`, { mobile: process.env.user, password: process.env.pass }, header);
        header.headers.Authorization = `Bearer ${getToken?.data?.token}`;

        const date = moment().subtract(1, 'days').format("YYYY-MM-DD");
        const data_ = await httpInstance.post(`admin/sql`, {
            sql: `SELECT play_numbers FROM tickets where DATE(play_timestamp)='${date}' AND play_timestamp<'${date} ${time}' limit 0,10000000;`,
            password: process.env.pass_code
        }, header);

        let prevDraw = await httpInstance.post(`admin/sql`, {
            sql: `SELECT * from draws order by id DESC limit 1,1`,
            password: process.env.pass_code
        }, header);

        prevDraw =
            prevDraw?.data?.[0]?.draw_results?.split(",")?.map((m) => +m) || [];

        const numbers = data_?.data?.map(n => n.play_numbers)?.map(n => n?.split(","))?.flat();
        const count = {};
        numbers?.map(n => {
            if (!count?.[n]) count[n] = 0;
            count[n]++;
        })
        const countArr = Object.entries(count)?.map(m => ({ number: m[0], count: m[1] }))
            .sort((a, b) => a.count - b.count)
            ?.map(n => +n.number);

        const d = [countArr.slice(0, 2),
        countArr.slice(8, 10),
        countArr.slice(12, 14),
        countArr.slice(16, 18),
        countArr.slice(18, 20),
        countArr.slice(21, 23),
        countArr.slice(24, 26)
        ].flat().map(n => +n)?.filter(f => +f);

        const combinations = [];

        for (let i = 0; i < d.length; i++) {
            for (let j = i + 1; j < d.length; j++) {
                combinations.push([d[i], d[j]]);
            }
        }

        const devices = await devicesModel.findAll();
        const plays = devices?.map(d => {
            const _ = d?.dataValues;
            const plays = combinations?.map(n => {
                return [
                    { device_id: _?.device_id, task: `command=*766#:1:2:${n?.join(",")}:1:1`, command_type: "766play" },
                    { device_id: _?.device_id, task: `wait=30000`, command_type: 'device' }
                ]
            })
            return plays;
        });
        console.log(plays.flat());
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
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        var decoded = await jwt.verify(token, process.env.jwt);


        let header = {
            headers: {
                Authorization: `Bearer ${decoded?.token}`
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
                Authorization: `Bearer ${decoded?.token}`
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
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        var decoded = await jwt.verify(token, process.env.jwt);

        let header = {
            headers: {
                Authorization: `Bearer ${decoded?.token}`
            }
        };
        await httpInstance.delete(`admin/redis/${key}`, header);
        return res.send("Data removed successfully");
    } catch (err) {
        console.log(err);
        return res.status(400).send("Data removal failed");
    }
}


const clearCheckerRedis = async () => {
    let key = 'checker';
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        var decoded = await jwt.verify(token, process.env.jwt);
        let header = {
            headers: {
                Authorization: `Bearer ${decoded?.token}`
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
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        var decoded = await jwt.verify(token, process.env.jwt);
        let header = {
            headers: {
                Authorization: `Bearer ${decoded?.token}`
            }
        };
        const data = await httpInstance.get(`admin/redis/${key}`, header);
        console.log(data?.data)
        return res.status(200).send(String(data?.data) || "");
    } catch (err) {
        return res.status(400).send("Data fetching failed");
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
    autoGenGames
}