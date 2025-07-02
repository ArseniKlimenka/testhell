module.exports = function resultMapping(input) {

    const output = {};

    output.creditProgramCode = input.CODE;
    output.creditProgramDescription = input.DESCRIPTION;
    output.creditProgramVersion = input.PROGRAM_VERSION;

    return output;

};
