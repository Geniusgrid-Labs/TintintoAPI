require("dotenv").config();
const compression = require("compression");
const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser')
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

// app.use(morgan());
app.use(compression());
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