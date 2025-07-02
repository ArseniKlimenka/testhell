'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.currencySearchText = null;
    output.parameters.currencyCode = null;

    const criteria = input && input.data && input.data.criteria;
    if (criteria) {
        if (criteria.currencySearchText && criteria.currencySearchText.length > 0) {
            output.parameters.currencySearchText = '%' + criteria.currencySearchText + '%';
        }
        if (input.data.criteria.id) {
            output.parameters.id = criteria.id;
        }
        if (input.data.criteria.currencyCode) {
            output.parameters.currencyCode = criteria.currencyCode;
        }
    }

    output.sort = {};
    output.sort['PRIORITY'] = 'asc';

    return output;

};
