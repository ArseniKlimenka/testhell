module.exports = function resultMapping(input) {

    const output = {};
    output.id = input.ID;
    output.email = input.EMAIL;

    return output;
};
