module.exports = function resultMapping(input) {

    const output = {};

    output.insuranceProgramCode = input.CODE;
    output.insuranceProgramDescription = input.DESCRIPTION;

    return output;

};
