'use strict';

const { filterSubtypes } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = function changeSubtypeFilter(input, ambientProperties) {

    return filterSubtypes(input);
};
