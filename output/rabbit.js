const a10_0x603afd=a10_0x4c67;(function(_0x29463e,_0x4c45dd){const _0x2bd34e=a10_0x4c67;const _0x2ea8fa=_0x29463e();while(!![]){try{const _0xfd4fe5=-parseInt(_0x2bd34e(0x1b8))/0x1+parseInt(_0x2bd34e(0x1e0))/0x2+parseInt(_0x2bd34e(0x1c0))/0x3*(-parseInt(_0x2bd34e(0x1b5))/0x4)+parseInt(_0x2bd34e(0x1b0))/0x5+-parseInt(_0x2bd34e(0x1cf))/0x6*(-parseInt(_0x2bd34e(0x1d6))/0x7)+parseInt(_0x2bd34e(0x1d4))/0x8+parseInt(_0x2bd34e(0x1b9))/0x9*(-parseInt(_0x2bd34e(0x1d2))/0xa);if(_0xfd4fe5===_0x4c45dd){break;}else{_0x2ea8fa['push'](_0x2ea8fa['shift']());}}catch(_0x17573f){_0x2ea8fa['push'](_0x2ea8fa['shift']());}}}(a10_0x845f,0x8e831));require(a10_0x603afd(0x1c4))['config']();const amqp=require('amqplib');const {default:axios}=require(a10_0x603afd(0x1be));let channel=null;const queue=a10_0x603afd(0x1ae);const tgqueue=a10_0x603afd(0x1db);function a10_0x845f(){const _0x363024=['connectRabbitMQ','dotenv','toString','5927584357','data','inboundResponse','VODAFONE','assertQueue','null','2161392607','create','233208444900','6AYmUod','post','sendToQueue','2810uzPqMw','mobile','7774408FbuMRS','api','5620314PNEdZR','includes','ack','random','content','tg_task_queue','ussdString','telecel','msisdn','from','578738HESTUS','MTN','sendToTG','user/ussd/ticket/','Played\x20:','\x20-\x20','233531644806','ghs','task_queue','📩\x20Received:\x20','4683035zscvvt','join','log','createChannel','*766#','8DcXpTw','rabbit','Vodafone','729189lZHJPV','29943migvTl','network','consume','msIsdn','vodafone','axios','ussdMenu','1129311KSvqpV','map','766'];a10_0x845f=function(){return _0x363024;};return a10_0x845f();}module['exports'][a10_0x603afd(0x1c3)]=async()=>{const _0x2c4ab8=a10_0x603afd;try{const _0x37b5aa=await amqp['connect'](process['env'][_0x2c4ab8(0x1b6)]);channel=await _0x37b5aa[_0x2c4ab8(0x1b3)]();await channel[_0x2c4ab8(0x1ca)](queue,{'durable':!![]});channel[_0x2c4ab8(0x1bb)](queue,_0x3dab3c=>{const _0x27a552=_0x2c4ab8;if(_0x3dab3c!==null){console[_0x27a552(0x1b2)](_0x27a552(0x1af)+_0x3dab3c[_0x27a552(0x1da)]['toString']());channel['ack'](_0x3dab3c);}});await channel[_0x2c4ab8(0x1ca)](tgqueue,{'durable':!![]});channel[_0x2c4ab8(0x1bb)](tgqueue,_0x555db1=>{const _0x18f896=_0x2c4ab8;if(_0x555db1!==null){console[_0x18f896(0x1b2)]('📩\x20Received:\x20'+_0x555db1[_0x18f896(0x1da)][_0x18f896(0x1c5)]());channel[_0x18f896(0x1d8)](_0x555db1);}});}catch(_0x2d4a12){console['error']('❌\x20Error\x20connecting\x20to\x20RabbitMQ:',_0x2d4a12);}};module['exports']['sendTopQueue']=async _0x338b84=>{const _0x4efa76=a10_0x603afd;if(channel)channel[_0x4efa76(0x1d1)](queue,Buffer[_0x4efa76(0x1df)](_0x338b84),{'persistent':!![]});};module['exports'][a10_0x603afd(0x1e2)]=async _0x31f4b8=>{const _0xfebb4e=a10_0x603afd;if(channel)channel['sendToQueue'](tgqueue,Buffer[_0xfebb4e(0x1df)](_0x31f4b8),{'persistent':!![]});};function a10_0x4c67(_0x40a3c7,_0x38bf7c){const _0x845f3e=a10_0x845f();a10_0x4c67=function(_0x4c6778,_0x3de897){_0x4c6778=_0x4c6778-0x1ad;let _0x53e623=_0x845f3e[_0x4c6778];return _0x53e623;};return a10_0x4c67(_0x40a3c7,_0x38bf7c);}const httpAxios=axios[a10_0x603afd(0x1cd)]({'baseURL':process['env'][a10_0x603afd(0x1d5)]});const randomGen=(_0x4225db,_0x24545e)=>Math['floor'](Math[a10_0x603afd(0x1d9)]()*(_0x4225db-_0x24545e+0x1))+_0x24545e;const sessionGen=()=>Array[a10_0x603afd(0x1df)]({'length':0x3})[a10_0x603afd(0x1c1)](_0x2d841a=>randomGen(0x3e8,0x270f))[a10_0x603afd(0x1b1)]('');const ussd={'shortCode':'766','msIsdn':a10_0x603afd(0x1e6),'text':'*766#','imsi':'','optional':'','ussdGwId':a10_0x603afd(0x1b7),'language':a10_0x603afd(0x1cb),'sessId':a10_0x603afd(0x1cc),'network':a10_0x603afd(0x1e1),'messageType':0x1,'sessionId':a10_0x603afd(0x1cc),'msisdn':a10_0x603afd(0x1e6),'ussdString':a10_0x603afd(0x1b4),'serviceCode':''};const vf={'shortCode':a10_0x603afd(0x1c2),'msIsdn':a10_0x603afd(0x1ce),'text':'*766#','imsi':'','optional':'','ussdGwId':'Vodafone','language':a10_0x603afd(0x1cb),'sessId':a10_0x603afd(0x1c6)};const gamePlay=async(_0x3fc0e3,_0x1544de,_0x8254df,_0x4438f4)=>{const _0x2fa951=a10_0x603afd;try{let _0x1c9976=ussd;if([_0x2fa951(0x1c9),_0x2fa951(0x1dd)][_0x2fa951(0x1d7)](_0x3fc0e3?.[_0x2fa951(0x1ba)])){_0x1c9976=vf;_0x1c9976[_0x2fa951(0x1bc)]=_0x3fc0e3?.[_0x2fa951(0x1d3)];_0x1c9976['sessId']=sessionGen();}else{_0x1c9976[_0x2fa951(0x1de)]=_0x3fc0e3?.[_0x2fa951(0x1d3)];_0x1c9976[_0x2fa951(0x1bc)]=_0x3fc0e3?.[_0x2fa951(0x1d3)];_0x1c9976['sessionId']=sessionGen();}const _0x15cc82=await httpAxios[_0x2fa951(0x1d0)](_0x2fa951(0x1e3)+(_0x3fc0e3?.['network']===_0x2fa951(0x1e1)?'':_0x2fa951(0x1bd)),_0x1c9976);let _0x24e5b0=_0x15cc82?.[_0x2fa951(0x1c7)]?.[_0x2fa951(0x1c7)]?.[_0x2fa951(0x1c8)]||_0x15cc82?.[_0x2fa951(0x1c7)]?.['ussdMenu'];let _0x20026b=0x0;let _0x5b8806='1';while(_0x20026b<0x5){if(_0x20026b===0x1)_0x5b8806=_0x4438f4;else if(_0x20026b===0x2)_0x5b8806=_0x1544de;else if(_0x20026b===0x3)_0x5b8806=_0x8254df;else if(_0x20026b===0x4)_0x5b8806=0x1;_0x1c9976[_0x3fc0e3?.[_0x2fa951(0x1ba)]===_0x2fa951(0x1e1)?_0x2fa951(0x1dc):'text']=_0x5b8806;const _0x11e891=await httpAxios['post'](_0x2fa951(0x1e3)+(_0x3fc0e3?.[_0x2fa951(0x1ba)]===_0x2fa951(0x1e1)?'':_0x2fa951(0x1bd)),_0x1c9976);let _0x5b951a=_0x11e891?.[_0x2fa951(0x1c7)]?.['data']?.['inboundResponse']||_0x11e891?.[_0x2fa951(0x1c7)]?.[_0x2fa951(0x1bf)];console['log'](_0x5b951a,_0x20026b);_0x20026b++;sleep(0x2710);}console[_0x2fa951(0x1b2)](_0x2fa951(0x1e4)+_0x1544de+_0x2fa951(0x1e5)+_0x8254df+_0x2fa951(0x1ad));sleep(0x4e20);}catch(_0x5c43ee){console[_0x2fa951(0x1b2)](_0x5c43ee);}};