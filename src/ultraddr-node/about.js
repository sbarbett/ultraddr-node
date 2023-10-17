const VERSION = "1.0.0";
const PREFIX = "ultraddr-node";
const REPO = "https://github.com/sbarbett/ultraddr-node";

function getClientUserAgent() {
    return `${PREFIX}/v${VERSION} (+${REPO})`;
}

module.exports = {
    getClientUserAgent
};