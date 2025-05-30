const { DataTypes } = require("sequelize");
const db = require("../utils/db");
const featuresModel = db.define('features', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = featuresModel;