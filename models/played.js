const { DataTypes } = require("sequelize");
const db = require("../utils/db");
const playedModel = db.define('tickets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, play_numbers: {
        type: DataTypes.STRING,
        allowNull: false
    }, payout_id: {
        type: DataTypes.STRING,
        allowNull: false
    }, multiplier: {
        type: DataTypes.STRING,
        allowNull: false
    }, play_type: {
        type: DataTypes.STRING,
        allowNull: false
    }, stake: {
        type: DataTypes.STRING,
        allowNull: false
    }, amount_collected: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = playedModel;