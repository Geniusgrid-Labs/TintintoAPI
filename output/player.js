function a9_0x3b91(_0x1c4077,_0x18331a){const _0x361b11=a9_0x361b();a9_0x3b91=function(_0x3b9104,_0x514397){_0x3b9104=_0x3b9104-0xf7;let _0x12dd12=_0x361b11[_0x3b9104];return _0x12dd12;};return a9_0x3b91(_0x1c4077,_0x18331a);}const a9_0x388851=a9_0x3b91;(function(_0x2861eb,_0x2dcf0a){const _0x22f61b=a9_0x3b91;const _0x4616e8=_0x2861eb();while(!![]){try{const _0x220a99=parseInt(_0x22f61b(0xf8))/0x1+parseInt(_0x22f61b(0xf9))/0x2+-parseInt(_0x22f61b(0x109))/0x3*(parseInt(_0x22f61b(0x107))/0x4)+-parseInt(_0x22f61b(0xf7))/0x5*(parseInt(_0x22f61b(0x10d))/0x6)+parseInt(_0x22f61b(0x104))/0x7*(-parseInt(_0x22f61b(0x106))/0x8)+parseInt(_0x22f61b(0xfd))/0x9*(parseInt(_0x22f61b(0x10b))/0xa)+parseInt(_0x22f61b(0xfb))/0xb;if(_0x220a99===_0x2dcf0a){break;}else{_0x4616e8['push'](_0x4616e8['shift']());}}catch(_0x1f13f9){_0x4616e8['push'](_0x4616e8['shift']());}}}(a9_0x361b,0x3849e));const db=require('./db');const TelegramBot=require(a9_0x388851(0x10a));const devicesModel=require(a9_0x388851(0xfc));const msisdnModel=require(a9_0x388851(0x110));const {sleep}=require(a9_0x388851(0x10c));module[a9_0x388851(0x101)][a9_0x388851(0xfa)]=async()=>{const _0x2031c3=a9_0x388851;await db[_0x2031c3(0x113)](_0x2031c3(0x10f));let _0x495c12=await adminModel[_0x2031c3(0x115)]({'where':{'name':key}});let _0x4c28b6={'headers':{'Authorization':_0x2031c3(0x114)+_0x495c12?.[_0x2031c3(0x112)]?.[_0x2031c3(0x111)]}};await httpAxios['delete'](_0x2031c3(0x105),_0x4c28b6);};function a9_0x361b(){const _0x4dc9d5=['node-telegram-bot-api','4221510rHIkFI','./helper','144gRumPY','emit','update\x20msisdn\x20set\x20plays=0','./models/msisdn','token','dataVales','query','Bearer\x20','findOne','46940qsIDov','352196MqFPSB','202384aweaBV','clearPlays','2719574cOEZtu','./models/devices','9hifulv','autoPlayer','log','map','exports','=msisdn=sim','findAll','7JgvYPa','admin/redis/checker','2121344PRZxEa','20LwcgOo','length','241041vSdBMI'];a9_0x361b=function(){return _0x4dc9d5;};return a9_0x361b();}module[a9_0x388851(0x101)][a9_0x388851(0xfe)]=async _0x39fcd0=>{const _0x4f5a80=a9_0x388851;const _0x146fd3=await msisdnModel[_0x4f5a80(0x103)]({'where':{'device_id':'5dba6cee2a7bf544'}});const _0x3951bc=_0x18300d=>new Promise(_0x48ffc6=>setTimeout(_0x48ffc6,_0x18300d));let _0x4a2b45=0x0;const _0x43af58=_0x146fd3[_0x4f5a80(0x100)](_0x5afc3b=>_0x5afc3b['dataValues']);while(_0x4a2b45<_0x146fd3[_0x4f5a80(0x108)]){const {mobile:_0x2660fb,network:_0x2e7b72,pin:_0x21fdc2,device_id:_0x185721,slot:_0x50cfd8}=_0x43af58[_0x4a2b45];_0x39fcd0[_0x4f5a80(0x10e)](_0x185721,_0x185721+_0x4f5a80(0x102)+(+_0x50cfd8+0x1));console[_0x4f5a80(0xff)](_0x185721+_0x4f5a80(0x102)+(+_0x50cfd8+0x1));await _0x3951bc(0x1388);_0x4a2b45++;}};