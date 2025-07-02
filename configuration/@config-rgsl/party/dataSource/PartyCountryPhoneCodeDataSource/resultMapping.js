module.exports = function resultMapping(input) {

    const output = {};

    output.countryCode = input.COUNTRY_CODE;
    output.alfa2 = input.ALFA_2;
    output.countryShortName = input.COUNTRY_SHORT_NAME;
    output.countryPhoneCode = input.PHONE_CODE;

    return output;

};
