'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} documentShouldHaveAtleastOneCommRule
 * @errorCode {errorCode} Inconsistency
 * @errorCode {errorCode} ManualRuleDescriptionEmpty
 */

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];

    if (!input.commissionRules || input.commissionRules.length === 0) {

        validationErrors.push({
            errorCode: "documentShouldHaveAtleastOneCommRule"
        });
    }

    if (input.commissionRules.some(x => x.isInconsistent)) {

        const inconsistent = input.commissionRules.filter(x => x.isInconsistent);

        validationErrors.push({
            errorCode: 'Inconsistency',
            errorDataPath: '/commissionRules',
            errorMessage: "Правила с ID '${r1}' и '${r2}' не консистентны - противоречат друг другу",
            reference: {
                r1: inconsistent[0].ruleNum,
                r2: inconsistent[1].ruleNum,
            }
        });
    }

    input.commissionRules.some(element => {
        if (element.manualRule && !element.manualRuleDescription) {
            validationErrors.push({
                errorCode: "ManualRuleDescriptionEmpty"
            });
        }
    });

    return validationErrors;
};
