'use strict';

const { filterChangeClassByChangeSubtype } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = function changeClassFilter(input, ambientProperties) {

    return filterChangeClassByChangeSubtype(input, ambientProperties);

};
