'use strict'

function createBufferedUploader(uploader, opts) {
    opts = opts || {};
    var maxSize = opts.maxSize || 1000; // default size is 1000 items in queue, when more than that length, new items get abandoned.
    var maxDelay = opts.maxDelay || 500; // default 500ms
    var name = opts.name || 'bufferedUploader';

    var buffer = [];
    var postingBuf = [];
    var postThreadRunning = false;
    function enqueue(item) {
        if (getCurrentItemCount() > maxSize) {
            console.error('event=uploadMaxSizeLimit currentSize=' + getCurrentItemCount());
            return;
        }
        buffer.push(item);
        if(!postThreadRunning) {
            postThreadRunning = true;
            setTimeout(doPost, maxDelay);
        }
    }

    function getCurrentItemCount() {
        return buffer.length + postingBuf.length;
    }

    function doPost() {
        if (getCurrentItemCount() > 0) {
            postingBuf = postingBuf.concat(buffer);
            buffer = [];
            uploader(postingBuf).then(function uploadSucc() {
                console.log('event=uploadSucc count=' + postingBuf.length);
                postingBuf = [];
                setTimeout(doPost, maxDelay); // next round upload happen after 500ms
            }).catch(function uploadException(e) {
                console.log('event=uploadException count=' + postingBuf.length + ' e=' + JSON.stringify(e));
                setTimeout(doPost, 20 * 1000); // retry after 20 seconds
            });
        } else {
            // no more item need to post, so terminate this thread.
            postThreadRunning = false;
        }
    }
    return enqueue;
}

module.exports = createBufferedUploader;