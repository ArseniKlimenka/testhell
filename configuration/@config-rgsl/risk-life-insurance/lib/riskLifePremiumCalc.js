const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const sumInsuredHelper = require('@config-rgsl/risk-life-insurance/lib/riskLifeSumInsuredCalc');

module.exports = {

    /**
     * @description General function for the Premium calculation
     */
    premiumCalculation: function ({ input, mainRiskCode, mandatoryRisksCoeff, additionalRisksCoeff }) {

        const { risks, paymentFrequency, currency, installmentAmount, paymentPlan, manualCorrection,
            productCode, contractIssueDate, productConfigurationData } = input;

        const productConf = productConfigurationData ?? {};

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
                const riskSumInsuredFunc = sumInsuredHelper[riskCode];
                const riskSumInsured = riskSumInsuredFunc ? riskSumInsuredFunc(riskData, input, r) : {};
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

            // calculate premium for mandatory risks
            riskData = risks
                && risks.map(r => {
                    const underwriterRatio = getValue(r, 'underwriterRatio', 1);
                    const underwriterPremium = getValue(r, 'underwriterPremiumPaymentFrequency', 0);
                    const riskCode = getValue(r, 'risk.riskCode');
                    const riskTariff = (mandatoryRisksCoeff[riskCode] + underwriterPremium) * underwriterRatio;
                    const riskPremium = round(riskTariff * installmentAmount, 2);
                    const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
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
            const totalCalculatedPremium = round(riskData.filter(r => !r.isAdditional).reduce((acc, v) => acc += v.premium, 0), 2);
            const differenceBetweenCalcAndManualValues = installmentAmount - totalCalculatedPremium;
            riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndManualValues;
            riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);

            // calculate insured sum for additional risks
            riskData = riskData.map(r => {
                const riskCode = getValue(r, 'riskCode');
                const riskSumInsured = r.isAdditional && sumInsuredHelper[riskCode](riskData, input, r) || { sumInsured: r.sumInsured, sumInsuredByPeriod: r.sumInsuredByPeriod };
                return {
                    ...r,
                    sumInsured: riskSumInsured.sumInsured,
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
                const riskSumInsured = !r.isAdditional && sumInsuredHelper[riskCode](riskData, input, r) || { sumInsured: r.sumInsured, sumInsuredByPeriod: r.sumInsuredByPeriod };
                return {
                    ...r,
                    sumInsured: riskSumInsured.sumInsured,
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
    }
};
