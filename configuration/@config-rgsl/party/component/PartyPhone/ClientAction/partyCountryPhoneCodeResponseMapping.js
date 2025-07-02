const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function partyCountryPhoneCodeResponseMapping(input, ambientProperties) {
    let output = [];

    const countryCode = getValue(input, 'context.countryCode');

    if (input.searchText || countryCode == undefined) {
        if (input && input.response && input.response.data && input.response.data && input.response.data.length > 0) {
            output = _.map(input.response.data, (elem) => {
                return elem.resultData;
            });
        }
    }
    else {
        output.push(countryCode);
    }

    return output;
};
