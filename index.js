require("dotenv").config();
const compression = require("compression");
const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const bodyParser = require('body-parser')
const routes = require("./routes");
const { addToRedis } = require("./services");
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

addToRedis();