'use strict';

module.exports = function agentAgreementSelectionOnLoad(input) {

    const partner = input.context.Body.mainInsuranceConditions.partner;

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
        'effectiveTo',
        'productCode'
    ];

    lookUp.setProtectedFields(protectedFields, true);
    lookUp.getControlByElementId('agentSearchLookup').disableElement();

    lookUp.setSearchRequest({
        data: {
            criteria: {
                agentName: partner.partnerShortDescription || partner.partnerDescription,
                agentServiceProviderCode: partner.partnerCode,
                effectiveFrom: input.context.Body.policyTerms.startDate,
                effectiveTo: input.context.Body.policyTerms.endDate,
                productCode: input.context.Body.mainInsuranceConditions.insuranceProduct.productCode,
                documentStates: ["Activated"]
            }
        }
    });
};
