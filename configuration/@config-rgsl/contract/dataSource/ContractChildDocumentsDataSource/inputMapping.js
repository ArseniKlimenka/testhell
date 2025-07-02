module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.contractNumber = input.data.criteria.contractNumber;

    if (input.data.criteria.excludeStates && input.data.criteria.excludeStates.length > 0) {
        output.parameters.excludeStates = input.data.criteria.excludeStates;
    }

    return output;
};
