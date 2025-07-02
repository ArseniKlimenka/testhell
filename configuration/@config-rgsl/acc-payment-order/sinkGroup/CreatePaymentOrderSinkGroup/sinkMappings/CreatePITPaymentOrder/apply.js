const { paymentOrderType, paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const integrationServiceInput = sinkExchange.integrationServiceInput;
    const createdPaymentOrders = sinkExchange.createdPaymentOrders ?? [];

    const paymentOrder = {
        paymentOrderNumber: sinkResult.documentNumber,
        paymentOrderType: integrationServiceInput.paymentOrderType,
        paymentOrderSubtype: getPOSubtype(integrationServiceInput.paymentOrderType, integrationServiceInput.paymentOrderSubtype)
    };

    createdPaymentOrders.push(paymentOrder);
    sinkExchange.createdPaymentOrders = createdPaymentOrders;
};

function getPOSubtype(poType, poSubtype) {

    if (poType === paymentOrderType.PolicyCancellation) {

        return paymentOrderSubType.PIT;
    }
    else if (poType === paymentOrderType.Claim && poSubtype === paymentOrderSubType.Endowment) {

        return paymentOrderSubType.EndowmentPIT;
    }


    throw 'Unsupported payment order type for PIT creation!';

}
