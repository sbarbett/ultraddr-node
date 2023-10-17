const UltraDDRApi = require('./src/ultraddr-node');

async function test(apiKey) {
    const api = await UltraDDRApi.connect(apiKey);
    console.log(api.clientId, api.blockPageIp);
}

const apiKey = process.argv[2];

if (!apiKey) {
    console.error("Please provide an API key as an argument.");
    process.exit(1);
}

test(apiKey);