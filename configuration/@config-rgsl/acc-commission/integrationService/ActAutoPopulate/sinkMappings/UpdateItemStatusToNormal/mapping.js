'use strict';

const { commissionActItemStatusId } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = function mapping(sinkInput, sinkExchange) {

    if (sinkInput.renew) {
        return;
    }

    const act = sinkExchange.resolveContext('act');

    return {
        actId: act.actId,
        newStatus: commissionActItemStatusId.NORMAL,
        itemIds: null,
    };
};
