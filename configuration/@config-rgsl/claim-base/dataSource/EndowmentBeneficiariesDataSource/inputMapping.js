module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.documentNumber = null;

    if (input.data.criteria.documentNumber) {

        output.parameters.documentNumber = input.data.criteria.documentNumber;
    }

    return output;
};
