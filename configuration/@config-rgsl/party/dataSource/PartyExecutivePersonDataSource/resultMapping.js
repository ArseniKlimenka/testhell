module.exports = function resultMapping(input) {

    const output = {};

    output.executivePersonDesc = input.DESCRIPTION;
    output.executivePersonCode = input.CODE;

    return output;

};
