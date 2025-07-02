'use strict';

const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");

module.exports = function mapping(input) {

    return {
        title: printoutsConstant.printoutMemoName.TAX1Printout
    };
};
