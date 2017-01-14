'use strict'

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var _ = require('underscore');

var baseUrl = 'http://es.xinkaiw.com';
var index = 'hb';
var type = 'hostAgent';

/**
 * @module elasticsearch uploader
 */

// return a promise
function upload(list) {
    var array = _.map(list, formatDataItem);
    var postBody = array.join();
    var opt = {
        url: baseUrl + '/' + index + '/' + type + '/_bulk',
        method: 'POST',
        body: postBody
    };
    //console.log('event=esUpload' + ' opt=' + JSON.stringify(opt));
    return request(opt).then(function(resp) {
        if (resp.statusCode !== 200) {
            console.log('event=esUploaderDone conclusion=fail itemCount=' + list.length + ' statusCode=' + resp.statusCode);
            throw new Error(resp);
        } else {
            console.log('event=esUploaderDone conclusion=succ itemCount=' + list.length);
        }
    });
}

var insert = {
    'index' : { }
};

// input item = { time: 1467847332127, event: 'heartbeat', host: 'mydevBox', service: 'videoService', cpu:100, ... }
// return a string
function formatDataItem(item) {
    var insertStr = JSON.stringify(insert);
    var itemStr = JSON.stringify(item);
    return insertStr + '\n' + itemStr + '\n';
}


module.exports = upload;
