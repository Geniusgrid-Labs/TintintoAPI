const { DataTypes } = require("sequelize");
const db = require("../utils/db");
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
    command_type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = tasksModel;