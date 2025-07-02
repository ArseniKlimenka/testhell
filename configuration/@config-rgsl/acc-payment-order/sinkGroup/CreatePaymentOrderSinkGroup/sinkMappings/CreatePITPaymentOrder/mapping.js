'use strict';

const {setCommonPaymentOrderData, setPITDataForPolicyCancellation, setPITDataForPolicyEndowment} = require('@config-rgsl/acc-payment-order/lib/paymentOrderBodyHelper');
const { paymentOrderType, paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { paymentLineType } = require('@config-rgsl/acc-payment-order/lib/paymentOrderInternalConst');
const { endowmentPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(integrationServiceInput, sinkExchange) {

    if (integrationServiceInput.paymentOrderType !== paymentOrderType.PolicyCancellation &&
        integrationServiceInput.paymentOrderSubtype !== paymentOrderSubType.Endowment) {

        return;
    }

    const contractLines = sinkExchange.contractData?.paymentLines || [];
    const endowmentLines = sinkExchange.endowmentData?.paymentLines || [];
    const pitLine = contractLines.find(line => line.paymentType === paymentLineType.PIT);
    const endowmentPitLine = endowmentLines.find(line => line.lineType === endowmentPaymentLineType.PIT);

    if (!pitLine && !endowmentPitLine) {

        return;
    }

    const paymentOrder = {
        paymentOrderInformation: {},
        paymentOrderAmounts: {},
        recipientInformation: {},
        paymentOrderNetting: {}
    };

    setCommonPaymentOrderData(paymentOrder, integrationServiceInput);

    if (integrationServiceInput.paymentOrderType === paymentOrderType.PolicyCancellation) {

        setPITDataForPolicyCancellation(paymentOrder, sinkExchange);
    }

    if (integrationServiceInput.paymentOrderType === paymentOrderType.Claim && integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Endowment) {

        setPITDataForPolicyEndowment(paymentOrder, sinkExchange);
    }

    if (paymentOrder.paymentOrderAmounts.paymentAmountInDocCurrency !== 0) {
        return { body: paymentOrder };
    }
};
