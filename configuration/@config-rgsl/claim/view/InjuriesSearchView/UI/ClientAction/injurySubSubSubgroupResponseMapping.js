'use strict';

const { basicCtDropdownResponseMapping, removeEmptyResults } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function injurySubSubSubgroupResponseMapping(input) {

    removeEmptyResults(input);

    return basicCtDropdownResponseMapping(input);
};
