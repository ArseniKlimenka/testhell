module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.contractNumber = null;
    output.parameters.atDate = null;

    if (input.data.criteria.contractNumber) {

        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.atDate) {

        output.parameters.atDate = input.data.criteria.atDate;
    }

    return output;
};
