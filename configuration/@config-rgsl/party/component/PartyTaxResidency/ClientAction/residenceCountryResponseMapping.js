const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

module.exports = function residenceCountryResponseMapping(input, ambientProperties) {
    let output = [];

    const residenceCountry = getValue(input, `${partyValidationHelper.rootName(input)}residenceCountry`);

    if (input.searchText || residenceCountry == undefined) {
        if (input && input.response && input.response.data && input.response.data && input.response.data.length > 0) {
            output = _.map(input.response.data, (elem) => {
                return elem.resultData;
            });
        }
    }
    else {
        output.push(residenceCountry);
    }

    return output;
};
