const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');

module.exports = function partyCitizenshipResponseMapping(input, ambientProperties) {
    let output = [];

    const citizenship = getValue(input, `${partyValidationHelper.rootName(input)}citizenship`);

    if (input.searchText || citizenship === undefined || citizenship.length === 0) {
        if (input && input.response && input.response.data && input.response.data && input.response.data.length > 0) {
            output = _.map(input.response.data, (elem) => {
                return elem.resultData;
            });
        }
    }
    else {
        output.push(citizenship);
    }

    return output;
};
