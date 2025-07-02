'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(input, result) {

    const body = this.businessContext.rootData;

    // const mf = result?.mf;
    const insurerShareExpensesByYear = result?.insurerShareExpensesByYear;
    const netAssetsAmount = result?.netAssetsAmount;
    const freeMoney = result?.freeMoney;

    const startDate = body?.contract?.startDate;
    const calcDate = DateTimeUtils.dateNow();
    const fullYears = DateTimeUtils.getYearDifference(startDate, calcDate);
    const lastAnniversary = DateTimeUtils.addYears(startDate, fullYears);
    const daysFromLastAnniversary = DateTimeUtils.getDayDifference(lastAnniversary, calcDate);
    // const mfCalc = mf / 365 * daysFromLastAnniversary;
    // const mfExpenses = netAssetsAmount * mfCalc;
    // const investmentAccountValue = netAssetsAmount - mfExpenses;
    const investmentAccountValue = netAssetsAmount;
    const availableSum = freeMoney * (1 - insurerShareExpensesByYear);
    const requiredSum = body?.equityDidPayment?.requiredSum;
    const investmentAccountShare = requiredSum / ((1 - insurerShareExpensesByYear) * investmentAccountValue);
    const finalSum = investmentAccountValue * investmentAccountShare;

    body.equityDidPayment.investmentAccountValue = round(investmentAccountValue, 2);
    body.equityDidPayment.availableSum = round(availableSum, 2);
    body.equityDidPayment.investmentAccountShare = round(investmentAccountShare, 4);
    body.equityDidPayment.finalSum = round(finalSum, 2);

};
