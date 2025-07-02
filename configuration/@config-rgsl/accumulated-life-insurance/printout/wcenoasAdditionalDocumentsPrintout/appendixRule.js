'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { newRules, product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');


module.exports = function appendixRule(input) {

    const appendix = [];

    const issueDate = input.body.basicConditions?.issueDate;
    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isWCEN3OAS = productCode === product.WCEN3OAS;

    // Памятка по страховому случаю
    if (isWCEN3OAS) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/memoInsuredEventWCEN3OAS.pdf`,
            mode: 'Append'
        });
    } else if (dateTimeUtils.isBefore(issueDate, newRules.WCENOAS.startDate)) {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/memoInsuredEventWCENOAS.pdf`,
            mode: 'Append'
        });
    } else {
        appendix.push({
            name: `AccumulatedAppendixImageContainer/img/memoInsuredEventWCENOAS_ver2.pdf`,
            mode: 'Append'
        });
    }
    // Памятка по оплате
    appendix.push({
        name: `AccumulatedAppendixImageContainer/img/reminderPaymentWCENOASandCAPC.pdf`,
        mode: 'Append'
    });

    return appendix;
};
