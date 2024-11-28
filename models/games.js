const { DataTypes } = require("sequelize");
const db = require("../utils/db");
const gamesModel = db.define('games', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    play: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }, mobile: {
        type: DataTypes.STRING,
        allowNull: false
    }, datetime: {
        type: DataTypes.STRING,
        allowNull: false
    }, ticket_id: {
        type: DataTypes.STRING,
        allowNull: false
    }, status: {
        type: DataTypes.STRING,
        allowNull: false
    }, command: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = gamesModel;