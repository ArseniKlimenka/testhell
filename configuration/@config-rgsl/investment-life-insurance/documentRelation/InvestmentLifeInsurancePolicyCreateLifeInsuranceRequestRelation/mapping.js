'use strict';

const { createLifeInsuranceRequestMapping } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = function mapping(body) {

    const result = createLifeInsuranceRequestMapping(body, this);
    return { body: result };
};
