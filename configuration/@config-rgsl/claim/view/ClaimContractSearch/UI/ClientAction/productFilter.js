'use strict';

module.exports = function productFilter(input) {

    let items = input.items;
    const productGroup = input.context.request?.data?.criteria?.productGroup;

    if (productGroup) {

        items = items.filter(item => item.productGroup == productGroup);
    }

    return items;
};
