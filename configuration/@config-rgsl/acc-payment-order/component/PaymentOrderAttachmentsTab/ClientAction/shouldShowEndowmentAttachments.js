const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");

module.exports = function shouldShowEndowmentAttachments(input, ambientProperties) {

    const currentPaymentOrderType = getValue(input, 'context.Body.paymentOrderInformation.paymentOrderType');
    const currentPaymentOrderSubType = getValue(input, 'context.Body.paymentOrderInformation.paymentOrderSubType');

    return currentPaymentOrderType === paymentOrderType.Claim &&
    currentPaymentOrderSubType === paymentOrderSubType.Endowment &&
    input.rootContext.ClientViewModel.shouldShowExternalAttachments;
};
