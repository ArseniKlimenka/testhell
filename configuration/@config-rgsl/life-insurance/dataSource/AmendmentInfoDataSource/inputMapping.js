module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.contractNumber = null;

    const criteria = input.data.criteria;

    if (criteria.contractNumber) {

        output.parameters.contractNumber = criteria.contractNumber;
    }

    if (criteria.amendmentNumber) {

        output.parameters.amendmentNumber = criteria.amendmentNumber;
    }

    if (criteria.amendmentType) {

        output.parameters.amendmentType = criteria.amendmentType;
    }

    if (criteria.amendmentState) {

        output.parameters.amendmentState = criteria.amendmentState;
    }

    return output;
};
