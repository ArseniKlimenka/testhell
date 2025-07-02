module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.countryPhoneCodeSearchText = null;

    if (input.data && input.data.criteria
        && input.data.criteria.countryPhoneCodeSearchText
        && input.data.criteria.countryPhoneCodeSearchText.length > 0) {
        output.parameters.countryPhoneCodeSearchText = '%' + input.data.criteria.countryPhoneCodeSearchText.toUpperCase() + '%';
    }

    return output;

};
