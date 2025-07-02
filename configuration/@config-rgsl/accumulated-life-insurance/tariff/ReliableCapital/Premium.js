
'use strict';

const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const sumInsuredConfig = require('./rules/ReliableCapitalSumInsuredConfig');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const premiumCoefficients = require('./rules/ReliableCapitalPremiumCoefficients');
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

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender,
        allRisks, currency, installmentAmount, paymentPlan, manualCorrection,
        insuredSumAmount, calcFromInsuredSum, contractIssueDate, contractStartDate, amendment, productConfigurationData } = input;

    let { risks } = input;
    const contractEndDate = input.item && input.item.endDate;

    const mainRiskCode = getMainRiskCode(productCode);
    const mandatoryRisksCoeff = premiumCoefficients({ productCode, paymentFrequency, contractTerm: term, insuredAge: insuredAgeOnIssueDate, insuredGender: insuredGender });
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
        }
        clearRiskData();
        // this part is required by platform schems and surrender value calculation
        calculatedRisks = initCalculatedRisks();

    }

    function initRiskData() {
        return risks
            && risks.map((r, idx, arr) => {
                const underwriterRatio = getValue(r, 'underwriterRatio', 1);
                const underwriterPremium = getValue(r, 'underwriterPremiumPaymentFrequency', 0);
                const riskCode = getValue(r, 'risk.riskCode');
                const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
                const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode });
                const productConf = productConfigurationData;
                const isFixed = riskSumInsuredConfig?.isFixed;
                let sumInsuredMaxValue = riskSumInsuredConfig?.maxValue;
                if (riskCode == 'HI36404' || riskCode == 'IH36404') {
                    const existsHI36404 = arr.some(item => item.risk.riskCode == 'HI36404');
                    const existsIH36404 = arr.some(item => item.risk.riskCode == 'IH36404');
                    if (existsHI36404 && existsIH36404) {
                        sumInsuredMaxValue = round(sumInsuredMaxValue / 2, 2);
                    }
                }
                if (riskCode == 'MJL36404') {
                    if (paymentFrequency == '2' || paymentFrequency == '3') {
                        sumInsuredMaxValue = Math.min(installmentAmount, 200000);
                    }
                    if (paymentFrequency == '4') {
                        sumInsuredMaxValue = Math.min(installmentAmount * 2, 200000);
                    }
                    if (paymentFrequency == '5') {
                        sumInsuredMaxValue = Math.min(installmentAmount * 6, 200000);
                    }
                }
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
            && risks.map((r, idx, arr) => {
                const underwriterRatio = getValue(r, 'underwriterRatio', 1);
                const underwriterPremium = getValue(r, 'underwriterPremiumPaymentFrequency', 0);
                const riskCode = getValue(r, 'risk.riskCode');
                const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
                const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode });
                const productConf = productConfigurationData;
                const isFixed = riskSumInsuredConfig?.isFixed;
                let sumInsuredMaxValue = riskSumInsuredConfig?.maxValue;
                if (riskCode == 'HI36404' || riskCode == 'IH36404') {
                    const existsHI36404 = arr.some(item => item.risk.riskCode == 'HI36404');
                    const existsIH36404 = arr.some(item => item.risk.riskCode == 'IH36404');
                    if (existsHI36404 && existsIH36404) {
                        sumInsuredMaxValue = round(sumInsuredMaxValue / 2, 2);
                    }
                }
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
        riskData.filter(r => !r.isFixed || r.riskCode == 'MJL36404').forEach(item => {
            const calcSumInsured = riskData.filter(elem => elem.riskCode == item.premiumCalcRisk)[0].sumInsured;
            item.premium = round(calcSumInsured * item.riskTariff, 8);
        });
        const currentRiskData = deepCopy(riskData);
        if (!objectUtils.objectComparison(previousRiskData, currentRiskData))
        { calcPremium(riskData); }
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
            if (risk.riskCode == 'MJL36404') {
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
            calcRiskPeriodSumInsured(risk, risk.riskSumInsuredConfig);
        });
    }

    function calcRiskPeriodSumInsured(risk, riskSumInsuredConfig) {

        if (riskSumInsuredConfig?.isReturn || riskSumInsuredConfig?.isWOP) {

            let coeff = 1;

            if (paymentFrequency == '3') {

                coeff = 2;
            }

            if (paymentFrequency == '4') {

                coeff = 4;
            }

            if (paymentFrequency == '5') {

                coeff = 12;
            }

            const periods = dateUtils.getPeriodsTableByMonths(risk.startDate, risk.endDate, 12 / coeff) ?? [];
            const contractPeriods = dateUtils.getPeriodsTableByMonths(contractStartDate, contractEndDate, 12 / coeff);
            const periodsLength = risk.endDate == contractEndDate ? periods.length : contractPeriods.length || periods.length;
            const amendmentEffectiveDate = amendment?.attributes?.validFrom;

            const sumInsuredByPeriod = periods.map(p => {

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
                const periodCoeff = riskSumInsuredConfig.isWOP ? periodsLength - p.periodNumber : p.periodNumber;

                return {
                    periodNumber: p.periodNumber,
                    insuredSum: round(periodInstallment * periodCoeff, 2) || 0,
                    periodStartDate: p.periodStartDate,
                    periodEndDate: p.periodEndDate
                };
            });

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
