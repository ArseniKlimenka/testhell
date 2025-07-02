const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
    * @desc Calculate outpayment plan
    * @param {object} startDate start period date
    * @param {object} endDate end period date
    */
function getOutpaymentPlan(startDate, endDate, productCode) {

    if (!startDate || !endDate) {
        return;
    }

    if (!DateTimeUtils.isBefore(startDate, endDate)) {
        return;
    }

    const periods = [];

    // Calculate first period
    const firstPeriodEnd = DateTimeUtils.getLastDateOfMonth(startDate);
    const outpaymentPeriodEnd = firstPeriodEnd < endDate ? firstPeriodEnd : endDate;

    periods.push(
        {
            periodNumber: 1,
            outpaymentPeriodStart: DateTimeUtils.formatDate(startDate),
            outpaymentPeriodEnd: DateTimeUtils.formatDate(outpaymentPeriodEnd),
            outpaymentDidDate: undefined,
        }
    );

    // Calculate subsequent periods
    let nextStartDate = getNextStartDate(startDate);
    let periodNumber = 2;
    let lastDidDate = DateTimeUtils.getFirstDateOfMonth(startDate);

    // If start date day is the first day of a month, DID date must be a month earlier.
    if (DateTimeUtils.getDay(startDate) == 1) {
        lastDidDate = DateTimeUtils.substractMonths(DateTimeUtils.getFirstDateOfMonth(startDate), 1);
    }

    while (nextStartDate <= endDate) {

        const nextLastDateOfMonth = DateTimeUtils.getLastDateOfMonth(nextStartDate);
        const periodEnd = nextLastDateOfMonth < endDate ? nextLastDateOfMonth : endDate;

        let didDate = undefined;

        // Watch the moment when DID should be counted.
        if (DateTimeUtils.getMonthDifference(lastDidDate, nextStartDate) == 12) {
            didDate = nextStartDate;
            lastDidDate = nextStartDate;
        }

        const outpaymentDidDate =
            productGroupArray.BASIS_ACTIVE_CHOSE_VTB_OUTPAYMENT_AT_END.includes(productCode) ?
                undefined :
                DateTimeUtils.addMonths(DateTimeUtils.formatDate(didDate), 1);
        periods.push(
            {
                periodNumber: periodNumber,
                outpaymentPeriodStart: DateTimeUtils.formatDate(nextStartDate),
                outpaymentPeriodEnd: DateTimeUtils.formatDate(periodEnd),
                outpaymentDidDate: outpaymentDidDate,
            }
        );

        nextStartDate = getNextStartDate(nextStartDate);
        periodNumber++;
    }

    // Last period should has outpaymentDidDate value
    if (periods.length > 0) {
        periods[periods.length - 1].outpaymentDidDate = endDate;
    }

    return periods;
}

function getNextStartDate(date) {
    return DateTimeUtils.getFirstDateOfMonth(DateTimeUtils.addMonths(date, 1));
}

module.exports = {
    getOutpaymentPlan,
};
