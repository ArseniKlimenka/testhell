'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.documentNumber = input.AGENT_AGREEMENT_NUMBER;
    output.documentSequence = input.SEQ_NUMBER;
    output.budgetRuleName = input.BUDGET_RULE_NAME ?? 'Отсутствует';
    output.budgetAlgorithmName = input.ALGORITHM_NAME ?? 'Отсутствует';

    return output;
};
