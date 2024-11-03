require("dotenv").config();
const db = require('./db');
const TelegramBot = require('node-telegram-bot-api');
const devicesModel = require('./models/devices');
const msisdnModel = require('./models/msisdn');
const { sleep } = require('./helper');
const adminModel = require('./models/admin');
const { default: axios } = require('axios');

const httpAxios = axios.create({
    baseURL: process.env.api
});

/**
 * 
 */
module.exports.clearPlays = async () => {
    await db.query('update msisdn set plays=0');

    let admin = await adminModel.findOne({ where: { id: 1 } });
    let header = {
        headers: {
            Authorization: `Bearer ${admin?.dataVales?.token}`
        }
    };

    try {
        await httpAxios
            .delete(`admin/redis/checker`, header);
    } catch (err) {
        console.log(err);
    }
}