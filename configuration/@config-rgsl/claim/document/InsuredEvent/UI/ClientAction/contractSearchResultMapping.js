'use strict';

module.exports = async function contractSearchResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        input.data.Body.contract = {};
        input.data.Body.contract.number = lookupSelection[0].resultData.number;
        input.data.Body.contract.holder = lookupSelection[0].resultData.policyHolderName;
        input.data.Body.contract.configurationName = lookupSelection[0].metadata.configurationName;
        input.data.Body.contract.configurationVersion = lookupSelection[0].metadata.configurationVersion;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
