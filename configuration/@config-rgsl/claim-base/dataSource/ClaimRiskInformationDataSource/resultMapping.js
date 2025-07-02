'use strict';

module.exports = function resultMapping(input) {

    const riskIsContributionRefund = input.PAYMENT_FORM == 'SurrenderValues';

    const result = {
        riskCode: input.CODE,
        riskType: input.TYPE,
        riskBusinessLine: input.BUSINESS_LINE,
        riskShortDescription: input.SHORT_DESCRIPTION,
        riskFullDescription: input.FULL_DESCRIPTION,
        riskNote: input.NOTE,
        riskPaymentForm: input.PAYMENT_FORM,
        riskGroup: input.RISKS_GROUP,
        riskFnsType: input.FNS_TYPE,
        riskIsContributionRefund: riskIsContributionRefund
    };

    return result;
};
