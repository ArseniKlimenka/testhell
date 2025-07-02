'use strict';

const { productGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkResult, sinkExchange) {

    const body = sinkResult.body;
    const productGroupCode = body?.productConfiguration?.productGroupCode;
    if (productGroupCode != productGroup.NS.descriptionRU) {
        return;
    }

    const existedInsuranceRulesAttachmentId = sinkExchange.resolveContext('existedInsuranceRulesAttachmentId');
    const contractId = sinkResult.id;
    if (existedInsuranceRulesAttachmentId && existedInsuranceRulesAttachmentId?.length > 0) {
        return;
    }

    return {
        printoutRelations: [
            {
                codeName: "AccidentLifeInsurancePolicyToSportsmanInsuranceRulesPrintoutRelation",
                mode: 'WriteFile',
            }
        ],
        entity: {
            id: contractId
        }
    };

};
