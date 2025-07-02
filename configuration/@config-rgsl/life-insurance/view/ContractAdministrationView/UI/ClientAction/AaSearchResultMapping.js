'use strict';

module.exports = async function AaSearchResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        input.rootContext.Body.agentAgreement = {
            number: lookupSelection[0].resultData.documentCode,
            displayNumber: `${lookupSelection[0].resultData.manualNumber ?? lookupSelection[0].resultData.documentCode}/${lookupSelection[0].resultData.externalNumber}`,
        };
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
