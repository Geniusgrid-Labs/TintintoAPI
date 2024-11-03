const express = require('express');
const { validate, setBalance } = require('./services');
const { login, getDevices, getMsisdn, getCommands, generatePlays, redisCommand } = require('./webServices');

const routes = express.Router();
routes.post('/login', login);
routes.get('/devices', getDevices);
routes.get('/msisdn', getMsisdn);
routes.get('/commands', getCommands);
routes.post('/generate', generatePlays);
routes.post('/redis', redisCommand);


// routes.post('/set-balance', validate, setBalance);
// routes.post('/set-device', validate, setDevice);

module.exports = routes;