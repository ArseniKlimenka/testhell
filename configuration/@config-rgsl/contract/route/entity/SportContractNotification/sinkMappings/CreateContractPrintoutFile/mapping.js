'use strict';

const { businessRules } = require('@adinsure/runtime');

module.exports = function mapping(sinkResult, sinkExchange) {

    const body = sinkResult.body;
    const policyPrintout = body?.productConfiguration?.policyPrintout;
    if (policyPrintout != "sportPolicy") {
        return;
    }

    const existedContractAttachmentId = sinkExchange.resolveContext('contractAttachmentId');
    const contractId = sinkResult.id;

    if (existedContractAttachmentId) {

        return;
    }

    return {
        printoutRelations: [
            {
                codeName: 'AccidentLifeInsurancePolicyToAccidentSportPolicyPrintoutRelation',
                mode: 'WriteFile',
            }
        ],
        entity: {
            id: contractId
        }
    };
};
