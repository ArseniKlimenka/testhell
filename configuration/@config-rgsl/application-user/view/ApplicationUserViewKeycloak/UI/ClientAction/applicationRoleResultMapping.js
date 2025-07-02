module.exports = function applicationRoleResultMapping(input) {
    const { getLookupSelection, data } = input;
    const lookupSelection = getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {
        const selected = lookupSelection[0];
        data.id = selected.resultData.id;
        data.codeName = selected.resultData.codeName;
    }
};
