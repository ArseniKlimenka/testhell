'use strict';

module.exports = function policyHolderResultMapping(input) {

    const lookupSelection = input.getLookupSelection();
    const view = this.view;

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const partyType = lookupSelection[0].resultData.partyType ?? lookupSelection[0].metadata.configurationName;

        input.context.request.data.criteria.policyHolderCode = lookupSelection[0].resultData.code;
        input.context.request.data.criteria.policyHolderType = partyType;
        input.context.request.data.criteria.policyHolderName = lookupSelection[0].resultData.fullName;
    }

    view.rebind();
    view.reevaluateRules();
    view.validate();
};
