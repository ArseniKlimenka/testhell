'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function getMigratedPaymentPeriodString(input, ambientProperties) {

    const startDate = input.componentContext.startDate;
    const endDate = input.componentContext.endDate;

    if (!startDate || !endDate) {

        return getPluralForm(0);
    }

    const policyPeriods = dateUtils.getPeriodsTable(startDate, endDate);
    const lastPeriod = policyPeriods[policyPeriods.length - 1];
    const isNotLastInDays = lastPeriod.periodEndDate !== endDate;

    if (isNotLastInDays) {

        const notFullPeriodStart = dateUtils.addDays(lastPeriod.periodEndDate, 1);
        const notFullDays = dateUtils.getDayDifference(notFullPeriodStart, endDate);

        if (notFullDays >= 181) {

            return getPluralForm(lastPeriod.year + 1);
        }
    }

    return getPluralForm(lastPeriod.year);
};

function getPluralForm(numberofYears) {

    const lastDigit = numberofYears % 10;
    const lastTwoDigits = numberofYears % 100;
    let pluaralForm = '';

    if (lastTwoDigits >= 10 && lastTwoDigits <= 20) {

        pluaralForm = `лет`;
    }
    else if (lastDigit === 1) {

        pluaralForm = `год`;
    }
    else if (lastDigit >= 2 && lastDigit <= 4) {

        pluaralForm = `года`;
    }

    return `${numberofYears} ${pluaralForm}`;
}
