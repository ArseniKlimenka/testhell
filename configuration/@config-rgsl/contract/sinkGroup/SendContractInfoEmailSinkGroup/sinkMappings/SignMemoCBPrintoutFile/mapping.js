'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const fileId = sinkExchange.resolveContext('memoCBAttachmentFileId');
    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');
    const signedMemoCBAttachmentId = sinkExchange.resolveContext('signedMemoCBAttachmentId');

    if (!fileId || !shouldSignAttachment || signedMemoCBAttachmentId) {

        return;
    }

    return {
        request: {
            FileId: fileId
        }
    };
};
