const { default: axios } = require("axios");

const numberCheck = (network) => {

    let command = "command=*127#:1";
    if (network.includes('tigo'))
        command = "command=*703#:1";
    else if (network.includes('mtn'))
        command = "command=*156#:1";
    return command;
}

const balanceCheck = (network, device_id = "") => {
    let command = "command=*110#:6:6:1:1:1:1:1389:1389";

    if (device_id === 'b2f04becaa709479') {
        if (network.includes('tigo'))
            command = "command=*110#:8:8:1:1:1389:1389:1:1";
        else if (network.includes('mtn'))
            command = "command=*170#:6:6:1:6:1389:1389";
    } else {
        let command = "command=*110#:6:1:1:1389";
        if (network.includes('tigo'))
            command = "command=*110#:8:1:1389:1";
        else if (network.includes('mtn'))
            command = "command=*170#:6:1:1389";
    }
    return command;
}

const getData = async (sql) => {
    try {
        const httpAxios = axios.create({
            baseURL: process.env.api
        });

        const getToken = await httpAxios.post(`admin/login`, { mobile: process.env.user, password: process.env.pass });
        let header = {
            headers: {
                Authorization: `Bearer ${getToken?.data?.token}`
            }
        };

        let currentDraw = await httpAxios.post(`admin/sql`, {
            sql,
            password: process.env.pass_code
        }, header);
        return currentDraw?.data;
    } catch (err) {
        return false;
    }
}


module.exports = {
    balanceCheck,
    numberCheck,
    getData
}