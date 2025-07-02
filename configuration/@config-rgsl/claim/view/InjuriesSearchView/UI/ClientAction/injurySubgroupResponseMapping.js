'use strict';

const { basicCtDropdownResponseMapping, removeEmptyResults } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function injurySubgroupResponseMapping(input) {

    removeEmptyResults(input);

    return basicCtDropdownResponseMapping(input);
};
