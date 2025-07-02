'use strict';

const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkInput, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');
    const enableAttachment = productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode);
    const isIDGRETVTB = productGroupArray.IDG_RET_VTB.includes(productCode);
    const issueDate = sinkExchange.resolveContext('issueDate');
    const isEBMGRETVTB = product.EBMGRETVTB.includes(productCode);
    const isAfter01042025 = DateTimeUtils.isAfter(issueDate, '2025-03-31');

    if (isEBMGRETVTB && isEPolicy && isAfter01042025) { return; }

    if (!isEPolicy || !enableAttachment || isIDGRETVTB) { return; }

    return {
        entityId: sinkInput.contractId,
        attachmentType: 'DocumentsBankAttachment'
    };

};
