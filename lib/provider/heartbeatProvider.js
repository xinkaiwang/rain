'use strict'
var splunk = require('../dao/splunkUploader');
var es = require('../dao/esUploader');
var createBufferdUploader = require('./bufferedUploader');

var splunkAppender = createBufferdUploader(splunk, {name: 'splunkAppender', maxDelay: 5000 });
var esAppender = createBufferdUploader(es, {name: 'esAppender', maxDelay: 5000 });
function qneueueEvent(event) {
    // console.log('event=enqueueEvent heartbeat=' + JSON.stringify(event));
    splunkAppender(event);
    esAppender(event);
}

module.exports = qneueueEvent;