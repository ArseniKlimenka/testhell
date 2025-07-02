
'use strict';

const premiumCoefficients = require('./rules/CareAboutTheFuturePremiumCoefficients');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const sumInsuredHelper = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedSumInsuredCalc');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getCashBackCoeff } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term, risks, currency, installmentAmount, paymentPlan, manualCorrection, contractIssueDate, contractStartDate, cashback, productConfigurationData } = input;
    const contractEndDate = input.item.endDate;
    const mainRiskCode = getMainRiskCode(productCode);
    const mandatoryRisksCoeff = premiumCoefficients({ productCode, issueDate: contractIssueDate, paymentFrequency, contractTerm: term });
    const additionalRisksCoeff = [];

    input.mandatoryRisksCoeff = deepCopy(mandatoryRisksCoeff); // to use in insured sum calc function
    const initialMandatoryRisksCoeff = deepCopy(mandatoryRisksCoeff);
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
                isLife: r.risk.isLife,
                withoutProduct: r.risk.withoutProduct ?? false,
                startDate: r.startDate,
                endDate: r.endDate,
                isAdditional: r.isAdditional,
                sumInsured: r.riskInsuredSum || 0,
                premium: r.riskPremium || 0,
                maxInsuredSum
            };
        });

        // calculate riskInsuredSumByPeriod
        riskData = riskData.map(r => {
            const riskCode = getValue(r, 'riskCode');
            const riskSumInsured = sumInsuredHelper[riskCode](riskData, input, r);
            return {
                ...r,
                sumInsuredByPeriod: riskSumInsured.sumInsuredByPeriod
            };
        });

        // this part is required by platform schems and surrender value calculation
        calculatedRisks = risks
            && risks.map(r => {
                return {
                    code: getValue(r, 'risk.riskCode'),
                    sumInsured: r.riskInsuredSum || 0
                };
            });

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

        // calculate premium for mandatory risks
        riskData = risks
            && risks.map(r => {
                const underwriterRatio = getValue(r, 'underwriterRatio', 1);
                const underwriterPremium = getValue(r, 'underwriterPremiumPaymentFrequency', 0);
                const riskCode = getValue(r, 'risk.riskCode');
                const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
                const riskPremium = round(riskTariff * installmentAmount, 2);
                const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                const productConf = productConfigurationData;
                let maxInsuredSum = productConf.maxInsuredSumMainRisk;
                if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                    maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
                }
                return {
                    riskCode,
                    isLife: r.risk.isLife,
                    withoutProduct: r.risk.withoutProduct ?? false,
                    startDate: r.startDate,
                    endDate: r.endDate,
                    premium: riskPremium,
                    isAdditional: r.isAdditional,
                    // additional info
                    maxInsuredSum
                };
            });

        // rounding correction for mandatory risks only
        const totalCalculatedPremium = round(riskData.filter(r => !r.isAdditional).filter(x => x.startDate == contractStartDate).reduce((acc, v) => acc += v.premium, 0), 2);
        const differenceBetweenCalcAndManualValues = installmentAmount - totalCalculatedPremium;
        riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndManualValues;
        riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);

        // calculate insured sum for additional risks
        const cashBackCoeff = getCashBackCoeff(productCode, productConfDate, { productConfiguration: productConfigurationData }, term, false, cashback);
        riskData = riskData.map(r => {
            const riskCode = getValue(r, 'riskCode');
            const riskSumInsured = r.isAdditional && sumInsuredHelper[riskCode](riskData, input, r) || { sumInsured: r.sumInsured, sumInsuredWithoutCashBack: r.sumInsured, sumInsuredByPeriod: r.sumInsuredByPeriod };
            return {
                ...r,
                sumInsured: riskSumInsured.sumInsured * cashBackCoeff,
                sumInsuredWithoutCashBack: riskSumInsured.sumInsured,
                sumInsuredByPeriod: riskSumInsured.sumInsuredByPeriod
            };
        });

        // calculate premium for additional risks
        riskData = riskData.map(r => {
            const riskCode = getValue(r, 'riskCode');
            const currentRisk = risks.find(x => x.risk.riskCode == riskCode);
            const underwriterRatio = getValue(currentRisk, 'underwriterRatio', 1);
            const underwriterPremium = getValue(currentRisk, 'underwriterPremiumPaymentFrequency', 0);
            const riskTariff = additionalRisksCoeff ? ((additionalRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio) : undefined;
            const riskPremium = riskTariff ? round(riskTariff * r.sumInsured, 2) : r.premium;
            const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
            const productConf = productConfigurationData;
            let maxInsuredSum = productConf.maxInsuredSumMainRisk;
            if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
            }
            return {
                riskCode: r.riskCode,
                isLife: r.isLife,
                withoutProduct: r.withoutProduct ?? false,
                startDate: r.startDate,
                endDate: r.endDate,
                premium: riskPremium,
                sumInsured: r.sumInsured,
                sumInsuredByPeriod: r.sumInsuredByPeriod,
                isAdditional: r.isAdditional,
                // additional info
                maxInsuredSum
            };
        });

        // calculate insured sum for mandatory risks (in the end because it depends on premium for additional risks)
        riskData = riskData.map(r => {
            const riskCode = getValue(r, 'riskCode');
            const riskSumInsured = !r.isAdditional && sumInsuredHelper[riskCode](riskData, input, r) || { sumInsured: r.sumInsured, sumInsuredWithoutCashBack: r.sumInsured, sumInsuredByPeriod: r.sumInsuredByPeriod };
            if (riskSumInsured.sumInsuredByPeriod.length > 0) {
                calcRiskPeriodSumInsured(r, riskSumInsured, contractStartDate);
                return {
                    ...r,
                    sumInsured: riskSumInsured.sumInsured,
                    sumInsuredWithoutCashBack: riskSumInsured.sumInsured,
                    sumInsuredByPeriod: riskSumInsured.sumInsuredByPeriod
                };
            }
            return {
                ...r,
                sumInsured: riskSumInsured.sumInsured * cashBackCoeff,
                sumInsuredWithoutCashBack: riskSumInsured.sumInsured,
                sumInsuredByPeriod: riskSumInsured.sumInsuredByPeriod
            };
        });

        // this part is required by platform schems and surrender value calculation
        calculatedRisks = risks
            && risks.map(r => {
                const riskCode = getValue(r, 'risk.riskCode');
                const riskSumInsured = sumInsuredHelper[riskCode](riskData, input, r);
                return {
                    code: riskCode,
                    sumInsured: riskSumInsured.sumInsured || 0
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

    function calcRiskPeriodSumInsured(risk, riskSumInsured, contractStartDate) {
        const isReturn = ['DLPVV36404'].includes(risk.riskCode);
        const isWOP = ['D36404', 'DA36404'].includes(risk.riskCode);
        const periods = dateUtils.getPeriodsTableByMonths(risk.startDate, risk.endDate, 12);
        const periodsAll = dateUtils.getYearDifference(contractStartDate, contractEndDate) + 1;
        const diffCoeff = dateUtils.getYearDifference(contractStartDate, risk.startDate);
        const sumInsuredByPeriod = periods && periods.length > 0
            && periods.map(p => {
                const filteredRiskData = isWOP ? riskData.filter(r => ['E36404', 'DLPVV36404', 'DLPDPE36404'].includes(r.riskCode)) : riskData.filter(r => r.startDate == contractStartDate);
                const periodInstallment = filteredRiskData.reduce((acc, v) => { acc += v.premium; return acc; }, 0);
                const periodCoeff = isWOP ? periodsAll - p.periodNumber : p.periodNumber;
                return {
                    periodNumber: p.periodNumber,
                    insuredSum: round(periodInstallment * (periodCoeff - diffCoeff), 2) || 0,
                    periodStartDate: p.periodStartDate,
                    periodEndDate: p.periodEndDate
                };
            });
        riskSumInsured.sumInsuredByPeriod = sumInsuredByPeriod;
        riskSumInsured.sumInsured = isWOP ?
            sumInsuredByPeriod[0].insuredSum
            : sumInsuredByPeriod.slice(-1)[0].insuredSum;
    }

};
