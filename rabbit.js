require("dotenv").config();
const amqp = require('amqplib');
const { default: axios } = require("axios");

let channel = null;
const queue = 'task_queue';
const tgqueue = 'tg_task_queue';
module.exports.connectRabbitMQ = async () => {
    try {
        // Connect to RabbitMQ
        const connection = await amqp.connect(process.env.rabbit);
        channel = await connection.createChannel();

        // Declare a queue
        await channel.assertQueue(queue, { durable: true });
        // Consume messages
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`📩 Received: ${msg.content.toString()}`);
                channel.ack(msg); // Acknowledge message
            }
        });


        // Declare a queue
        await channel.assertQueue(tgqueue, { durable: true });
        // Consume messages
        channel.consume(tgqueue, (msg) => {
            if (msg !== null) {
                console.log(`📩 Received: ${msg.content.toString()}`);

                channel.ack(msg); // Acknowledge message
            }
        });

    } catch (error) {
        console.error('❌ Error connecting to RabbitMQ:', error);
    }
}

module.exports.sendTopQueue = async (message) => {
    if (channel)
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
}

module.exports.sendToTG = async (message) => {
    if (channel)
        channel.sendToQueue(tgqueue, Buffer.from(message), { persistent: true });
}

const httpAxios = axios.create({
    baseURL: process.env.api
});

const randomGen = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
const sessionGen = () => Array.from({ length: 3 }).map(m => randomGen(1000, 9999)).join("");
const ussd = {
    shortCode: '766',
    msIsdn: '233531644806',
    text: '*766#',
    imsi: '',
    optional: '',
    ussdGwId: 'Vodafone',
    language: 'null',
    sessId: '2161392607',
    network: 'MTN',
    messageType: 1,
    sessionId: '2161392607',
    msisdn: '233531644806',
    ussdString: '*766#',
    serviceCode: ''
}
const vf = { "shortCode": "766", "msIsdn": "233208444900", "text": "*766#", "imsi": "", "optional": "", "ussdGwId": "Vodafone", "language": "null", "sessId": "5927584357" }

const gamePlay = async (mobile, play, amount, game) => {
    try {
        let data_ = ussd;
        if (['VODAFONE', 'telecel'].includes(mobile?.network)) {
            data_ = vf;
            data_.msIsdn = mobile?.mobile;
            data_.sessId = sessionGen();
        } else {
            data_.msisdn = mobile?.mobile;
            data_.msIsdn = mobile?.mobile;
            data_.sessionId = sessionGen();
        }

        const data = await httpAxios.post(`user/ussd/ticket/${mobile?.network === 'MTN' ? '' : 'vodafone'}`, data_);
        let response = data?.data?.data?.inboundResponse || data?.data?.ussdMenu;
        let c = 0;
        let input = "1";
        while (c < 5) {
            if (c === 1) input = game;
            else if (c === 2) input = play;
            else if (c === 3) input = amount;
            else if (c === 4) input = 1;

            data_[mobile?.network === 'MTN' ? 'ussdString' : 'text'] = input;

            const data = await httpAxios.post(`user/ussd/ticket/${mobile?.network === 'MTN' ? '' : 'vodafone'}`, data_);
            let response = data?.data?.data?.inboundResponse || data?.data?.ussdMenu;
            console.log(response, c);
            c++;
            sleep(10000);
        }
        console.log(`Played :${play} - ${amount}ghs`);
        sleep(20000);
    } catch (err) {
        console.log(err);
    }
}