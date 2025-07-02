const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const sumInsuredHelper = require('@config-rgsl/credit-life-insurance/lib/creditSumInsuredCalc');

module.exports = {

    /**
     * @description General function for the Premium calculation
     */
    premiumCalculation: function ({ input, risksTariffs }) {

        const { risks, paymentFrequency, currency, installmentAmount, productCode, contractIssueDate, productConfigurationData } = input;

        const productConf = productConfigurationData ?? {};

        // calc tariffRate for whole policy and find mainRiskCode as risk with max tariff
        let tariffRate = 0;
        let maxRiskTariff = 0;
        let mainRiskCode;
        Object
            .keys(risksTariffs)
            .filter(item => item.indexOf('COEFF') == -1)
            .forEach(item => {
                const itemTariff = getValue(risksTariffs, item, 0);
                tariffRate += itemTariff;
                if (itemTariff > maxRiskTariff) {
                    maxRiskTariff = itemTariff;
                    mainRiskCode = item;
                }
            });

        // calc riskPremium and riskSumInsured
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

        riskData = risks.map(r => {

            // calc riskPremium
            const riskCode = getValue(r, 'risk.riskCode');
            const riskTariff = getValue(risksTariffs, riskCode, 0);
            const riskPremium = round(installmentAmount / tariffRate * riskTariff, 2);

            // calc riskSumInsured
            const riskSumInsuredFunc = sumInsuredHelper[riskCode];
            const riskSumInsured = riskSumInsuredFunc ? riskSumInsuredFunc(riskData, input, r) : {};

            return {
                riskCode,
                isLife: r.risk.isLife,
                withoutProduct: r.risk.withoutProduct ?? false,
                startDate: r.startDate,
                endDate: r.endDate,
                isAdditional: r.isAdditional,
                sumInsured: riskSumInsured.sumInsured,
                sumInsuredByPeriod: riskSumInsured.sumInsuredByPeriod,
                premium: riskPremium,
                maxInsuredSum: productConf.maxInsuredSumMainRisk
            };
        });

        // rounding correction, goes to mainRiskCode
        const totalCalculatedPremium = round(riskData.reduce((acc, v) => acc += v.premium, 0), 2);
        const differenceBetweenCalcAndManualValues = installmentAmount - totalCalculatedPremium;
        riskData.find(r => r.riskCode == mainRiskCode).premium += differenceBetweenCalcAndManualValues;
        riskData.find(r => r.riskCode == mainRiskCode).premium = round(riskData.find(r => r.riskCode == mainRiskCode).premium, 2);

        // this part is required by platform schems and surrender value calculation
        calculatedRisks = risks
            && risks.map(r => {
                return {
                    code: getValue(r, 'risk.riskCode'),
                    sumInsured: r.riskInsuredSum || 0
                };
            });

        return {
            premium: installmentAmount,
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
