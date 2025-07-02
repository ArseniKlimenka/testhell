'use strict';

const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    return {
        title: printoutsConstant.printoutMemoName.TaxDeduction2Printout
    };
};
