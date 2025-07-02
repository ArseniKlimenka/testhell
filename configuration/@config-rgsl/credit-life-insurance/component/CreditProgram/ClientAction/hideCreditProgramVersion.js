module.exports = function hideCreditProgramVersion(input) {

    const creditProgramVersion = input.componentContext.creditProgramVersion;

    return !creditProgramVersion;

};
