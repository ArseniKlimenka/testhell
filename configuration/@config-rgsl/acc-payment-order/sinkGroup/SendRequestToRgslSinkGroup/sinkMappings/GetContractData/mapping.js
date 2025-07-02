const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function mapping(input, sinkExchange) {

    const poType = input.body.paymentOrderInformation.paymentOrderType;

    if (poType === paymentOrderType.PolicyCancellation || poType === paymentOrderType.Claim) {

        return {
            input: {
                data: {
                    criteria: {
                        number: input.body.paymentOrderInformation.contractNumber,
                    }
                },
                paging: {
                    page: 0,
                    pageSize: 15
                }
            }
        };
    }

    const allocationDocumentNo = sinkExchange.resolveContext("allocationDocumentNo");

    if (poType === paymentOrderType.PaymentRefund && allocationDocumentNo) {

        return {
            input: {
                data: {
                    criteria: {
                        number: allocationDocumentNo,
                    }
                },
                paging: {
                    page: 0,
                    pageSize: 15
                }
            }
        };
    }
};
