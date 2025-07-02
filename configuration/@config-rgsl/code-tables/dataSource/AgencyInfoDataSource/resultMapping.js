module.exports = function resultMapping(input) {

    const output = {};
    output.code = input.CODE;
    output.description = input.DESCRIPTION;
    output.validityStart = input.VALIDITY_START;
    output.validityEnd = input.VALIDITY_END;

    return output;
};
