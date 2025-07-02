module.exports = function resultMapping(input) {

    const output = {};

    output.segmentCode = input.CODE;
    output.segmentDesc = input.DESCRIPTION;

    return output;

};
