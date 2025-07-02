
'use strict';

const sumInsuredConfig = require('./rules/termLifeSumInsuredConfig');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const premiumCoefficients = require('./rules/termLifePremiumCoefficients');
const { getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { maxInsuranceSum } = require("@config-rgsl/life-insurance/lib/sumInsuredConstants");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

module.exports = function Premium(input) {

    const { productCode, paymentFrequency, term, insuredAgeOnIssueDate, insuredGender,
        risks, currency, installmentAmount, paymentPlan, manualCorrection, contractIssueDate,
        calcFromInsuredSum, amateurSportOption, cashback, productConfigurationData } = input;
    let insuredSumAmount = input.insuredSumAmount;

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
            const underwriterRatio = getValue(r, 'underwriterRatio', 1);
            const underwriterPremium = getValue(r, 'underwriterPremiumPaymentFrequency', 0);
            const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
            const riskSumInsuredConfig = sumInsuredConfig({ productCode, riskCode });
            let maxInsuredSum = productConf.maxInsuredSumMainRisk;
            if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
            }
            if (["CDHR10800", "CDHW10800"].includes(riskCode) && riskSumInsuredConfig.fixedValue) {
                r.riskInsuredSum = riskSumInsuredConfig.fixedValue;
            }
            if (["CDHR10800", "CDHW10800"].includes(riskCode)) {
                r.riskPremium = riskTariff;
            } else {
                r.riskPremium = r.riskInsuredSum * riskTariff;
            }
            if (amateurSportOption && ["D42204", "DNS42204", "DTP42204", "I42204"].includes(riskCode)) {
                r.riskPremium = r.riskPremium * 1.1;
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

                const maxValueConfigAge = riskSumInsuredConfig.maxValueConfig && Object.keys(riskSumInsuredConfig.maxValueConfig)
                    .find((item, idx, arr) => insuredAgeOnIssueDate >= item && (insuredAgeOnIssueDate < arr[idx + 1] || !arr[idx + 1]));
                const maxValue = maxValueConfigAge && riskSumInsuredConfig.maxValueConfig[maxValueConfigAge];
                const isI42204 = ["I42204"].includes(riskCode);
                if (maxValue && isI42204) {
                    insuredSumAmount = Math.min(insuredSumAmount, maxValue);
                }
                if (["CDHR10800", "CDHW10800"].includes(riskCode) && riskSumInsuredConfig.fixedValue) {
                    insuredSumAmount = riskSumInsuredConfig.fixedValue;
                }
                let premium;
                if (["CDHR10800", "CDHW10800"].includes(riskCode)) {
                    premium = riskTariff;
                } else {
                    premium = insuredSumAmount * riskTariff;
                }

                let maxInsuredSum = productConf.maxInsuredSumMainRisk;
                if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                    maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
                }

                if (amateurSportOption && ["D42204", "DNS42204", "DTP42204", "I42204"].includes(riskCode)) {
                    premium = premium * 1.1;
                }

                return {
                    // what we need to return
                    riskCode,
                    startDate: r.startDate,
                    endDate: r.endDate,
                    premium,
                    isAdditional: r.isAdditional,
                    sumInsured: insuredSumAmount,
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
    }

    function calcPeriodInsuredSums() {
        riskData.forEach(risk => {
            const products = lifeInsuranceConstants.product;
            const { isReturn, useCashBack, maxValueConfig } = sumInsuredConfig({ productCode, riskCode: risk.riskCode });
            const maxValueConfigAge = maxValueConfig && Object.keys(maxValueConfig)
                .find((item, idx, arr) => insuredAgeOnIssueDate >= item && (insuredAgeOnIssueDate < arr[idx + 1] || !arr[idx + 1]));
            const maxValue = maxValueConfigAge && maxValueConfig[maxValueConfigAge];

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
