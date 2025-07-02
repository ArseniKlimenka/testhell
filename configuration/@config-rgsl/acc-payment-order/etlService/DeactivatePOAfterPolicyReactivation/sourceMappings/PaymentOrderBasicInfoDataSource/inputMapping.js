const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function dataSourceInputMapping(input) {

    return {
        data: {
            criteria: {
                contractNumber: input.contractNumber,
                paymentOrderTypes: [paymentOrderType.PolicyCancellation]
            }
        }
    };
};
