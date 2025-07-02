'use strict';

const { policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getRecommendedStrategies, rateOfReturnSetOptions } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function InvestmentLifeInsuranceQuoteOnLoad(input, ambientProperties) {

    const body = input.context.Body;

    const serverIssueDate = body.basicConditions.issueDate;
    body.basicConditions.issueDate = dateTimeUtils.setContractIssueDate(serverIssueDate);

    const clientViewModel = input.context.ClientViewModel;
    clientViewModel.recommendedStrategies = await getRecommendedStrategies(input, this, ambientProperties);
    clientViewModel.idIsin = body.basicAssetProperties?.assetProperties[0]?.asset?.idIsin;

    if ([policyState.InfoRequest, policyState.OnReview].includes(input.context.State.Code)) { this.view.getControlByElementId("TabLayout").selectTab("tabReview"); }

    await rateOfReturnSetOptions(body, this, ambientProperties);

    this.view.validate();
    this.view.reevaluateRules();

};
