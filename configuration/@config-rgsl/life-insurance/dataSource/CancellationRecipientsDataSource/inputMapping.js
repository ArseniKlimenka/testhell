module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.amendmentNumber = null;

    if (input.data.criteria.amendmentNumber) {

        output.parameters.amendmentNumber = input.data.criteria.amendmentNumber;
    }

    return output;
};
