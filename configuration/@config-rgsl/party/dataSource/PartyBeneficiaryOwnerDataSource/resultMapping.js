module.exports = function resultMapping(input) {

    const output = {};

    output.beneficiaryOwnerDesc = input.DESCRIPTION;
    output.beneficiaryOwnerCode = input.CODE;

    return output;

};
