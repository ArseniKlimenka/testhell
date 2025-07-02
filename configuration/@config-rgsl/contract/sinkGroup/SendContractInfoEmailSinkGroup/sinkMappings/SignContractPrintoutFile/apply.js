'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const fileId = sinkResult.FileId;

    if (!fileId) {

        throw "Unable to sign contract!";
    }

    sinkExchange.mapContext('signedContractAttachmentFileId', fileId);
};
