module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.code = null;
    output.parameters.description = null;
    output.parameters.fullText = null;

    if (input.data.criteria.code) {

        output.parameters.code = input.data.criteria.code;
    }

    if (input.data.criteria.description) {

        output.parameters.description = '%' + input.data.criteria.description + '%';
    }

    if (input.data.criteria.fullText) {

        output.parameters.fullText = '%' + input.data.criteria.fullText + '%';
    }

    return output;
};
