'use strict';

module.exports = function onChangeRequestIssueDate(input, ambientProperties) {

    delete input.context.Body.amendmentReason;

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

};
