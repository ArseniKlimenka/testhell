'use strict';

const { getTranslationByAttachmentType } = require('@config-rgsl/infrastructure/lib/translationHelper');

module.exports = function mapping(sinkResult, sinkExchange) {

    const fileId = sinkExchange.resolveContext('signedContractAttachmentFileId');
    const attachmentId = sinkExchange.resolveContext('signedContractAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');
    const shouldSignAttachment = sinkExchange.resolveContext('shouldSignAttachment');

    if (!fileId || !shouldSignAttachment || attachmentId) {

        return;
    }

    const translatedFileName = getTranslationByAttachmentType('ePolicyDigitallySigned');

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
