'use strict';

const { commissionActTypeId } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = function filter(input) {
    const items = input.items.filter(_ => _ != commissionActTypeId.Migration || input.componentContext === commissionActTypeId.Migration);
    return items;
};
