module.exports = function applicationUserGroupResultMapping(input) {
    const { getLookupSelection, data } = input;
    const lookupSelection = getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {
        const selected = lookupSelection[0];
        data.id = selected.resultData.id;
        data.code = selected.resultData.code;
        data.name = selected.resultData.name;
        data.nameLocalized = selected.resultData.nameLocalized;

        data.roles = selected.resultData.roles ? JSON.parse(selected.resultData.roles) : [];

        clearSubstituteUser(data);

        this.view.reevaluateRules();
    }
};

function clearSubstituteUser(data) {
    data.substituteUserId = undefined;
    data.substituteUserDisplayName = undefined;
}
