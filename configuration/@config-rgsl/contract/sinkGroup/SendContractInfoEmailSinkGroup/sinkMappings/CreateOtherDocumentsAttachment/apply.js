'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const attachmentId = sinkResult.attachmentId;

    if (!attachmentId) {

        throw "Unable to create other documents attachment!";
    }

    sinkExchange.mapContext('otherDocumentsAttachmentId', [attachmentId]);
};
