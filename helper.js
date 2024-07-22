const db = require('./db');
const devicesModel = require('./models/devices');
const featuresModel = require('./models/features');
const msisdnModel = require('./models/msisdn');
module.exports.DBCheck = () => {
    msisdnModel.findAll().then(resp => {
        // if (!resp.length) {
        //     devicesModel.bulkCreate([{ device_id: '0747d7645e8d05f6', device_holder: 'Samsung' }, { device_id: '24689d7d8e361c46', device_holder: 'Helen' }, { device_id: '384cc34a3dc22149', device_holder: 'Nana Adwoa' }]);
        // }
        console.log(`Active mobile numbers : ${resp?.length}`);
    }).catch(err => { })
}
