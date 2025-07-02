module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.injuryGroup = null;
    output.parameters.ruleCode = null;

    if (input.data.criteria.ruleCode) {

        output.parameters.ruleCode = input.data.criteria.ruleCode;
    }

    if (input.data.criteria.injuryGroup) {

        output.parameters.injuryGroup = `%${input.data.criteria.injuryGroup}%`;
    }

    return output;
};
