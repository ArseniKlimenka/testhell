'use strict';

const { basicCtDropdownResponseMapping } = require('@config-rgsl/code-tables/lib/GeneralCodeTableHelper');

module.exports = function accountingContractTypeResponseMapping(input) {

    let result = basicCtDropdownResponseMapping(input);

    if (result) {

        result = result.map(c => {

            c.code = c.value.code;
            return c;
        });
    }

    return result;
};
