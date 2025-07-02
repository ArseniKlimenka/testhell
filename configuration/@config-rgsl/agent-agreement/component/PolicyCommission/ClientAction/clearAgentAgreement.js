'use strict';

module.exports = function clearAgentAgreement(input) {

    input.componentContext.agentAgreement = {};
    input.componentContext.policyCommissionItems = [];

    const isManualBudgetRule = input.componentContext.budgetRule?.isManual ?? false;

    if (!isManualBudgetRule && input.componentContext.budgetRule) {

        input.componentContext.budgetRule.rule = undefined;
        input.componentContext.budgetRule.algorithm = undefined;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
