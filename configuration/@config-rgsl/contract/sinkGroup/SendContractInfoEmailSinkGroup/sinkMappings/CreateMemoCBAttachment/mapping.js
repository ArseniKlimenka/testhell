'use strict';

const { businessRules } = require('@adinsure/runtime');
const { getTranslationByAttachmentType } = require('@config-rgsl/infrastructure/lib/translationHelper');

module.exports = function mapping(sinkResult, sinkExchange) {

    const fileId = sinkExchange.resolveContext('memoCBAttachmentFileId');
    const contractId = sinkExchange.resolveContext('contractId');
    const attachmentId = sinkExchange.resolveContext('memoCBAttachmentId');
    const productCode = sinkExchange.resolveContext('productCode');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;

    if (!fileId || attachmentId || !conf.MemoCBProject) {

        return;
    }

    const translatedFileName = getTranslationByAttachmentType('memoCB');

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
