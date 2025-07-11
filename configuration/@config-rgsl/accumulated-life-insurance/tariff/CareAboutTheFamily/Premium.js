
'use strict';

const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const sumInsuredConfig = require('./rules/careAboutTheFamilySumInsuredConfig');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const premiumCoefficients = require('./rules/careAboutTheFamilyPremiumCoefficients');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const manualRiskDeletion = input?.manualRiskDeletion ?? false;
    const manualCorrection = input?.manualCorrection ?? false;
    const calcFromInsuredSum = input?.calcFromInsuredSum ?? false;
    const correctionWithoutCalc = input?.correctionWithoutCalc ?? false;

    let currentPremium = mainCalcPremium(input, false);

    if ((manualRiskDeletion && !correctionWithoutCalc) || (manualCorrection && !calcFromInsuredSum)) {
        const productCode = input?.productCode;
        const mainRiskCode = getMainRiskCode(productCode);
        const fullPremium = manualCorrection ? mainCalcPremium(input, false) : mainCalcPremium(input, true);

        currentPremium.risks.forEach(current => {
            const full = fullPremium.risks.find(x => x.code == current.code);
            current.sumInsured = full.sumInsured;
        });

        currentPremium.calculatedAttributes.riskData.forEach(current => {
            const full = fullPremium.calculatedAttributes.riskData.find(x => x.riskCode == current.riskCode);
            current.sumInsured = full.sumInsured;
            current.premium = full.premium;
        });

        const fullCalculatedPremium = fullPremium.calculatedAttributes.riskData.filter(x => x.startDate == input.contractStartDate).reduce((acc, val) => acc + val.premium, 0);
        const currentCalculatedPremium = currentPremium.calculatedAttributes.riskData.filter(x => x.riskCode != mainRiskCode && x.startDate == input.contractStartDate).reduce((acc, val) => acc + val.premium, 0);
        const mainRisk = currentPremium.calculatedAttributes.riskData.find(x => x.riskCode == mainRiskCode);
        const isDVV = currentPremium.calculatedAttributes.riskData.some(x => x.riskCode == 'DVV36404' || x.riskCode == 'DAVV36404');
        if (!calcFromInsuredSum) {
            mainRisk.premium = manualCorrection ? input?.installmentAmount - currentCalculatedPremium : fullCalculatedPremium - currentCalculatedPremium;
            if (isDVV) { currentPremium = mainCalcPremium(input, false); } // Для перерасчета, если не удален риск DVV или DAVV
        }
    }

    return currentPremium;
};

