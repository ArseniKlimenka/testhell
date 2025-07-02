'use strict';

module.exports = function injuryLookupResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        input.data.injuryDetails = {
            code: lookupSelection[0].resultData.code,
            description: lookupSelection[0].resultData.description,
            defaultPymentPercentage: lookupSelection[0].resultData.paymentPercentage,
            group: lookupSelection[0].resultData.group,
            subgroupLevel1: lookupSelection[0].resultData.subgroupLevel1,
            note: lookupSelection[0].resultData.note
        };

        input.data.paymentInjuryPercentage = lookupSelection[0].resultData.paymentPercentage;
        input.data.note = lookupSelection[0].resultData.note;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
