'use strict'
var splunk = require('../dao/splunkUploader');
var createBufferdUploader = require('./bufferedUploader');

var splunkAppender = createBufferdUploader(splunk, {name: 'splunkAppender', maxDelay: 5000 });
function qneueueEvent(event) {
    // console.log('event=enqueueEvent heartbeat=' + JSON.stringify(event));
    splunkAppender(event);
}

module.exports = qneueueEvent;