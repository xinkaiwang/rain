'use strict'

var _ = require('underscore');
var heartbeatProvider = require('../dao/heartbeatProvider');

// http://rain.xinkaiw.com/heartbeat?host=xinkai&cpu=4&memMb=180
function get(req, rsp) {
    var event = _.extend({event: 'heartbeat'}, req.query);
    if (!event.host) {
        event.host = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }
    heartbeatProvider(event);
    var now = new Date();
    rsp.send({code: 'succ', timesamp: now.toISOString(), fields: fieldCount});
}

// curl http://rain.xinkaiw.com/heartbeat -d '{"event":"heartbeat","service":"catalog","region":"us-west-2","cpu":"4","memMb":"180"}' -H 'content-type: application/json'
function post(req, rsp) {
    var body = req.body;
    var event = _.extend({event: 'heartbeat'}, body);
    if (!event.host) {
        event.host = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    }

    heartbeatProvider(event);
    var fieldCount = _.keys(event).length;
    var now = new Date();
    rsp.send({code: 'succ', timesamp: now.toISOString(), fields: fieldCount});
}

module.exports = {
    get: get,
    post: post
};