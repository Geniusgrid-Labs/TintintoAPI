const numberCheck = (network) => {
    let command = "command=*127#:1";
    if (network.includes('tigo'))
        command = "command=*703#:1";
    else if (network.includes('mtn'))
        command = "command=*156#:1";

    return command;
}

const balanceCheck = (network) => {
    let command = "command=*110#:6:1:1:1389";
    if (network.includes('tigo'))
        command = "command=*110#:8:1:1389:1";
    else if (network.includes('mtn'))
        command = "command=*170#:6:1:1389";

    return command;
}

module.exports = {
    balanceCheck,
    numberCheck
}