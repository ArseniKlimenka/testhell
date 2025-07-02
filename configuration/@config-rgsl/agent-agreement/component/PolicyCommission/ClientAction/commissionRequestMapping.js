'use strict';
const { setManualRuleSearchCriteria } = require('@config-rgsl/life-insurance/lib/commissionHelper');

module.exports = function commissionRequestMapping(input) {
    const searchCriteria = setManualRuleSearchCriteria(input);

    return searchCriteria;
};
