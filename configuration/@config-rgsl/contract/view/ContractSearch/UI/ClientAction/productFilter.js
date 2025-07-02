'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function productFilter(input, ambientProperties) {

    let items = input.items;

    const productGroups = getValue(input, 'context.request.data.criteria.productGroups', []);
    if (productGroups.length > 0)
    { items = items.filter(item => productGroups.includes(item.productGroup)); }

    return items;

};
