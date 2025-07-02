const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function agentAgreementSelectionOnLoad(input) {

    const partner = getValue(input, 'context.Body.partner') || {};

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
    lookUp.getControlByElementId('agentSearchLookup').disableElement();

    lookUp.setSearchRequest({
        data: {
            criteria: {
                agentName: partner.partnerDescription,
                agentServiceProviderCode: partner.partnerCode,
                documentStates: ["Activated"]
            }
        }
    });

    this.getLookup().search();
};
