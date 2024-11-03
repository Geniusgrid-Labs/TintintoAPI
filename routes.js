const express = require('express');
const { pollingService, deletePollingService, deviceLog, getDevices, createTasks, deleteTasks, getTasks, genGames, getMsisdn, getCommands, deleteMsisdn, createGame, deleteGame, getGames, getSummary, managePlay } = require('./services');
const routes = express.Router();

routes.get('/poll/:id', pollingService);
routes.delete('/poll/:id', deletePollingService);
routes.post('/device', deviceLog);
routes.get('/devices', getDevices);

routes.post('/tasks', createTasks);
routes.get('/tasks', getTasks);
routes.delete('/tasks/:id', deleteTasks);

routes.post('/games', genGames);

routes.get('/msisdn', getMsisdn);
routes.delete('/msisdn/:id', deleteMsisdn);
routes.get('/commands', getCommands);

routes.post('/game', createGame);
routes.delete('/game/:id', deleteGame);
routes.get('/game', getGames);
routes.put('/game/:id/:status', managePlay);

routes.get('/summary', getSummary);
module.exports = routes;