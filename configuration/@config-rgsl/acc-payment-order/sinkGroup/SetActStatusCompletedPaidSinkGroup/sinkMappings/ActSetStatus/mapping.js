'use strict';

const { commissionActStatusCode } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = function mapping(input, sinkExchange) {
    const actData = sinkExchange.resolveContext('actData');

    if (actData.stateCode === commissionActStatusCode.APPROVED) {

        return {
            businessNumber: input.actNo,
        };
    }
};
