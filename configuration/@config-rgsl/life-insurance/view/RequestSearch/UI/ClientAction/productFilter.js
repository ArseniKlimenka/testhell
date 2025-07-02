'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function productFilter(input, ambientProperties) {

    let items = input.items;

    const contractProductGroup = getValue(input, 'context.request.data.criteria.contractProductGroup');
    if (contractProductGroup)
    { items = items.filter(item => item.productGroup == contractProductGroup); }

    return items;

};
