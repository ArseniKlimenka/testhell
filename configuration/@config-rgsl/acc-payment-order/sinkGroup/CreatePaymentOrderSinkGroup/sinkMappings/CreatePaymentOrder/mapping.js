'use strict';

const {
    setCommonPaymentOrderData,
    setDataForPaymentRefund,
    setDataForPolicyCancellation,
    setDataForCommission,
    setDataForClaim,
    setDataForEndowment,
    setDataForCollectiveClaim
} = require('@config-rgsl/acc-payment-order/lib/paymentOrderBodyHelper');

const { paymentOrderType, paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function mapping(integrationServiceInput, sinkExchange) {

    const paymentOrder = {
        paymentOrderInformation: {},
        paymentOrderAmounts: {},
        recipientInformation: {},
        paymentOrderNetting: {}
    };

    setCommonPaymentOrderData(paymentOrder, integrationServiceInput);

    if (integrationServiceInput.paymentOrderType === paymentOrderType.PaymentRefund && sinkExchange.paymentData) {

        setDataForPaymentRefund(paymentOrder, sinkExchange, integrationServiceInput.manualAmount);
    }
    else if (integrationServiceInput.paymentOrderType === paymentOrderType.PolicyCancellation && sinkExchange.contractData) {

        setDataForPolicyCancellation(paymentOrder, sinkExchange);
    }
    else if (integrationServiceInput.paymentOrderType === paymentOrderType.Commission && sinkExchange.commissionActData) {

        setDataForCommission(paymentOrder, sinkExchange);
    }
    else if (integrationServiceInput.paymentOrderType === paymentOrderType.Claim &&
        !integrationServiceInput.paymentOrderSubtype &&
        sinkExchange.claimData) {

        setDataForClaim(paymentOrder, sinkExchange, integrationServiceInput);
    }
    else if (integrationServiceInput.paymentOrderType === paymentOrderType.Claim &&
        integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Collective &&
        sinkExchange.claimData) {

        setDataForCollectiveClaim(paymentOrder, sinkExchange, integrationServiceInput);
    }
    else if (integrationServiceInput.paymentOrderType === paymentOrderType.Claim &&
        integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Endowment &&
        sinkExchange.endowmentData) {

        setDataForEndowment(paymentOrder, sinkExchange, integrationServiceInput);
    }

    if (paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency !== 0) {
        return { body: paymentOrder };
    }
};

