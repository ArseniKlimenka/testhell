'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function productFilter(input, ambientProperties) {

    let items = input.items;

    const productGroup = getValue(input, 'context.request.data.criteria.productGroup');
    if (productGroup)
    { items = items.filter(item => item.productGroup == productGroup); }

    return items;

};
