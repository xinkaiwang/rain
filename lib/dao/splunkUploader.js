'use strict';

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var _ = require('underscore');

var baseUrl = 'http://2g.xinkaiw.com:8088';
var authToken = '58DE661B-AA5A-44C2-B658-16E8D240E78A';

/**
 * @module splunk uploader
 */

// return a promise
function upload(list) {
    var array = _.map(list, formatDataItem);
    var postBody = array.join('\n');
    //logger.info({event:'clientSend', postBody: postBody});
    var opt = {
        url: baseUrl + '/services/collector/event',
        method: 'POST',
        headers: {
            Authorization: 'Splunk ' + authToken
        },
        body: postBody
    };
    return request(opt).then(function(resp) {
        if (resp.statusCode !== 200) {
            console.log('event=splunkUploaderDone conclusion=fail itemCount=' + list.length + ' statusCode=' + resp.statusCode);
            throw new Error(resp);
        } else {
            console.log('event=splunkUploaderDone conclusion=succ itemCount=' + list.length);
        }
    });
}


// curl -k  http://xinkaiw.com:8088/services/collector/event -H "Authorization: Splunk 58DE661B-AA5A-44C2-B658-16E8D240E78A" -d '{"event": "[2016-07-01 21:09:46.128 GMT] modle=loader.routeMiddleware - event=AddMiddleware type=UserData route=/delay service=rain", "time":"1467847332127"}'
// curl -k  http://2g.xinkaiw.com:8088/services/collector/event -H "Authorization: Splunk 58DE661B-AA5A-44C2-B658-16E8D240E78A" -d '{"event": {"modle": "loader.routeMiddleware", "event":"AddMiddleware", "type":"UserData", "route":"/delay", "service":"rain"} , "time":"1467848173131", "host":"devtest", "source": "rain"}'

// input = { time: 1467847332127, event: 'heartbeat', host: 'mydevBox', service: 'videoService', cpu:100, ... }
// return a string
function formatDataItem(item) {
    var obj = {
        event: item,
        time: item.time,
        host: item.host
    };
    delete item.host;
    return JSON.stringify(obj);
}

module.exports = upload;