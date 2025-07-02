const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, sinkExchange) {

    const type = input.body.paymentOrderInformation.paymentOrderType;

    if (type === paymentOrderType.PolicyCancellation || type === paymentOrderType.Claim) {

        return {
            input: {
                data: {
                    criteria: {
                        contractNumber: input.body.paymentOrderInformation.contractNumber,
                    }
                }
            }
        };
    }
};
