'use strict'

var opt = {
    host: 'myDevBox',
    service: 'myService',
    name: 'splunkAppender',
    maxSize: 1000,
    maxDelay: 1000
};

var logger = require('./index')(opt);

logger({event:'test', cpu:90, foo:'bar'});
logger({event:'test', cpu:92, foo:'bar'});
logger({event:'test', cpu:94, foo:'bar'});
logger({event:'test', cpu:96, foo:'bar'});
logger({event:'test', cpu:97, foo:'bar'});

