const { paymentOrderCancellableStates } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');

module.exports = function mapping(lineInput, sinkExchange) {

    if (!paymentOrderCancellableStates.includes(lineInput.stateCode))
    {
        return;
    }

    return {
        businessNumber: lineInput.paymentOrderNumber,
        transition: {
            configurationName: 'PaymentOrder',
            transitionName: `${lineInput.stateCode}_to_Cancelled`,
            skipIfNotAvailable: true
        }
    };
};
