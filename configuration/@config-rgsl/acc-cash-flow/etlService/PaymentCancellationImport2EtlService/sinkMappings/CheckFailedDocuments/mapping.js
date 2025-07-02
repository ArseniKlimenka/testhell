'use strict';

module.exports = function mapping(input, sinkExchange) {
    const paymentCancellationId = this.businessContext.etlServiceInput.paymentCancellationId.toLowerCase();

    return {
        input: {
            data: {
                criteria: {
                    paymentCancellationId: paymentCancellationId,
                    notCancelled: true,
                }
            }
        }
    };
};
