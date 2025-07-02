'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const attachmentId = sinkResult.attachmentId;

    if (!attachmentId) {

        throw "Unable to create KID attachment!";
    }

    sinkExchange.mapContext('kidAttachmentId', attachmentId);
};
