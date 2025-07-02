'use strict';

module.exports = function agentAgreementOnSelected(input) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        input.data.agentAgreement = {};
        input.data.agentAgreement.id = selected.resultData.id;
        input.data.agentAgreement.number = selected.resultData.documentCode;
        input.data.agentAgreement.manualNumber = selected.resultData.manualNumber;
        input.data.agentAgreement.externalNumber = selected.resultData.externalNumber;
        input.data.agentAgreement.isTechnical = selected.resultData.isTechnical;

        const aaNumber = selected.resultData.manualNumber ?? selected.resultData.documentCode;
        input.data.agentAgreement.formatedNumber = `${aaNumber}/${selected.resultData.externalNumber}`;
        input.componentContext.policyCommissionItems = [];
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
