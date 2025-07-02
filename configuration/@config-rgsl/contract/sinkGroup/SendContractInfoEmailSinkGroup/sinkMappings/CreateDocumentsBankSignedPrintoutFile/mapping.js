'use strict';

const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkResult, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');
    const enableAttachment = productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode);
    const documentStateCode = sinkExchange.resolveContext('documentStateCode');
    const isDraft = documentStateCode == 'Draft';
    const isIDGRETVTB = productGroupArray.IDG_RET_VTB.includes(productCode);
    const issueDate = sinkExchange.resolveContext('issueDate');
    const isEBMGRETVTB = product.EBMGRETVTB.includes(productCode);
    const isAfter01042025 = DateTimeUtils.isAfter(issueDate, '2025-03-31');

    if (isEBMGRETVTB && isEPolicy && isAfter01042025) { return; }

    if (!isEPolicy || !enableAttachment || (enableAttachment && isDraft) || isIDGRETVTB) {
        return;
    }

    const DocumentsBankSignedAttachmentId = sinkExchange.resolveContext('DocumentsBankSignedAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');

    if (DocumentsBankSignedAttachmentId && DocumentsBankSignedAttachmentId.length > 0) {
        return;
    }

    const printoutsinfo = sinkExchange.resolveContext('printoutsInfo');
    const info = printoutsinfo.find(p => p.PrintoutName === 'DocumentsBankPrintoutEpolicy');

    return {
        printoutRelations: [
            {
                codeName: info.AttachmentType,
                mode: 'WriteFile',
            }
        ],
        entity: {
            id: contractId
        }
    };

};
