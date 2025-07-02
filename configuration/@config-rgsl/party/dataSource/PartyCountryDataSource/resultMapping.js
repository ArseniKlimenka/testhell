module.exports = function resultMapping(input) {

    const output = {};

    output.countryCode = input.COUNTRY_CODE;
    output.countryShortName = input.COUNTRY_SHORT_NAME;
    output.countryFullName = input.COUNTRY_FULL_NAME === null ? undefined : input.COUNTRY_FULL_NAME;
    output.alfa2 = input.ALFA_2;
    output.alfa3 = input.ALFA_3;

    return output;

};
