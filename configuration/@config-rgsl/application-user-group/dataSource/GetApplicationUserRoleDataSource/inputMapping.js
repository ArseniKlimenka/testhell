module.exports = function (input) {
    const output = {};
    output.parameters = {};
    output.parameters.code = null;

    if (input.data.criteria.code) {
        output.parameters.code = JSON.stringify(input.data.criteria.code);
    }

    return output;
};
