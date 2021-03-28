const LIVE = false;

if (LIVE) {
    module.exports = require('./prod.jd');
} else {
    module.exports = require('./dev.js')
}