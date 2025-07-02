'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { setPaymentPeriodString } = require('@config-rgsl/life-insurance/lib/policyTermsHelper');

module.exports = function onChangeEndDate(input, ambientProperties) {

    const body = input.context.Body;
    const startDate = input.componentContext.startDate;
    const endDate = input.componentContext.endDate;
    const withTarification = getValue(body, 'basicConditions.withTarification', false);
    const isCollectiveLifeInsurancePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';

    if (!isCollectiveLifeInsurancePolicy || withTarification || !startDate || !endDate) {

        return;
    }

    const insuranceTermsInYears = dateUtils.getYearDifference(startDate, dateUtils.addDays(endDate, 1));
    const insuranceTermsInYearsStr = insuranceTermsInYears > 0 ? insuranceTermsInYears.toString() : undefined;
    setValue(body, 'basicConditions.insuranceTerms', insuranceTermsInYearsStr);

    setPaymentPeriodString(input, ambientProperties);

    this.rebindComponent();
};
