module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.description = null;

    if (input.data.criteria.description) {
        output.parameters.description = '%' + input.data.criteria.description + '%';
    }

    return output;

};
