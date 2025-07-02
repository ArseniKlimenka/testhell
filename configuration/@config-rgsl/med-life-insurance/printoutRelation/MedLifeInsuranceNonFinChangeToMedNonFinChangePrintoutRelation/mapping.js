'use strict';

const {
    getNonFinChangeMailMappingResult
} = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentHelper');

module.exports = function mapping(input) {

    const mappingResult = getNonFinChangeMailMappingResult(input, this);
    return mappingResult;
};
