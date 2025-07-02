'use strict';

const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, sinkExchange) {

    const poInfo = input.body.paymentOrderInformation;
    if (poInfo.paymentOrderType === paymentOrderType.PolicyCancellation && poInfo.paymentOrderSubType === undefined) {

        const allocationsToCancel = sinkExchange.resolveContext('allocationsToCancel');

        if (allocationsToCancel.length === 0) {
            return;
        }

        return {
            request: {
                allocationIds: allocationsToCancel.map(_ => _.allocationId),
                cancelOverpayments: true,
            },
        };
    }
};
