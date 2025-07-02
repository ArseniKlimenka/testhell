'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsRuleNumber(input) {

    return basicFilterByColumnName(input, 'ruleNum');
};
