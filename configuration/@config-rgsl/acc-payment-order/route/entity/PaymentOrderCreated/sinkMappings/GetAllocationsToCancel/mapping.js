'use strict';

const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, sinkExchange) {

    const poInfo = input.body.paymentOrderInformation;
    if (poInfo.paymentOrderType === paymentOrderType.PolicyCancellation && poInfo.paymentOrderSubType === undefined) {
        return {
            input: {
                data: {
                    criteria: {
                        contractNumbers: [input.body.paymentOrderInformation.referenceNumber],
                    }
                }
            }
        };
    }
};
