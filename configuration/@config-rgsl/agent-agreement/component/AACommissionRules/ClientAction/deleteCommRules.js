'use strict';

const { updateCommissionRulesTable } = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');

module.exports = function deleteCommRules(input, ambientProperties) {

    const selectedNumbers = this.view.getControlByElementId('commRulesTable').dataSource.selectionModel.selected()
        .map(r => r.ruleNum);

    if (selectedNumbers?.length > 0) {

        const commissionRules = input.componentContext;
        for (let i = commissionRules.length - 1; i >= 0; i--) {
            if (selectedNumbers.includes(commissionRules[i].ruleNum)) {
                commissionRules.splice(i, 1);
            }
        }

        updateCommissionRulesTable(input, this.view);
    }
};
