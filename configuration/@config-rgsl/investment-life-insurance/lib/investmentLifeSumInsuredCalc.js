'use strict';

const sumInsuredBasicCalc = require('@config-rgsl/investment-life-insurance/lib/investmentSumInsuredBasicCalc');
const { product, Note4RiskSettings, guaranteedIncome } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { DLPcoeffs } = require('@config-rgsl/investment-life-insurance/lib/DLPcoeffs');
const { DNScoeffs } = require('@config-rgsl/investment-life-insurance/lib/DNScoeffs');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = {

    /**
    * @description Дожитие застрахованного до окончания срока страхования
    */
    E36904: function (riskData, input, risk) {
        const { productCode, productStrategyCode, contractIssueDate, currency } = input;

        let coeff = 1;

        if (productStrategyCode == 'endowment') {
            coeff = 1 + input.participationCoeff;
        }

        if ([product.NOTEV2BFKO, product.NOTEV3BFKO, product.NOTE2BFKO, product.NOTE3BFKO, product.NOTE1BFKO, product.NOTE1BFKO3, product.NOTE1BFKO4, product.NOTEV1BFKO].includes(productCode)) {
            coeff = 0.001;
        }

        if (lifeInsuranceConstants.productGroupArray.BASIS_ACTIVE_20.includes(input.productCode)) {
            const intialShare = input.intialShare ?? 1;
            const installmentAmount = input?.installmentAmount ?? 1;
            coeff = (intialShare / 100) * installmentAmount;
        }

        // if the product is "Драйвер. Фиксированный Премиум" than the insured sum
        // must be calculated by period
        const shouldCalculatedByPeriod = input.productCode == product.IDFP;
        const isDriverFixed = input.productCode == product.IDFP;

        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod, isDriverFixed, coeff });
    },

    /**
    * @description Смерть Застрахованного по любой причине с отложенной страховой выплатой
    */
    DLPDP36904: function (riskData, input, risk) {
        // this risk is only can be entered by Underwriter
        return 0;
    },

    /**
    * @description Смерть застрахованного по любой причине
    */
    DLP36904: function (riskData, input, risk) {
        const { insuredAgeOnIssueDate, productCode, contractIssueDate } = input;

        const DLPcoefficients = DLPcoeffs({ productCode, insuredAgeOnIssueDate, issueDate: contractIssueDate }) || {};
        let minValueinRub = DLPcoefficients.minValueinRub || 0;
        const coeff = DLPcoefficients.coeff || 1;
        let periodCoeff = 0;
        if ([product.NOTE1BFKO4, product.NOTEV3BFKO, product.NOTEV1BFKO].includes(input.productCode)) {

            const DLP36904 = Note4RiskSettings.DLP36904;

            if (insuredAgeOnIssueDate >= 18 && insuredAgeOnIssueDate <= 65)
            { minValueinRub = input.currency == 'RUB' ? 1000000000 : 1000000; }
            if (insuredAgeOnIssueDate >= 66 && insuredAgeOnIssueDate <= 70)
            { minValueinRub = input.currency == 'RUB' ? 1000000000 : 250000; }
            if (insuredAgeOnIssueDate >= 71 && insuredAgeOnIssueDate <= 75)
            { minValueinRub = input.currency == 'RUB' ? 1000000000 : 165000; }
            if (insuredAgeOnIssueDate >= 76 && insuredAgeOnIssueDate <= 80)
            { minValueinRub = input.currency == 'RUB' ? 1000000000 : 80000; }

            periodCoeff = dateUtils.getMonthDifference(input.contractIssueDate, dateUtils.dateNow()) < DLP36904.firstPeriodInMonths ?
                DLP36904.defaultPremiumCoef : DLP36904.defaultPremiumCoefFrom4Month;
        }

        // if the product is "Драйвер. Фиксированный Премиум" than the insured sum
        // must be calculated by period
        const shouldCalculatedByPeriod = [product.IDFP, product.NOTE1BFKO4, product.NOTEV3BFKO, product.NOTEV1BFKO, product.IBA2P3VTB, product.IBA2P5VTB, product.IBA2V3VTB, product.IBA2V5VTB].includes(input.productCode);
        const isDriverFixed = input.productCode == product.IDFP;

        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub, shouldCalculatedByPeriod, isDriverFixed, coeff, periodCoeff });
    },

    /**
    * @description Смерть застрахованного в результате несчастного случая
    */
    DNS36904: function (riskData, input, risk) {
        const isDriverFixed = input.productCode == product.IDFP;
        const { insuredAgeOnIssueDate, productCode, currency, contractIssueDate } = input;
        const DNScoefficients = DNScoeffs({ productCode, insuredAgeOnIssueDate, currency, issueDate: contractIssueDate }) || {};
        let minValueinRub = DNScoefficients.minValueinRub || 0;
        const coeff = DNScoefficients.coeff || 1;

        if (minValueinRub == 0) {
            if (insuredAgeOnIssueDate >= 18 && insuredAgeOnIssueDate <= 65) { minValueinRub = 20000000; }
            if (insuredAgeOnIssueDate >= 66 && insuredAgeOnIssueDate <= 70) { minValueinRub = 15000000; }
            if (insuredAgeOnIssueDate >= 71 && insuredAgeOnIssueDate <= 75) { minValueinRub = 5000000; }
            if (insuredAgeOnIssueDate >= 76 && insuredAgeOnIssueDate <= 82) { minValueinRub = 1000000; }
        }

        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub, isDriverFixed, coeff });
    },

    /**
     * @description Дожитие Застрахованного до окончания срока страхования
     */
    IE36904: function (riskData, input, risk) {
        const { term } = input;
        const sumInsuredResult = sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
        return {
            sumInsured: sumInsuredResult.sumInsured * term,
            sumInsuredByPeriod: sumInsuredResult.sumInsuredByPeriod
        };
    },

    /**
     * @description Смерть Застрахованного по любой причине
     */
    IDLPVV36904: function (riskData, input, risk) {
        const shouldCalculatedByPeriod = true;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod });
    },

    /**
     * @description Смерть застрахованного в результате несчастного случая
     */
    IDNSVV36904: function (riskData, input, risk) {
        const shouldCalculatedByPeriod = true;
        const minValueinRub = 1500000;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod, minValueinRub });
    },

    /**
     * @description Смерть Застрахованного по любой причине с отложенной страховой выплатой
     */
    IDLPDP36904: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Смерть Застрахованного по любой причине с отложенной страховой выплатой
     */
    IDNSSS36904: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
    * @description Дожитие застрахованного до окончания срока страхования
    */
    E36404: function (riskData, input, risk) {
        const { productCode, productStrategyCode, contractIssueDate, currency, productConfigurationData } = input;

        const productConf = productConfigurationData ?? {};
        const isAnnualGuaranteedIncome = productConf.guaranteedIncome.includes(guaranteedIncome.annual.code);

        let coeff = 1;
        if (productStrategyCode == 'endowment') {
            coeff = 1 + input.participationCoeff;
        }

        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, coeff, isAnnualGuaranteedIncome });
    },

    /**
    * @description Смерть застрахованного по любой причине
    */
    DLP36404: function (riskData, input, risk) {
        const { productCode, productStrategyCode, contractIssueDate, insuredAgeOnIssueDate, productConfigurationData } = input;

        const DLPcoefficients = DLPcoeffs({ productCode, insuredAgeOnIssueDate, issueDate: contractIssueDate }) || {};
        const minValueinRub = DLPcoefficients.minValueinRub || 0;
        const coeff = DLPcoefficients.coeff || 1;

        const productConf = productConfigurationData ?? {};
        const isAnnualGuaranteedIncome = productConf.guaranteedIncome.includes(guaranteedIncome.annual.code);

        const shouldCalculatedByPeriod = !isAnnualGuaranteedIncome;

        let periodCoeff = 0;
        if (productStrategyCode == 'endowment') {
            periodCoeff = input.fixRate;
        }

        if (lifeInsuranceConstants.productGroupArray.IDG_VTB.includes(productCode) && ![product.IDGP1VTB, product.IDG1EKSPO, product.IDGV1VTB, product.IDGPN1VTB, product.IDGVN1VTB].includes(productCode)) {
            return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod, periodCoeff });
        }
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub, coeff });


    },

    /**
    * @description Смерть Застрахованного по любой причине с отложенной страховой выплатой
    */
    DLPDP36404: function (riskData, input, risk) {
        // this risk is only can be entered by Underwriter
        return {
            sumInsuredByPeriod: []
        };
    },

    /**
     * @description Смерть Застрахованного в результате несчастного случая
     */
    DNS36404: function (riskData, input, risk) {
        const { insuredAgeOnIssueDate, productCode, currency, contractIssueDate } = input;

        const DNScoefficients = DNScoeffs({ productCode, insuredAgeOnIssueDate, currency, issueDate: contractIssueDate }) || {};
        let minValueinRub = DNScoefficients.minValueinRub || 0;
        let coeff = DNScoefficients.coeff || 1;
        const DNS36904 = Note4RiskSettings.DNS36904;

        if ([product.NOTEV2BFKO, product.NOTEV3BFKO, product.NOTE2BFKO, product.NOTE3BFKO, product.NOTE1BFKO, product.NOTE1BFKO3, product.NOTEV1BFKO].includes(productCode)) {
            coeff = 0.1;
        }

        if ([product.NOTEV1BFKO].includes(input.productCode)) {

            if (insuredAgeOnIssueDate >= 18 && insuredAgeOnIssueDate <= 65)
            { minValueinRub = input.currency == 'RUB' ? 1000000000 : 300000; }
            if (insuredAgeOnIssueDate >= 66 && insuredAgeOnIssueDate <= 70)
            { minValueinRub = input.currency == 'RUB' ? 1000000000 : 250000; }
            if (insuredAgeOnIssueDate >= 71 && insuredAgeOnIssueDate <= 80)
            { minValueinRub = input.currency == 'RUB' ? 1000000000 : 80000; }

            coeff = dateUtils.getMonthDifference(input.contractIssueDate, dateUtils.dateNow()) < DNS36904.firstPeriodInMonths ?
                DNS36904.defaultPremiumCoef : DNS36904.defaultPremiumCoefFrom4Month;
        }

        if ([product.NOTE1BFKO4, product.NOTEV3BFKO].includes(input.productCode)) {

            if (insuredAgeOnIssueDate >= 18 && insuredAgeOnIssueDate <= 65)
            { minValueinRub = input.currency == 'RUB' ? 20000000 : 300000; }
            if (insuredAgeOnIssueDate >= 66 && insuredAgeOnIssueDate <= 70)
            { minValueinRub = input.currency == 'RUB' ? 15000000 : 250000; }
            if (insuredAgeOnIssueDate >= 71 && insuredAgeOnIssueDate <= 80)
            { minValueinRub = input.currency == 'RUB' ? 5000000 : 80000; }

            coeff = dateUtils.getMonthDifference(input.contractIssueDate, dateUtils.dateNow()) < DNS36904.firstPeriodInMonths ?
                DNS36904.defaultPremiumCoef : DNS36904.defaultPremiumCoefFrom4Month;
        }

        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub, coeff });
    },

    /**
     * @description Смерть Застрахованного по любой причине
     */
    DLPT36404: function (riskData, input, risk) {
        const { productStrategyCode, productConfigurationData } = input;

        const productConf = productConfigurationData ?? {};
        const isAnnualGuaranteedIncome = productConf.guaranteedIncome.includes(guaranteedIncome.annual.code);

        const shouldCalculatedByPeriod = !isAnnualGuaranteedIncome;

        let periodCoeff = 0;
        if (productStrategyCode == 'endowment') {
            periodCoeff = input.fixRate;
        }

        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod, periodCoeff });
    },

    /**
     * @description Смерть Застрахованного по любой причине с отложенной страховой выплатой
     */
    DLPTDP36404: function (riskData, input, risk) {
        const { productCode, productStrategyCode, insuredAgeOnIssueDate, contractIssueDate } = input;
        const DLPcoefficients = DLPcoeffs({ productCode, insuredAgeOnIssueDate, issueDate: contractIssueDate }) || {};
        const minValueinRub = DLPcoefficients.minValueinRub || 0;

        let coeff = 1;
        if (productStrategyCode == 'endowment') {
            coeff += input.participationCoeff;
        }

        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub, coeff });
    },

    /**
     * @description Дожитие до даты, установленной в договоре
     */
    ME36404: function (riskData, input, risk) {
        const { productStrategyCode, productConfigurationData } = input;

        const productConf = productConfigurationData ?? {};
        const isAnnualGuaranteedIncome = productConf.guaranteedIncome.includes(guaranteedIncome.annual.code);

        const shouldCalculatedByPeriod = isAnnualGuaranteedIncome;

        let periodCoeff = 0;
        if (productStrategyCode == 'endowment') {
            periodCoeff = input.fixRate;
        }

        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod, periodCoeff, isAnnualGuaranteedIncome });
    },

};
