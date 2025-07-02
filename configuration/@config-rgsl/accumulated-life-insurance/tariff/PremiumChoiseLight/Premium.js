
'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const sumInsuredConfig = require('./rules/premiumChoiseLightSumInsuredConfig');
const premiumCoefficients = require('./rules/premiumChoiseLightPremiumCoefficients');
const { getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender,
        risks, currency, installmentAmount, paymentPlan, manualCorrection, contractIssueDate, productConfigurationData } = input;

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
                riskCode: getValue(r, 'risk.riskCode'),
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
            calcPeriodInsuredSums();
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
                const riskCode = getValue(r, 'risk.riskCode');
                const riskTariff = mandatoryRisksCoeff[riskCode];
                const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'] || 1;
                const productConf = productConfigurationData;
                const sumInsured = installmentAmount * term * riskCoeff;
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
                    sumInsured,
                    sumInsuredByPeriod: undefined,
                    isLife: r.risk.isLife,
                    withoutProduct: r.risk.withoutProduct ?? false,
                    // additional info
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
            const { isWOP, WOPRisks } = sumInsuredConfig({ productCode, riskCode: risk.riskCode });
            if (isWOP) {
                const periods = dateUtils.getPeriodsTableByMonths(risk.startDate, risk.endDate, 12);
                const sumInsuredByPeriod = periods && periods.length > 0
                    && periods.map(p => {
                        const filteredRiskData = riskData.filter(r => WOPRisks.includes(r.riskCode));
                        const periodInstallment = filteredRiskData.reduce((acc, v) => { acc += v.premium; return acc; }, 0);
                        const periodCoeff = periods.length - p.periodNumber;
                        return {
                            periodNumber: p.periodNumber,
                            insuredSum: round(periodInstallment * periodCoeff, 2) || 0,
                            periodStartDate: p.periodStartDate,
                            periodEndDate: p.periodEndDate
                        };
                    });
                risk.sumInsuredByPeriod = sumInsuredByPeriod;
                risk.sumInsured = sumInsuredByPeriod[0].insuredSum;
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
