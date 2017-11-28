'use strict'

var splunk = require('./lib/dao/splunkUploader');
var createBufferdUploader = require('./lib/provider/bufferedUploader');

// opt = {
//     host: 'myDevbox',
//     service: 'myService',
//     name: splunkAppender,
//     maxSize: 1000,
//     maxDelay: 5000
// };
// return a logger, you can simply call logger({event:'heartbeat', cpu:90});
function createLogger(opt) {
    var splunkAppender = createBufferdUploader(splunk, opt);
    var host = opt.host;
    var service = opt.service;
    function logger(obj) {
        if (host && !obj.host) {
            obj.host = host;
        }
        if (service && !obj.service) {
            obj.service = service;
        }
        splunkAppender(obj);
    }
    return logger;
}

module.exports = createLogger;