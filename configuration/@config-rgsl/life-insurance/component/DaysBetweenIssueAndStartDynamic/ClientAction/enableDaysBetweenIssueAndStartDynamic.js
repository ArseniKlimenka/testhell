'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { daysCount } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function enableDaysBetweenIssueAndStartDynamic(input) {

    if (this.view.areAllElementsDisabled() || !isSaveOperationAvailable(this.view)) {

        return false;
    }

    const insuranceTermsDays = input.additionalContext.insuranceTermsDays;

    if ([daysCount.sixtyDays, daysCount.ninetyDays, daysCount.halfYear, daysCount.year].includes(insuranceTermsDays?.value)) {
        return false;
    }

    return true;
};
