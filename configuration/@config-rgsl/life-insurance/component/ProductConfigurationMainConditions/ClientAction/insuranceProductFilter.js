'use strict';

const { getArrayOfUniqueObjects } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function insuranceProductFilter(input, ambientProperties) {

    const result = getArrayOfUniqueObjects(input.items ?? []);

    return result;
};
