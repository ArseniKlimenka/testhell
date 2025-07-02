'use strict';

const surrenderValuesCoefficients = require('./rules/healthVectorSurrenderValues');
const accumulatedSurrenderValuesCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedSurrenderValuesCalc');

/**
 * Calculates surrender, paid-up and annuity values table for a life block.
 */
module.exports = function surrender(input) {

    const { paymentFrequency } = input;
    const surrenderCoefficients = surrenderValuesCoefficients({ paymentFrequency });

    return accumulatedSurrenderValuesCalc.surrenderValuesCalculation(input, surrenderCoefficients);

};
