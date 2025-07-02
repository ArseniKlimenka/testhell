'use strict';

const { amendmentReasonFilterMapping } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = function amendmentReasonFilter(input, ambientProperties) {

    const amendmentReasonItems = input.items;

    return amendmentReasonFilterMapping(input, ambientProperties, amendmentReasonItems);

};
