'use strict';

const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkInput, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');
    const isEBMGRETVTB = productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode);

    if (!isEPolicy || !isEBMGRETVTB ) { return; }

    return {
        entityId: sinkInput.contractId,
        attachmentType: 'InsuranceRulesAttachment'
    };

};
