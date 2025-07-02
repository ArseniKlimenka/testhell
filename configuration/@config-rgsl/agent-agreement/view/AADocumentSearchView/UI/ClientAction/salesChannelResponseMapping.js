'use strict';

const { basicCtDropdownResponseMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function salesChannelResponseMapping(input) {

    let result = basicCtDropdownResponseMapping(input);

    if (result) {

        result = result.map(c => {

            c.value = c.value.code;
            return c;
        });
    }

    return result;
};
