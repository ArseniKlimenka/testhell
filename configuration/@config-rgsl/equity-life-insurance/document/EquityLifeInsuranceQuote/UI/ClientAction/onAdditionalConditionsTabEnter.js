const { getUserVisibilityType } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = async function onAdditionalConditionsTabEnter(input, ambientProperties) {

    if (!input.context.ClientViewModel.insuranceRules) {
        input.context.ClientViewModel.insuranceRules = [];
        if (input.context.Body.insuranceRules?.ruleCode) {
            input.context.ClientViewModel.insuranceRules.push({
                ruleCode: input.context.Body.insuranceRules.ruleCode,
                ruleDescription: input.context.Body.insuranceRules.ruleDescription,
                ruleDate: input.context.Body.insuranceRules.ruleDate
            });
        }
    }

    const visibilityType = await getUserVisibilityType(input, ambientProperties);

    input.context.ClientViewModel.userVisibilityType = visibilityType;

};
