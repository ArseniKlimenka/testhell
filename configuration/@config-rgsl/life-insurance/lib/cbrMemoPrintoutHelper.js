'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

function cbrMemoEquityPrintoutMapping(input, that) {

    const { body, basicConditions, productCode, issueDate } = printoutsHelper.getPrintoutCommonData(input, that);
    const { policy, currency } = printoutsHelper.getPollicyInfo(input, that);

    const insurer = printoutsConstant.insurerInfo;
    const holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    const isCbrMemo = true;
    const risk = printoutsHelper.getRisk(body, body.risks, productCode, undefined, undefined, undefined, undefined, isCbrMemo);

    // E36914 - Дожитие
    const differenceDLP36914 = printoutsHelper.getDifference2(input.body.risks, 'E36914', 'DLP36914'); // Смерть ЛП
    const differenceDNS36414 = printoutsHelper.getDifference2(input.body.risks, 'E36914', 'DNS36414'); // Смерть НС

    const creditRating = printoutsHelper.getCreditRating(issueDate, productCode);

    const isAfter_01_01_2025 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2025-01-01'));

    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body?.paymentPlan, body);

    const surrenderValues = printoutsHelper.getSurrenderValues(body?.surrenderValues);

    return {
        policy,
        currency,
        differenceDLP36914,
        differenceDNS36414,
        insurer,
        creditRating,
        commission,
        holder,
        risk,
        surrenderValues,
        isAfter_01_01_2025
    };
}

module.exports = {
    cbrMemoEquityPrintoutMapping
};
