'use strict';

const { policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function EquityLifeInsuranceQuoteOnLoad(input, ambientProperties) {

    const body = input.context.Body;

    const serverIssueDate = body.basicConditions.issueDate;
    body.basicConditions.issueDate = dateTimeUtils.setContractIssueDate(serverIssueDate);

    if ([policyState.InfoRequest, policyState.OnReview].includes(input.context.State.Code)) { this.view.getControlByElementId("TabLayout").selectTab("tabReview"); }

    this.view.rebind();
    this.view.validate();
    this.view.reevaluateRules();
};
