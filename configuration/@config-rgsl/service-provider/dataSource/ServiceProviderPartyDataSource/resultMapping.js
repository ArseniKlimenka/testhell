module.exports = function resultMapping(input) {
    return {
        partyConfig: input.CONFIGURATION_CODE_NAME,
        fullName: input.FULL_NAME,
        shortName: input.SHORT_NAME,
        firstName: input.FIRST_NAME,
        lastName: input.LAST_NAME,
        middleName: input.MIDDLE_NAME,
    };
};
