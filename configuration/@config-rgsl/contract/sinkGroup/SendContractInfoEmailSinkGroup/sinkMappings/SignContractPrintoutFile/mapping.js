'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const fileId = sinkExchange.resolveContext('contractAttachmentFileId');
    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');
    const signedContractAttachmentId = sinkExchange.resolveContext('signedContractAttachmentId');


    if (!fileId || !shouldSignAttachment || signedContractAttachmentId) {

        return;
    }

    return {
        request: {
            FileId: fileId
        }
    };
};
