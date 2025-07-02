'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapInput(input) {

    const body = getValue(this, 'businessContext.rootData');
    const currencyCode = body.basicConditions?.currency?.currencyCode;

    if (!currencyCode || currencyCode == '') {
        throw new Error("E: Должен быть указан currencyCode.");
    }

    return {
        data: {
            criteria: {
                currencyCode: currencyCode
            }
        }
    };
};
