const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function paymentLinesFooterContent(input, ambientProperties) {

    const amount = amendmentUtils.calculateTotalCancellationAmount(input.context.Body);

    return amount;
};
