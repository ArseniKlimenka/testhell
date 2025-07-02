'use strict';

const surrenderValuesCoefficients = require('./rules/basisGuarantSurrenderValues');
const investmentSurrenderValuesCalc = require('@config-rgsl/investment-life-insurance/lib/investmentSurrenderValuesCalc');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * Calculates surrender, paid-up and annuity values table for a life block.
 */
module.exports = function surrender(input) {

    const productCode = getValue(input, 'attributes.productCode');
    const contractTerm = parseInt(getValue(input, 'attributes.term', 0));
    const currency = getValue(input, 'attributes.currency');
    const surrenderCoefficients = surrenderValuesCoefficients({ productCode, currency, contractTerm });

    return investmentSurrenderValuesCalc.surrenderValuesCalculation(input, surrenderCoefficients, undefined, true);
};
