'use strict';

const { changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function isPaymentGraceDateProlongationEnable(input) {

    const state = input.context.State.Code;
    const amendmentType = input.context.Dimensions.amendmentType;
    const currentChangeTypes = input.data.amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.changeTypes ?? [];

    return state != 'Activated'
        && amendmentType == 'NonFinancialChange'
        && currentChangeTypes.find(x => x == changeTypes.paymentGraceDateProlongation);
};
