'use strict';

const { getTranslationByAttachmentType } = require('@config-rgsl/infrastructure/lib/translationHelper');

module.exports = function mapping(sinkResult, sinkExchange) {

    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const isActive = documentStateCode == 'Active';

    if (!isActive) { return; }

    const fileId = sinkExchange.resolveContext('InvApplicationSignedAttachmentFileId');
    const attachmentId = sinkExchange.resolveContext('InvApplicationSignedAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');

    if (!fileId || attachmentId) {

        return;
    }

    const translatedFileName = getTranslationByAttachmentType('InvApplicationSignedAttachment');

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
