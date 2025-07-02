'use strict';

const { operationsOnlyTypes } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function filterEventTypes(input, ambientProperties) {

    const currentItems = input.items;
    let filteredItems = currentItems;

    filteredItems = currentItems.filter(item => operationsOnlyTypes.includes(item.value.code));

    return filteredItems;
};
