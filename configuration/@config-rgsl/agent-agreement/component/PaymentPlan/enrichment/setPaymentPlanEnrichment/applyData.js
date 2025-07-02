const paymentPlanUtils = require('@config-rgsl//life-insurance/lib/paymentPlanUtils');

module.exports = function applyData(input) {

    const body = this.businessContext.rootData;
    const dimensions = this.businessContext.configurationDimensions;
    const configurationCodeName = this.businessContext.configurationCodeName;
    if (!dimensions.configurationName) {
        dimensions.configurationName = configurationCodeName;
    }
    paymentPlanUtils.fillPaymentPlan(body, dimensions);
};
