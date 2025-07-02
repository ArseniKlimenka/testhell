'use strict';

module.exports = function onRequestIssueDateChaged(input) {

    const requestIssueDate = input.componentContext.requestIssueDate;

    if (requestIssueDate) {

        input.rootContext.Body.amendmentData.nonFinChangeAmendmentData.mainAttributes.amendmentEffectiveDate = requestIssueDate;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
