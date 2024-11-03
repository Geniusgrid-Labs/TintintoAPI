const { DataTypes } = require("sequelize");
const db = require("../utils/db");
const devicesModel = db.define('devices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    device_holder: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    active_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sim1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sim2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sim1_network: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sim2_network: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = devicesModel;