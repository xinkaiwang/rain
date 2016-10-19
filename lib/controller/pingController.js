'use strict'

// http://rain.xinkaiw.com/ping
function ping(req, rsp, next) {
    var now = new Date();
    rsp.send({code: 'succ', timesamp: now.toISOString()});
}

module.exports = {
    ping: ping
};