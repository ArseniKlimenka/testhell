'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { copyInsuranceRulesToClientViewModel } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');

module.exports = function mapDetailsGetInitViewModel(input) {

    const productCode = input.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.Body?.basicConditions?.issueDate || dateHelper.newDateAsString();

    if (!productCode || !issueDate) {

        return input;
    }

    const productConf = input.Body?.productConfiguration ?? {};
    input.ClientViewModel.insuranceRules = copyInsuranceRulesToClientViewModel(productConf);

    return input;
};
