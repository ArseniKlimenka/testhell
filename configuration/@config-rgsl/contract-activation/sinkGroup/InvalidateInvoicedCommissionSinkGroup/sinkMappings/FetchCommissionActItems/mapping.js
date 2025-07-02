'use strict';

const { commissionActItemStatusId } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = function fetch(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    actId: input.actId,
                    statusIds: [commissionActItemStatusId.NORMAL, commissionActItemStatusId.NEW, commissionActItemStatusId.RENEW],
                }
            }
        }
    };
};
