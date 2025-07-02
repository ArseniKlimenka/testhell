module.exports = function resultMapping(input) {

    const output = {};

    output.fatcaClassCode = input.CODE;
    output.fatcaClassDesc = input.DESCRIPTION;

    return output;

};
