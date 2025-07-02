'use strict';

module.exports = function isBudgetRuleDisabled(input) {

    if (this.view.areAllElementsDisabled()) {

        return true;
    }

    const isManual = input.componentContext?.budgetRule?.isManual ?? false;
    return !isManual;
};
