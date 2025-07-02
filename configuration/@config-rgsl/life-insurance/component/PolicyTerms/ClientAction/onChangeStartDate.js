'use strict';

const { productCode } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { calcEndDate } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');
const { setPaymentPeriodString } = require('@config-rgsl/life-insurance/lib/policyTermsHelper');

module.exports = function onChangeStartDate(input, ambientProperties) {

    const manualCorrection = input.manualCorrection ?? false;
    const isCollectivePolicy = ambientProperties.configurationCodeName == productCode.CollectiveLifeInsurancePolicy;
    if (!manualCorrection && !isCollectivePolicy) {
        return;
    }

    const startDate = input.componentContext.startDate;
    input.componentContext.effectiveDate = startDate;

    calcEndDate(input, ambientProperties);
    setPaymentPeriodString(input, ambientProperties);

    this.rebindComponent();
};
