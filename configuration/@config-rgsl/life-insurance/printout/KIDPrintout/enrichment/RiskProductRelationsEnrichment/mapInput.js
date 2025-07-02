'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    return printoutsHelper.riskProductRelationsMapping(input);

};
