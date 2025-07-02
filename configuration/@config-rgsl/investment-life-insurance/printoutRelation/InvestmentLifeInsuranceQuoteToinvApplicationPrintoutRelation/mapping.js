'use strict';

const { invApplicationPrintoutMapping } = require("@config-rgsl/life-insurance/lib/invApplicationPrintout");

module.exports = function mapping(input) {

    return invApplicationPrintoutMapping(input, this);
};
