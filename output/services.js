const a12_0x484e2f=a12_0x12e8;(function(_0x478290,_0x565fc2){const _0x13576d=a12_0x12e8;const _0x2aad38=_0x478290();while(!![]){try{const _0x500dd5=parseInt(_0x13576d(0x1bf))/0x1+-parseInt(_0x13576d(0x1cd))/0x2+parseInt(_0x13576d(0x1fa))/0x3*(parseInt(_0x13576d(0x1eb))/0x4)+parseInt(_0x13576d(0x1ed))/0x5*(parseInt(_0x13576d(0x1f3))/0x6)+parseInt(_0x13576d(0x1b6))/0x7*(-parseInt(_0x13576d(0x243))/0x8)+parseInt(_0x13576d(0x22e))/0x9+-parseInt(_0x13576d(0x215))/0xa;if(_0x500dd5===_0x565fc2){break;}else{_0x2aad38['push'](_0x2aad38['shift']());}}catch(_0x3f017f){_0x2aad38['push'](_0x2aad38['shift']());}}}(a12_0x1495,0x79a5d));const tasksModel=require(a12_0x484e2f(0x238));const devicesModel=require(a12_0x484e2f(0x21c));const {numberCheck,balanceCheck}=require(a12_0x484e2f(0x22a));const msisdnModel=require('./models/msisdn');const commandListModel=require('./models/commandList');const gamesModel=require(a12_0x484e2f(0x1d5));function a12_0x12e8(_0x54b1b5,_0x516f0e){const _0x149577=a12_0x1495();a12_0x12e8=function(_0x12e804,_0x4b068c){_0x12e804=_0x12e804-0x1b1;let _0x448243=_0x149577[_0x12e804];return _0x448243;};return a12_0x12e8(_0x54b1b5,_0x516f0e);}const {default:axios}=require(a12_0x484e2f(0x1c5));const adminModel=require(a12_0x484e2f(0x22f));const jwt=require(a12_0x484e2f(0x23c));const moment=require(a12_0x484e2f(0x20a));const TelegramBot=require(a12_0x484e2f(0x222));const bot2=new TelegramBot(process[a12_0x484e2f(0x1c2)][a12_0x484e2f(0x1d7)],{'polling':![]});const db=require(a12_0x484e2f(0x1c6));const logsModel=require(a12_0x484e2f(0x24f));const playedModel=require(a12_0x484e2f(0x25a));const telegram=async(_0x45c858,_0x365aff=0x1f8c)=>{const _0x4c2574=a12_0x484e2f;if(_0x45c858)bot2['sendMessage'](_0x4c2574(0x20d),_0x45c858,{'message_thread_id':_0x365aff});};const httpInstance=axios[a12_0x484e2f(0x20f)]({'baseURL':process[a12_0x484e2f(0x1c2)][a12_0x484e2f(0x1c1)]});const adminAuth=(_0x4c04f6,_0x23c6cb,_0x409c99)=>{const _0x6a4c5c=a12_0x484e2f;if(!_0x4c04f6[_0x6a4c5c(0x1fc)][_0x6a4c5c(0x1f7)])return _0x23c6cb[_0x6a4c5c(0x1cc)](0x191)[_0x6a4c5c(0x1e2)](_0x6a4c5c(0x1d3));const _0x24e57f=_0x4c04f6['headers'][_0x6a4c5c(0x1f7)];const _0x1e3eac=_0x24e57f&&_0x24e57f[_0x6a4c5c(0x24b)]('\x20')[0x1];jwt[_0x6a4c5c(0x1b4)](_0x1e3eac,process[_0x6a4c5c(0x1c2)]['jwt'],async(_0x3ce02d,_0x19d985)=>{const _0x55f18f=_0x6a4c5c;if(_0x3ce02d)return _0x23c6cb[_0x55f18f(0x1cc)](0x191)[_0x55f18f(0x1e2)](_0x55f18f(0x1d3));_0x4c04f6['user']=_0x19d985;_0x409c99();});};const pollingService=async(_0x5a1fca,_0x3eb48e,_0x5c63ef)=>{const _0xb7eae7=a12_0x484e2f;const _0x2c4c30=await tasksModel[_0xb7eae7(0x1e5)]({'where':{'device_id':_0x5a1fca?.[_0xb7eae7(0x1d6)]?.['id']||''},'order':[['id',_0xb7eae7(0x1e6)]]});_0x3eb48e[_0xb7eae7(0x22c)](_0x2c4c30?.[_0xb7eae7(0x1dd)]||{});};const deletePollingService=async(_0x494e67,_0xa6274c,_0x185329)=>{const _0x219696=a12_0x484e2f;await tasksModel['destroy']({'where':{'id':_0x494e67?.[_0x219696(0x1d6)]?.['id']||''}});_0xa6274c[_0x219696(0x1cc)](0xcc)[_0x219696(0x1e2)](_0x219696(0x1b5));};const deviceLog=async(_0x26e8d1,_0xf2a443,_0x58aab4)=>{const _0x171116=a12_0x484e2f;console['log']('Recieved::',_0x26e8d1['query'],_0x26e8d1['params'],_0x26e8d1[_0x171116(0x208)]);telegram(JSON[_0x171116(0x1ff)](_0x26e8d1['body'],null,0x4),0x253c);const _0x28e2d7=await devicesModel[_0x171116(0x1e5)]({'where':{'device_id':_0x26e8d1?.['body']?.[_0x171116(0x248)]}});if(_0x26e8d1?.['body']?.[_0x171116(0x1c9)]?.[_0x171116(0x236)]()[_0x171116(0x220)](_0x171116(0x226))||_0x26e8d1?.[_0x171116(0x208)]?.['data']?.[_0x171116(0x236)]()[_0x171116(0x220)](_0x171116(0x246))){await tasksModel[_0x171116(0x1b9)]({'where':{'device_id':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x248)]}});}if(_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1dc)]&&_0x28e2d7?.['dataValues']?.['id']){await devicesModel[_0x171116(0x241)]({'active_slot':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1dc)],'sim1':_0x26e8d1?.['body']?.[_0x171116(0x209)],'sim2':_0x26e8d1?.['body']?.[_0x171116(0x256)],'sim1_network':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1b2)],'sim2_network':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x203)]},{'where':{'device_id':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x248)]}});}if(['true',_0x171116(0x1bc)][_0x171116(0x220)](_0x26e8d1?.[_0x171116(0x208)]?.['paused'])){await devicesModel['update']({'status':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1b7)]!==_0x171116(0x235)},{'where':{'device_id':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x248)]}});}if(_0x26e8d1[_0x171116(0x208)]?.[_0x171116(0x250)]===_0x171116(0x212)){if(!_0x28e2d7?.[_0x171116(0x1dd)]?.['id']){await devicesModel[_0x171116(0x20f)]({'name':_0x26e8d1?.['body']?.[_0x171116(0x1e0)],'pin':0x56d,'device_holder':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1e0)],'device_id':_0x26e8d1?.[_0x171116(0x208)]?.['device_id'],'active_slot':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1dc)],'sim1_network':_0x26e8d1?.[_0x171116(0x208)]?.['slot0'],'sim2_network':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x203)]});}}else if(_0x26e8d1['body']?.[_0x171116(0x250)]==='AccessibilityNodeInfo'){const _0x339b32=_0x26e8d1?.['body']?.[_0x171116(0x1c9)]||'';if(_0x339b32[_0x171116(0x220)]('your\x20phone\x20number\x20is')||_0x339b32[_0x171116(0x220)](_0x171116(0x1df))||_0x339b32[_0x171116(0x220)]('your\x20number\x20is')){const _0x1fba9a=/(?:233|\+233|0)\d{9}/;const _0x3533eb=_0x339b32[_0x171116(0x20e)](_0x1fba9a);let _0x4bec11=_0x3533eb?.[0x0];let _0x479323=_0x171116(0x253);if(_0x339b32['includes'](_0x171116(0x210))){_0x4bec11=_0x339b32[_0x171116(0x20e)](/\b233\d{8,9}\b/)[0x0];_0x479323='TIGO';}if(_0x339b32[_0x171116(0x220)]('Your\x20mobile\x20number\x20is'))_0x479323=_0x171116(0x1f1);if(_0x4bec11[_0x171116(0x223)]('0'))_0x4bec11=_0x171116(0x201)+_0x4bec11[_0x171116(0x1b8)](0x1);const _0x52eae4=await msisdnModel[_0x171116(0x1e5)]({'where':{'mobile':_0x4bec11}});if(!_0x52eae4?.['dataValues']?.['id']){await msisdnModel['create']({'mobile':_0x4bec11,'holder':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1e0)],'network':_0x479323,'pin':_0x171116(0x1fb),'device_id':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x248)],'balance':0x0,'slot':_0x26e8d1?.['body']?.['simslot'],'plays':0x0});}const _0x32bfb5=[];_0x32bfb5[_0x171116(0x257)]({'device_id':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x248)],'task':_0x171116(0x23e)+_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x248)]+'_slot'+_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1dc)]+_0x171116(0x234)+_0x4bec11});_0x32bfb5[_0x171116(0x257)]({'device_id':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x248)],'task':_0x171116(0x25b)+_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1dc)]});_0x32bfb5['push']({'device_id':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x248)],'task':balanceCheck(_0x171116(0x202)+_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x202)+_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1dc)]],_0x26e8d1?.['body']?.['device_id'])});_0x32bfb5[_0x171116(0x257)]({'device_id':_0x26e8d1?.['body']?.[_0x171116(0x248)],'task':_0x171116(0x1d1)});await tasksModel['bulkCreate'](_0x32bfb5);}else if(_0x339b32['toLowerCase']()[_0x171116(0x220)](_0x171116(0x21f))){const _0x508e72=_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1c9)][_0x171116(0x20e)](/GHS\s+([\d,]+\.?\d*)/g)[_0x171116(0x22d)](_0x33b749=>parseFloat(_0x33b749[_0x171116(0x24b)]('\x20')[0x1][_0x171116(0x228)](/,/g,'')))[0x0];await msisdnModel[_0x171116(0x241)]({'balance':_0x508e72,'slot':_0x26e8d1?.['body']?.['simslot']},{'where':{'mobile':_0x26e8d1?.[_0x171116(0x208)]?.['mobile'+(_0x26e8d1?.['body']?.['receivingSim']||_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1dc)])]}});}}else if(_0x26e8d1[_0x171116(0x208)]?.[_0x171116(0x250)]===_0x171116(0x24d)){await logsModel[_0x171116(0x20f)]({'device_id':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x248)],'msisdn':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x237)+_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1e9)]],'amount':'','play':'','datetime':moment()[_0x171116(0x1fd)]('YYYY-MM-DD\x20HH:mm:ss'),'message':_0x26e8d1[_0x171116(0x208)]?.[_0x171116(0x1c9)],'play_id':'','sender_id':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x247)]});const _0x2525bc=_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1c9)]||'';if([_0x171116(0x1ea)][_0x171116(0x220)](_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x247)])){if(_0x2525bc['toLowerCase']()[_0x171116(0x220)](_0x171116(0x216))){const _0x53eeff=_0x2525bc[_0x171116(0x24b)](_0x171116(0x1f9))[0x1]['split']('\x20')[0x0]?.['slice'](0x0,-0x1)?.[_0x171116(0x228)]('GHS','');await msisdnModel[_0x171116(0x241)]({'balance':_0x53eeff,'slot':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1dc)]},{'where':{'mobile':_0x26e8d1?.['body']?.['mobile'+_0x26e8d1?.['body']?.[_0x171116(0x1e9)]]}});console[_0x171116(0x23b)]('balance::------',_0x53eeff);}else if(_0x2525bc[_0x171116(0x236)]()['includes'](_0x171116(0x24a))&&_0x2525bc[_0x171116(0x236)]()[_0x171116(0x220)]('telecel\x20cash\x20balance\x20is')){const _0x3e757c=_0x2525bc[_0x171116(0x20e)](/GHS\w*/g)?.[_0x171116(0x1b8)](-0x1)?.['replace']('GHS','');await msisdnModel[_0x171116(0x241)]({'balance':_0x3e757c,'slot':_0x26e8d1?.[_0x171116(0x208)]?.['simslot']},{'where':{'mobile':_0x26e8d1?.[_0x171116(0x208)]?.['mobile'+_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1e9)]]}});console[_0x171116(0x23b)](_0x171116(0x227),_0x3e757c);}else if(_0x2525bc['toLowerCase']()['includes'](_0x171116(0x21f))||_0x2525bc['toLowerCase']()['includes']('balance\x20is')){let _0x2108ae=_0x2525bc?.['match'](/GHS\s+([\d,]+\.?\d*)/g)?.[_0x171116(0x22d)](_0x360459=>parseFloat(_0x360459[_0x171116(0x24b)]('\x20')[0x1]['replace'](/,/g,'')))[0x0];if(_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x202)+_0x26e8d1?.[_0x171116(0x208)]?.['simslot']]['includes'](_0x171116(0x1c8))||_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x202)+_0x26e8d1?.[_0x171116(0x208)]?.['simslot']]['includes'](_0x171116(0x1cb))){_0x2108ae=_0x2525bc?.[_0x171116(0x20e)](/GHS\d+\.\d{2}/g);if([undefined,_0x171116(0x251),null,'null']['includes'](_0x2108ae))_0x2108ae=_0x2525bc?.[_0x171116(0x20e)](/GHS\d{1,3}(?:,\d{3})*\.\d{2}/g);if(_0x2525bc[_0x171116(0x220)](_0x171116(0x1ba))&&_0x2525bc[_0x171116(0x220)](_0x171116(0x1da))&&_0x2525bc['includes']('Your\x20E-levy\x20charge'))_0x2108ae=_0x2108ae?.[0x1][_0x171116(0x228)]('GHS','');else _0x2108ae=_0x2108ae?.[0x0]['replace']('GHS','');}await msisdnModel[_0x171116(0x241)]({'balance':_0x2108ae,'slot':_0x26e8d1?.['body']?.[_0x171116(0x1dc)]},{'where':{'mobile':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x237)+_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1e9)]]}});}}else if(_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x247)][_0x171116(0x220)]('ATMoney')){if(_0x2525bc['includes'](_0x171116(0x1f5))){const _0x2689af=_0x2525bc?.['split']('\x20')?.[_0x171116(0x1b8)](-0x1)[0x0]?.['slice'](0x0,-0x1)?.['replace'](_0x171116(0x1c0),'');await msisdnModel['update']({'balance':_0x2689af,'slot':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x1dc)]},{'where':{'mobile':_0x26e8d1?.[_0x171116(0x208)]?.[_0x171116(0x237)+_0x26e8d1?.[_0x171116(0x208)]?.['receivingSim']]}});}}}_0xf2a443[_0x171116(0x1cc)](0xc8)[_0x171116(0x1e2)]('OK');};const getDevices=async(_0x147660,_0x6146b3)=>{const _0x5ef0cd=a12_0x484e2f;const _0x4e829d=await devicesModel[_0x5ef0cd(0x233)]();_0x6146b3['json'](_0x4e829d||[]);};const getTasks=async(_0x10b842,_0x183af2)=>{const _0x10700f=a12_0x484e2f;if(_0x10b842?.[_0x10700f(0x1d6)]?.[_0x10700f(0x1de)]&&_0x10b842?.[_0x10700f(0x1d6)]?.[_0x10700f(0x232)]){let _0xa4b949=(!_0x10b842?.['params']?.[_0x10700f(0x1de)]||0x0)*(+_0x10b842?.[_0x10700f(0x1d6)]?.[_0x10700f(0x232)]||0x14);const _0x40fca4=await tasksModel[_0x10700f(0x21e)]({'limit':+_0x10b842?.['params']?.['perpage']||0x14,'offset':_0xa4b949});_0x183af2[_0x10700f(0x22c)](_0x40fca4||[]);}else{const _0x27cc58=await tasksModel[_0x10700f(0x233)]();_0x183af2[_0x10700f(0x22c)](_0x27cc58||[]);}};const getMsisdn=async(_0x3e2e39,_0xd82dd8)=>{const _0x4c2a04=a12_0x484e2f;const _0x173ee0=await msisdnModel['findAll']();_0xd82dd8[_0x4c2a04(0x22c)](_0x173ee0||[]);};function a12_0x1495(){const _0x1521d2=['Confirmed.GHS','random','simslot','dataValues','page','Your\x20mobile\x20number\x20is','device_name','exports','send','Data\x20removed\x20successfully','fill','findOne','ASC','Data\x20removal\x20failed','Created\x20successfully','receivingSim','T-CASH','5112bzEAmt','play_numbers','4112155BVogrp','then','select\x20count(*)\x20as\x20count\x20from\x20played\x20where\x20','setSim=0','VODAFONE','====','6rWVwGs','command=*766#:1:2:','your\x20current\x20ATMoney\x20balance\x20is','avg_payout','authorization','\x20limit\x200,10000000000;','Your\x20new\x20Telecel\x20Cash\x20balance\x20is\x20','1113rVWZcH','1389','headers','format','sign','stringify','Bearer\x20','233','slot','slot1','flat','count','wait=40000','delete\x20from\x20tasks','body','mobile0','moment','sim1','SELECT\x20count(*)\x20as\x20plays,sum(amount_collected)\x20as\x20stake,sum(payout_amount)\x20as\x20payout,mobile\x20FROM\x20tickets\x20where\x20mobile\x20in(\x27','-1002336199501','match','create','your\x20number\x20is','18:00','device_register','draw_results','Data\x20fetching\x20failed','15663930EMSWIg','your\x20new\x20telecel\x20cash\x20balance\x20is','admin/redis/','SELECT\x20*\x20from\x20draws\x20order\x20by\x20id\x20DESC\x20limit\x201,1','key','admin/redis','SELECT\x20*\x20from\x20draws\x20where\x20status=1\x20order\x20by\x20id\x20DESC\x20limit\x200,1','./models/devices','Bearer','findAndCountAll','current\x20balance','includes','67,32,17,51,9','node-telegram-bot-api','startsWith','pass_code','Deleted\x20successfully','wrong\x20pin','balance::------','replace','post','./utils/helper','\x20IN\x20(played)','json','map','6790689CmzLfr','./models/admin','bulkCreate','catch','perpage','findAll','.txt:','true','toLowerCase','mobile','./models/tasks','\x27)\x20AND\x20date(play_timestamp)=CURRENT_DATE\x20group\x20by\x20mobile\x20limit\x200,10000;','join','log','jsonwebtoken','admin/login','writeData=','SELECT\x20(sum(total_payout)/sum(total_collections))*100\x20as\x20avg_payout\x20FROM\x20draws\x20where\x20MONTH(CURRENT_DATE)=MONTH(end_timestamp)\x20AND\x20YEAR(CURRENT_DATE)=YEAR(end_timestamp)\x20limit\x200,\x201000','value','update','token','481952lirxFw','pass','play','You\x20do\x20not\x20have\x20enough\x20money\x20in\x20your','sender','device_id','truncate\x20played','Confirmed.\x20You\x20have\x20received','split','from','SMS','user','./models/logs','action','undefined','18:30','MTN','request','\x27,\x27','mobile1','push','admin/sql','get','./models/played','setsim=','Game\x20approved\x20successfully','all','slot0','number','verify','Done','7gXCgSe','paused','slice','destroy','paid\x20to','\x20AND\x20play_timestamp<\x272024-12-08\x2018:30:\x27\x20limit\x200,10000000000;','false','isArray','query','115714qskbUC','GHS','api','env','Data\x20updated\x20:\x20','SELECT\x20play_numbers\x20FROM\x20tickets\x20where\x20draw_id=','axios','./utils/db','sort','telecel','data','checker','vodafone','status','83796GDbqai','length','sim2','application/json','wait=3000','setSim=1','Access\x20denied.','filter','./models/games','params','telegram_bot','floor','delete'];a12_0x1495=function(){return _0x1521d2;};return a12_0x1495();}const getCommands=async(_0xc2c9c3,_0x363eec)=>{const _0x4aef54=a12_0x484e2f;const _0x56a037=await commandListModel[_0x4aef54(0x233)]();_0x363eec[_0x4aef54(0x22c)](_0x56a037||[]);};const createTasks=async(_0x63c88e,_0x353d71)=>{const _0x341691=a12_0x484e2f;if(Array[_0x341691(0x1bd)](_0x63c88e[_0x341691(0x208)]))await tasksModel[_0x341691(0x230)](_0x63c88e[_0x341691(0x208)]);else await tasksModel['create'](_0x63c88e[_0x341691(0x208)]);_0x353d71[_0x341691(0x1e2)](_0x341691(0x1e8));};const deleteTasks=async(_0xf73100,_0x2757b0)=>{const _0x2fc801=a12_0x484e2f;const _0xabf7fe=await tasksModel['findOne']({'where':{'id':_0xf73100[_0x2fc801(0x1d6)]?.['id']}});if(_0xabf7fe?.[_0x2fc801(0x1dd)]?.['id'])await tasksModel['destroy']({'where':{'id':_0xf73100[_0x2fc801(0x1d6)]?.['id']}});_0x2757b0['send']('Deleted\x20successfully');};const deleteAllTasks=async(_0x42d706,_0x40fecf)=>{const _0x7216aa=a12_0x484e2f;await db['query'](_0x7216aa(0x207));_0x40fecf[_0x7216aa(0x1e2)](_0x7216aa(0x225));};const deleteMsisdn=async(_0x1de542,_0x227047)=>{const _0x4ac18e=a12_0x484e2f;const _0x2f1478=await msisdnModel[_0x4ac18e(0x1e5)]({'where':{'id':_0x1de542[_0x4ac18e(0x1d6)]?.['id']}});if(_0x2f1478?.[_0x4ac18e(0x1dd)]?.['id'])await msisdnModel[_0x4ac18e(0x1b9)]({'where':{'id':_0x1de542[_0x4ac18e(0x1d6)]?.['id']}});_0x227047['send'](_0x4ac18e(0x225));};const genGames=async(_0x4a7216,_0x15eedf)=>{const _0x164e8d=a12_0x484e2f;const _0x1feba7=[0x1,0x3,0x8,0x5];const _0x24bb8e={'3':0x3,'4':0x6,'5':0xa,'6':0xf,'7':0x15,'8':0x1c,'9':0x24,'10':0x2d};const _0x53a5c0=Array(+_0x4a7216?.[_0x164e8d(0x208)]?.[_0x164e8d(0x205)]||0xa)[_0x164e8d(0x1e4)](0x0)['map'](_0x78ef0d=>{const _0x1f9e1d=_0x164e8d;const _0x4ded17=[];let _0x1c9076={'1':0x1,'3':0x2,'8':0xa,'5':0x1};const _0x5e4958=Math[_0x1f9e1d(0x1d8)](Math['random']()*_0x4a7216?.[_0x1f9e1d(0x208)]?.['games']?.[_0x1f9e1d(0x1ce)])+0x0;const _0x5a8366=_0x4a7216?.[_0x1f9e1d(0x208)]?.['games'][_0x5e4958];let _0xe10b26=_0x1c9076[String(_0x5a8366)];if(_0xe10b26===0xa)_0xe10b26=Math[_0x1f9e1d(0x1d8)](Math[_0x1f9e1d(0x1db)]()*(0xa-0x5))+0x5;let _0x2e85f9=!![];while(_0x2e85f9){const _0x434640=Math['floor'](Math[_0x1f9e1d(0x1db)]()*(0x4a-0x1+0x1)+0x1);if(!_0x4ded17[_0x1f9e1d(0x220)](_0x434640))_0x4ded17['push'](_0x434640);if(_0x4ded17['length']===_0xe10b26)_0x2e85f9=![];}const _0x5dc515=_0x4a7216[_0x1f9e1d(0x208)]?.['stake']?.['split'](',');const _0x5ea549=Math['floor'](Math[_0x1f9e1d(0x1db)]()*_0x5dc515?.[_0x1f9e1d(0x1ce)])+0x0;let _0x44ebe2=_0x5dc515[_0x5ea549];let _0x4c1857=0xf0*+_0x44ebe2;if(_0x5a8366==='8'){_0x44ebe2=+_0x24bb8e[''+_0x4ded17?.[_0x1f9e1d(0x1ce)]]*+_0x44ebe2;_0x4c1857=0xf0*+_0x24bb8e[''+_0x4ded17?.[_0x1f9e1d(0x1ce)]]*+_0x44ebe2;}else if(_0x5a8366==='5')_0x44ebe2=0x40;else if(_0x5a8366==='1')_0x4c1857=0x3c*+_0x44ebe2;return{'plays':_0x4ded17,'pickGame':_0x5a8366,'stake':_0x5dc515[_0x5ea549],'price':_0x44ebe2,'stake':_0x5dc515[_0x5ea549],'win':_0x4c1857};});_0x15eedf[_0x164e8d(0x22c)](_0x53a5c0);};const getCountOfPlays=async()=>{const _0x275131=a12_0x484e2f;return await Promise[_0x275131(0x1b1)](Array(0x4b)[_0x275131(0x1e4)](0x1)?.[_0x275131(0x22d)]((_0x21bb18,_0x1784aa)=>{return new Promise(async _0x360133=>{const _0x56f932=a12_0x12e8;const _0xf1e01e=_0x1784aa+0x1;const _0x1b2015=await db[_0x56f932(0x1be)](_0x56f932(0x1ef)+_0xf1e01e+_0x56f932(0x22b));_0x360133({'count':_0x1b2015[0x0][0x0]?.[_0x56f932(0x205)],'number':_0xf1e01e});});}))[_0x275131(0x1ee)](_0x4e18f9=>{return _0x4e18f9;})[_0x275131(0x231)](_0x599c90=>{logger['error'](_0x599c90);return[];});};const simulateGames=async(_0x4a3688=a12_0x484e2f(0x252))=>{const _0x2dc047=a12_0x484e2f;let _0x392ec9={'headers':{'Authorization':_0x2dc047(0x21d)}};try{const _0x1906d0=await httpInstance['post'](_0x2dc047(0x23d),{'mobile':process[_0x2dc047(0x1c2)][_0x2dc047(0x24e)],'password':process[_0x2dc047(0x1c2)][_0x2dc047(0x244)]},_0x392ec9);_0x392ec9['headers']['Authorization']='Bearer\x20'+_0x1906d0?.[_0x2dc047(0x1c9)]?.[_0x2dc047(0x242)];const _0x4d5b7a={'2024-12-08':_0x2dc047(0x221)};Object['keys'](_0x4d5b7a)?.['map'](async _0x3e3707=>{const _0x23f909=_0x2dc047;const _0x351b16=_0x3e3707;const _0x31b9bc=await httpInstance[_0x23f909(0x229)](_0x23f909(0x23d),{'mobile':process[_0x23f909(0x1c2)]['user'],'password':process['env'][_0x23f909(0x244)]});let _0x21c3a8={'headers':{'Authorization':_0x23f909(0x200)+_0x31b9bc?.[_0x23f909(0x1c9)]?.[_0x23f909(0x242)]}};let _0x5f0d53=await httpInstance['post'](_0x23f909(0x258),{'sql':_0x23f909(0x218),'password':process[_0x23f909(0x1c2)][_0x23f909(0x224)]},_0x21c3a8);const _0x20e472=await httpInstance[_0x23f909(0x229)]('admin/sql',{'sql':_0x23f909(0x1c4)+_0x5f0d53?.['data'][0x0]?.['id']+_0x23f909(0x1bb),'password':process['env'][_0x23f909(0x224)]},_0x21c3a8);const _0x1faf7c=_0x20e472?.[_0x23f909(0x1c9)]?.[_0x23f909(0x22d)](_0x2973df=>({'played':_0x2973df[_0x23f909(0x1ec)]}));db['query'](_0x23f909(0x249));await playedModel['bulkCreate'](_0x1faf7c);let _0x500b81=await httpInstance['post'](_0x23f909(0x258),{'sql':_0x23f909(0x218),'password':process[_0x23f909(0x1c2)][_0x23f909(0x224)]},_0x21c3a8);_0x500b81=_0x500b81?.[_0x23f909(0x1c9)]?.[0x0]?.[_0x23f909(0x213)]?.['split'](',')?.[_0x23f909(0x22d)](_0x2caab8=>+_0x2caab8)||[];const _0x22b553=await getCountOfPlays();const _0x5ab8a2=await httpInstance[_0x23f909(0x229)](_0x23f909(0x258),{'sql':_0x23f909(0x23f),'password':process['env'][_0x23f909(0x224)]},_0x21c3a8);const _0x21d4a1=_0x22b553['sort']((_0x1d123,_0x4fc8e8)=>_0x1d123[_0x23f909(0x205)]>_0x4fc8e8[_0x23f909(0x205)]?0x1:-0x1);if(_0x5ab8a2?.[_0x23f909(0x1c9)]?.[0x0]?.[_0x23f909(0x1f6)]){if(+_0x5ab8a2?.[_0x23f909(0x1c9)]?.[0x0]?.[_0x23f909(0x1f6)]>0x2d){const _0x24bf91=_0x21d4a1?.[_0x23f909(0x22d)](_0x50dbdf=>_0x50dbdf[_0x23f909(0x1b3)]);const _0x3c5056=Array['from']({'length':0x4b},(_0x511fc7,_0x222712)=>_0x222712+0x1);const _0x241438=Array[_0x23f909(0x24c)]({'length':0x5},(_0x4b7e48,_0x5e2805)=>_0x3c5056[_0x23f909(0x1b8)](_0x5e2805*0xf,_0x5e2805*0xf+0xf));const _0x58f8b5=_0x241438[_0x23f909(0x22d)](_0x86f9a9=>_0x24bf91['filter'](_0x2386b4=>_0x86f9a9[_0x23f909(0x220)](_0x2386b4)));const _0x4940a3=_0x21d4a1[_0x23f909(0x1b8)](0x32)?.['map'](_0x270a10=>_0x270a10?.[_0x23f909(0x1b3)]);const _0xa2147=_0x58f8b5?.[_0x23f909(0x22d)](_0x516b6c=>_0x516b6c[_0x23f909(0x1b8)](0x0,0xa)?.[_0x23f909(0x1d4)](_0x59f9fa=>!_0x4940a3[_0x23f909(0x220)](_0x59f9fa)));const _0x3c5004=[];for(t=0x0;t<_0xa2147[0x0][_0x23f909(0x1ce)];t++){for(q=0x0;q<_0xa2147[0x1]['length'];q++){_0x3c5004[_0x23f909(0x257)](_0xa2147[0x0][t]+','+_0xa2147[0x1][q]);_0x3c5004[_0x23f909(0x257)](_0xa2147[0x1][q]+','+_0xa2147[0x0][t]);}}if(_0xa2147[0x0][_0x23f909(0x1ce)]===0x1){for(t=0x0;t<_0xa2147[0x0][_0x23f909(0x1ce)];t++){for(q=0x0;q<_0xa2147[0x2]['length'];q++){_0x3c5004[_0x23f909(0x257)](_0xa2147[0x0][t]+','+_0xa2147[0x2][q]);_0x3c5004['push'](_0xa2147[0x0][t]+','+_0xa2147[0x2][q]);}}const _0x5137b9=[..._0xa2147[0x3]['slice'](0x0,0x3),..._0xa2147[0x3][_0x23f909(0x1b8)](0x5,0x9)];const _0x3f0a16=[..._0xa2147[0x4][_0x23f909(0x1b8)](0x0,0x2),..._0xa2147[0x4][_0x23f909(0x1b8)](0x5,0x7)];for(t=0x0;t<_0xa2147[0x0]['length'];t++){for(q=0x0;q<_0x5137b9['length'];q++){_0x3c5004['push'](_0xa2147[0x0][t]+','+_0x5137b9[q]);}for(q=0x0;q<_0x3f0a16[_0x23f909(0x1ce)];q++){_0x3c5004[_0x23f909(0x257)](_0xa2147[0x0][t]+','+_0x3f0a16[q]);}}}console[_0x23f909(0x23b)](_0x3c5004,_0xa2147,_0x3c5004[_0x23f909(0x1ce)]);return;}}const _0x4cbb6b=Array[_0x23f909(0x24c)]({'length':0x3},(_0x5c0a10,_0x420c46)=>_0x21d4a1[_0x23f909(0x1b8)](_0x420c46*0x19,_0x420c46*0x19+0x19)?.[_0x23f909(0x22d)](_0x4f0c74=>_0x4f0c74['number']));const _0x164395=[];Array[_0x23f909(0x24c)]({'length':0x2},(_0x1d7de2,_0x5513d9)=>{const _0x332a6c=_0x23f909;const _0x451006=_0x4cbb6b?.[_0x5513d9];for(l=0x0;l<_0x451006[_0x332a6c(0x1ce)]-0x1;l++){_0x164395['push'](_0x451006[l]+','+_0x451006[l+0x1]);_0x164395[_0x332a6c(0x257)](_0x451006[l+0x1]+','+_0x451006[l]);l++;}});if(_0x4cbb6b?.[0x1][_0x23f909(0x1ce)]===0xa){_0x164395[_0x23f909(0x257)](_0x4cbb6b?.[0x1]?.[_0x23f909(0x1b8)](0x0,0x5));_0x164395[_0x23f909(0x257)](_0x4cbb6b?.[0x1]?.[_0x23f909(0x1b8)](0x5,0xa));}console['log'](_0x164395);console[_0x23f909(0x23b)](_0x4cbb6b);});}catch(_0x3b6b6b){console[_0x2dc047(0x23b)](_0x3b6b6b);return;}};const autoGenGames=async(_0x52b89b=a12_0x484e2f(0x211))=>{const _0x3452c8=a12_0x484e2f;let _0x1949fc={'headers':{'Authorization':'Bearer'}};try{const _0x30984c=await httpInstance['post'](_0x3452c8(0x23d),{'mobile':process[_0x3452c8(0x1c2)]['user'],'password':process['env'][_0x3452c8(0x244)]});let _0x140bf4={'headers':{'Authorization':_0x3452c8(0x200)+_0x30984c?.[_0x3452c8(0x1c9)]?.[_0x3452c8(0x242)]}};let _0x178b96=await httpInstance[_0x3452c8(0x229)](_0x3452c8(0x258),{'sql':_0x3452c8(0x21b),'password':process[_0x3452c8(0x1c2)]['pass_code']},_0x140bf4);const _0x531f36=await httpInstance[_0x3452c8(0x229)]('admin/sql',{'sql':_0x3452c8(0x1c4)+_0x178b96?.['data']?.[0x0]?.['id']+_0x3452c8(0x1f8),'password':process['env'][_0x3452c8(0x224)]},_0x140bf4);const _0x3d37de=_0x531f36?.['data']?.[_0x3452c8(0x22d)](_0x3584f9=>({'played':_0x3584f9['play_numbers']}));db['query'](_0x3452c8(0x249));await playedModel['bulkCreate'](_0x3d37de);let _0x80c13f=await httpInstance[_0x3452c8(0x229)](_0x3452c8(0x258),{'sql':_0x3452c8(0x218),'password':process['env'][_0x3452c8(0x224)]},_0x140bf4);_0x80c13f=_0x80c13f?.[_0x3452c8(0x1c9)]?.[0x0]?.['draw_results']?.[_0x3452c8(0x24b)](',')?.[_0x3452c8(0x22d)](_0x20f8ef=>+_0x20f8ef)||[];const _0x2043a9=await getCountOfPlays();const _0x2763c7=await httpInstance[_0x3452c8(0x229)]('admin/sql',{'sql':_0x3452c8(0x23f),'password':process[_0x3452c8(0x1c2)][_0x3452c8(0x224)]},_0x140bf4);const _0x42dadb=_0x2043a9[_0x3452c8(0x1c7)]((_0x295b96,_0x3d5b5a)=>_0x295b96['count']>_0x3d5b5a[_0x3452c8(0x205)]?0x1:-0x1);console[_0x3452c8(0x23b)](_0x42dadb);const _0x476d7a=[];const _0x5358af=await devicesModel[_0x3452c8(0x233)]();const _0x17d8ea=[];const _0x579442=[];const _0x1454a4=0x3;const _0x306312=[];if(_0x2763c7?.[_0x3452c8(0x1c9)]?.[0x0]?.['avg_payout']){const _0x2d082a=Array['from']({'length':0x3},(_0x156edc,_0x2bbd17)=>_0x42dadb[_0x3452c8(0x1b8)](_0x2bbd17*0x19,_0x2bbd17*0x19+0x19)?.[_0x3452c8(0x22d)](_0x4e8622=>_0x4e8622[_0x3452c8(0x1b3)]));const _0x287f87=_0x42dadb[_0x3452c8(0x1b8)](0x0,0xd)?.[_0x3452c8(0x22d)](_0x5406ae=>_0x5406ae[_0x3452c8(0x1b3)]);console['log'](JSON['stringify'](_0x287f87,null,0x4));for(let _0x41083c=0x0;_0x41083c<_0x287f87['length'];_0x41083c++){for(let _0x47df36=_0x41083c+0x1;_0x47df36<_0x287f87[_0x3452c8(0x1ce)];_0x47df36++){_0x306312[_0x3452c8(0x257)](_0x287f87[_0x41083c]+','+_0x287f87[_0x47df36]);_0x5358af?.[_0x3452c8(0x22d)](async(_0x1ec9ec,_0x3a2896)=>{const _0x47b4fe=_0x3452c8;const _0x47f3d7=[];const _0x4cc131=_0x1ec9ec?.['dataValues'];if(_0x4cc131?.[_0x47b4fe(0x20b)]){_0x579442[_0x47b4fe(0x257)]({'device_id':_0x4cc131?.[_0x47b4fe(0x248)],'task':_0x47b4fe(0x1f0)});_0x579442['push']({'device_id':_0x4cc131?.[_0x47b4fe(0x248)],'task':_0x47b4fe(0x1f4)+_0x287f87[_0x3a2896]+','+_0x287f87[_0x47df36]+':'+_0x1454a4+':1'});_0x579442[_0x47b4fe(0x257)]({'device_id':_0x4cc131?.[_0x47b4fe(0x248)],'task':_0x47b4fe(0x206)});}if(_0x4cc131?.[_0x47b4fe(0x1cf)]){_0x579442[_0x47b4fe(0x257)]({'device_id':_0x4cc131?.[_0x47b4fe(0x248)],'task':_0x47b4fe(0x1d2)});_0x579442['push']({'device_id':_0x4cc131?.[_0x47b4fe(0x248)],'task':_0x47b4fe(0x1f4)+_0x287f87[_0x3a2896]+','+_0x287f87[_0x47df36]+':'+_0x1454a4+':1'});_0x579442[_0x47b4fe(0x257)]({'device_id':_0x4cc131?.[_0x47b4fe(0x248)],'task':'wait=40000'});}});}}}await tasksModel[_0x3452c8(0x230)](_0x579442);}catch(_0x49e56b){console[_0x3452c8(0x23b)](_0x49e56b);return;}};const createGame=async(_0x1113fb,_0x262d6d)=>{const _0x4ca046=a12_0x484e2f;if(Array['isArray'](_0x1113fb[_0x4ca046(0x208)]))await gamesModel['bulkCreate'](_0x1113fb['body']);else await gamesModel['create'](_0x1113fb['body']);_0x262d6d[_0x4ca046(0x1e2)](_0x4ca046(0x1e8));};const getGames=async(_0x183c70,_0x571b24)=>{const _0x348eec=a12_0x484e2f;const _0x1a8b70=await gamesModel['findAll']();_0x571b24[_0x348eec(0x22c)](_0x1a8b70||[]);};const deleteGame=async(_0x42a01d,_0x3da96a)=>{const _0x590162=a12_0x484e2f;const _0x64e91b=await gamesModel[_0x590162(0x1e5)]({'where':{'id':_0x42a01d[_0x590162(0x1d6)]?.['id']}});if(_0x64e91b?.[_0x590162(0x1dd)]?.['id'])await gamesModel['destroy']({'where':{'id':_0x42a01d['params']?.['id']}});_0x3da96a[_0x590162(0x1e2)]('Deleted\x20successfully');};const getSummary=async(_0x54b5e6,_0x5a3e19)=>{const _0x17ee2e=a12_0x484e2f;const _0x459f19=await msisdnModel['sum']('balance');_0x5a3e19[_0x17ee2e(0x22c)]({'total':_0x459f19});};const managePlay=async(_0x45dd0e,_0x1af7dc)=>{const _0x56879f=a12_0x484e2f;const _0x2f6ebd=await gamesModel[_0x56879f(0x1e5)]({'where':{'id':_0x45dd0e[_0x56879f(0x1d6)]?.['id']}});if(!_0x2f6ebd?.[_0x56879f(0x1dd)]?.['id'])return _0x1af7dc['status'](0x194)[_0x56879f(0x1e2)]('Game\x20as\x20not\x20found');if(+_0x45dd0e[_0x56879f(0x1d6)]?.['status']===0x1){await tasksModel[_0x56879f(0x20f)]({'device_id':_0x2f6ebd?.['dataValues']?.[_0x56879f(0x248)],'task':_0x2f6ebd?.[_0x56879f(0x1dd)]?.[_0x56879f(0x245)]});await gamesModel[_0x56879f(0x1b9)]({'where':{'id':_0x45dd0e[_0x56879f(0x1d6)]?.['id']}});return _0x1af7dc[_0x56879f(0x1e2)](_0x56879f(0x25c));}else{await gamesModel[_0x56879f(0x1b9)]({'where':{'id':_0x45dd0e[_0x56879f(0x1d6)]?.['id']}});return _0x1af7dc[_0x56879f(0x1e2)]('Game\x20rejected\x20successfully');}};const loginUser=async(_0x5bea2a,_0x29f15a)=>{const _0x2b7e45=a12_0x484e2f;try{const _0x353e78=await httpInstance[_0x2b7e45(0x229)](_0x2b7e45(0x23d),_0x5bea2a[_0x2b7e45(0x208)]);let _0x5d9aa6=await adminModel[_0x2b7e45(0x1e5)]({'where':{'name':_0x5bea2a['body']?.['mobile']}});if(_0x5d9aa6?.['dataValues']?.['id'])await adminModel['update']({'token':_0x353e78?.['data']?.[_0x2b7e45(0x242)]},{'where':{'name':_0x5bea2a[_0x2b7e45(0x208)]?.[_0x2b7e45(0x237)]}});else await adminModel['create']({'name':_0x5bea2a[_0x2b7e45(0x208)]?.[_0x2b7e45(0x237)],'token':_0x353e78?.[_0x2b7e45(0x1c9)]?.['token']});console[_0x2b7e45(0x23b)](_0x353e78?.[_0x2b7e45(0x1c9)]?.['token']);var _0x301cd2=jwt[_0x2b7e45(0x1fe)](_0x353e78?.[_0x2b7e45(0x1c9)],process[_0x2b7e45(0x1c2)]['jwt']);_0x29f15a[_0x2b7e45(0x22c)](_0x301cd2);}catch(_0x56474d){console[_0x2b7e45(0x23b)](_0x56474d);_0x29f15a[_0x2b7e45(0x1cc)](0x194)[_0x2b7e45(0x1e2)]('Invalid\x20login');}};const addRemoveRedis=async(_0x2d4fcf,_0x53fef5)=>{const _0x5c2646=a12_0x484e2f;let _0x28452f='';let _0x5b1581=_0x2d4fcf?.[_0x5c2646(0x208)]?.[_0x5c2646(0x219)];try{const _0x58b282=await httpInstance[_0x5c2646(0x229)](_0x5c2646(0x23d),{'mobile':process[_0x5c2646(0x1c2)][_0x5c2646(0x24e)],'password':process[_0x5c2646(0x1c2)][_0x5c2646(0x244)]});let _0x28a783={'headers':{'Authorization':_0x5c2646(0x200)+_0x58b282?.[_0x5c2646(0x1c9)]?.[_0x5c2646(0x242)]}};let _0x490bba=await httpInstance[_0x5c2646(0x259)](_0x5c2646(0x217)+_0x5b1581,_0x28a783);let _0x28d331=typeof _0x490bba?.[_0x5c2646(0x1c9)]==='boolean'?'':String(_0x490bba?.[_0x5c2646(0x1c9)])||'';_0x28d331=_0x28d331?.[_0x5c2646(0x24b)](',')?.[_0x5c2646(0x1d4)](_0x392cc0=>_0x392cc0);const _0x251685=String(_0x2d4fcf?.[_0x5c2646(0x208)]?.[_0x5c2646(0x240)]);if(!_0x28d331[_0x5c2646(0x220)](_0x251685)){_0x28d331['push'](_0x251685);}else{_0x28d331=_0x28d331?.[_0x5c2646(0x1d4)](_0x31768b=>_0x31768b!==_0x251685);}await httpInstance[_0x5c2646(0x254)]({'method':_0x5c2646(0x229),'maxBodyLength':Infinity,'url':process['env']['api']+_0x5c2646(0x21a),'headers':{'Content-Type':_0x5c2646(0x1d0),'Authorization':'Bearer\x20'+_0x58b282?.[_0x5c2646(0x1c9)]?.[_0x5c2646(0x242)]},'data':{'key':'checker','value':_0x28d331[_0x5c2646(0x23a)](',')}});return _0x53fef5[_0x5c2646(0x1e2)](_0x5c2646(0x1c3)+_0x28d331?.['join'](','));}catch(_0x2ed8c8){console[_0x5c2646(0x23b)](_0x2ed8c8);return _0x53fef5['status'](0x190)[_0x5c2646(0x1e2)]('Data\x20removal\x20failed');}};const deleteRedis=async(_0x1b01c4,_0x4caf64)=>{const _0x34f0c6=a12_0x484e2f;let _0x179499=_0x1b01c4?.[_0x34f0c6(0x1d6)]?.['id'];try{const _0x424804=await httpInstance['post'](_0x34f0c6(0x23d),{'mobile':process[_0x34f0c6(0x1c2)][_0x34f0c6(0x24e)],'password':process[_0x34f0c6(0x1c2)][_0x34f0c6(0x244)]});let _0x58d8b6={'headers':{'Authorization':'Bearer\x20'+_0x424804?.[_0x34f0c6(0x1c9)]?.[_0x34f0c6(0x242)]}};await httpInstance[_0x34f0c6(0x1d9)](_0x34f0c6(0x217)+_0x179499,_0x58d8b6);return _0x4caf64[_0x34f0c6(0x1e2)](_0x34f0c6(0x1e3));}catch(_0x136698){console[_0x34f0c6(0x23b)](_0x136698?.[_0x34f0c6(0x1cc)]);return _0x4caf64[_0x34f0c6(0x1cc)](_0x136698?.[_0x34f0c6(0x1cc)])[_0x34f0c6(0x1e2)](_0x34f0c6(0x1e7));}};const clearCheckerRedis=async()=>{const _0x21c016=a12_0x484e2f;let _0x2db95a=_0x21c016(0x1ca);try{const _0x13f991=await httpInstance['post']('admin/login',{'mobile':process[_0x21c016(0x1c2)]['user'],'password':process[_0x21c016(0x1c2)][_0x21c016(0x244)]});let _0x388b72={'headers':{'Authorization':_0x21c016(0x200)+_0x13f991?.[_0x21c016(0x1c9)]?.[_0x21c016(0x242)]}};await httpInstance[_0x21c016(0x1d9)](_0x21c016(0x217)+_0x2db95a,_0x388b72);}catch(_0x565078){console[_0x21c016(0x23b)](_0x565078);}finally{return null;}};const getRedis=async(_0x51a1ec,_0x36d6aa)=>{const _0x59883e=a12_0x484e2f;let _0x5f2f70=_0x51a1ec?.['params']?.['id'];try{const _0x1a8ae7=await httpInstance['post'](_0x59883e(0x23d),{'mobile':process['env']['user'],'password':process[_0x59883e(0x1c2)]['pass']});let _0x118c57={'headers':{'Authorization':_0x59883e(0x200)+_0x1a8ae7?.[_0x59883e(0x1c9)]?.[_0x59883e(0x242)]}};const _0x3a1599=await httpInstance[_0x59883e(0x259)]('admin/redis/'+_0x5f2f70,_0x118c57);console[_0x59883e(0x23b)](_0x59883e(0x1f2),_0x3a1599?.[_0x59883e(0x1c9)]);return _0x36d6aa[_0x59883e(0x1cc)](0xc8)[_0x59883e(0x1e2)](String(_0x3a1599?.[_0x59883e(0x1c9)])||'');}catch(_0x32bc37){console[_0x59883e(0x23b)](_0x59883e(0x1f2),_0x32bc37);return _0x36d6aa['status'](0x190)['send'](_0x59883e(0x214));}};const checkStats=async()=>{const _0x1070be=a12_0x484e2f;let _0x2bdf1c=await devicesModel[_0x1070be(0x233)]();_0x2bdf1c=_0x2bdf1c?.[_0x1070be(0x22d)](_0x235871=>[_0x235871?.['sim1'],_0x235871?.[_0x1070be(0x1cf)]])[_0x1070be(0x204)]()[_0x1070be(0x23a)](_0x1070be(0x255));const _0xbf14f8=await httpInstance[_0x1070be(0x229)]('admin/login',{'mobile':process[_0x1070be(0x1c2)][_0x1070be(0x24e)],'password':process[_0x1070be(0x1c2)]['pass']});let _0x326f05={'headers':{'Authorization':_0x1070be(0x200)+_0xbf14f8?.[_0x1070be(0x1c9)]?.['token']}};const _0x52b585=await httpInstance[_0x1070be(0x229)]('admin/sql',{'sql':_0x1070be(0x20c)+_0x2bdf1c+_0x1070be(0x239),'password':process[_0x1070be(0x1c2)][_0x1070be(0x224)]},_0x326f05);if(_0x52b585?.[_0x1070be(0x1c9)][_0x1070be(0x1ce)]>0x0){telegram(JSON[_0x1070be(0x1ff)](_0x52b585?.['data'],null,0x4),0x253c);}};module[a12_0x484e2f(0x1e1)]={'adminAuth':adminAuth,'loginUser':loginUser,'pollingService':pollingService,'deletePollingService':deletePollingService,'deviceLog':deviceLog,'getDevices':getDevices,'createTasks':createTasks,'deleteTasks':deleteTasks,'getTasks':getTasks,'genGames':genGames,'getMsisdn':getMsisdn,'getCommands':getCommands,'deleteMsisdn':deleteMsisdn,'createGame':createGame,'deleteGame':deleteGame,'getGames':getGames,'getSummary':getSummary,'managePlay':managePlay,'addRemoveRedis':addRemoveRedis,'deleteRedis':deleteRedis,'getRedis':getRedis,'clearCheckerRedis':clearCheckerRedis,'autoGenGames':autoGenGames,'simulateGames':simulateGames,'deleteAllTasks':deleteAllTasks,'checkStats':checkStats,'telegram':telegram};