const { paymentOrderType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");
const { allocationDocumentType } = require('@config-rgsl/acc-base/lib/accConsts');

module.exports = function mapping(input, sinkExchange) {

    if (input.body.paymentOrderInformation.paymentOrderType !== paymentOrderType.PaymentRefund) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    documentTypeId: allocationDocumentType.POLICY,
                    bankStatementItemId: parseInt(input.body.paymentOrderInformation.referenceNumber),
                    fetchCancellations: true,
                },
                sort: [
                    {
                        fieldName: 'allocationId',
                        descending: true,
                    }
                ]
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
