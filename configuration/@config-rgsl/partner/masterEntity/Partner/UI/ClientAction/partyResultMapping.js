'use strict';

module.exports = function partyResultMapping(input) {

    const context = input.context;
    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];
        context.Body.partyId = selected.metadata.entityId;
        context.Body.partyCode = selected.metadata.code;
        context.Body.partyDisplayName = selected.resultData.fullName;
        context.Body.partyShortName = selected.resultData.shortName;

    }

};
