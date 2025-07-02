module.exports = function (input) {
    const output = {};
    output.parameters = {};
    output.parameters.code = null;
    output.parameters.name = null;

    if (input.data.criteria.code) {
        output.parameters.code = input.data.criteria.code + '%';
    }

    if (input.data.criteria.name) {
        output.parameters.name = '%' + input.data.criteria.name + '%';
    }

    return output;
};
