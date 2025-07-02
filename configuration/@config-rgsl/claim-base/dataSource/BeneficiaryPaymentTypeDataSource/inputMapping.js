module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.code = null;
    output.parameters.codes = null;
    output.parameters.description = null;

    if (input.data.criteria.code) {

        output.parameters.code = input.data.criteria.code;
    }

    if (input.data.criteria.codes) {

        output.parameters.codes = input.data.criteria.codes;
    }

    if (input.data.criteria.description) {

        output.parameters.description = '%' + input.data.criteria.description + '%';
    }

    return output;
};
