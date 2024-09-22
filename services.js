const devicesModel = require("./models/devices");
const msisdnModel = require("./models/msisdn");

module.exports.validate = async (req, res, next) => {
    console.log(req.body);
    if (!req.body?.device_id)
        return res.status(401).send("Device ID is required");

    const checkDevice = await devicesModel.findOne({ where: { device_id: req.body?.device_id } });
    if (!checkDevice?.dataValues?.id)
        return res.status(401).send("Unauthorized device communication..");
    else
        return next();
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.setBalance = async (req, res, next) => {
    if (!req.body?.mobile)
        return res.status(401).send("Mobile number is required");

    const msisdn = req.body?.mobile.startsWith("233") ? req.body?.mobile : `233${req.body?.mobile.substring(1)}`
    await msisdnModel.update({ balance: req.body?.balance || 0 }, {
        where: {
            mobile: msisdn
        }
    });
    return res.status(200).send("Ok");
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.setDevice = async (req, res, next) => {
    if (!req.body?.mobile)
        return res.status(401).send("Mobile number is required");

    const msisdn = req.body?.mobile.startsWith("233") ? req.body?.mobile : `233${req.body?.mobile.substring(1)}`
    await msisdnModel.update({ device_id: req.body?.device_id }, {
        where: {
            mobile: msisdn
        }
    });
    return res.status(200).send("Ok");
}