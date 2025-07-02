module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.description = null;

    if (input.data.criteria.ruleDescription) {

        output.parameters.description = `%${input.data.criteria.ruleDescription}%`;
    }

    return output;
};
