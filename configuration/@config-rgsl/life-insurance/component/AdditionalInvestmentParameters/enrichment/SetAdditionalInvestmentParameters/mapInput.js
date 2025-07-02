'use strict';

module.exports = function mapping(input) {

    const body = this?.businessContext?.rootData;
    const productConfiguration = body?.productConfiguration;
    const issueDate = body?.basicConditions?.issueDate;
    const coolOffPeriodDays = productConfiguration?.coolOffPeriodDays;
    const daysAfterCoolOffPeriod = 1;
    const numOfWorkDaysToInvest = productConfiguration?.numOfWorkDaysToInvest;
    const daysToSearchInWorkCalendar = 500;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const insuranceTerms = body?.basicConditions?.insuranceTerms;
    const rateOfReturnEquityActives = body?.additionalInvestmentParameters?.rateOfReturnEquityActives;
    const investmentManualRate = rateOfReturnEquityActives?.manualRate;

    return {
        productCode: productCode,
        issueDate: issueDate,
        insuranceTerms: insuranceTerms,
        coolOffPeriodDays: coolOffPeriodDays,
        daysAfterCoolOffPeriod: daysAfterCoolOffPeriod,
        numOfWorkDaysToInvest: numOfWorkDaysToInvest,
        workCalendarPeriodDays: daysToSearchInWorkCalendar,
        investmentManualRate: investmentManualRate
    };
};
