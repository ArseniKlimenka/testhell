'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input, dataSourceResponse) {

    input.orgUnitCode = dataSourceResponse?.data?.orgUnitCode;

};
