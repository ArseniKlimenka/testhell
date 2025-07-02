'use strict';

const preEquityPremiumCoefficients = require('./rules/preEquityPremiumCoefficients');
const preEquityInsuredSumCoefficients = require('./rules/preEquityInsuredSumCoefficients');

module.exports = function getRules(input) {

    return {
        preEquityPremiumCoefficients,
        preEquityInsuredSumCoefficients
    };
};
