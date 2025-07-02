'use strict';

const { paymentCalculationType } = require('@config-rgsl/life-insurance/component/LifeInsurancePaymentCalculation/lib/paymentCalculationConsts');
const { brokerConfiguration } = require('@config-rgsl/life-insurance/lib/brokerConfiguration');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');


function getPaymentLines({ netAssetsAmount, coef, surrenderValue, taxValue }) {

    netAssetsAmount = netAssetsAmount ? netAssetsAmount : 0;
    coef = coef ? coef : 0;
    surrenderValue = surrenderValue ? surrenderValue : 0;
    taxValue = taxValue ? taxValue : 0;

    const penalty = netAssetsAmount * coef;

    return [
        { paymentLineType: paymentCalculationType.Account, paymentLineSum: netAssetsAmount },
        { paymentLineType: paymentCalculationType.Penalty, paymentLineSum: penalty },
        { paymentLineType: paymentCalculationType.Buyer, paymentLineSum: surrenderValue },
        { paymentLineType: paymentCalculationType.DID, paymentLineSum: netAssetsAmount - penalty },
        { paymentLineType: paymentCalculationType.Tax, paymentLineSum: taxValue }
    ];
}

function getCoef(validFrom, contractBody) {
    const commWithdrawalFundsArray = contractBody.additionalInvestmentParameters?.commWithdrawalFundsArray;
    const issueDate = contractBody.basicConditions.issueDate;
    const year = Math.min(dateUtils.getYearDifference(issueDate, validFrom), 3);

    if (commWithdrawalFundsArray?.length) {
        return commWithdrawalFundsArray[year]?.earlyTerminationContract;
    }

    const productCode = contractBody.mainInsuranceConditions.insuranceProduct.productCode;
    const brokerConf = brokerConfiguration({ productCode, issueDate }) || {};
    const insurerShareExpensesByYearProperty = `insurerShareExpensesByYear_${year}`;

    return brokerConf[insurerShareExpensesByYearProperty];
}

function getSurrenderValue(validFrom, contractBody) {
    return contractBody.surrenderValues?.find(item => validFrom >= item.periodStartDate && validFrom <= item.periodEndDate)?.surrenderValue ?? 0;
}

function calculateTax(riskPremium, netAssetsAmount) {
    const TAX_THRESHOLD = 2400000;
    const LOW_TAX_RATE = 0.13;
    const HIGH_TAX_RATE = 0.15;

    const taxableAmount = netAssetsAmount - riskPremium;
    const taxRate = taxableAmount < TAX_THRESHOLD ? LOW_TAX_RATE : HIGH_TAX_RATE;

    return taxableAmount * taxRate;
}

module.exports = {
    getSurrenderValue,
    getPaymentLines,
    getCoef,
    calculateTax
};
