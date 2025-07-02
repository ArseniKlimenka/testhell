'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function beneficiaryResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const partyType = lookupSelection[0].resultData.partyType ?? lookupSelection[0].metadata.configurationName;

        input.data.partyCode = lookupSelection[0].resultData.code;
        input.data.partyType = partyType;
        input.data.fullName = lookupSelection[0].resultData.fullName;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
