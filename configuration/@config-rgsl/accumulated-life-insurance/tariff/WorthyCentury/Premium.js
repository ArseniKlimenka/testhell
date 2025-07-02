
'use strict';

const sumInsuredConfig = require('./rules/WorthyCenturySumInsuredConfig');
const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const premiumCoefficients = require('./rules/WorthyCenturyPremiumCoefficients');
const premiumNewCoefficients = require('./rules/WorthyCenturyPremiumNewCoefficients');
const premiumCoefficientsWCEN3OAS = require('./rules/WorthyCentury3PremiumCoefficients');
const { getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender,
        risks, currency, installmentAmount, paymentPlan, manualCorrection,
        insuredSumAmount, calcFromInsuredSum, contractIssueDate, contractStartDate, productConfigurationData } = input;

    const mainRiskCode = getMainRiskCode(productCode);

    let mandatoryRisksCoeff;
    if (productCode === lifeInsuranceConstants.product.WCEN3OAS) {
        mandatoryRisksCoeff = premiumCoefficientsWCEN3OAS({ productCode, paymentFrequency, contractTerm: paymentFrequency == '1' ? '1' : term, insuredAge: insuredAgeOnIssueDate, insuredGender: insuredGender, insuredSum: insuredSumAmount });
    } else if (dateUtils.isAfterOrEqual(dateUtils.formatDate(contractIssueDate), dateUtils.formatDate(lifeInsuranceConstants.newRules.WCENOAS.startDate))) {
        mandatoryRisksCoeff = premiumNewCoefficients({ productCode, paymentFrequency, contractTerm: paymentFrequency == '1' ? '1' : term, insuredAge: insuredAgeOnIssueDate, insuredGender: insuredGender });
    } else {
        mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm: paymentFrequency == '1' ? '1' : term, insuredAge: insuredAgeOnIssueDate, insuredGender: insuredGender });
    }

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
                maxInsuredSum
            };
        });

        // calculate riskInsuredSumByPeriod
        riskData.forEach(r => {
            const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode: r.riskCode });
            calcRiskPeriodSumInsured(r, riskSumInsuredConfig);
        });

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

        // calc from premium
        if (!calcFromInsuredSum) {
            riskData = initRiskData();
            calcPremium();
            calcRoundingCorrection();
            calcInsuredSums();
        }
        // calc from insured sum
        else {
            riskData = initRiskDataIS();
            calcRoundingCorrectionIS();
            calcInsuredSumsIS();
        }
        clearRiskData();
        // this part is required by platform schems and surrender value calculation
        calculatedRisks = initCalculatedRisks();

    }

    function initRiskData() {
        return risks
            && risks.map(r => {
                const riskCode = getValue(r, 'risk.riskCode');
                const riskTariff = mandatoryRisksCoeff[riskCode];
                const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode });
                const productConf = productConfigurationData;
                const isFixed = riskSumInsuredConfig?.isFixed;
                const sumInsuredMaxValue = riskSumInsuredConfig?.maxValue;
                const sumInsured = isFixed ? sumInsuredMaxValue : undefined;
                const premium = isFixed ? sumInsuredMaxValue * riskTariff : undefined;
                const premiumCalcRisk = riskSumInsuredConfig?.premiumCalcRisk;
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
                    sumInsured,
                    sumInsuredByPeriod: undefined,
                    isLife: r.risk.isLife,
                    withoutProduct: r.risk.withoutProduct ?? false,
                    // additional info
                    riskTariff,
                    riskCoeff,
                    isFixed,
                    sumInsuredMaxValue,
                    riskSumInsuredConfig,
                    premiumCalcRisk,
                    maxInsuredSum
                };
            });
    }

    function initRiskDataIS() {
        return risks
            && risks.map(r => {
                const riskCode = getValue(r, 'risk.riskCode');
                const riskTariff = mandatoryRisksCoeff[riskCode];
                const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode });
                const productConf = productConfigurationData;
                const isFixed = riskSumInsuredConfig?.isFixed;
                const sumInsuredMaxValue = riskSumInsuredConfig?.maxValue;
                const sumInsured = isFixed ? sumInsuredMaxValue : (sumInsuredMaxValue ? Math.min(insuredSumAmount, sumInsuredMaxValue) : insuredSumAmount);
                const premium = sumInsured * riskTariff;
                const premiumCalcRisk = riskSumInsuredConfig?.premiumCalcRisk;
                let maxInsuredSum = productConf.maxInsuredSumMainRisk;
                if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                    maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
                }
                return {
                    // what we need to return
                    riskCode,
                    startDate: r.startDate,
                    endDate: r.endDate,
                    premium: round(premium, 2),
                    isAdditional: r.isAdditional,
                    sumInsured: round(sumInsured, 2),
                    sumInsuredByPeriod: undefined,
                    isLife: r.risk.isLife,
                    withoutProduct: r.risk.withoutProduct ?? false,
                    // additional info
                    riskTariff,
                    riskCoeff,
                    isFixed,
                    sumInsuredMaxValue,
                    riskSumInsuredConfig,
                    premiumCalcRisk,
                    maxInsuredSum
                };
            });
    }

    function calcPremium() {
        const previousRiskData = deepCopy(riskData);
        const tempInstallmentAmount = installmentAmount - riskData.filter(r => r.isFixed).reduce((acc, v) => acc += v.premium, 0);
        const tempSumInsured = tempInstallmentAmount / riskData.filter(r => !r.isFixed).reduce((acc, v) => acc += v.riskTariff, 0);
        riskData.filter(r => !r.isFixed).forEach(item => {
            if (tempSumInsured > item.sumInsuredMaxValue) {
                item.sumInsured = item.sumInsuredMaxValue;
                item.isFixed = true;
            }
            else {
                item.sumInsured = tempSumInsured;
            }
            item.premium = item.sumInsured * item.riskTariff;
        });
        riskData.filter(r => !r.isFixed).forEach(item => {
            const calcSumInsured = riskData.filter(elem => elem.riskCode == item.premiumCalcRisk)[0].sumInsured;
            item.premium = calcSumInsured * item.riskTariff;
        });
        const currentRiskData = deepCopy(riskData);
        if (!objectUtils.objectComparison(previousRiskData, currentRiskData)) { calcPremium(riskData); }
    }

    function calcRoundingCorrection() {
        riskData.forEach(item => {
            item.sumInsured = round(item.sumInsured, 2);
            item.premium = round(item.premium, 2);
        });
        const totalCalculatedPremium = round(riskData.reduce((acc, v) => acc += v.premium, 0), 2);
        const differenceBetweenCalcAndManualValues = round(installmentAmount - totalCalculatedPremium, 2);
        if (riskData.find(r => r.riskCode == mainRiskCode)?.premium) {
            riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndManualValues;
            riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);
        }
    }

    function calcRoundingCorrectionIS() {
        if (paymentFrequency == '1') {
            const totalCalculatedPremium = round(riskData.reduce((acc, v) => acc += v.premium, 0), 2);
            const totalRequiredPremium = Math.ceil(totalCalculatedPremium);
            const differenceBetweenCalcAndRequiredValues = round(totalRequiredPremium - totalCalculatedPremium, 2);
            if (riskData.find(r => r.riskCode == mainRiskCode)?.premium) {
                riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndRequiredValues;
                riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);
            } else if (riskData.find(r => r.riskCode == 'DLP46204M')?.premium) {
                riskData.find(r => r.riskCode == 'DLP46204M').premium += differenceBetweenCalcAndRequiredValues;
                riskData.find(r => r.riskCode == 'DLP46204M').premium = round(riskData.find(r => r.riskCode == 'DLP46204M').premium, 2);
            }
        }
        else {

            const mixedRisk = riskData.some(r => r.riskCode == 'DLP46204M');

            if (mixedRisk) {
                const totalCalculatedPremium = round(riskData.reduce((acc, v) => acc += v.premium, 0), 2);
                const totalRequiredPremium = Math.ceil(totalCalculatedPremium);
                const differenceBetweenCalcAndRequiredValues = round(totalRequiredPremium - totalCalculatedPremium, 2);
                // for 3+ years
                if (riskData.find(r => r.riskCode == 'DLP46204M')?.premium) {
                    riskData.find(r => r.riskCode == 'DLP46204M').premium += differenceBetweenCalcAndRequiredValues;
                    riskData.find(r => r.riskCode == 'DLP46204M').premium = round(riskData.find(r => r.riskCode == 'DLP46204M').premium, 2);
                }
                // for 1-2 years
                if (riskData.find(r => r.riskCode == 'DLPVV46204')?.premium) {
                    riskData.find(r => r.riskCode == 'DLPVV46204').premium += differenceBetweenCalcAndRequiredValues;
                    riskData.find(r => r.riskCode == 'DLPVV46204').premium = round(riskData.find(r => r.riskCode == 'DLPVV46204').premium, 2);
                }
            } else {
                const totalCalculatedPremium = round(riskData.filter(r => r.startDate > contractStartDate).reduce((acc, v) => acc += v.premium, 0), 2);
                const totalRequiredPremium = Math.ceil(totalCalculatedPremium);
                const differenceBetweenCalcAndRequiredValues = round(totalRequiredPremium - totalCalculatedPremium, 2);
                // for 3+ years
                if (riskData.find(r => r.riskCode == mainRiskCode)?.premium) {
                    riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndRequiredValues;
                    riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);
                }
                // for 1-2 years
                if (riskData.find(r => r.riskCode == 'DLPVV46204')?.premium) {
                    riskData.find(r => r.riskCode == 'DLPVV46204').premium += differenceBetweenCalcAndRequiredValues;
                    riskData.find(r => r.riskCode == 'DLPVV46204').premium = round(riskData.find(r => r.riskCode == 'DLPVV46204').premium, 2);
                }
            }

        }
    }

    function calcInsuredSums() {
        riskData.filter(r => !r.isFixed).forEach(risk => {
            if (risk.riskCoeff) { risk.sumInsured = round(risk.sumInsured * risk.riskCoeff, 2); }
            calcRiskPeriodSumInsured(risk, risk.riskSumInsuredConfig);
        });
    }

    function calcInsuredSumsIS() {
        const wholePremium = round(riskData.reduce((p, c) => p + c.premium, 0), 2);
        riskData.filter(r => !r.isFixed).forEach(risk => {
            if (risk.riskCoeff) { risk.sumInsured = round(risk.sumInsured * risk.riskCoeff, 2); }
            if (risk.riskCode == 'JL36404') {
                if (paymentFrequency == '2' || paymentFrequency == '3') {
                    risk.sumInsured = Math.min(wholePremium, 200000);
                }
                if (paymentFrequency == '4') {
                    risk.sumInsured = Math.min(wholePremium * 2, 200000);
                }
                if (paymentFrequency == '5') {
                    risk.sumInsured = Math.min(wholePremium * 6, 200000);
                }
            }
            if (risk.riskCode == 'DLP46204M' || risk.riskCode == 'DLPVV46204') {
                const returnYears = 2;
                calcRiskPeriodSumInsuredReturnPremium(risk, risk.riskSumInsuredConfig, insuredSumAmount, returnYears);
            } else {
                calcRiskPeriodSumInsured(risk, risk.riskSumInsuredConfig);
            }

        });
    }

    function calcRiskPeriodSumInsured(risk, riskSumInsuredConfig) {
        if (riskSumInsuredConfig?.isReturn || riskSumInsuredConfig?.isWOP) {
            const periods = dateUtils.getPeriodsTableByMonths(risk.startDate, risk.endDate, 12);
            const sumInsuredByPeriod = periods && periods.length > 0
                && periods.map(p => {
                    const filteredRiskData = riskSumInsuredConfig.isWOP ? riskData.filter(r => riskSumInsuredConfig.WOPRisks.includes(r.riskCode)) : riskData.filter(r => riskSumInsuredConfig.returnRisks.includes(r.riskCode));
                    const periodInstallment = filteredRiskData.reduce((acc, v) => { acc += v.premium; return acc; }, 0);
                    const periodCoeff = riskSumInsuredConfig.isWOP ? periods.length - p.periodNumber : p.periodNumber;
                    return {
                        periodNumber: p.periodNumber,
                        insuredSum: round(periodInstallment * periodCoeff, 2) || 0,
                        periodStartDate: p.periodStartDate,
                        periodEndDate: p.periodEndDate
                    };
                });
            risk.sumInsuredByPeriod = sumInsuredByPeriod;
            risk.sumInsured = riskSumInsuredConfig.isWOP ?
                sumInsuredByPeriod[0].insuredSum
                : sumInsuredByPeriod.slice(-1)[0].insuredSum;
        }
    }

    function calcRiskPeriodSumInsuredReturnPremium(risk, riskSumInsuredConfig, insuredSumAmount, returnYears) {
        if (riskSumInsuredConfig?.isReturn) {
            let coeff = 1;
            if (paymentFrequency == '3') { coeff = 2; }
            if (paymentFrequency == '4') { coeff = 4; }
            if (paymentFrequency == '5') { coeff = 12; }
            const periods = dateUtils.getPeriodsTableByMonths(risk.startDate, risk.endDate, 12 / coeff);
            const sumInsuredByPeriod = periods && periods.length > 0
                && periods.map(p => {
                    const filteredRiskData = riskData.filter(r => riskSumInsuredConfig.returnRisks.includes(r.riskCode));
                    const periodInstallment = filteredRiskData.reduce((acc, v) => { acc += v.premium; return acc; }, 0);
                    const periodInstallmentForSingle = riskData.reduce((acc, v) => { acc += v.premium; return acc; }, 0);
                    const periodCoeff = riskSumInsuredConfig.isWOP ? periods.length - p.periodNumber : p.periodNumber;
                    if (p.periodNumber <= returnYears * coeff) {
                        if (paymentFrequency == '1') {
                            return {
                                periodNumber: p.periodNumber,
                                insuredSum: round(periodInstallmentForSingle, 2) || 0,
                                periodStartDate: p.periodStartDate,
                                periodEndDate: p.periodEndDate
                            };
                        }
                        return {
                            periodNumber: p.periodNumber,
                            insuredSum: round(periodInstallment * periodCoeff, 2) || 0,
                            periodStartDate: p.periodStartDate,
                            periodEndDate: p.periodEndDate
                        };

                    }
                    return {
                        periodNumber: p.periodNumber,
                        insuredSum: insuredSumAmount,
                        periodStartDate: p.periodStartDate,
                        periodEndDate: p.periodEndDate
                    };


                });
            risk.sumInsuredByPeriod = sumInsuredByPeriod;
            risk.sumInsured = sumInsuredByPeriod.slice(-1)[0].insuredSum;
        }
    }

    function clearRiskData() {
        riskData.forEach(risk => {
            delete risk.riskTariff;
            delete risk.riskCoeff;
            delete risk.isFixed;
            delete risk.sumInsuredMaxValue;
            delete risk.riskSumInsuredConfig;
            delete risk.premiumCalcRisk;
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
