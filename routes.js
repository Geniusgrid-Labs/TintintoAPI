const express = require('express');
const { pollingService, deletePollingService, deviceLog, getDevices, createTasks, deleteTasks, getTasks, genGames, getMsisdn, getCommands, deleteMsisdn, createGame, deleteGame, getGames, getSummary, managePlay, loginUser, adminAuth, deleteRedis, getRedis, addRemoveRedis, deleteAllTasks } = require('./services');
const routes = express.Router();

routes.get('/poll/:id', pollingService);
routes.delete('/poll/:id', deletePollingService);
routes.post('/device', deviceLog);
routes.get('/devices', adminAuth, getDevices);

routes.post('/tasks', adminAuth, createTasks);
routes.get('/tasks/:page/:perpage', adminAuth, getTasks);
routes.get('/tasks', adminAuth, getTasks);
routes.delete('/tasks/:id', adminAuth, deleteTasks);
routes.delete('/tasks', adminAuth, deleteAllTasks);

routes.post('/games', adminAuth, genGames);

routes.get('/msisdn', adminAuth, getMsisdn);
routes.delete('/msisdn/:id', adminAuth, deleteMsisdn);
routes.get('/commands', adminAuth, getCommands);

routes.post('/game', adminAuth, createGame);
routes.delete('/game/:id', adminAuth, deleteGame);
routes.get('/game', adminAuth, getGames);
routes.put('/game/:id/:status', adminAuth, managePlay);

routes.get('/summary', adminAuth, getSummary);

routes.get('/redis/:id', adminAuth, getRedis);
routes.put('/redis', adminAuth, addRemoveRedis);
routes.delete('/redis/:id', adminAuth, deleteRedis);

routes.post('/login', loginUser)
module.exports = routes;