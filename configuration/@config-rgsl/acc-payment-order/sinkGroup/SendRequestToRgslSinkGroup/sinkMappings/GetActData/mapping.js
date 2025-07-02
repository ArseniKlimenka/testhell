const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    if (input.body.paymentOrderInformation.paymentOrderType !== paymentOrderType.Commission) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    actNo: input.body.paymentOrderInformation.referenceNumber,
                }
            }
        }
    };
};
