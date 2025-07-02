const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

module.exports = function partyCountryPlaceResponseMapping(input, ambientProperties) {
    let output = [];

    const countryPlace = getValue(input, `${partyValidationHelper.rootName(input)}countryPlace`);

    if (input.searchText || countryPlace == undefined) {
        if (input && input.response && input.response.data && input.response.data && input.response.data.length > 0) {
            output = _.map(input.response.data, (elem) => {
                return elem.resultData;
            });
        }
    }
    else {
        output.push(countryPlace);
    }

    return output;
};
