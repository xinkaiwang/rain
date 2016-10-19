'use strict'

function qneueueEvent(event) {
    console.log('event=enqueueEvent heartbeat=' + JSON.stringify(event));
}

module.exports = qneueueEvent;