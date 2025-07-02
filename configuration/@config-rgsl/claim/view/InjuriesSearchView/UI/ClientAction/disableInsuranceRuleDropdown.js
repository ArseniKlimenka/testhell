'use strict';

module.exports = function disableInsuranceRuleDropdown(input) {

    const ruleCodeFromContract = input.rootContext.Body.insuranceRules?.ruleCode;
    const ruleDescriptionFromContract = input.rootContext.Body.insuranceRules?.ruleDescription;

    if (!input.context.request.data.criteria.insuranceRule) {
        input.context.request.data.criteria.insuranceRule = {};
    }

    if (ruleCodeFromContract) {
        input.context.request.data.criteria.insuranceRule.code = ruleCodeFromContract ?? '';
        input.context.request.data.criteria.insuranceRule.description = ruleDescriptionFromContract ?? '';

        return true;
    }

    return false;
};
