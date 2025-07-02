'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input, dataSourceResponse) {

    printoutsHelper.riskProductRelationsApply(input, dataSourceResponse);

};
