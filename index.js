require("dotenv").config();
const cron = require('node-cron');
const compression = require("compression");
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require('body-parser')
const routes = require("./routes");
const { default: axios } = require("axios");
const { clearCheckerRedis, autoGenGames, simulateGames, checkStats } = require("./services");
const tasksModel = require("./models/tasks");
const db = require("./utils/db");
const app = express();
const PORT = process.env.PORT || 3000;

// app.use(morgan());
app.use(compression());

const corsOptions = {
    origin: '*', // Replace with your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization here
};

app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,content-type,Accept"
    );
    next();
});
app.use(express.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use('/api/v1.0', routes);

app.get("*", (req, res, next) => {
    res.status(200).send("Unauthorized request")
})

cron.schedule('15 20 * * *', () => {
    console.log('---running a task every minute');
    clearCheckerRedis();
});

cron.schedule('0 18 * * MON,TUE,WED,THU,FRI,SAT', () => {
    autoGenGames();
});

cron.schedule('58 18 * * MON,TUE,WED,THU,FRI,SAT', async () => {
    await db.query('delete from tasks')
});

cron.schedule('0 17 * * SUN', () => {
    autoGenGames("18:30");
});

cron.schedule('54 17 * * SUN', async () => {
    await db.query('delete from tasks')
});

/************ start ***********/
//check for updates on the played 
cron.schedule('*/5 18-19 * * *', () => {
    checkStats();
});
cron.schedule('*/30 20-23 * * *', () => {
    checkStats();
});

/************ end ***********/
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// checkStats();
// autoGenGames();
simulateGames();