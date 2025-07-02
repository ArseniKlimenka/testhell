const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const sumInsuredHelper = require('@config-rgsl/investment-life-insurance/lib/investmentLifeSumInsuredCalc');

module.exports = {

    /**
     * @description General function for the Premium calculation
     */
    premiumCalculation: function ({ input, mainRiskCode, mandatoryRisksCoeff, additionalRisksCoeff, calcFromInsuredSum }) {

        const { risks, paymentFrequency, currency, installmentAmount, paymentPlan, manualCorrection,
            productCode, contractIssueDate, productConfigurationData } = input;

        const productConf = productConfigurationData ?? {};

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

            riskData = risks.map(r => {
                const riskCode = getValue(r, 'risk.riskCode');
                const riskCoeff = initialMandatoryRisksCoeff[riskCode + 'COEFF'];
                let maxInsuredSum = productConf.maxInsuredSumMainRisk;
                if (maxInsuredSum && riskCoeff && riskCoeff != 0) {
                    maxInsuredSum = Math.trunc(maxInsuredSum / riskCoeff);
                }
                return {
                    riskCode: riskCode,
                    isLife: r.risk.isLife,
                    withoutProduct: r.risk.withoutProduct ?? false,
                    startDate: r.startDate,
                    endDate: r.endDate,
                    isAdditional: r.isAdditional,
                    sumInsured: r.riskInsuredSum || 0,
                    sumInsuredByPeriod: r.riskInsuredSumByPeriod,
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
            if (!mandatoryRisksCoeff
                || Object.keys(mandatoryRisksCoeff).length == 0
                || !risks
                || risks.length == 0
            ) { return {
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

            // calculate insured sum for mandatory risks
            riskData = risks.map(r => {
                const riskCode = getValue(r, 'risk.riskCode');
                const riskSumInsured = sumInsuredHelper[riskCode](risks, input, r);
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
                    sumInsured: riskSumInsured.sumInsured,
                    sumInsuredByPeriod: riskSumInsured.sumInsuredByPeriod,
                    maxInsuredSum
                };
            });

            // calculate premium for mandatory risks
            riskData = riskData.map(r => {

                let amount = installmentAmount;
                if (calcFromInsuredSum) {
                    amount = r.sumInsured;
                }

                const riskCode = getValue(r, 'riskCode');
                const riskPremium = round(mandatoryRisksCoeff[riskCode] * amount, 2);
                return {
                    ...r,
                    premium: riskPremium
                };
            });

            // calculate main risk premium
            const totalSumInsuredExcludeMainRisk = riskData
                .filter(r => r.riskCode != mainRiskCode)
                .reduce((acc, v) => { acc += v.premium; return acc; }, 0);
            riskData.find(r => r.riskCode == mainRiskCode).premium = round(installmentAmount - totalSumInsuredExcludeMainRisk, 2);

            // calculate premium for additional risks
            riskData = riskData.map(r => {
                const riskCode = getValue(r, 'riskCode');
                const riskPremium = additionalRisksCoeff && additionalRisksCoeff[riskCode] && round(additionalRisksCoeff[riskCode] * r.sumInsured, 2) || r.premium;
                return {
                    riskCode: r.riskCode,
                    isLife: r.isLife,
                    withoutProduct: r.withoutProduct ?? false,
                    startDate: r.startDate,
                    endDate: r.endDate,
                    premium: riskPremium,
                    sumInsured: r.sumInsured,
                    sumInsuredByPeriod: r.sumInsuredByPeriod,
                    isAdditional: r.isAdditional
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
