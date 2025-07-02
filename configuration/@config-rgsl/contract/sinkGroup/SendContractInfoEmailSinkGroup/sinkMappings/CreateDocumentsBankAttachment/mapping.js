'use strict';

const { getTranslationByPrintoutRelationType } = require('@config-rgsl/infrastructure/lib/translationHelper');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkResult, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');
    const enableAttachment = productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode);
    const isIDGRETVTB = productGroupArray.IDG_RET_VTB.includes(productCode);
    const issueDate = sinkExchange.resolveContext('issueDate');
    const isEBMGRETVTB = productGroupArray.SKIP_BANK_DOCUMENT.includes(productCode);
    const isAfter01042025 = DateTimeUtils.isAfter(issueDate, '2025-03-31');

    if (isEBMGRETVTB && isEPolicy && isAfter01042025) { return; }

    if (!isEPolicy || !enableAttachment || isIDGRETVTB) {
        return;
    }

    const fileIds = sinkExchange.resolveContext('DocumentsBankAttachmentFileIds');
    const attachmentIds = sinkExchange.resolveContext('DocumentsBankAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');

    if (!fileIds || fileIds.length == 0 || (attachmentIds && attachmentIds.length > 0)) {

        return;
    }

    const DocumentsBankAttachments = fileIds.map(item => {

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

    return DocumentsBankAttachments;

};
