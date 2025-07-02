module.exports = function resultMapping(input) {
    const output = {};

    output.id = input.APPLICATION_ROLE_ID;
    output.code = input.CODE_NAME;

    return output;
};
