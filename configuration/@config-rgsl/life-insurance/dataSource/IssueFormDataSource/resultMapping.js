module.exports = function resultMapping(input) {

    const output = {};

    output.issueFormCode = input.CODE;
    output.issueFormDescription = input.DESCRIPTION;

    return output;

};
