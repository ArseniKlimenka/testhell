module.exports = function (input) {
    const output = {
        parameters: {
            masterPartyCode: input.data.criteria.masterPartyCode,
            duplicatePartyCode: input.data.criteria.duplicatePartyCode
        }
    };

    return output;
};
