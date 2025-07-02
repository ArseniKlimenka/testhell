'use strict';

module.exports = function agentAgreementSelectionOnLoad(input) {

    const commissionContract = input.context.Body.commissionContract;

    const lookUp = this.getLookup();
    const protectedFields = [
        'conclusionDate',
        'documentState',
        'agentName',
        'agentServiceProviderCode',
        'agentPersonalNumber',
        'agentPartyType',
        'salesChannelCode',
        'effectiveFrom',
        'effectiveTo'
    ];

    lookUp.setProtectedFields(protectedFields, true);

    lookUp.setSearchRequest({
        data: {
            criteria: {
                agentName: commissionContract.agentName,
                agentServiceProviderCode: commissionContract.agentServiceProviderCode,
                effectiveFrom: commissionContract.effectiveFrom,
                effectiveTo: commissionContract.effectiveTo,
                documentStates: ["Activated"]
            }
        }
    });
};
