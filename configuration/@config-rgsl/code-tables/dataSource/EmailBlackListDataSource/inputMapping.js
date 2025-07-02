module.exports = function (input) {

    const output = {};
    output.parameters = {};

    if (input.data.criteria.email) {

        output.parameters.email = input.data.criteria.email;
    }

    return output;
};
