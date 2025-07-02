'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const attachmentId = sinkResult.attachmentId;

    if (!attachmentId) {

        throw "Unable to create InvApplicationSigned attachment!";
    }

    sinkExchange.mapContext('InvApplicationSignedAttachmentId', attachmentId);
};
