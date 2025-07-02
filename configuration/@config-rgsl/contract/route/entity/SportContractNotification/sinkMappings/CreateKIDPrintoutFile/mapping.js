'use strict';

const { productGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(sinkResult, sinkExchange) {

    const body = sinkResult.body;
    const productGroupCode = body?.productConfiguration?.productGroupCode;
    if (productGroupCode != productGroup.NS.descriptionRU) {
        return;
    }

    const existedKidAttachmentId = sinkExchange.resolveContext('existedKidAttachmentId');
    const contractId = sinkResult.id;

    if (existedKidAttachmentId) {
        return;
    }

    return {
        printoutRelations: [
            {
                codeName: 'AccidentLifeInsurancePolicyToKIDPrintoutRelation',
                mode: 'WriteFile',
            }
        ],
        entity: {
            id: contractId
        }
    };
};
