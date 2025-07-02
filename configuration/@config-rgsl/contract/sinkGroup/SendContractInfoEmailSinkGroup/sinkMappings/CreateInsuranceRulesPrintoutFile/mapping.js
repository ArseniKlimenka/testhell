'use strict';

const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkResult, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';
    const productCode = sinkExchange.resolveContext('productCode');
    const isEBMGRETVTB = productGroupArray.SHOW_NOTE_ABOUT_SIGNED.includes(productCode);

    if (!isEPolicy || !isEBMGRETVTB) {
        return;
    }

    const InsuranceRulesAttachmentId = sinkExchange.resolveContext('InsuranceRulesAttachmentId');
    const contractId = sinkExchange.resolveContext('contractId');

    if (InsuranceRulesAttachmentId && InsuranceRulesAttachmentId.length > 0) {
        return;
    }

    const printoutsinfo = sinkExchange.resolveContext('printoutsInfo');
    const info = printoutsinfo.find(p => p.PrintoutName === 'InsuranceRulesPrintoutEpolicy');

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
