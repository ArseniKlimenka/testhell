module.exports = function (input) {

    const output = {};
    output.parameters = {};

    output.parameters.originalDocumentnumber = input.data.criteria.originalDocumentnumber;

    return output;
};
