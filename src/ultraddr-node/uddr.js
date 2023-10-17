const axios = require('axios');
const { getClientUserAgent } = require('./about');

class UltraDDRApi {
    constructor(apiKey, debug = false, userAgent = null) {
        this.baseHost = "ddr.ultradns.com";
        this.apiEndpoint = `https://api.${this.baseHost}`;
        this.dohEndpoint = `https://rcsv.${this.baseHost}`;
        this.apiKey = apiKey;
        this.debug = debug;
        this.userAgent = userAgent || getClientUserAgent();
    }

    async _getAccountInfo() {
        const options = {
            method: "POST",
            url: `${this.apiEndpoint}/account/user/organizations`,
            headers: this._headers(),
            data: {}
        };

        let response;
        try {
            response = await axios(options);
        } catch (error) {
            throw `Error initializing client: ${error}`;
        }
        
        let clientId, blockPageIp;
        try {
            clientId = response.data.organizations[0].client_id;
            blockPageIp = response.data.organizations[0].settings.protect_settings.block_portal_ipv4;
        } catch (error) {
            throw `Error parsing account info: ${error}`;
        }
        
        this.clientId = clientId;
        this.blockPageIp = blockPageIp;
    }

    _headers(accept = null, contentType = null) {
        const headers = {
            "X-Api-Key": this.apiKey,
            "User-Agent": this.userAgent
        };
        if (accept) {
            headers["Accept"] = accept;
        }
        if (contentType) {
            headers["Content-Type"] = contentType;
        }
        return headers;
    }

    static async connect(apiKey, debug = false, userAgent = null) {
        const instance = new UltraDDRApi(apiKey, debug, userAgent);
        await instance._getAccountInfo();
        return instance;
    }
}

module.exports = UltraDDRApi;