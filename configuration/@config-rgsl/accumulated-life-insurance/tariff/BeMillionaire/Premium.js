
'use strict';

const sumInsuredConfig = require('./rules/beMillionaireSumInsuredConfig');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const premiumCoefficients = require('./rules/beMillionairePremiumCoefficients');
const { getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { maxInsuranceSum } = require("@config-rgsl/life-insurance/lib/sumInsuredConstants");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getCashBackCoeff } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender,
        risks, currency, paymentPlan, manualCorrection, contractIssueDate, insuredSumAmount,
        calcFromInsuredSum, cashback, productConfigurationData } = input;
    let installmentAmount = input.installmentAmount;
    let installmentAmountWithoutCashBack = input.installmentAmount;

    const mainRiskCode = getMainRiskCode(productCode);
    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm: term, insuredAge: insuredAgeOnIssueDate, insuredGender });
    const initialMandatoryRisksCoeff = deepCopy(mandatoryRisksCoeff); // to use in insured sum calc function
    const tariffRate = 0;
    let riskData = {};
    let calculatedRisks = {};

    const amendmentIssueDate = input.amendment?.attributes?.validFrom;
    const productConfOnAmendmentDate = input.amendment?.attributes?.productConfOnAmendmentDate;

    let productConfDate = undefined;

    if (!productConfOnAmendmentDate) {

        productConfDate = contractIssueDate;
    }
    else {

        productConfDate = amendmentIssueDate;
    }

    if (manualCorrection) {

        // just provide values from UI
        riskData = risks.map(r => {
            const riskCode = getValue(r, 'risk.riskCode');
            const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
            const productConf = productConfigurationData;
            let maxInsuredSum = productConf.maxInsuredSumMainRisk;
            if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
            }
            return {
                riskCode,
                startDate: r.startDate,
                endDate: r.endDate,
                isAdditional: r.isAdditional,
                sumInsured: r.riskInsuredSum || 0,
                premium: r.riskPremium || 0,
                isLife: r.risk.isLife,
                withoutProduct: r.risk.withoutProduct ?? false,
                maxInsuredSum,
                isUnifiedInsuranceAmount: r.isUnifiedInsuranceAmount,
                isLimitedInsuranceAmount: r.isLimitedInsuranceAmount
            };
        });

        // calculate riskInsuredSumByPeriod
        calcPeriodInsuredSums();

        // this part is required by platform schems and surrender value calculation
        calculatedRisks = initCalculatedRisks();

    }
    else {

        // delete values for risks that are not in the `risks` array
        // in order to elimenate sum of replaceable risks premium
        if (mandatoryRisksCoeff) {
            Object
                .keys(mandatoryRisksCoeff)
                .filter(k => !risks.map(r => { return r.risk.riskCode; }).includes(k))
                .forEach(nonListRisk => delete mandatoryRisksCoeff[nonListRisk]);
        }

        // return if there is no premium coefficients
        if (!mandatoryRisksCoeff || Object.keys(mandatoryRisksCoeff).length == 0) {
            return {
                premium: installmentAmount,
                paymentFrequency: paymentFrequency,
                tariffRate: tariffRate && round(tariffRate, 12),
                mainRisk: mainRiskCode,
                risks: [
                    {
                        code: mainRiskCode,
                        sumInsured: 0
                    }
                ],
                calculatedAttributes: [],
                currency: currency
            };
        }

        // calc
        riskData = initRiskData();
        calcRoundingCorrection();
        calcPeriodInsuredSums();

        // this part is required by platform schems and surrender value calculation
        calculatedRisks = initCalculatedRisks();

    }

    function initRiskData() {
        return risks
            && risks.map(r => {
                const products = lifeInsuranceConstants.product;
                const underwriterRatio = getValue(r, 'underwriterRatio', 1);
                const underwriterPremium = getValue(r, 'underwriterPremiumPaymentFrequency', 0);
                const riskCode = getValue(r, 'risk.riskCode');
                const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
                const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode });
                const productConf = productConfigurationData;
                const cashBackCoeff = getCashBackCoeff(productCode, productConfDate, { productConfiguration: productConfigurationData }, term, false, cashback);
                let sumInsuredWithoutCashBack;
                let sumInsured;
                if (calcFromInsuredSum && [products.EBMGBFKO, products.EBMGREINVEST, products.EBMGLIFEINVEST, products.EBMGSMP, products.IBA3SMP, products.IBA5SMP, products.EBMGZENIT, products.EBMGVTB, products.EBMGVVTB, products.EBMGVNVTB, products.EBMGPB, products.EBMGNVTB, products.EBMGUBRR].includes(productCode)) {
                    installmentAmountWithoutCashBack = insuredSumAmount / term;
                    installmentAmount = installmentAmountWithoutCashBack / cashBackCoeff;
                } else {
                    const currentCashBackCoeff = riskSumInsuredConfig.useCashBack ? cashBackCoeff : 1;
                    sumInsuredWithoutCashBack = installmentAmount * term * (riskCoeff || 1);
                    sumInsured = sumInsuredWithoutCashBack * currentCashBackCoeff;
                }
                if (riskSumInsuredConfig.fixedValue) {
                    sumInsuredWithoutCashBack = riskSumInsuredConfig.fixedValue;
                    sumInsured = riskSumInsuredConfig.fixedValue;
                }
                const maxValueConfigAge = riskSumInsuredConfig.maxValueConfig && Object.keys(riskSumInsuredConfig.maxValueConfig)
                    .find((item, idx, arr) => insuredAgeOnIssueDate >= item && (insuredAgeOnIssueDate < arr[idx + 1] || !arr[idx + 1]));
                const maxValue = maxValueConfigAge && riskSumInsuredConfig.maxValueConfig[maxValueConfigAge];
                if (maxValue) {
                    sumInsuredWithoutCashBack = Math.min(sumInsured, maxValue);
                    sumInsured = Math.min(sumInsured, maxValue);
                }
                const premium = installmentAmount * riskTariff;
                let maxInsuredSum = productConf.maxInsuredSumMainRisk;
                if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                    maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
                }
                return {
                    // what we need to return
                    riskCode,
                    startDate: r.startDate,
                    endDate: r.endDate,
                    premium,
                    isAdditional: r.isAdditional,
                    sumInsuredWithoutCashBack,
                    sumInsured,
                    sumInsuredByPeriod: undefined,
                    isLife: r.risk.isLife,
                    withoutProduct: r.risk.withoutProduct ?? false,
                    maxInsuredSum
                };
            });
    }

    function calcRoundingCorrection() {
        riskData.forEach(item => {
            item.sumInsured = round(item.sumInsured, 2);
            item.premium = round(item.premium, 2);
        });
        const totalCalculatedPremium = round(riskData.reduce((acc, v) => acc += v.premium, 0), 2);
        const differenceBetweenCalcAndManualValues = round(installmentAmount - totalCalculatedPremium, 2);
        riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndManualValues;
        riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);
    }

    function calcPeriodInsuredSums() {
        riskData.forEach(risk => {
            const products = lifeInsuranceConstants.product;
            const { isReturn, useCashBack, maxValueConfig } = sumInsuredConfig({ productCode, riskCode: risk.riskCode });
            const maxValueConfigAge = maxValueConfig && Object.keys(maxValueConfig)
                .find((item, idx, arr) => insuredAgeOnIssueDate >= item && (insuredAgeOnIssueDate < arr[idx + 1] || !arr[idx + 1]));
            const maxValue = maxValueConfigAge && maxValueConfig[maxValueConfigAge];
            const cashBackCoeff = getCashBackCoeff(productCode, productConfDate, { productConfiguration: productConfigurationData }, term, false, cashback);
            if (calcFromInsuredSum && [products.EBMGBFKO, products.EBMGREINVEST, products.EBMGLIFEINVEST, products.EBMGSMP, products.IBA3SMP, products.IBA5SMP, products.EBMGZENIT, products.EBMGVTB, products.EBMGVVTB, products.EBMGVNVTB, products.EBMGPB, products.EBMGNVTB, products.EBMGUBRR].includes(productCode) && risk.riskCode == 'E36404') {
                risk.sumInsured = insuredSumAmount;
            }
            if (calcFromInsuredSum && [products.EBMGVVTB, products.EBMGVNVTB].includes(productCode) && risk.riskCode == 'DNS36404') {
                const riskCoeff = initialMandatoryRisksCoeff[risk.riskCode + 'COEFF'];
                risk.sumInsured = installmentAmount * term * (riskCoeff || 1);
            }
            if (isReturn && !risk.isUnifiedInsuranceAmount) {
                const sumInsured = risk.isLimitedInsuranceAmount ? risk.sumInsured : maxInsuranceSum;
                const periods = dateUtils.getPeriodsTableByMonths(risk.startDate, risk.endDate, 12);
                const sumInsuredByPeriod = periods && periods.length > 0
                    && periods.map(p => {
                        const currentCashBackCoeff = useCashBack ? cashBackCoeff : 1;
                        const isAnnualIncome = productConfigurationData?.guaranteedIncome.includes(lifeInsuranceConstants.guaranteedIncome.annual.code);
                        const periodNumber = isAnnualIncome && ["ME36404"].includes(risk.riskCode) ? 1 : p.periodNumber;
                        const calculatedInsuredSumWithoutCashBack = round(installmentAmount * periodNumber, 2) || 0;
                        const calculatedInsuredSum = round(installmentAmount * periodNumber * currentCashBackCoeff, 2) || 0;
                        return {
                            periodNumber: p.periodNumber,
                            insuredSumWithoutCashBack: maxValue ? Math.min(calculatedInsuredSumWithoutCashBack, maxValue, sumInsured) : Math.min(calculatedInsuredSumWithoutCashBack, sumInsured),
                            insuredSum: maxValue ? Math.min(calculatedInsuredSum, maxValue, sumInsured) : Math.min(calculatedInsuredSum, sumInsured),
                            periodStartDate: p.periodStartDate,
                            periodEndDate: p.periodEndDate
                        };
                    });
                risk.sumInsuredByPeriod = sumInsuredByPeriod;
                risk.sumInsured = sumInsuredByPeriod.slice(-1)[0].insuredSum;
            }
        });
    }

    function initCalculatedRisks() {
        return riskData
            && riskData.map(r => {
                return {
                    code: r.riskCode,
                    sumInsured: r.sumInsured
                };
            });
    }

    return {
        premium: round(paymentPlan.reduce((p, c) => p + c.paymentSum, 0), 2),
        paymentFrequency: paymentFrequency,
        tariffRate: tariffRate && round(tariffRate, 12),
        mainRisk: mainRiskCode,
        risks: calculatedRisks,
        calculatedAttributes: {
            riskData
        },
        currency: currency
    };

};
