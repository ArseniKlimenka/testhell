const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');


module.exports = function (input) {

    if (!input || !input.data || !input.data.criteria) {
        throw "Input criteria was not defined!";
    }

    const output = {};

    output.parameters = {};

    if (input.data.criteria.contractNumber) {
        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.executedOnFrom) {
        output.parameters.executedOnFrom = input.data.criteria.executedOnFrom;
    }

    if (input.data.criteria.executedOnTo) {
        output.parameters.executedOnTo = input.data.criteria.executedOnTo;
    }

    return output;
};
