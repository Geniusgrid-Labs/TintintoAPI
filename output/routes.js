const a8_0x23b0c9=a8_0x580a;(function(_0x356608,_0x46ee34){const _0x6245b9=a8_0x580a;const _0x1f1680=_0x356608();while(!![]){try{const _0xbc18=parseInt(_0x6245b9(0x16e))/0x1+-parseInt(_0x6245b9(0x177))/0x2+-parseInt(_0x6245b9(0x17c))/0x3*(-parseInt(_0x6245b9(0x181))/0x4)+-parseInt(_0x6245b9(0x175))/0x5+-parseInt(_0x6245b9(0x173))/0x6*(-parseInt(_0x6245b9(0x185))/0x7)+parseInt(_0x6245b9(0x187))/0x8*(parseInt(_0x6245b9(0x172))/0x9)+parseInt(_0x6245b9(0x16a))/0xa;if(_0xbc18===_0x46ee34){break;}else{_0x1f1680['push'](_0x1f1680['shift']());}}catch(_0x27b49b){_0x1f1680['push'](_0x1f1680['shift']());}}}(a8_0x4d8c,0xb3ceb));const express=require(a8_0x23b0c9(0x183));const {pollingService,deletePollingService,deviceLog,getDevices,createTasks,deleteTasks,getTasks,genGames,getMsisdn,getCommands,deleteMsisdn,createGame,deleteGame,getGames,getSummary,managePlay,loginUser,adminAuth,deleteRedis,getRedis,addRemoveRedis}=require(a8_0x23b0c9(0x17f));const routes=express[a8_0x23b0c9(0x182)]();function a8_0x4d8c(){const _0x2e9a1a=['/summary','1269682zehkrT','/game/:id','/game','/tasks','post','2667rMplgk','put','/msisdn/:id','./services','exports','2396cJEYkO','Router','express','/msisdn','27762KfgtvA','get','8UFpbSl','/poll/:id','5489120UzALjX','/tasks/:id','/game/:id/:status','/redis','537740PlkOGC','/commands','delete','/redis/:id','3813759Pvcoka','1164eKGZjT','/devices','7204930FQeCTF'];a8_0x4d8c=function(){return _0x2e9a1a;};return a8_0x4d8c();}routes[a8_0x23b0c9(0x186)]('/poll/:id',pollingService);routes[a8_0x23b0c9(0x170)](a8_0x23b0c9(0x188),deletePollingService);routes[a8_0x23b0c9(0x17b)]('/device',deviceLog);routes[a8_0x23b0c9(0x186)](a8_0x23b0c9(0x174),adminAuth,getDevices);routes['post'](a8_0x23b0c9(0x17a),adminAuth,createTasks);routes['get'](a8_0x23b0c9(0x17a),adminAuth,getTasks);routes['delete'](a8_0x23b0c9(0x16b),adminAuth,deleteTasks);routes[a8_0x23b0c9(0x17b)]('/games',adminAuth,genGames);routes['get'](a8_0x23b0c9(0x184),adminAuth,getMsisdn);routes[a8_0x23b0c9(0x170)](a8_0x23b0c9(0x17e),adminAuth,deleteMsisdn);routes[a8_0x23b0c9(0x186)](a8_0x23b0c9(0x16f),adminAuth,getCommands);routes[a8_0x23b0c9(0x17b)](a8_0x23b0c9(0x179),adminAuth,createGame);routes['delete'](a8_0x23b0c9(0x178),adminAuth,deleteGame);routes[a8_0x23b0c9(0x186)]('/game',adminAuth,getGames);routes[a8_0x23b0c9(0x17d)](a8_0x23b0c9(0x16c),adminAuth,managePlay);function a8_0x580a(_0xab6444,_0x40ad83){const _0x4d8c27=a8_0x4d8c();a8_0x580a=function(_0x580aef,_0x5ddfc9){_0x580aef=_0x580aef-0x16a;let _0x2954ef=_0x4d8c27[_0x580aef];return _0x2954ef;};return a8_0x580a(_0xab6444,_0x40ad83);}routes[a8_0x23b0c9(0x186)](a8_0x23b0c9(0x176),adminAuth,getSummary);routes[a8_0x23b0c9(0x186)](a8_0x23b0c9(0x171),adminAuth,getRedis);routes[a8_0x23b0c9(0x17d)](a8_0x23b0c9(0x16d),adminAuth,addRemoveRedis);routes[a8_0x23b0c9(0x170)](a8_0x23b0c9(0x171),adminAuth,deleteRedis);routes[a8_0x23b0c9(0x17b)]('/login',loginUser);module[a8_0x23b0c9(0x180)]=routes;