const { DataTypes } = require("sequelize");
const db = require("../utils/db");
const playedModel = db.define('played', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    played: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = playedModel;