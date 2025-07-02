'use strict';

const surrenderValuesCoefficients = require('./rules/beMillionaireSurrenderValues');
const accumulatedSurrenderValuesCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedSurrenderValuesCalc');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * Calculates surrender, paid-up and annuity values table for a life block.
 */
module.exports = function surrender(input) {

    const { paymentFrequency } = input;
    const productCode = input.attributes.productCode;
    const contractTerm = parseInt(getValue(input, 'attributes.term', 0));
    const surrenderCoefficients = surrenderValuesCoefficients({ productCode, contractTerm, paymentFrequency });

    return accumulatedSurrenderValuesCalc.surrenderValuesCalculationByInstalments(input, surrenderCoefficients);
};
