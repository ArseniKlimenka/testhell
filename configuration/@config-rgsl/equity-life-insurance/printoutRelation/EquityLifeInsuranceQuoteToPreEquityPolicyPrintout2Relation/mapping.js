'use strict';

const { policyEquityPrintoutMapping } = require('@config-rgsl/life-insurance/lib/policyPrintoutHelper');
const { investmentDeclarationEquityPrintoutMapping } = require('@config-rgsl/life-insurance/lib/investmentDeclarationHelper');
const { cbrMemoEquityPrintoutMapping } = require("@config-rgsl/life-insurance/lib/cbrMemoPrintoutHelper");
const { tariffs } = require('@adinsure/runtime');

module.exports = function mapping(input) {

    const policyPrintout = policyEquityPrintoutMapping(input, this);
    policyPrintout.invDeclaration = investmentDeclarationEquityPrintoutMapping(input, this, tariffs);
    policyPrintout.cbrMemo = cbrMemoEquityPrintoutMapping(input, this);

    return policyPrintout;
};
