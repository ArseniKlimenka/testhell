module.exports = function substituteUserResultMapping(input) {
    const { getLookupSelection, data } = input;
    const lookupSelection = getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {
        const selected = lookupSelection[0];
        data.substituteUserId = selected.resultData.userId;
        data.substituteUserDisplayName = selected.resultData.displayName || selected.resultData.username;
    }
};
