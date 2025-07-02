'use strict';

const { getTranslationByPrintoutRelationType } = require('@config-rgsl/infrastructure/lib/translationHelper');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkResult, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');
    const isEBMGRETVTB = productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode);

    if (!isEPolicy || !isEBMGRETVTB) {
        return;
    }

    const fileIds = sinkExchange.resolveContext('InsuranceRulesAttachmentFileIds');
    const attachmentIds = sinkExchange.resolveContext('InsuranceRulesAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');

    if (!fileIds || fileIds.length == 0 || (attachmentIds && attachmentIds.length > 0)) {

        return;
    }

    const InsuranceRulesAttachments = fileIds.map(item => {

        const translatedFileName = getTranslationByPrintoutRelationType(sinkResult.contractConfName, item.type);

        return {
            fileId: item.fileId,
            entity: {
                entityId: contractId
            },
            fileName: translatedFileName,
            attachmentName: translatedFileName,
            attachmentDescription: translatedFileName,
        };
    });

    return InsuranceRulesAttachments;

};
