'use strict';

const surrenderValuesCoefficients = require('./rules/driverSurrenderValues');
const investmentSurrenderValuesCalc = require('@config-rgsl/investment-life-insurance/lib/investmentSurrenderValuesCalc');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * Calculates surrender, paid-up and annuity values table for a life block.
 */
module.exports = function surrender(input) {

    const { paymentFrequency } = input;
    const contractTerm = parseInt(getValue(input, 'attributes.term', 0));
    const surrenderCoefficients = surrenderValuesCoefficients({ contractTerm, paymentFrequency });

    return investmentSurrenderValuesCalc.surrenderValuesCalculation(input, surrenderCoefficients);
};
