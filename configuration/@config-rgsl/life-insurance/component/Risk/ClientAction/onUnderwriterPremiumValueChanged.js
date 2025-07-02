const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function onUnderwriterPremiumValueChanged(input, ambientProperties) {

    const paymentFrequencyCode = getValue(input, 'rootContext.Body.basicConditions.paymentFrequency.paymentFrequencyCode', '1');
    const paymentCount = getPaymentCount(paymentFrequencyCode);

    input.data.underwriterPremiumPaymentFrequency = getValue(input, 'data.underwriterPremium', 0) / 1000 / paymentCount;
};

function getPaymentCount(paymentFrequencyCode) {

    let paymentCount = 1;
    switch (paymentFrequencyCode) {
        case '5':
            paymentCount = 12;
            break;
        case '3':
            paymentCount = 2;
            break;
        case '4':
            paymentCount = 4;
            break;
        default:
            paymentCount = 1;
    }

    return paymentCount;
}
