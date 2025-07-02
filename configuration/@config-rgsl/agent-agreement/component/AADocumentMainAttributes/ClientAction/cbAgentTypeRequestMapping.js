'use strict';

const { basicCtDropdownRequestMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function cbAgentTypeRequestMapping(input) {

    const cbAgentType = input.componentContext.cbAgentType;

    const result = basicCtDropdownRequestMapping(cbAgentType, input.searchText);
    return result;
};
