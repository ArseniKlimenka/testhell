'use strict';

const { getValue, setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function accountingYearResponseMapping(input) {

    let output = [];
    const data = getValue(input, 'response.data');

    if (data && data.length > 0) {

        output = data.map((element) => {

            const result = {};
            result.displayName = element.resultData['accountingYear'];

            const objValue = {};
            objValue.year = element.resultData['accountingYear'];

            result.value = objValue;
            return result;
        });
    }

    return output;
};
