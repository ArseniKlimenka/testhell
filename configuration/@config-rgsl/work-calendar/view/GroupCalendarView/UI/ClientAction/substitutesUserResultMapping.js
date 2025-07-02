'use strict';

module.exports = function substitutesUserResultMapping(input) {
    const { getLookupSelection, data, context } = input;
    const lookupSelection = getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        data.substituteUserId = selected.resultData.userId;
        data.substituteUserDisplayName = selected.resultData.partyName || selected.resultData.username;
    }
};
