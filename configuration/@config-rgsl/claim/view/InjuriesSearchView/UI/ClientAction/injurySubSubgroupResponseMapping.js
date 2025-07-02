'use strict';

const { basicCtDropdownResponseMapping, removeEmptyResults } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function injurySubSubgroupResponseMapping(input) {

    removeEmptyResults(input);

    return basicCtDropdownResponseMapping(input);
};
