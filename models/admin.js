const { DataTypes } = require("sequelize");
const db = require("../utils/db");
const adminModel = db.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    session: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


module.exports = adminModel;