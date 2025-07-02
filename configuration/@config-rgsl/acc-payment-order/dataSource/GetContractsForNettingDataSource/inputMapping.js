module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.contractNumber = null;
    output.parameters.holderCode = null;

    if (input.data.criteria.contractNumber) {

        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.contractNumbers) {

        output.parameters.contractNumbers = input.data.criteria.contractNumbers;
    }

    if (input.data.criteria.holderCode) {

        output.parameters.holderCode = input.data.criteria.holderCode;
    }

    return output;
};