function mainCalcPremium(input, manualRiskDeletion) {

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender, currency,
        installmentAmount, paymentPlan, manualCorrection, contractIssueDate, insuredSumAmount, calcFromInsuredSum,
        contractStartDate, amendment, allRisks, correctionWithoutCalc, productConfigurationData } = input;

    let risks = input.risks;
    const contractEndDate = input.item && input.item.endDate;
    const excludeDisabilty = false;
    const mainRiskCode = getMainRiskCode(productCode);
    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm: term, insuredAge: insuredAgeOnIssueDate, insuredGender, excludeDisabilty });
    const initialMandatoryRisksCoeff = deepCopy(mandatoryRisksCoeff); // to use in insured sum calc function
    const tariffRate = 0;
    let riskData = {};
    let calculatedRisks = {};

    if (manualRiskDeletion) {

        const copyRisks = deepCopy(risks);
        risks = allRisks;
        risks.forEach(x => {

            const oldRisk = copyRisks.find(r => r.risk.riskCode == x.risk.riskCode);
            if (oldRisk) {
                x.underwriterPremium = oldRisk.underwriterPremium;
                x.underwriterRatio = oldRisk.underwriterRatio;
                x.underwriterPremiumPaymentFrequency = oldRisk.underwriterPremiumPaymentFrequency;
            }
        });
    }

    const amendmentIssueDate = input.amendment?.attributes?.validFrom;
    const productConfOnAmendmentDate = input.amendment?.attributes?.productConfOnAmendmentDate;

    let productConfDate = undefined;

    if (!productConfOnAmendmentDate) {

        productConfDate = contractIssueDate;
    }
    else {

        productConfDate = amendmentIssueDate;
    }

    if (correctionWithoutCalc) {

        // just provide values from UI
        riskData = risks.map(r => {
            const riskCode = r?.risk?.riskCode;
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

    if (!correctionWithoutCalc) {
        if (manualCorrection) {

            // just provide values from UI
            if (!calcFromInsuredSum) {
                const sumInsuredMain = risks.find(r => mainRiskCode == r.risk.riskCode);
                riskData = risks.map(r => {
                    const riskCode = r?.risk?.riskCode;
                    const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                    const underwriterRatio = r?.underwriterRatio ?? 1;
                    const underwriterPremium = r?.underwriterPremiumPaymentFrequency ?? 0;
                    const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode });
                    const isFixed = riskSumInsuredConfig?.isFixed;
                    const sumInsuredMaxValue = riskSumInsuredConfig?.maxValue;
                    const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
                    const productConf = productConfigurationData;
                    const premiumCalcRisk = riskSumInsuredConfig?.premiumCalcRisk;
                    let maxInsuredSum = productConf.maxInsuredSumMainRisk;
                    const sumInsured = isFixed ? sumInsuredMaxValue : (sumInsuredMaxValue ? Math.min(r.riskInsuredSum, sumInsuredMaxValue) : r.riskInsuredSum);
                    if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                        maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
                    }
                    if (['DLPSS36404', 'DVV36404', 'CDVV36404'].includes(riskCode)) {
                        r.riskPremium = sumInsured * riskTariff;
                    } else {
                        r.riskPremium = r.riskInsuredSum * riskTariff;
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
                        premiumCalcRisk,
                        riskTariff,
                        riskCoeff,
                        isFixed,
                        sumInsuredMaxValue,
                        riskSumInsuredConfig,
                        underwriterRatio,
                        underwriterPremium
                    };
                });
            } else {
                riskData = risks.map(r => {
                    const risksFixedCalc = ['DLPSS36404', 'DVV36404', 'CDVV36404'];
                    const riskCode = r?.risk?.riskCode;
                    const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                    const underwriterRatio = r?.underwriterRatio ?? 1;
                    const underwriterPremium = r?.underwriterPremiumPaymentFrequency ?? 0;
                    const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode });
                    const isFixed = riskSumInsuredConfig?.isFixed;
                    const sumInsuredMaxValue = riskSumInsuredConfig?.maxValue;
                    const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
                    const productConf = productConfigurationData;
                    const premiumCalcRisk = riskSumInsuredConfig?.premiumCalcRisk;
                    let maxInsuredSum = productConf.maxInsuredSumMainRisk;
                    const sumInsured = isFixed ? sumInsuredMaxValue : (sumInsuredMaxValue ? Math.min(insuredSumAmount, sumInsuredMaxValue) : insuredSumAmount);
                    if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                        maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
                    }
                    if (risksFixedCalc.includes(riskCode)) {
                        r.riskPremium = sumInsured * riskTariff;
                    } else {
                        r.riskPremium = r.riskInsuredSum * riskTariff;
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
                        premiumCalcRisk,
                        riskTariff,
                        riskCoeff,
                        isFixed,
                        sumInsuredMaxValue,
                        riskSumInsuredConfig
                    };
                });
            }

            // calculate riskInsuredSumByPeriod
            riskData.forEach(r => {
                const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode: r.riskCode });
                calcRiskPeriodSumInsured(r, riskSumInsuredConfig);
            });
            if (!calcFromInsuredSum) {
                calcPremiumMC();
            }
            // this part is required by platform schems and surrender value calculation
            calculatedRisks = initCalculatedRisks();

        }
        else {

            // delete values for risks that are not in the `risks` array
            // in order to elimenate sum of replaceable risks premium
            if (mandatoryRisksCoeff)
            { Object
                .keys(mandatoryRisksCoeff)
                .filter(k => !risks.map(r => { return r.risk.riskCode; }).includes(k))
                .forEach(nonListRisk => delete mandatoryRisksCoeff[nonListRisk]); }

            // return if there is no premium coefficients
            if (!mandatoryRisksCoeff || Object.keys(mandatoryRisksCoeff).length == 0) { return {
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
            }; }

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
                calcInsuredSumsIS();
                calcPremiumIS();
                calcRoundingCorrectionIS();
                calcPeriodInsuredSumsIS();
            }

            clearRiskData();
            // this part is required by platform schems and surrender value calculation
            calculatedRisks = initCalculatedRisks();

        }
    }

    function initRiskData() {
        return risks
            && risks.map(r => {
                const underwriterRatio = r?.underwriterRatio ?? 1;
                const underwriterPremium = r?.underwriterPremiumPaymentFrequency ?? 0;
                const riskCode = r?.risk?.riskCode;
                const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
                const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode });
                const productConf = productConfigurationData;
                const isFixed = riskSumInsuredConfig?.isFixed;
                const sumInsuredMaxValue = riskSumInsuredConfig?.maxValue;
                const sumInsured = isFixed ? sumInsuredMaxValue : undefined;
                const premium = isFixed ? (sumInsuredMaxValue * riskTariff) : undefined;
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
                const underwriterRatio = r?.underwriterRatio ?? 1;
                const underwriterPremium = r?.underwriterPremiumPaymentFrequency ?? 0;
                const riskCode = r?.risk?.riskCode;
                const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
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
        const tempInstallmentAmount = installmentAmount - riskData.filter(r => r.isFixed).reduce((acc, v) => acc += v.premium || 0, 0);
        const tempSumInsured = tempInstallmentAmount / riskData.filter(r => !r.isFixed && r.startDate == contractStartDate).reduce((acc, v) => acc += v.riskTariff, 0);
        riskData.filter(r => !r.isFixed).forEach(item => {
            if (tempSumInsured > item.sumInsuredMaxValue) {
                item.sumInsured = round(item.sumInsuredMaxValue, 8);
                item.isFixed = true;
            }
            else {
                item.sumInsured = round(tempSumInsured, 8);
            }
            item.premium = round(item.sumInsured * item.riskTariff, 8);
        });
        riskData.filter(r => !r.isFixed).forEach(item => {
            const calcSumInsured = riskData.filter(elem => elem.riskCode == item.premiumCalcRisk)[0].sumInsured;
            if (!manualCorrection) {
                item.premium = round(calcSumInsured * item.riskTariff, 8);
            } else if (item.riskCode == 'DLPSS36404') {
                item.premium = round(calcSumInsured * item.riskTariff, 8);
            }
        });
        const currentRiskData = deepCopy(riskData);
        if (!objectUtils.objectComparison(previousRiskData, currentRiskData))
        { calcPremium(riskData); }
    }
    function calcPremiumMC() {
        const previousRiskData = deepCopy(riskData);
        const tempInstallmentAmount = installmentAmount - riskData.filter(r => r.isFixed).reduce((acc, v) => acc += v.premium || 0, 0);
        const tempSumInsured = round(tempInstallmentAmount / riskData.filter(r => !r.isFixed && r.startDate == contractStartDate).reduce((acc, v) => acc += v.riskTariff, 0), 2);
        riskData.filter(r => !r.isFixed).forEach(item => {
            if (tempSumInsured > item.sumInsuredMaxValue) {
                item.sumInsured = round(item.sumInsuredMaxValue, 8);
                item.isFixed = true;
            } else {
                item.sumInsured = round(tempSumInsured, 8);
            }
            item.premium = round(item.sumInsured * item.riskTariff, 8);
            if (item.riskCoeff) { item.sumInsured = round(item.sumInsured * item.riskCoeff, 2); }
        });
        const currentRiskData = deepCopy(riskData);
        if (!objectUtils.objectComparison(previousRiskData, currentRiskData)) {
            calcPremiumMC();
        }
    }
    function calcPremiumIS() {
        riskData.filter(r => !r.isFixed).forEach(item => {
            const minValueSumInsured = Math.min(item.sumInsuredMaxValue, item.sumInsured);
            const calcSumInsured = riskData.filter(elem => elem.riskCode == item.premiumCalcRisk)[0].sumInsured;
            if (!item.sumInsuredMaxValue) {
                item.premium = calcSumInsured * item.riskTariff;
            } else {
                item.premium = minValueSumInsured * item.riskTariff;
            }
        });
    }

    function calcRoundingCorrection() {
        riskData.forEach(item => {
            item.sumInsured = round(item.sumInsured, 2);
            item.premium = round(item.premium, 2);
        });
        const totalCalculatedPremium = round(riskData.filter(r => r.startDate == contractStartDate).reduce((acc, v) => acc += v.premium, 0), 2);
        const differenceBetweenCalcAndManualValues = round(installmentAmount - totalCalculatedPremium, 2);
        riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndManualValues;
        riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);
    }

    function calcRoundingCorrectionIS() {
        const totalCalculatedPremium = round(riskData.reduce((acc, v) => acc += v.premium, 0), 2);
        riskData.forEach(item => {
            item.premium = round(item.premium, 2);
        });

        const totalCalculatedPremiumRounded = riskData.reduce((acc, v) => acc += v.premium, 0);
        const differenceBetweenRoundedValues = totalCalculatedPremium - totalCalculatedPremiumRounded;
        riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenRoundedValues;
    }

    function calcInsuredSums() {
        riskData.filter(r => !r.isFixed).forEach(risk => {
            if (risk.riskCoeff) { risk.sumInsured = round(risk.sumInsured * risk.riskCoeff, 2); }
            calcRiskPeriodSumInsured(risk, risk.riskSumInsuredConfig);
        });
    }

    function calcInsuredSumsIS() {
        riskData.filter(r => !r.isFixed).forEach(risk => {
            if (risk.riskCoeff) { risk.sumInsured = round(risk.sumInsured * risk.riskCoeff, 2); }
        });
    }

    function calcPeriodInsuredSumsIS() {
        riskData.filter(r => !r.isFixed).forEach(risk => {
            calcRiskPeriodSumInsured(risk, risk.riskSumInsuredConfig);
        });
    }

    function calcRiskPeriodSumInsured(risk, riskSumInsuredConfig) {

        if (riskSumInsuredConfig?.isReturn || riskSumInsuredConfig?.isWOP) {

            const coeff = 1;

            const periods = dateUtils.getPeriodsTableByMonths(risk.startDate, risk.endDate, 12 / coeff) ?? [];
            const contractPeriods = dateUtils.getPeriodsTableByMonths(contractStartDate, contractEndDate, 12 / coeff);
            let periodsLength = risk.endDate == contractEndDate ? periods.length : contractPeriods.length || periods.length;
            const amendmentEffectiveDate = amendment?.attributes?.validFrom;
            if (risk.riskCode == 'DAVV36404') {
                periodsLength = contractPeriods.length - periodsLength;
            }
            const sumInsuredByPeriod = periods && periods.length > 0 ?
                periods.map(p => {

                    let filteredRiskData = riskSumInsuredConfig.isWOP ?
                        riskData.filter(r => riskSumInsuredConfig.WOPRisks.includes(r.riskCode)) :
                        riskData.filter(r => riskSumInsuredConfig.returnRisks.includes(r.riskCode));

                    if (amendmentEffectiveDate) {
                        if (risk.startDate < amendmentEffectiveDate) {
                            filteredRiskData = filteredRiskData.filter(fr => fr.startDate < amendmentEffectiveDate);
                        }
                        else {
                            filteredRiskData = filteredRiskData.filter(fr => fr.startDate >= amendmentEffectiveDate);
                        }
                    }

                    const periodInstallment = filteredRiskData.reduce((acc, v) => { acc += v.premium; return acc; }, 0);
                    let periodCoeff = riskSumInsuredConfig.isWOP ? periodsLength - p.periodNumber : p.periodNumber;
                    if (risk.riskCode == 'DAVV36404') {
                        periodCoeff = riskSumInsuredConfig.isReturn ? periodsLength + p.periodNumber : p.periodNumber;
                    }

                    return {
                        periodNumber: p.periodNumber,
                        insuredSum: round(periodInstallment * periodCoeff, 2) || 0,
                        periodStartDate: p.periodStartDate,
                        periodEndDate: p.periodEndDate
                    };
                }) : [];

            risk.sumInsuredByPeriod = sumInsuredByPeriod;
            risk.sumInsured = (riskSumInsuredConfig.isWOP ?
                sumInsuredByPeriod[0]?.insuredSum
                : sumInsuredByPeriod.slice(-1)[0]?.insuredSum) ?? 0;
        }
    }

    function clearRiskData() {
        riskData.forEach(risk => {
            delete risk.riskTariff;
            delete risk.riskCoeff;
            delete risk.isFixed;
            delete risk.sumInsuredMaxValue;
            delete risk.riskSumInsuredConfig;
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

}
