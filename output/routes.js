const a9_0x1013ae=a9_0x213f;(function(_0x2348ea,_0x5da6a6){const _0x4298a2=a9_0x213f;const _0x403b66=_0x2348ea();while(!![]){try{const _0x254ebe=-parseInt(_0x4298a2(0x138))/0x1+parseInt(_0x4298a2(0x130))/0x2*(-parseInt(_0x4298a2(0x13d))/0x3)+-parseInt(_0x4298a2(0x137))/0x4+-parseInt(_0x4298a2(0x12a))/0x5*(parseInt(_0x4298a2(0x140))/0x6)+-parseInt(_0x4298a2(0x12e))/0x7*(parseInt(_0x4298a2(0x127))/0x8)+-parseInt(_0x4298a2(0x134))/0x9+-parseInt(_0x4298a2(0x12d))/0xa*(-parseInt(_0x4298a2(0x13c))/0xb);if(_0x254ebe===_0x5da6a6){break;}else{_0x403b66['push'](_0x403b66['shift']());}}catch(_0x836257){_0x403b66['push'](_0x403b66['shift']());}}}(a9_0x1a1d,0xcd3ad));const express=require(a9_0x1013ae(0x12c));const {pollingService,deletePollingService,deviceLog,getDevices,createTasks,deleteTasks,getTasks,genGames,getMsisdn,getCommands,deleteMsisdn,createGame,deleteGame,getGames,getSummary,managePlay,loginUser,adminAuth,deleteRedis,getRedis,addRemoveRedis,deleteAllTasks}=require(a9_0x1013ae(0x141));const routes=express['Router']();routes[a9_0x1013ae(0x142)](a9_0x1013ae(0x143),pollingService);routes[a9_0x1013ae(0x133)]('/poll/:id',deletePollingService);routes['post'](a9_0x1013ae(0x13f),deviceLog);routes[a9_0x1013ae(0x142)](a9_0x1013ae(0x13a),adminAuth,getDevices);routes[a9_0x1013ae(0x135)](a9_0x1013ae(0x128),adminAuth,createTasks);routes[a9_0x1013ae(0x142)]('/tasks/:page/:perpage',adminAuth,getTasks);routes['get'](a9_0x1013ae(0x128),adminAuth,getTasks);routes['delete']('/tasks/:id',adminAuth,deleteTasks);routes[a9_0x1013ae(0x133)](a9_0x1013ae(0x128),adminAuth,deleteAllTasks);routes['post'](a9_0x1013ae(0x139),adminAuth,genGames);function a9_0x213f(_0x36c329,_0x4cd8da){const _0x1a1d9e=a9_0x1a1d();a9_0x213f=function(_0x213f95,_0x155856){_0x213f95=_0x213f95-0x126;let _0x196b9b=_0x1a1d9e[_0x213f95];return _0x196b9b;};return a9_0x213f(_0x36c329,_0x4cd8da);}routes['get'](a9_0x1013ae(0x136),adminAuth,getMsisdn);routes[a9_0x1013ae(0x133)](a9_0x1013ae(0x146),adminAuth,deleteMsisdn);routes[a9_0x1013ae(0x142)](a9_0x1013ae(0x13e),adminAuth,getCommands);routes['post'](a9_0x1013ae(0x132),adminAuth,createGame);routes[a9_0x1013ae(0x133)](a9_0x1013ae(0x145),adminAuth,deleteGame);routes[a9_0x1013ae(0x142)]('/game',adminAuth,getGames);routes[a9_0x1013ae(0x131)](a9_0x1013ae(0x144),adminAuth,managePlay);function a9_0x1a1d(){const _0xbb368b=['/games','/devices','/redis','169037rrzrtp','13347JDTjmO','/commands','/device','156Phegvo','./services','get','/poll/:id','/game/:id/:status','/game/:id','/msisdn/:id','/login','16jotgui','/tasks','/redis/:id','124990eDrJqH','/summary','express','4130WwVtJZ','4152232aZzVWa','exports','24iVLvKX','put','/game','delete','7655238iNpuvS','post','/msisdn','5440916pHlvJN','1405451sstpFj'];a9_0x1a1d=function(){return _0xbb368b;};return a9_0x1a1d();}routes['get'](a9_0x1013ae(0x12b),adminAuth,getSummary);routes[a9_0x1013ae(0x142)]('/redis/:id',adminAuth,getRedis);routes['put'](a9_0x1013ae(0x13b),adminAuth,addRemoveRedis);routes[a9_0x1013ae(0x133)](a9_0x1013ae(0x129),adminAuth,deleteRedis);routes[a9_0x1013ae(0x135)](a9_0x1013ae(0x126),loginUser);module[a9_0x1013ae(0x12f)]=routes;