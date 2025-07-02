'use strict';

const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const output = {};

    output.amendmentNumber = nullCheck(input.AGENT_AGREEMENT_NUMBER);
    output.budgetRuleCode = nullCheck(input.BUDGET_RULE_CODE);
    output.budgetRuleName = nullCheck(input.BUDGET_RULE_NAME);
    output.budgetAlgorithmCode = nullCheck(input.BUDGET_ALG_CODE);
    output.budgetAlgorithmName = nullCheck(input.ALGORITHM_NAME);
    return output;
};
