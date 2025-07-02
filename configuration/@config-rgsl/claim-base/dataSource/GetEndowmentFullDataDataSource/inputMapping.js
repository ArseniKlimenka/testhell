module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.endowmentNumber = input.data.criteria.endowmentNumber;

    return output;
};
