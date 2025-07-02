'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function CreditLifeInsuranceQuoteOnLoad(input, ambientProperties) {

    const body = input.context.Body;

    const serverIssueDate = body.basicConditions.issueDate;
    body.basicConditions.issueDate = dateTimeUtils.setContractIssueDate(serverIssueDate);

    if (["InfoRequest", "OnReview"].includes(input.context.State.Code)) { this.view.getControlByElementId("TabLayout").selectTab("tabReview"); }

    this.view.validate();
    this.view.reevaluateRules();

};
