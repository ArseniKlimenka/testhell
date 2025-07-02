const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function organisationalFormResponseMapping(input, ambientProperties) {
    let output = [];

    const organisationalForm = getValue(input, 'context.Body.PartyOrganisationData.organisationalForm', undefined);

    if (input.searchText || organisationalForm == undefined) {
        if (input && input.response && input.response.data && input.response.data && input.response.data.length > 0) {
            output = _.map(input.response.data, (elem) => {
                return elem.resultData;
            });
        }
    }
    else {
        output.push(organisationalForm);
    }

    return output;
};
