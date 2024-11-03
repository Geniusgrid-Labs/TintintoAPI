const { DataTypes } = require("sequelize");
const db = require("../db");
const msisdnModel = db.define('msisdn', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    holder: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    network: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    pin: {
        type: DataTypes.STRING(128),
        allowNull: true
    },
    device_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    balance: {
        type: DataTypes.STRING,
        allowNull: true
    },
    slot: {
        type: DataTypes.INTEGER(1),
        allowNull: true
    },
    plays: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    }
});


module.exports = msisdnModel;