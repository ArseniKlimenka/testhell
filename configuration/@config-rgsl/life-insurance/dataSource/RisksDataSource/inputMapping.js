module.exports = function (input) {

    const output = {};
    output.parameters = {};

    output.parameters.code = input.data.criteria.code;
    output.parameters.codes = input.data.criteria.codes;
    output.parameters.riskGroup = input.data.criteria.riskGroup;

    if (input.data.criteria.riskShortDescription) {

        output.parameters.riskShortDescription = '%' + input.data.criteria.riskShortDescription + '%';
    }

    return output;
};
