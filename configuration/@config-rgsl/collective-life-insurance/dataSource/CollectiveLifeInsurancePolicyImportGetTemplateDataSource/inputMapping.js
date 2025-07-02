'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            productCode: input.data.criteria.productCode,
            withTarification: input.data.criteria.withTarification
        }
    };

    return output;
};
