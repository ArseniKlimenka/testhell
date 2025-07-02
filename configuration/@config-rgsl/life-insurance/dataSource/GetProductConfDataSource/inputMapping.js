'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    if (!criteria) {
        throw 'No criteria provided!';
    }

    if (!criteria.documentNumber && !criteria.productCode) {
        throw 'Invalid input parameters!';
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
