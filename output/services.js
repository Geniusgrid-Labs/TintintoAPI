const a9_0x512ff9=a9_0x18c7;(function(_0x12a754,_0x3c166f){const _0x3a0d9f=a9_0x18c7;const _0x7b8ea1=_0x12a754();while(!![]){try{const _0x5884c0=-parseInt(_0x3a0d9f(0x1c7))/0x1+-parseInt(_0x3a0d9f(0x1fc))/0x2+-parseInt(_0x3a0d9f(0x1b6))/0x3*(-parseInt(_0x3a0d9f(0x1cb))/0x4)+parseInt(_0x3a0d9f(0x1c4))/0x5+parseInt(_0x3a0d9f(0x1d3))/0x6*(-parseInt(_0x3a0d9f(0x1d4))/0x7)+parseInt(_0x3a0d9f(0x207))/0x8+-parseInt(_0x3a0d9f(0x1f5))/0x9;if(_0x5884c0===_0x3c166f){break;}else{_0x7b8ea1['push'](_0x7b8ea1['shift']());}}catch(_0xbb9df2){_0x7b8ea1['push'](_0x7b8ea1['shift']());}}}(a9_0x5927,0xc2d0c));const tasksModel=require('./models/tasks');const devicesModel=require('./models/devices');const {numberCheck,balanceCheck}=require(a9_0x512ff9(0x1d6));const msisdnModel=require(a9_0x512ff9(0x1bc));const commandListModel=require(a9_0x512ff9(0x1f4));const gamesModel=require('./models/games');const {default:axios}=require(a9_0x512ff9(0x1e2));function a9_0x5927(){const _0x3b669e=['key','slot0','mobile0','mobile1','floor','request','log','ATMoney','GHS','1389','fill','verify','join','./models/admin','VODAFONE','Deleted\x20successfully','./models/commandList','5253543tvwNPk','update','push','length','Data\x20updated\x20:\x20','admin/login','match','2074704vHvzFt','wait=3000','findOne','wrong\x20pin','value','exports','your\x20phone\x20number\x20is','map','Data\x20removed\x20successfully','sign','jwt','9242072FcZnza','Recieved::','toLowerCase','null','query','balance\x20is','bulkCreate','boolean','application/json','random','TIGO','Created\x20successfully','setsim=','send','params','slice','Confirmed.GHS','Your\x20mobile\x20number\x20is','device_id','undefined','play','simslot','includes','writeData=','Done','jsonwebtoken','Bearer\x20','findAll','dataValues','MTN','sender','paid\x20to','isArray','create','Data\x20removal\x20failed','vodafone','You\x20do\x20not\x20have\x20enough\x20money\x20in\x20your','.txt:','3RLaerU','replace','device_name','get','admin/redis/','api','./models/msisdn','env','status','post','authorization','Invalid\x20login','games','headers','5084485SgHSup','action','stake','391660fUUaqI','SMS','body','Data\x20fetching\x20failed','6322168HlBFtp','your\x20number\x20is','json','filter','user','233','Game\x20as\x20not\x20found','Access\x20denied.','1130394IUjiKq','35rMhhhG','split','./utils/helper','checker','mobile','slot','Your\x20E-levy\x20charge','destroy','delete','data','telecel','token','count','your\x20current\x20ATMoney\x20balance','axios','_slot'];a9_0x5927=function(){return _0x3b669e;};return a9_0x5927();}const adminModel=require(a9_0x512ff9(0x1f1));const jwt=require(a9_0x512ff9(0x1a9));const httpInstance=axios[a9_0x512ff9(0x1b1)]({'baseURL':process[a9_0x512ff9(0x1bd)][a9_0x512ff9(0x1bb)]});const adminAuth=(_0x398ca5,_0x5ce646,_0x52d9b6)=>{const _0x16e844=a9_0x512ff9;if(!_0x398ca5[_0x16e844(0x1c3)]['authorization'])return _0x5ce646[_0x16e844(0x1be)](0x191)[_0x16e844(0x19d)](_0x16e844(0x1d2));const _0x2c7f9c=_0x398ca5[_0x16e844(0x1c3)][_0x16e844(0x1c0)];const _0x1024dc=_0x2c7f9c&&_0x2c7f9c[_0x16e844(0x1d5)]('\x20')[0x1];jwt[_0x16e844(0x1ef)](_0x1024dc,process[_0x16e844(0x1bd)][_0x16e844(0x206)],async(_0x125e33,_0xbded59)=>{const _0x3b0cf0=_0x16e844;if(_0x125e33)return _0x5ce646['status'](0x191)[_0x3b0cf0(0x19d)]('Access\x20denied.');_0x398ca5[_0x3b0cf0(0x1cf)]=_0xbded59;_0x52d9b6();});};const pollingService=async(_0x2b9c8d,_0x495b84,_0x1b586b)=>{const _0x808806=a9_0x512ff9;const _0x220f1f=await tasksModel[_0x808806(0x1fe)]({'where':{'device_id':_0x2b9c8d?.[_0x808806(0x19e)]?.['id']||''}});_0x495b84[_0x808806(0x1cd)](_0x220f1f?.[_0x808806(0x1ac)]||{});};const deletePollingService=async(_0x2cf501,_0x502de0,_0x23e92c)=>{const _0x2dad9d=a9_0x512ff9;const _0x548c79=await tasksModel[_0x2dad9d(0x1db)]({'where':{'id':_0x2cf501?.[_0x2dad9d(0x19e)]?.['id']||''}});_0x502de0['status'](0xcc)[_0x2dad9d(0x19d)](_0x2dad9d(0x1a8));};const deviceLog=async(_0x54db1f,_0x22c9a5,_0xacb428)=>{const _0x1b07be=a9_0x512ff9;console[_0x1b07be(0x1ea)](_0x1b07be(0x208),_0x54db1f[_0x1b07be(0x20b)],_0x54db1f[_0x1b07be(0x19e)],_0x54db1f[_0x1b07be(0x1c9)]);const _0x22632d=await devicesModel[_0x1b07be(0x1fe)]({'where':{'device_id':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a2)]}});if(_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1dd)]?.[_0x1b07be(0x209)]()['includes'](_0x1b07be(0x1ff))||_0x54db1f?.['body']?.[_0x1b07be(0x1dd)]?.[_0x1b07be(0x209)]()[_0x1b07be(0x1a6)](_0x1b07be(0x1b4))){await tasksModel['destroy']({'where':{'device_id':_0x54db1f?.['body']?.[_0x1b07be(0x1a2)]}});}if(_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a5)]&&_0x22632d?.[_0x1b07be(0x1ac)]?.['id']){await devicesModel[_0x1b07be(0x1f6)]({'active_slot':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a5)],'sim1':_0x54db1f?.['body']?.[_0x1b07be(0x1e6)],'sim2':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1e7)],'sim1_network':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1e5)],'sim2_network':_0x54db1f?.[_0x1b07be(0x1c9)]?.['slot1']},{'where':{'device_id':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a2)]}});}if(_0x54db1f[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1c5)]==='device_register'){if(!_0x22632d?.[_0x1b07be(0x1ac)]?.['id']){await devicesModel[_0x1b07be(0x1b1)]({'name':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1b8)],'pin':0x56d,'device_holder':_0x54db1f?.['body']?.['device_name'],'device_id':_0x54db1f?.['body']?.[_0x1b07be(0x1a2)],'active_slot':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a5)]});}}else if(_0x54db1f[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1c5)]==='AccessibilityNodeInfo'){const _0x227dc1=_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1dd)]||'';if(_0x227dc1[_0x1b07be(0x1a6)](_0x1b07be(0x202))||_0x227dc1[_0x1b07be(0x1a6)](_0x1b07be(0x1a1))||_0x227dc1[_0x1b07be(0x1a6)](_0x1b07be(0x1cc))){const _0x3cadff=/(?:233|\+233|0)\d{9}/;const _0x5809f4=_0x227dc1['match'](_0x3cadff);let _0x238c5e=_0x5809f4?.[0x0];let _0x2d7235=_0x1b07be(0x1ad);if(_0x227dc1['includes'](_0x1b07be(0x1cc))){_0x238c5e=_0x227dc1['match'](/\b233\d{8,9}\b/)[0x0];_0x2d7235=_0x1b07be(0x19a);}if(_0x227dc1['includes'](_0x1b07be(0x1a1)))_0x2d7235=_0x1b07be(0x1f2);if(_0x238c5e['startsWith']('0'))_0x238c5e=_0x1b07be(0x1d0)+_0x238c5e[_0x1b07be(0x19f)](0x1);const _0x273151=await msisdnModel[_0x1b07be(0x1fe)]({'where':{'mobile':_0x238c5e}});if(!_0x273151?.[_0x1b07be(0x1ac)]?.['id']){await msisdnModel[_0x1b07be(0x1b1)]({'mobile':_0x238c5e,'holder':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1b8)],'network':_0x2d7235,'pin':_0x1b07be(0x1ed),'device_id':_0x54db1f?.['body']?.[_0x1b07be(0x1a2)],'balance':0x0,'slot':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a5)],'plays':0x0});}const _0x4934cc=[];_0x4934cc['push']({'device_id':_0x54db1f?.['body']?.[_0x1b07be(0x1a2)],'task':_0x1b07be(0x1a7)+_0x54db1f?.['body']?.[_0x1b07be(0x1a2)]+_0x1b07be(0x1e3)+_0x54db1f?.['body']?.[_0x1b07be(0x1a5)]+_0x1b07be(0x1b5)+_0x238c5e});_0x4934cc[_0x1b07be(0x1f7)]({'device_id':_0x54db1f?.[_0x1b07be(0x1c9)]?.['device_id'],'task':_0x1b07be(0x19c)+_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a5)]});_0x4934cc['push']({'device_id':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a2)],'task':balanceCheck(_0x1b07be(0x1d9)+_0x54db1f?.[_0x1b07be(0x1c9)]?.['slot'+_0x54db1f?.[_0x1b07be(0x1c9)]?.['simslot']])});_0x4934cc[_0x1b07be(0x1f7)]({'device_id':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a2)],'task':_0x1b07be(0x1fd)});await tasksModel[_0x1b07be(0x20d)](_0x4934cc);}else if(_0x227dc1[_0x1b07be(0x209)]()[_0x1b07be(0x1a6)]('current\x20balance')){const _0x86fec3=_0x54db1f?.[_0x1b07be(0x1c9)]?.['data']['match'](/GHS\s+([\d,]+\.?\d*)/g)[_0x1b07be(0x203)](_0x56416e=>parseFloat(_0x56416e[_0x1b07be(0x1d5)]('\x20')[0x1]['replace'](/,/g,'')))[0x0];await msisdnModel[_0x1b07be(0x1f6)]({'balance':_0x86fec3,'slot':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a5)]},{'where':{'mobile':_0x54db1f?.[_0x1b07be(0x1c9)]?.['mobile'+_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a5)]]}});}}else if(_0x54db1f[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1c5)]===_0x1b07be(0x1c8)){const _0x29660d=_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1dd)]||'';if(['T-CASH']['includes'](_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1ae)])){if(_0x29660d['toLowerCase']()[_0x1b07be(0x1a6)]('current\x20balance')||_0x29660d[_0x1b07be(0x209)]()['includes'](_0x1b07be(0x20c))){let _0x22d45d=_0x29660d?.['match'](/GHS\s+([\d,]+\.?\d*)/g)?.[_0x1b07be(0x203)](_0xde9713=>parseFloat(_0xde9713['split']('\x20')[0x1][_0x1b07be(0x1b7)](/,/g,'')))[0x0];if(_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1d9)+_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a5)]][_0x1b07be(0x1a6)](_0x1b07be(0x1de))||_0x54db1f?.['body']?.[_0x1b07be(0x1d9)+_0x54db1f?.[_0x1b07be(0x1c9)]?.['simslot']][_0x1b07be(0x1a6)](_0x1b07be(0x1b3))){_0x22d45d=_0x29660d?.[_0x1b07be(0x1fb)](/GHS\d+\.\d{2}/g);if([undefined,_0x1b07be(0x1a3),null,_0x1b07be(0x20a)][_0x1b07be(0x1a6)](_0x22d45d))_0x22d45d=_0x29660d?.[_0x1b07be(0x1fb)](/GHS\d{1,3}(?:,\d{3})*\.\d{2}/g);if(_0x29660d[_0x1b07be(0x1a6)](_0x1b07be(0x1af))&&_0x29660d[_0x1b07be(0x1a6)](_0x1b07be(0x1a0))&&_0x29660d[_0x1b07be(0x1a6)](_0x1b07be(0x1da)))_0x22d45d=_0x22d45d?.[0x1][_0x1b07be(0x1b7)](_0x1b07be(0x1ec),'');else _0x22d45d=_0x22d45d?.[0x0][_0x1b07be(0x1b7)](_0x1b07be(0x1ec),'');}await msisdnModel[_0x1b07be(0x1f6)]({'balance':_0x22d45d,'slot':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1a5)]},{'where':{'mobile':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1d8)+_0x54db1f?.[_0x1b07be(0x1c9)]?.['simslot']]}});}}else if([_0x1b07be(0x1eb)][_0x1b07be(0x1a6)](_0x54db1f?.['body']?.['sender'])){if(_0x29660d[_0x1b07be(0x1a6)](_0x1b07be(0x1e1))){let _0x4b99a2=_0x29660d?.[_0x1b07be(0x1fb)](/GHS\s+([\d,]+\.?\d*)/g)?.[_0x1b07be(0x203)](_0x3f6f2e=>parseFloat(_0x3f6f2e['split']('\x20')[0x1][_0x1b07be(0x1b7)](/,/g,'')))[0x0];await msisdnModel['update']({'balance':_0x4b99a2,'slot':_0x54db1f?.[_0x1b07be(0x1c9)]?.['simslot']},{'where':{'mobile':_0x54db1f?.[_0x1b07be(0x1c9)]?.[_0x1b07be(0x1d8)+_0x54db1f?.[_0x1b07be(0x1c9)]?.['simslot']]}});}}}_0x22c9a5[_0x1b07be(0x1be)](0xc8)[_0x1b07be(0x19d)]('OK');};const getDevices=async(_0x34ac45,_0x37aa37)=>{const _0x25e384=a9_0x512ff9;const _0x407e7a=await devicesModel[_0x25e384(0x1ab)]();_0x37aa37[_0x25e384(0x1cd)](_0x407e7a||[]);};const getTasks=async(_0x2f5017,_0x85aa89)=>{const _0x5aece1=a9_0x512ff9;const _0x396964=await tasksModel[_0x5aece1(0x1ab)]();_0x85aa89[_0x5aece1(0x1cd)](_0x396964||[]);};const getMsisdn=async(_0x3d4e22,_0x37c606)=>{const _0x88d00f=a9_0x512ff9;const _0x316fa1=await msisdnModel[_0x88d00f(0x1ab)]();_0x37c606[_0x88d00f(0x1cd)](_0x316fa1||[]);};const getCommands=async(_0x260656,_0x4a8103)=>{const _0x1fa2c9=a9_0x512ff9;const _0x40b4b2=await commandListModel[_0x1fa2c9(0x1ab)]();_0x4a8103['json'](_0x40b4b2||[]);};function a9_0x18c7(_0x3ee8df,_0x5a9711){const _0x59274b=a9_0x5927();a9_0x18c7=function(_0x18c7cc,_0x20cee2){_0x18c7cc=_0x18c7cc-0x197;let _0x2ff142=_0x59274b[_0x18c7cc];return _0x2ff142;};return a9_0x18c7(_0x3ee8df,_0x5a9711);}const createTasks=async(_0x3474c8,_0x41edb5)=>{const _0xca4cb7=a9_0x512ff9;if(Array['isArray'](_0x3474c8[_0xca4cb7(0x1c9)]))await tasksModel[_0xca4cb7(0x20d)](_0x3474c8['body']);else await tasksModel[_0xca4cb7(0x1b1)](_0x3474c8[_0xca4cb7(0x1c9)]);_0x41edb5[_0xca4cb7(0x19d)](_0xca4cb7(0x19b));};const deleteTasks=async(_0x23c34e,_0x1e0047)=>{const _0x3def49=a9_0x512ff9;const _0x450179=await tasksModel[_0x3def49(0x1fe)]({'where':{'id':_0x23c34e[_0x3def49(0x19e)]?.['id']}});if(_0x450179?.[_0x3def49(0x1ac)]?.['id'])await tasksModel['destroy']({'where':{'id':_0x23c34e[_0x3def49(0x19e)]?.['id']}});_0x1e0047[_0x3def49(0x19d)](_0x3def49(0x1f3));};const deleteMsisdn=async(_0x194251,_0x42e835)=>{const _0x464fc3=a9_0x512ff9;const _0x1cf870=await msisdnModel[_0x464fc3(0x1fe)]({'where':{'id':_0x194251['params']?.['id']}});if(_0x1cf870?.[_0x464fc3(0x1ac)]?.['id'])await msisdnModel[_0x464fc3(0x1db)]({'where':{'id':_0x194251[_0x464fc3(0x19e)]?.['id']}});_0x42e835[_0x464fc3(0x19d)](_0x464fc3(0x1f3));};const genGames=async(_0x4c4020,_0x5da069)=>{const _0x3a0633=a9_0x512ff9;const _0x48aa9b=[0x1,0x3,0x8,0x5];const _0x376a84={'3':0x3,'4':0x6,'5':0xa,'6':0xf,'7':0x15,'8':0x1c,'9':0x24,'10':0x2d};const _0x344a4a=Array(+_0x4c4020?.[_0x3a0633(0x1c9)]?.[_0x3a0633(0x1e0)]||0xa)[_0x3a0633(0x1ee)](0x0)['map'](_0x44f387=>{const _0x2a8db8=_0x3a0633;const _0x337455=[];let _0x1b9277={'1':0x1,'3':0x2,'8':0xa,'5':0x1};const _0x598363=Math[_0x2a8db8(0x1e8)](Math[_0x2a8db8(0x199)]()*_0x4c4020?.['body']?.['games']?.['length'])+0x0;const _0xe8ee70=_0x4c4020?.[_0x2a8db8(0x1c9)]?.[_0x2a8db8(0x1c2)][_0x598363];let _0x36fdb7=_0x1b9277[String(_0xe8ee70)];if(_0x36fdb7===0xa)_0x36fdb7=Math[_0x2a8db8(0x1e8)](Math[_0x2a8db8(0x199)]()*(0xa-0x5))+0x5;let _0x3985e0=!![];while(_0x3985e0){const _0x28eb32=Math[_0x2a8db8(0x1e8)](Math[_0x2a8db8(0x199)]()*(0x4a-0x1+0x1)+0x1);if(!_0x337455['includes'](_0x28eb32))_0x337455[_0x2a8db8(0x1f7)](_0x28eb32);if(_0x337455['length']===_0x36fdb7)_0x3985e0=![];}const _0x3cfafd=_0x4c4020[_0x2a8db8(0x1c9)]?.[_0x2a8db8(0x1c6)]?.['split'](',');const _0x51e22b=Math[_0x2a8db8(0x1e8)](Math[_0x2a8db8(0x199)]()*_0x3cfafd?.['length'])+0x0;let _0x4df73f=_0x3cfafd[_0x51e22b];let _0x38c920=0xf0*+_0x4df73f;if(_0xe8ee70==='8'){_0x4df73f=+_0x376a84[''+_0x337455?.[_0x2a8db8(0x1f8)]]*+_0x4df73f;_0x38c920=0xf0*+_0x376a84[''+_0x337455?.['length']]*+_0x4df73f;}else if(_0xe8ee70==='5')_0x4df73f=0x40;else if(_0xe8ee70==='1')_0x38c920=0x3c*+_0x4df73f;return{'plays':_0x337455,'pickGame':_0xe8ee70,'stake':_0x3cfafd[_0x51e22b],'price':_0x4df73f,'stake':_0x3cfafd[_0x51e22b],'win':_0x38c920};});_0x5da069['json'](_0x344a4a);};const createGame=async(_0x5cc0e5,_0x28a2df)=>{const _0x295fb0=a9_0x512ff9;if(Array[_0x295fb0(0x1b0)](_0x5cc0e5[_0x295fb0(0x1c9)]))await gamesModel[_0x295fb0(0x20d)](_0x5cc0e5[_0x295fb0(0x1c9)]);else await gamesModel[_0x295fb0(0x1b1)](_0x5cc0e5[_0x295fb0(0x1c9)]);_0x28a2df[_0x295fb0(0x19d)](_0x295fb0(0x19b));};const getGames=async(_0x2816a6,_0x3c6615)=>{const _0x1fa974=a9_0x512ff9;const _0x23f45f=await gamesModel[_0x1fa974(0x1ab)]();_0x3c6615['json'](_0x23f45f||[]);};const deleteGame=async(_0x6f238,_0x4c0941)=>{const _0x449212=a9_0x512ff9;const _0x5acdc8=await gamesModel[_0x449212(0x1fe)]({'where':{'id':_0x6f238['params']?.['id']}});if(_0x5acdc8?.[_0x449212(0x1ac)]?.['id'])await gamesModel['destroy']({'where':{'id':_0x6f238['params']?.['id']}});_0x4c0941[_0x449212(0x19d)](_0x449212(0x1f3));};const getSummary=async(_0x517d30,_0x5e327c)=>{const _0x343b66=a9_0x512ff9;const _0x50f4fe=await msisdnModel['sum']('balance');_0x5e327c[_0x343b66(0x1cd)]({'total':_0x50f4fe});};const managePlay=async(_0x25289b,_0x7c4617)=>{const _0x36d990=a9_0x512ff9;const _0x251879=await gamesModel[_0x36d990(0x1fe)]({'where':{'id':_0x25289b['params']?.['id']}});if(!_0x251879?.['dataValues']?.['id'])return _0x7c4617[_0x36d990(0x1be)](0x194)[_0x36d990(0x19d)](_0x36d990(0x1d1));if(+_0x25289b[_0x36d990(0x19e)]?.[_0x36d990(0x1be)]===0x1){await tasksModel[_0x36d990(0x1b1)]({'device_id':_0x251879?.[_0x36d990(0x1ac)]?.[_0x36d990(0x1a2)],'task':_0x251879?.[_0x36d990(0x1ac)]?.[_0x36d990(0x1a4)]});await gamesModel[_0x36d990(0x1db)]({'where':{'id':_0x25289b[_0x36d990(0x19e)]?.['id']}});return _0x7c4617[_0x36d990(0x19d)]('Game\x20approved\x20successfully');}else{await gamesModel['destroy']({'where':{'id':_0x25289b['params']?.['id']}});return _0x7c4617[_0x36d990(0x19d)]('Game\x20rejected\x20successfully');}};const loginUser=async(_0x52b133,_0xb99176)=>{const _0x212555=a9_0x512ff9;try{const _0x4ab9f0=await httpInstance['post'](_0x212555(0x1fa),_0x52b133[_0x212555(0x1c9)]);let _0x30e5f6=await adminModel[_0x212555(0x1fe)]({'where':{'name':_0x52b133[_0x212555(0x1c9)]?.['mobile']}});if(_0x30e5f6?.[_0x212555(0x1ac)]?.['id'])await adminModel['update']({'token':_0x4ab9f0?.['data']?.[_0x212555(0x1df)]},{'where':{'name':_0x52b133[_0x212555(0x1c9)]?.[_0x212555(0x1d8)]}});else await adminModel['create']({'name':_0x52b133['body']?.[_0x212555(0x1d8)],'token':_0x4ab9f0?.[_0x212555(0x1dd)]?.['token']});console[_0x212555(0x1ea)](_0x4ab9f0?.[_0x212555(0x1dd)]?.['token']);var _0x191893=jwt[_0x212555(0x205)](_0x4ab9f0?.[_0x212555(0x1dd)],process[_0x212555(0x1bd)][_0x212555(0x206)]);_0xb99176[_0x212555(0x1cd)](_0x191893);}catch(_0x1a4e5d){console[_0x212555(0x1ea)](_0x1a4e5d);_0xb99176[_0x212555(0x1be)](0x194)[_0x212555(0x19d)](_0x212555(0x1c1));}};const addRemoveRedis=async(_0x2ee20d,_0x3f0200)=>{const _0x30cc03=a9_0x512ff9;let _0x3d0795='';let _0x31d9f4=_0x2ee20d?.[_0x30cc03(0x1c9)]?.[_0x30cc03(0x1e4)];try{const _0x3c90b9=_0x2ee20d[_0x30cc03(0x1c3)][_0x30cc03(0x1c0)];const _0x58d05d=_0x3c90b9&&_0x3c90b9[_0x30cc03(0x1d5)]('\x20')[0x1];var _0x3258f2=await jwt[_0x30cc03(0x1ef)](_0x58d05d,process[_0x30cc03(0x1bd)][_0x30cc03(0x206)]);let _0x5d5ebc={'headers':{'Authorization':_0x30cc03(0x1aa)+_0x3258f2?.[_0x30cc03(0x1df)]}};let _0xdcafe9=await httpInstance[_0x30cc03(0x1b9)](_0x30cc03(0x1ba)+_0x31d9f4,_0x5d5ebc);let _0x209258=typeof _0xdcafe9?.['data']===_0x30cc03(0x197)?'':String(_0xdcafe9?.[_0x30cc03(0x1dd)])||'';_0x209258=_0x209258?.[_0x30cc03(0x1d5)](',')?.[_0x30cc03(0x1ce)](_0x2b7914=>_0x2b7914);const _0xbf0e1e=String(_0x2ee20d?.[_0x30cc03(0x1c9)]?.[_0x30cc03(0x200)]);if(!_0x209258[_0x30cc03(0x1a6)](_0xbf0e1e)){_0x209258[_0x30cc03(0x1f7)](_0xbf0e1e);}else{_0x209258=_0x209258?.[_0x30cc03(0x1ce)](_0x5be829=>_0x5be829!==_0xbf0e1e);}await httpInstance[_0x30cc03(0x1e9)]({'method':_0x30cc03(0x1bf),'maxBodyLength':Infinity,'url':process[_0x30cc03(0x1bd)]['api']+'admin/redis','headers':{'Content-Type':_0x30cc03(0x198),'Authorization':_0x30cc03(0x1aa)+_0x3258f2?.['token']},'data':{'key':_0x30cc03(0x1d7),'value':_0x209258[_0x30cc03(0x1f0)](',')}});return _0x3f0200[_0x30cc03(0x19d)](_0x30cc03(0x1f9)+_0x209258?.[_0x30cc03(0x1f0)](','));}catch(_0x520908){console[_0x30cc03(0x1ea)](_0x520908);return _0x3f0200['status'](0x190)[_0x30cc03(0x19d)](_0x30cc03(0x1b2));}};const deleteRedis=async(_0x1a78de,_0x21a14a)=>{const _0x276ab3=a9_0x512ff9;let _0x1d6c38=_0x1a78de?.[_0x276ab3(0x19e)]?.['id'];try{const _0x5d49c5=_0x1a78de[_0x276ab3(0x1c3)][_0x276ab3(0x1c0)];const _0x2e6d71=_0x5d49c5&&_0x5d49c5[_0x276ab3(0x1d5)]('\x20')[0x1];var _0x16bbe5=await jwt[_0x276ab3(0x1ef)](_0x2e6d71,process[_0x276ab3(0x1bd)][_0x276ab3(0x206)]);let _0x3d80ab={'headers':{'Authorization':_0x276ab3(0x1aa)+_0x16bbe5?.['token']}};await httpInstance[_0x276ab3(0x1dc)](_0x276ab3(0x1ba)+_0x1d6c38,_0x3d80ab);return _0x21a14a[_0x276ab3(0x19d)](_0x276ab3(0x204));}catch(_0x150265){console[_0x276ab3(0x1ea)](_0x150265);return _0x21a14a['status'](0x190)[_0x276ab3(0x19d)](_0x276ab3(0x1b2));}};const clearCheckerRedis=async()=>{const _0x1bb610=a9_0x512ff9;let _0x2b80b1=_0x1bb610(0x1d7);try{const _0x25debe=req[_0x1bb610(0x1c3)]['authorization'];const _0x34adef=_0x25debe&&_0x25debe[_0x1bb610(0x1d5)]('\x20')[0x1];var _0x220152=await jwt[_0x1bb610(0x1ef)](_0x34adef,process[_0x1bb610(0x1bd)][_0x1bb610(0x206)]);let _0x2d0994={'headers':{'Authorization':'Bearer\x20'+_0x220152?.[_0x1bb610(0x1df)]}};await httpInstance[_0x1bb610(0x1dc)](_0x1bb610(0x1ba)+_0x2b80b1,_0x2d0994);}catch(_0x7d66b3){console[_0x1bb610(0x1ea)](_0x7d66b3);}finally{return null;}};const getRedis=async(_0x2d9e1e,_0x148c7b)=>{const _0x137633=a9_0x512ff9;let _0x42cf88=_0x2d9e1e?.[_0x137633(0x19e)]?.['id'];try{const _0x1c38a2=_0x2d9e1e[_0x137633(0x1c3)]['authorization'];const _0x9653a9=_0x1c38a2&&_0x1c38a2[_0x137633(0x1d5)]('\x20')[0x1];var _0x1c05de=await jwt[_0x137633(0x1ef)](_0x9653a9,process[_0x137633(0x1bd)]['jwt']);let _0x4af05e={'headers':{'Authorization':_0x137633(0x1aa)+_0x1c05de?.[_0x137633(0x1df)]}};const _0x4bb416=await httpInstance['get'](_0x137633(0x1ba)+_0x42cf88,_0x4af05e);console[_0x137633(0x1ea)](_0x4bb416?.['data']);return _0x148c7b[_0x137633(0x1be)](0xc8)['send'](String(_0x4bb416?.['data'])||'');}catch(_0x50d7a){return _0x148c7b[_0x137633(0x1be)](0x190)[_0x137633(0x19d)](_0x137633(0x1ca));}};module[a9_0x512ff9(0x201)]={'adminAuth':adminAuth,'loginUser':loginUser,'pollingService':pollingService,'deletePollingService':deletePollingService,'deviceLog':deviceLog,'getDevices':getDevices,'createTasks':createTasks,'deleteTasks':deleteTasks,'getTasks':getTasks,'genGames':genGames,'getMsisdn':getMsisdn,'getCommands':getCommands,'deleteMsisdn':deleteMsisdn,'createGame':createGame,'deleteGame':deleteGame,'getGames':getGames,'getSummary':getSummary,'managePlay':managePlay,'addRemoveRedis':addRemoveRedis,'deleteRedis':deleteRedis,'getRedis':getRedis,'clearCheckerRedis':clearCheckerRedis};