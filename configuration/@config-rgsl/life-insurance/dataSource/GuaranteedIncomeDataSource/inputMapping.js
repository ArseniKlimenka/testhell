'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    if (!criteria) {
        throw "Input criteria was not defined!";
    }

    const output = {};
    output.parameters = {};
    output.parameters.code = null;
    output.parameters.codes = null;
    output.parameters.description = null;

    if (criteria.code) {
        output.parameters.code = criteria.code;
    }

    if (criteria.codes) {
        output.parameters.codes = criteria.codes;
    }

    if (criteria.description) {
        output.parameters.description = '%' + criteria.description + '%';
    }

    if (criteria.searchText) {
        output.parameters.searchText = '%' + criteria.searchText + '%';
    }

    return output;
};
