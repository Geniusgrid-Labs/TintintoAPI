const devicesModel = require("./models/devices");

const runner1 = async () => {
    const data = [
        "51,59",
        "59,51",
        "48,57",
        "57,48",
        "49,75",
        "75,49",
        "69,68",
        "68,69",
        "67,65",
        "65,67",
        "42,22",
        "22,42",
        "62,61",
        "61,62",
        "71,70",
        "70,71",
        "63,74",
        "74,63",
        "73,26",
        "26,73",
    ]

    const devices = await devicesModel.findAll();
    await Promise.all(devices.map(data => {
        const device = data?.dataValues;
        return new Promise((resolve) => {
            //
            resolve(device);
        })
    })).then(res => {
        console.log(res);
    });
}

runner1();
