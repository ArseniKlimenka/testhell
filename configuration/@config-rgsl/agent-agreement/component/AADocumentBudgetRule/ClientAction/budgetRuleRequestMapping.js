'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function budgetRuleRequestMapping(input) {

    const salesChannel = input.componentContext.rule;

    const result = basicCtDropdownRequestMapping(salesChannel, input.searchText);
    return result;
};
