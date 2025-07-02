'use strict';

const optimalChoiceUltraPremiumCoefficients = require('./rules/optimalChoiceUltraPremiumCoefficients');
const optimalChoiceUltraInsuredSumCoefficients = require('./rules/optimalChoiceUltraInsuredSumCoefficients');

module.exports = function getRules(input) {

    return {
        optimalChoiceUltraPremiumCoefficients,
        optimalChoiceUltraInsuredSumCoefficients
    };
};
