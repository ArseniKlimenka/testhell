'use strict';

module.exports = function setCommRulesDates(input) {

    const aaCommissionRulesClient = input.additionalContext?.aaCommissionRulesClient;
    const startDate = aaCommissionRulesClient.commRuleStartDate;
    const endDate = aaCommissionRulesClient.commRuleEndDate;

    const selectedItems = this.view.getControlByElementId('commRulesTable').dataSource.selectionModel.selected() ?? [];

    selectedItems.forEach(element => {

        element.startDate = startDate;
        element.endDate = endDate;
    });

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
