'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    let result = undefined;

    if (input) {

        result = {
            paymentOrderType: input.body.paymentOrderType,
            paymentOrderSubType: input.body.paymentOrderSubType,
            paymentOrderNumber: input.number,
            paymentOrderDate: input.body.paymentOrderDate,
            stateCode: translationUtils.getTranslation(`document/${input.metadata.configuration.name}/1`, 'states', null, input.stateCode),
            originalStateCode: input.stateCode,
            recipient: {
                code: input.body?.recipient?.code,
                name: input.body?.recipient?.name
            },
            totalPaymentAmount: input.body?.paymentOrderAmounts?.totalPaymentAmount,
            paymentOrderCurrencyCode: input.body?.paymentOrderAmounts?.paymentOrderCurrencyCode,
            paymentCurrencyCode: input.body?.paymentOrderAmounts?.paymentCurrencyCode,
            paymentDescription: input.body?.paymentOrderAmounts?.paymentDescription,
            isCoolOffPeriod: input.body.isCoolOffPeriod,
            insuranceAct: input.body.insuranceAct,
            contractNumber: input.body.contractNumber,
            referenceNumber: input.body.referenceNumber,
        };
    }

    return result;
};
