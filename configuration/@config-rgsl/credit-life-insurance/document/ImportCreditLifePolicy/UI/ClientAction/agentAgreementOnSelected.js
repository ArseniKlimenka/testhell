'use strict';

module.exports = function agentAgreementOnSelected(input) {

    const body = input.context.Body;
    if (!body.agentAgreement) { body.agentAgreement = {}; }

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        body.agentAgreement = {};
        body.agentAgreement.id = selected.resultData.id;
        body.agentAgreement.number = selected.resultData.documentCode;
        body.agentAgreement.manualNumber = selected.resultData.manualNumber;
        body.agentAgreement.externalNumber = selected.resultData.externalNumber;

        const aaNumber = selected.resultData.manualNumber ? selected.resultData.manualNumber : selected.resultData.documentCode;
        body.agentAgreement.formatedNumber = `${aaNumber}/${selected.resultData.externalNumber}`;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
