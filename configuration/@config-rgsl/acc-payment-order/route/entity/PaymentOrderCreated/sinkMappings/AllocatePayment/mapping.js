'use strict';

const { reduceGroupBy } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(input, sinkExchange) {

    const poInfo = input.body.paymentOrderInformation;
    const referenceNo = input.number + '-IN';

    if (poInfo.paymentOrderType === paymentOrderType.PaymentRefund) {

        const payment = sinkExchange.resolveContext('paymentData');

        return {
            request: {
                bankStatementItemId: payment.bankStatementItemId,
                referenceNo: referenceNo,
                payAmount: input.body.paymentOrderAmounts.paymentAmountInDocCurrency,
            }
        };
    }

    if (poInfo.paymentOrderType === paymentOrderType.PolicyCancellation && poInfo.paymentOrderSubType === undefined) {
        const allocationsToCancel = sinkExchange.resolveContext('allocationsToCancel');

        if (allocationsToCancel.length !== 0) {
            const paymentOrderRequests = reduceGroupBy(allocationsToCancel,
                [
                    'bankStatementItemId',
                ],
                undefined,
                (p, c) => {
                    return {
                        payAmount: p.payAmount + c.payAmount,
                        docAmount: p.docAmount + c.docAmount,
                    };
                },
                {
                    payAmount: 0,
                    docAmount: 0,
                });

            return paymentOrderRequests.map(_ => ({
                request: {
                    bankStatementItemId: _.bankStatementItemId,
                    referenceNo: referenceNo,
                    payAmount: _.payAmount,
                    docAmount: _.docAmount,
                }
            }));
        }
    }
};
