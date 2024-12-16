const { DataTypes } = require("sequelize");
const db = require("../utils/db");
const moment = require("moment");
const tasksModel = db.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: moment().format("YYYY-MM-DD HH:mm:ss")
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});


module.exports = tasksModel;