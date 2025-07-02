'use strict';

const { businessRules } = require('@adinsure/runtime');
const { getTranslationByAttachmentType } = require('@config-rgsl/infrastructure/lib/translationHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    const fileId = sinkExchange.resolveContext('kidAttachmentFileId');
    const attachmentId = sinkExchange.resolveContext('kidAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');
    const productCode = sinkExchange.resolveContext('productCode');
    const issueDate = sinkExchange.resolveContext('issueDate');
    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const conf = ePolicytConfiguration({ productCode, issueDate }).result;
    const kidPrintout = conf.kidPrintout;

    if (!fileId || attachmentId || !kidPrintout) {

        return;
    }

    const translatedFileName = getTranslationByAttachmentType('KIDAttachment');

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
