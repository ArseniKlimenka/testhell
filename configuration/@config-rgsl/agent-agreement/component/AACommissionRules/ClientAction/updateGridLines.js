'use strict';

const { updateCommissionRulesTable} = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');

module.exports = function updateGridLines(input, ambientProperties) {

    updateCommissionRulesTable(input, this.view);
};
