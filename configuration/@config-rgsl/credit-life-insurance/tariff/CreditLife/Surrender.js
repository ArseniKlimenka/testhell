const creditSurrenderValuesCalc = require('@config-rgsl/credit-life-insurance/lib/creditSurrenderValuesCalc');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * Calculates surrender, paid-up and annuity values table for a life block.
 */
module.exports = function surrender(input) {

    const term = getValue(input, 'attributes.term');

    return creditSurrenderValuesCalc.surrenderValuesCalculation(input, term);

};
