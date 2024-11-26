const { DataTypes } = require("sequelize");
const db = require("../utils/db");
const logsModel = db.define('logs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    msisdn: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: true
    },
    play: {
        type: DataTypes.STRING,
        allowNull: true
    },
    datetime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    },
    play_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sender_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


module.exports = logsModel;