'use strict';

const { rateOfReturnSetOptions } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function AccumulatedLifeInsuranceQuoteOnLoad(input, ambientProperties) {

    const body = input.context.Body;

    const serverIssueDate = body.basicConditions.issueDate;
    body.basicConditions.issueDate = dateTimeUtils.setContractIssueDate(serverIssueDate);

    if (["InfoRequest", "OnReview"].includes(input.context.State.Code)) { this.view.getControlByElementId("TabLayout").selectTab("tabReview"); }

    await rateOfReturnSetOptions(body, this, ambientProperties);

    this.view.validate();
    this.view.reevaluateRules();

};
