'use strict';

const { endowmentEventType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function filterPaymentVariant(input) {

    const currentItems = input.items;
    const filteredItems = currentItems;

    const eventType = input.context.Body.mainAttributes?.eventType?.code;

    if (eventType !== endowmentEventType.code) {

        return [];
    }

    return filteredItems;
};
