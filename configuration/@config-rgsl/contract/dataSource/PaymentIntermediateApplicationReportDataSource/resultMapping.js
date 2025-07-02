const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function resultMapping(input) {

    const contractNumber = input.CONTRACT_NUMBER;
    const issueDate = formatHelper.formatDateTimeToString(input.ISSUE_DATE);
    const hasPaymentIntermediateApplication = input.HAS_PAYMENT_INTERMEDIATE_APPLICATION == 1 ? 'Да' : 'Нет';
    const paymentIntermediateApplicationDate = formatHelper.formatDateTimeToString(input.PAYMENT_INTERMEDIATE_APPLICATION_DATE);

    return {
        contractNumber,
        issueDate,
        hasPaymentIntermediateApplication,
        paymentIntermediateApplicationDate
    };
};
