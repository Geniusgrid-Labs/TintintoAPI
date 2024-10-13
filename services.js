const devicesModel = require("./models/devices");
const msisdnModel = require("./models/msisdn");

module.exports.validate = async (req) => {
    console.log(req)
    if (!req.body?.device_id)
        return "Device ID is required";

    const checkDevice = await devicesModel.findOne({ where: { device_id: req.body?.device_id } });
    if (!checkDevice?.dataValues?.id)
        return "Unauthorized device communication..";
    else
        return true;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.setBalance = async (req) => {
    await msisdnModel.update({ balance: req.body?.balance || 0 }, {
        where: {
            device_id: req?.body?.device_id,
            slot: req?.body?.slot
        }
    });
    return true;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.setDevice = async (req) => {
    if (!req.body?.mobile)
        return "Mobile number is required";

    const msisdn = req.body?.mobile.startsWith("233") ? req.body?.mobile : `233${req.body?.mobile.substring(1)}`
    await msisdnModel.update({ device_id: req.body?.device_id, slot: req.body?.slot || 0 }, {
        where: {
            mobile: msisdn
        }
    });
    return "Ok";
}