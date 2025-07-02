'use strict';

const { updateCommissionRulesTable} = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');

module.exports = function copyRow(input) {

    const existingRow = input.data;
    const newRow = Object.assign({}, existingRow);

    input.componentContext.push(newRow);
    updateCommissionRulesTable(input, this.view);
};
