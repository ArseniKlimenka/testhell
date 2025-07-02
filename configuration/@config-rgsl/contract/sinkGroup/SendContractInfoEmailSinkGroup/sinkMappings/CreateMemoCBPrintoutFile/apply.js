'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const fileId = sinkResult.printoutIds[0].fileId;

    if (!fileId) {

        throw "Unable to create memo cb printout!";
    }

    sinkExchange.mapContext('memoCBAttachmentFileId', fileId);
};
