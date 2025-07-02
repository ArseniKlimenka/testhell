
'use strict';

const sumInsuredConfig = require('./rules/ChildCapitalSumInsuredConfig');
const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const premiumCoefficients = require('./rules/ChildCapitalPremiumCoefficients');
const { getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const manualRiskDeletion = getValue(input, 'manualRiskDeletion', false);
    const currentPremium = calcPremium(input, false);
    if (manualRiskDeletion) {
        const productCode = getValue(input, 'productCode', 'productCode');
        const mainRiskCode = getMainRiskCode(productCode);
        const fullPremium = calcPremium(input, true);

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
        mainRisk.premium = fullCalculatedPremium - currentCalculatedPremium;
    }

    return currentPremium;
};

function calcPremium(input, manualRiskDeletion) {
    const { productCode, paymentFrequency, term, phAgeOnIssueDate, phGender,
        allRisks, currency, installmentAmount, paymentPlan, manualCorrection,
        insuredSumAmount, calcFromInsuredSum, contractIssueDate, contractStartDate, productConfigurationData } = input;
    let { risks } = input;

    const mainRiskCode = getMainRiskCode(productCode);
    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm: term, insuredAge: phAgeOnIssueDate, insuredGender: phGender });
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
            calcPeriodInsuredSumsIS();
        }
        clearRiskData();
        // this part is required by platform schems and surrender value calculation
        calculatedRisks = initCalculatedRisks();

    }

    function getPaymentCount(paymentFrequency) {

        let paymentCount = 1;
        switch (paymentFrequency) {
            case 5:
                paymentCount = 12;
                break;
            case 3:
                paymentCount = 2;
                break;
            case 4:
                paymentCount = 4;
                break;
            default:
                paymentCount = 1;
        }

        return paymentCount;
    }

    function initRiskData(paymentFrequency) {

        const paymentCount = getPaymentCount(paymentFrequency);

        return risks
            && risks.map(r => {
                const underwriterRatio = getValue(r, 'underwriterRatio', 1);
                const underwriterPremium = getValue(r, 'underwriterPremiumPaymentFrequency', 0);
                const riskCode = getValue(r, 'risk.riskCode');
                const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
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
                const underwriterRatio = getValue(r, 'underwriterRatio', 1);
                const underwriterPremium = getValue(r, 'underwriterPremiumPaymentFrequency', 0);
                const riskCode = getValue(r, 'risk.riskCode');
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
        const tempSumInsured = tempInstallmentAmount / riskData.filter(r => !r.isFixed && (r.startDate == contractStartDate || r.riskCode == 'CD5C36404')).reduce((acc, v) => acc += v.riskTariff, 0);
        riskData.filter(r => !r.isFixed).forEach(item => {
            if (tempSumInsured > item.sumInsuredMaxValue) {
                item.sumInsured = item.sumInsuredMaxValue;
                if (item.premiumCalcRisk != mainRiskCode)
                { item.isFixed = true; }
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
        if (!objectUtils.objectComparison(previousRiskData, currentRiskData))
        { calcPremium(riskData); }
    }

    function calcPremiumIS() {
        riskData.filter(r => !r.isFixed).forEach(item => {
            const calcSumInsured = riskData.filter(elem => elem.riskCode == item.premiumCalcRisk)[0].sumInsured;
            item.premium = round(calcSumInsured * item.riskTariff, 2);
        });
    }

    function calcRoundingCorrection() {
        riskData.forEach(item => {
            item.sumInsured = round(item.sumInsured, 2);
            item.premium = round(item.premium, 2);
        });
        const totalCalculatedPremium = round(riskData.filter(r => (r.startDate == contractStartDate || r.riskCode == 'CD5C36404')).reduce((acc, v) => acc += v.premium, 0), 2);
        const differenceBetweenCalcAndManualValues = round(installmentAmount - totalCalculatedPremium, 2);
        riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndManualValues;
        riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);
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
            let coeff = 1;
            if (paymentFrequency == '3') { coeff = 2; }
            if (paymentFrequency == '4') { coeff = 4; }
            if (paymentFrequency == '5') { coeff = 12; }
            const periods = dateUtils.getPeriodsTableByMonths(risk.startDate, risk.endDate, 12 / coeff);
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
}
