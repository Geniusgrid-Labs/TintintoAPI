const db = require('./db');
const devicesModel = require('./models/devices');
const featuresModel = require('./models/features');
const msisdnModel = require('./models/msisdn');
module.exports.DBCheck = () => {

}

module.exports.sleep = () => {
    const end = Date.now() + ms;
    while (Date.now() < end) { /* do nothing */ }
}
