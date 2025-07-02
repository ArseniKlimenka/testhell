'use strict';

const { getTranslationByAttachmentType } = require('@config-rgsl/infrastructure/lib/translationHelper');

module.exports = function mapping(sinkResult, sinkExchange) {

    const fileId = sinkExchange.resolveContext('InvApplicationAttachmentFileId');
    const attachmentId = sinkExchange.resolveContext('InvApplicationAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');

    if (!fileId || attachmentId) {

        return;
    }

    const translatedFileName = getTranslationByAttachmentType('InvApplicationAttachment');

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
