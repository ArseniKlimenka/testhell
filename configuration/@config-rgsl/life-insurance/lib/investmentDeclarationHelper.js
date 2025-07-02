'use strict';

const { brokerConfiguration } = require('@config-rgsl/life-insurance/lib/brokerConfiguration');
const { formatDatePrint } = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

const emptyValue = '';

function investmentDeclarationEquityPrintoutMapping(input, that, tariffs) {

    const body = input.body;
    const additionalInvestmentParameters = body?.additionalInvestmentParameters;
    const commWithdrawalFundsArray = additionalInvestmentParameters?.commWithdrawalFundsArray ?? [];

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body?.basicConditions?.issueDate;
    const isBefore20250401 = DateTimeUtils.isBefore(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2025-04-01'));
    const contractTerm = body?.basicConditions?.insuranceTerms;
    const insuredDateOfBirth = body?.insuredPerson?.partyData?.dateOfBirth;
    const insuredAge = DateTimeUtils.getYearDifference(insuredDateOfBirth, issueDate);
    const currentDate = DateTimeUtils.dateNow();

    const preEquityTariff = tariffs?.getTariff('PreEquity', currentDate);
    const preEquityTariffRulesDir = preEquityTariff?.rules;
    const preEquityTariffRules = preEquityTariffRulesDir?.getRules();
    const preEquityPremiumCoefficients = preEquityTariffRules?.preEquityPremiumCoefficients({ productCode, contractTerm, insuredAge });
    const coefficientE36914 = preEquityPremiumCoefficients?.E36914; // Дожитие
    const coefficientDNS36414 = preEquityPremiumCoefficients?.DNS36414; // Смерть НС
    const coefficientDLP36914 = preEquityPremiumCoefficients?.DLP36914; // Смерть ЛП
    let percentCoefficientE36914 = coefficientE36914 ? (coefficientE36914 * 100).toFixed(2) : emptyValue; // Дожитие
    const percentCoefficientDNS36414 = coefficientDNS36414 ? coefficientDNS36414 * 100 : emptyValue; // Смерть НС
    const percentCoefficientDLP36914 = coefficientDLP36914 ? coefficientDLP36914 * 100 : emptyValue; // Смерть ЛП

    const rateOfReturnEquityActives = additionalInvestmentParameters?.rateOfReturnEquityActives;
    const investmentFrequency = rateOfReturnEquityActives?.investmentFrequency;
    if (investmentFrequency) {
        percentCoefficientE36914 = investmentFrequency ? (investmentFrequency * 100).toFixed(2) : emptyValue; // Дожитие
    }
    const investmentMF_ROR = rateOfReturnEquityActives?.mf;
    const investmentStartDate = additionalInvestmentParameters?.investmentStartDate;
    const investmentStartDateFormatted = investmentStartDate ? formatDatePrint(investmentStartDate) : emptyValue;
    const investmentEndDate = additionalInvestmentParameters?.investmentEndDate;
    const investmentEndDateFormatted = investmentEndDate ? formatDatePrint(investmentEndDate) : emptyValue;
    const investmentMF = investmentMF_ROR ?? additionalInvestmentParameters?.mf;
    const investmentMFPercent = investmentMF ? +((investmentMF * 100).toFixed(3)) : emptyValue;
    const investmentCoolOffDIDRate = additionalInvestmentParameters?.coolOffDIDRate;
    const investmentCoolOffDIDRatePercent = investmentCoolOffDIDRate ? +((investmentCoolOffDIDRate * 100).toFixed(2)) : emptyValue;

    const brokerConf = brokerConfiguration({ productCode, issueDate }) || {};
    const brokerAccountNumber = brokerConf?.brokerAccountNumber ?? emptyValue;
    const brokerName = brokerConf?.brokerName ?? emptyValue;
    const bankAccount = brokerConf?.bankAccount ?? emptyValue;
    const bankFullName = brokerConf?.bankFullName ?? emptyValue;

    let insurerShareExpensesByYear_0 = brokerConf?.insurerShareExpensesByYear_0;
    let insurerShareExpensesByYear_1 = brokerConf?.insurerShareExpensesByYear_1;
    let insurerShareExpensesByYear_2 = brokerConf?.insurerShareExpensesByYear_2;
    let insurerShareExpensesByYear_3 = brokerConf?.insurerShareExpensesByYear_3;

    if (commWithdrawalFundsArray.length > 0) {

        insurerShareExpensesByYear_0 = commWithdrawalFundsArray.filter(i => i.basisForPayment.includes(0))[0]?.earlyTerminationContract;
        insurerShareExpensesByYear_1 = commWithdrawalFundsArray.filter(i => i.basisForPayment.includes(1))[0]?.earlyTerminationContract;
        insurerShareExpensesByYear_2 = commWithdrawalFundsArray.filter(i => i.basisForPayment.includes(2))[0]?.earlyTerminationContract;
        insurerShareExpensesByYear_3 = commWithdrawalFundsArray.filter(i => i.basisForPayment.includes(3))[0]?.earlyTerminationContract;
    }

    const insurerShareExpensesByYear_0_Percent = insurerShareExpensesByYear_0 ? (insurerShareExpensesByYear_0 * 100).toFixed(2) : 0;
    const insurerShareExpensesByYear_1_Percent = insurerShareExpensesByYear_1 ? (insurerShareExpensesByYear_1 * 100).toFixed(2) : 0;
    const insurerShareExpensesByYear_2_Percent = insurerShareExpensesByYear_2 ? (insurerShareExpensesByYear_2 * 100).toFixed(2) : 0;
    const insurerShareExpensesByYear_3_Percent = insurerShareExpensesByYear_3 ? (insurerShareExpensesByYear_3 * 100).toFixed(2) : 0;

    const equityStrategies = body?.equityStrategies?.map(i => ({
        ...i,
        sharePercent: +((i.share * 100).toFixed(2)),
        payOffTypePrintout: i.payOffType?.toLowerCase()?.includes('облигаци') ? 'Облигация' :
            (i.payOffType?.toLowerCase()?.includes('депозитарная расписка') && !i.payOffType?.toLowerCase()?.includes('адр') ? 'Депозитарная расписка' :
                (i.payOffType?.toLowerCase()?.includes('адр') ? 'Американская депозитарная расписка (АДР)' : 'Акция'))
    })) ?? [];
    const shares = equityStrategies.filter(i => i.payOffType?.toLowerCase()?.includes('акци'));
    const isShares = shares?.length > 0;
    const bonds = equityStrategies.filter(i => i.payOffType?.toLowerCase()?.includes('облигаци'));
    const isBonds = bonds?.length > 0;
    const depositaryReceipts = equityStrategies.filter(i => i.payOffType?.toLowerCase()?.includes('депозитарная расписка') && !i.payOffType?.toLowerCase()?.includes('адр'));
    const isDepositaryReceipts = depositaryReceipts?.length > 0;
    const americanDepositaryReceipts = equityStrategies.filter(i => i.payOffType?.toLowerCase()?.includes('адр'));
    const isAmericanDepositaryReceipts = americanDepositaryReceipts?.length > 0;

    const sharesPercentCount = +shares.reduce((accumulator, currentValue) => accumulator + currentValue.sharePercent, 0).toFixed(2);
    const bondsPercentCount = +bonds.reduce((accumulator, currentValue) => accumulator + currentValue.sharePercent, 0).toFixed(2);
    const depositaryReceiptsPercentCount = +depositaryReceipts.reduce((accumulator, currentValue) => accumulator + currentValue.sharePercent, 0).toFixed(2);
    const americanDepositaryReceiptsPercentCount = +americanDepositaryReceipts.reduce((accumulator, currentValue) => accumulator + currentValue.sharePercent, 0).toFixed(2);
    const totalPercent = (100 - (sharesPercentCount + bondsPercentCount + depositaryReceiptsPercentCount + americanDepositaryReceiptsPercentCount)).toFixed(2);
    const isTotalPercent = totalPercent > 0;

    return {
        investmentStartDate,
        investmentStartDateFormatted,
        investmentEndDate,
        investmentEndDateFormatted,
        investmentMF,
        investmentMFPercent,
        investmentCoolOffDIDRate,
        investmentCoolOffDIDRatePercent,
        brokerAccountNumber,
        brokerName,
        bankAccount,
        bankFullName,
        insurerShareExpensesByYear_0,
        insurerShareExpensesByYear_1,
        insurerShareExpensesByYear_2,
        insurerShareExpensesByYear_3,
        insurerShareExpensesByYear_0_Percent,
        insurerShareExpensesByYear_1_Percent,
        insurerShareExpensesByYear_2_Percent,
        insurerShareExpensesByYear_3_Percent,
        equityStrategies,
        shares,
        isShares,
        bonds,
        isBonds,
        depositaryReceipts,
        isDepositaryReceipts,
        americanDepositaryReceipts,
        isAmericanDepositaryReceipts,
        sharesPercentCount,
        bondsPercentCount,
        depositaryReceiptsPercentCount,
        americanDepositaryReceiptsPercentCount,
        totalPercent,
        isTotalPercent,
        coefficientE36914,
        coefficientDNS36414,
        coefficientDLP36914,
        percentCoefficientE36914,
        percentCoefficientDNS36414,
        percentCoefficientDLP36914,
        investmentFrequency,
        isBefore20250401
    };
}

module.exports = {
    investmentDeclarationEquityPrintoutMapping
};
