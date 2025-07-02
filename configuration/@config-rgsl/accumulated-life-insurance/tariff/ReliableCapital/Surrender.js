'use strict';

const surrenderValuesCoefficients = require('./rules/ReliableCapitalSurrenderValues');
const accumulatedSurrenderValuesCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedSurrenderValuesCalc');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * Calculates surrender, paid-up and annuity values table for a life block.
 */
module.exports = function surrender(input) {

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender } = input.attributes;
    const contractTerm = parseInt(term || 0);
    const surrenderCoefficients = surrenderValuesCoefficients({ productCode, paymentFrequency, contractTerm, insuredAge: insuredAgeOnIssueDate, insuredGender: insuredGender });

    return accumulatedSurrenderValuesCalc.surrenderValuesCalculation(input, surrenderCoefficients);
};
