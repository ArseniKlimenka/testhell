'use strict';

module.exports = function productRequestMapping(input) {
    const request = {
        data: {
            criteria: {
                code: input.data.productCode ? input.data.productCode : input.data.code,
                description: input.data.productDescription ? input.data.productDescription : input.data.code,
                codes: input.data.codes,
            }
        }
    };
    return request;
};
