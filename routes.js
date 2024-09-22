const express = require('express');
const { validate, setBalance } = require('./services');

const routes = express.Router();

routes.post('/set-balance', validate, setBalance);
routes.post('/set-device', validate, setDevice);

module.exports = routes;