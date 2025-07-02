'use strict';

const surrenderValuesCoefficients = require('./rules/basisInvestSurrenderValues');
const investmentSurrenderValuesCalc = require('@config-rgsl/investment-life-insurance/lib/investmentSurrenderValuesCalc');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * Calculates surrender, paid-up and annuity values table for a life block.
 */
module.exports = function surrender(input) {

    const productCode = getValue(input, 'attributes.productCode');
    const contractTerm = parseInt(getValue(input, 'attributes.term', 0));
    const surrenderCoefficients = surrenderValuesCoefficients({ productCode, contractTerm });

    return investmentSurrenderValuesCalc.surrenderValuesCalculation(input, surrenderCoefficients);
};
