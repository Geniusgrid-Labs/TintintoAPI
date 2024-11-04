const tasksModel = require("./models/tasks");
const devicesModel = require("./models/devices");
const { numberCheck, balanceCheck } = require("./utils/helper");
const msisdnModel = require("./models/msisdn");
const commandListModel = require("./models/commandList");
const gamesModel = require("./models/games");

const pollingService = async (req, res, next) => {
    const task = await tasksModel.findOne({ where: { device_id: req?.params?.id || '' } })
    res.json(task?.dataValues || {});
}

const deletePollingService = async (req, res, next) => {
    console.log(req.params.id);
    const task = await tasksModel.destroy({ where: { id: req?.params?.id || '' } })
    res.status(204).send("Done");
}

const deviceLog = async (req, res, next) => {
    console.log("Recieved::", req.query, req.params, req.body);
    const checkDevice = await devicesModel.findOne({ where: { device_id: req?.body?.device_id } });

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

const loginUser = (req, res) => {

}

module.exports = {
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
    managePlay
}