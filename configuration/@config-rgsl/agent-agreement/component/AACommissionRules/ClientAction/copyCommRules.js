'use strict';
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { updateCommissionRulesTable} = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');

module.exports = function copyCommRules(input, ambientProperties) {

    const selectedElements = this.view.getControlByElementId('commRulesTable').dataSource.selectionModel.selected();

    if (selectedElements?.length > 0) {

        selectedElements.forEach(element => {

            input.componentContext.push(deepCopy(element));
        });

        updateCommissionRulesTable(input, this.view);
    }
};
