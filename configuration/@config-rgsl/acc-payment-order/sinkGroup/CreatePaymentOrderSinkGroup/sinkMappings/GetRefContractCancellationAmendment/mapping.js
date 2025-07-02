'use strict';

const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(sinkInput, sinkExchange) {

    if (sinkInput.paymentOrderType === paymentOrderType.PolicyCancellation) {
        return {
            input: {
                data: {
                    criteria: {
                        contractNumber: sinkInput.referenceNumber,
                        cancellationNumber: sinkInput.cancellationNumber,
                        recipientPartyCode: sinkInput.cancellationRecipientCode
                    }
                }
            }
        };
    }

    if (sinkInput.paymentOrderType === paymentOrderType.PaymentRefund && sinkExchange.paymentData.lastDocumentNo) {

        return {
            input: {
                data: {
                    criteria: {
                        contractNumber: sinkExchange.paymentData.lastDocumentNo,
                        // if cancellationNumber was not defined, it will fetch last cancellation amendment
                    }
                }
            }
        };
    }
};
