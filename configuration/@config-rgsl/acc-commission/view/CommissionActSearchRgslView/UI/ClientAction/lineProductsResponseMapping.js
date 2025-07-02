'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function lineProductsResponseMapping(input) {
    let output = [];
    const data = getValue(input, 'response.data');

    if (data && data.length > 0) {
        output = data.map((element) => {
            return {
                description: element.resultData['productDescription'],
                code: element.resultData['productCode']
            };
        });
    }

    return output;
};
