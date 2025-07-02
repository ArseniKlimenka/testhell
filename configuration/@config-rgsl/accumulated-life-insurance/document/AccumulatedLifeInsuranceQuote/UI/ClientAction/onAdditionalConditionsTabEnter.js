const { getUserVisibilityType } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = async function onAdditionalConditionsTabEnter(input, ambientProperties) {

    const visibilityType = await getUserVisibilityType(input, ambientProperties);

    input.context.ClientViewModel.userVisibilityType = visibilityType;

};
