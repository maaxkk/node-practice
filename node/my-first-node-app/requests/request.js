const https = require('https');
const http = require("node:http");

const optionsGET = {
    hostname: 'example.com',
    port: 443,
    path: '/todos',
    method: 'GET',
};

const data = JSON.stringify({
    title: 'Create candle from node http',
    categoryId: 1,
    price: 111,
    amount: 10,
})

const optionsPOST = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/candle',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-length': data.length,
    },
};

const reqGET = https.request(optionsGET, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d);
    });
});

reqGET.on('error', d => {
    process.stdout.write(d);
});

const reqPOST = http.request(optionsPOST, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d);
    })
})

reqPOST.on('error', error => {
    console.error(error);
});

reqPOST.write(data)

reqGET.end();
reqPOST.end();

module.exports = {
    reqGET, reqPOST
}