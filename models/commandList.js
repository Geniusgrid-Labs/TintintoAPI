const { DataTypes } = require("sequelize");
const db = require("../utils/db");
const commandListModel = db.define('commandList', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    command: {
        type: DataTypes.STRING,
        allowNull: true
    },
    network: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


module.exports = commandListModel;