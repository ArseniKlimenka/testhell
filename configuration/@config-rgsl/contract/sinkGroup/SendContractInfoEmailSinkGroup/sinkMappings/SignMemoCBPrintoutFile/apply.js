'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const fileId = sinkResult.FileId;

    if (!fileId) {

        throw "Unable to create memo cb printout!";
    }

    sinkExchange.mapContext('signedMemoCBAttachmentFileId', sinkResult.FileId);
};
