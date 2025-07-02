'use strict';

const { basicCtDropdownResponseMapping, removeEmptyResults, distinctByKey } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function injuryGroupResponseMapping(input) {

    const key = 'description';

    distinctByKey(input, key);
    removeEmptyResults(input);

    return basicCtDropdownResponseMapping(input);
};
