'use strict';
const { policyAccidentPrintoutMapping } = require('@config-rgsl/life-insurance/lib/policyPrintoutHelper');

module.exports = function mapping(input) {
    const policyPrintout = policyAccidentPrintoutMapping(input, this);

    return policyPrintout;
};
