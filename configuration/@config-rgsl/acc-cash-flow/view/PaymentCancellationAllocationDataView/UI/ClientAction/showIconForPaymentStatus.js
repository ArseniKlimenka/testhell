'use-strict';

const { bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');

/**
 * @translationKey {translationKey} PaymentCancelledIconTitle
 * @translationKey {translationKey} PaymentNotCancelledIconTitle
 */

module.exports = function showIconForPaymentStatus(input, ambientProperties) {

    if (input.data.paymentStatusId === bankStatementItemStatusId.CANCELLED) {
        return {
            name: 'Check',
            size: 'Large',
            color: 'Success',
            tooltip: {
                title: `${ambientProperties.configurationCodeName.toUpperCase()}.PaymentCancelledIconTitle`
            }
        };
    }

    return {
        name: 'Exclamation',
        size: 'Large',
        color: 'Danger',
        tooltip: {
            title: `${ambientProperties.configurationCodeName.toUpperCase()}.PaymentNotCancelledIconTitle`
        }
    };
};
