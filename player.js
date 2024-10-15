const db = require('./db');
const TelegramBot = require('node-telegram-bot-api');
const devicesModel = require('./models/devices');
const msisdnModel = require('./models/msisdn');
const { sleep } = require('./helper');

/**
 * 
 */
module.exports.clearPlays = async () => {
    await db.query('update msisdn set plays=0');

    let admin = await adminModel.findOne({ where: { name: key } });
    let header = {
        headers: {
            Authorization: `Bearer ${admin?.dataVales?.token}`
        }
    };

    await httpAxios.delete(`admin/redis/checker`, header);
}

/**
 * 
 */
module.exports.autoPlayer = async (io) => {
    const msisdn = await msisdnModel.findAll({ where: { device_id: "5dba6cee2a7bf544" } });
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    let loop = 0;
    const numbers = msisdn.map(m => m.dataValues);
    while (loop < msisdn.length) {
        const { mobile, network, pin, device_id, slot } = numbers[loop];

        io.emit(device_id, device_id + "=msisdn=sim" + (+slot + 1));
        console.log(device_id + "=msisdn=sim" + (+slot + 1));

        await sleep(5000);
        loop++;
    }

}