'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    input.kidIsPolicy = true;
    return printoutsHelper.setKidPrintoutMapping(input, this);
};
