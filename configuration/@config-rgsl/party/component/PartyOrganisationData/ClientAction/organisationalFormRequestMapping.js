'use strict';

const { getValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");

module.exports = function organisationalFormRequestMapping(input) {

    const searchCriteria = {};
    searchCriteria.organisationalFormSearchText = getValue(input, 'searchText', 'qwerty');

    return {
        data: {
            criteria: searchCriteria
        }
    };
};
