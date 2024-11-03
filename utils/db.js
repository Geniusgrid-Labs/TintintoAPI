require("dotenv").config();
const { Sequelize } = require("sequelize");

const db = new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_pass,
    {
        host: process.env.db_host,
        logging: true,
        dialect: "mysql",
        port: 3306,
        define: {
            timestamps: false,
            freezeTableName: true,
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
    }
);

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = db;
