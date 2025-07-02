'use strict';

const { getTranslationByAttachmentType } = require('@config-rgsl/infrastructure/lib/translationHelper');

module.exports = function mapping(sinkResult, sinkExchange) {

    const fileId = sinkExchange.resolveContext('signedMemoCBAttachmentFileId');
    const attachmentId = sinkExchange.resolveContext('signedMemoCBAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');
    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');

    if (!fileId || !shouldSignAttachment || attachmentId) {

        return;
    }

    const translatedFileName = getTranslationByAttachmentType('memoCBDigitallySigned');

    return {
        fileId: fileId,
        entity: {
            entityId: contractId
        },
        fileName: translatedFileName,
        attachmentName: translatedFileName,
        attachmentDescription: translatedFileName,
    };
};
