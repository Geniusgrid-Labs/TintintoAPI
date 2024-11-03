const { default: axios } = require("axios");
const devicesModel = require("./models/devices");
const msisdnModel = require("./models/msisdn");
const commandListModel = require("./models/commandList");
const adminModel = require("./models/admin");

const base = process.env.api;

const httpAxios = axios.create({
    baseURL: base
});

module.exports.login = async (req, res, next) => {
    try {
        const data = await httpAxios.post('admin/login', req?.body || {});
        res.json(data?.data);
    } catch (err) {
        console.log(err);
        res.status(404).send(err?.response?.data)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getDevices = async (req, res, next) => {
    const devices = await devicesModel.findAll();
    res.json(devices || []);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getMsisdn = async (req, res, next) => {
    const msisdn = await msisdnModel.findAll();
    res.json(msisdn || []);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getCommands = async (req, res, next) => {
    const commands = await commandListModel.findAll();
    res.json(commands || []);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.generatePlays = async (req, res, next) => {
    const gamesList = [1, 3, 8, 5];
    const plays = Array(+req?.body?.count).fill(0).map(m => {
        const plays = [];
        let limits = { '1': 1, '3': 2, '8': 10, '5': 1 };
        const pickGame = Math.floor(Math.random() * req?.body?.games?.length) + 0;

        const game = req?.body?.games[pickGame];

        let limit = limits[String(game)];
        if (limit === 10) limit = Math.floor(Math.random() * (limit - 4 + 1) + 3);

        while (plays.length != limit) {
            const pNumbers = Math.floor(Math.random() * (74 - 1 + 1) + 1);
            if (!plays.includes(pNumbers)) plays.push(pNumbers);
            console.log("-----");
        }

        const ind = gamesList.indexOf(req.body.games[pickGame]);
        return ({ plays, pickGame: ind });
    });
    res.json(plays);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.redisCommand = async (req, res, next) => {
    let resp = {};
    let admin = await adminModel.findOne({ where: { id: 1 } });
    let header = {
        headers: {
            Authorization: `Bearer ${admin?.dataVales?.token}`
        }
    };

    if (req.body.option === 'get')
        resp = await httpAxios.get(`admin/redis/${req.body.key}`, header);
    else if (req.body.option === 'update') {
        resp = await httpAxios.post(`admin/redis`, { key: req.body.key, value: req.body.value }, header);
    } else if (req.body.option === 'delete')
        resp = await httpAxios.delete(`admin/redis/${req.body.key}`, header);

    console.log(resp?.data);
    if (typeof resp?.data === 'object') res.json(resp?.data);
    else res.send(String(resp?.data));
}



