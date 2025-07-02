'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function AccidentLifeInsuranceQuoteOnLoad(input, ambientProperties) {
    const body = input.context.Body;

    const serverIssueDate = body.basicConditions.issueDate;
    body.basicConditions.issueDate = dateTimeUtils.setContractIssueDate(serverIssueDate);

    if (["InfoRequest", "OnReview"].includes(input.context.State.Code)) { this.view.getControlByElementId("TabLayout").selectTab("tabReview"); }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

};
