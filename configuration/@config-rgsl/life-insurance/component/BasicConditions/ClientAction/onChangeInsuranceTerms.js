const { calcEndDate } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');
const { setConsent } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = function onChangeInsuranceTerms(input, ambientProperties) {

    const body = input.context.Body;
    const fixedPremiumsArray = input.componentContext.fixedPremiums;
    const fixedInsuredSumsArray = input.componentContext.fixedInsuredSums;

    if (fixedPremiumsArray && fixedPremiumsArray.length > 0)
    {
        input.componentContext.riskPremium = undefined;
    }

    if (fixedInsuredSumsArray && fixedInsuredSumsArray.length > 0)
    {
        input.componentContext.riskInsuredSum = undefined;
    }

    calcEndDate(input, ambientProperties);

    setConsent(body);

    this.rebindComponent();
};
