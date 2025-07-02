
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function filterPaymentPlanItems(input) {

    const amendmentType = input.rootContext.Dimensions.amendmentType;
    const amendmentData = input.rootContext.Body.amendmentData?.finChangeAmendmentData;
    const effectiveDate = amendmentData?.mainAttributes?.amendmentEffectiveDate;

    if (amendmentType === changeAmendmentTypes.financialChange) {

        return effectiveDate <= input.obj.paymentPeriodStart;
    }


    return true;

};
