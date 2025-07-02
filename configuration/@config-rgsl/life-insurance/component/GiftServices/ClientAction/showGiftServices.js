'use strict';

const { isGiftServices } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = function showGiftServices(input, ambientProperties) {

    const body = input.context.Body;
    return isGiftServices(body);

};
