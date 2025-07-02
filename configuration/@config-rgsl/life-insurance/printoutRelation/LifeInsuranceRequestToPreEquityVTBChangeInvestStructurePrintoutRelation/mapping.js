'use strict';

const { investmentDeclarationEquityPrintoutMapping } = require('@config-rgsl/life-insurance/lib/investmentDeclarationHelper');
const { tariffs } = require('@adinsure/runtime');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");

module.exports = function mapping(input) {

    const policyPrintout = {};
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    policyPrintout.exampleLabel = exampleLabel;
    policyPrintout.invDeclaration = investmentDeclarationEquityPrintoutMapping(input, this, tariffs);

    return policyPrintout;
};
