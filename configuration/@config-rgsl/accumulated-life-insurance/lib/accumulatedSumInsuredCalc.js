const { checkUpSumInsured } = require('@config-rgsl/accumulated-life-insurance/lib/checkUpSumInsured');
const sumInsuredBasicCalc = require('@config-rgsl/accumulated-life-insurance/lib/accumulatedSumInsuredBasicCalc');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const lifeConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * We have two levels of calculation insured sum
 *
 * The first level where we have riskCode as a function name is on risk level. Mostly,
 * it will be the same, but we need it for the ability to put a specified conditions or parameters
 * on the risk level.
 *
 * The second level is the generalSumInsuredCalc() function. It will be called in every
 * 1st level functions because the calculation approach of the sum insured  is the same.
 *
 */

module.exports = {

    /**
     * @description Дожитие застрахованного до окончания срока страхования
     */
    E36102: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Смерть застрахованного по любой причине
     */
    DLPSS36102: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Смерть застрахованного по любой причине с возвратом страховых взносов
     */
    DPVV36102: function (riskData, input, risk) {
        const shouldCalculatedByPeriod = true;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod });
    },

    /**
     * @description Смерть застрахованного в результате несчастного случая
     */
    DNS36102: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Инвалидность застрахованного с установлением I, II группы инвалидности в результате несчастного случая или болезни с освобождением от уплаты страховых взносов
     */
    D36102: function (riskData, input, risk) {
        const shouldCalculatedByPeriod = true;
        const isDisabilityRisk = true;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod, isDisabilityRisk });
    },

    /**
     * @description Дожитие застрахованного до недобровольной потери работы с освобождением от уплаты одного взноса
     */
    JL36102: function (riskData, input, risk) {
        const { installmentAmount } = input;
        const additionalRisksPremium = riskData.reduce((acc, v) => { acc += v.isAdditional ? v.premium : 0; return acc; }, 0);
        const minValueinRub = Math.min(200000, installmentAmount + additionalRisksPremium);
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub });
    },

    /**
     * @description Тяжкие телесные повреждения Застрахованного в результате несчастного случая
     */
    HI36102: function (riskData, input, risk) {
        const minValueinRub = 1200000;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub });
    },

    /**
     * @description Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая с освобождением от уплаты страховых взносов
     */
    DA36102: function (riskData, input, risk) {
        const shouldCalculatedByPeriod = true;
        const isDisabilityRisk = true;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod, isDisabilityRisk });
    },

    /**
     * @description Первичное диагностирование Застрахованному критического заболевания (выплата)
     */
    CDP36102: function (riskData, input, risk) {
        const minValueinRub = 6000000;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub });
    },

    /**
     * @description Первичное диагностирование Застрахованному критического заболевания (лечение)
     */
    CDH10800: function (riskData, input, risk) {
        if (["EHVP", "EHVP2"].includes(input.productCode)) { return { sumInsured: 60000000 }; }
        const minValueinRub = 6000000;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub });
    },

    /**
     * @description Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС «Медицинские обследования», в связи с необходимостью проведения профилактических мероприятий, снижающих степень опасных для жизни или здоровья Застрахованного угроз и/или устраняющих их
     */
    CU10800: function (riskData, input, risk) {
        const { productCode, paymentFrequency, installmentAmount } = input;
        return {
            sumInsured: checkUpSumInsured({ productCode, paymentFrequency, installmentAmount }).sumInsured || 0
        };
    },

    /**
     * @description Дожитие застрахованного до окончания срока страхования
     */
    E36904: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Смерть застрахованного по любой причине
     */
    DLP36904: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Смерть застрахованного в результате несчастного случая
     */
    DNS36904: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Смерть Застрахованного по любой причине с отложенной страховой выплатой
     */
    DLPDP36904: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Дожитие застрахованного до окончания срока страхования
     */
    E36404: function (riskData, input, risk) {
        const calculatedSumInsured = sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
        if (input.productCode.indexOf('EPGP') >= 0) { calculatedSumInsured.sumInsured *= 1.2; }
        return calculatedSumInsured;
    },

    /**
     * @description Смерть застрахованного по любой причине
     */
    DLPSS36404: function (riskData, input, risk) {
        const { paymentFrequency, installmentAmount, mandatoryRisksCoeff } = input;

        if (input.productCode.indexOf('EPGP') >= 0) {
            const calculatedSumInsured = sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
            calculatedSumInsured.sumInsured *= 1.2;
            return calculatedSumInsured;
        }

        let coeff = mandatoryRisksCoeff['DLPSS36404COEFF'];
        if (paymentFrequency == lifeConstants.paymentFrequency.semiAnnual.code) { coeff *= 2; }
        // let additionalRisksPremium = riskData.reduce((acc, v) => { acc += v.isAdditional ? v.premium : 0; return acc; }, 0);

        return {
            // sumInsured: round(((installmentAmount + additionalRisksPremium) * coeff), 2)
            sumInsured: round(((installmentAmount) * coeff), 2)
        };
    },

    /**
     * @description Смерть застрахованного в результате несчастного случая
     */
    DNS36404: function (riskData, input, risk) {

        const calculatedSumInsured = sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });

        return calculatedSumInsured;
    },

    /**
     * @description Смерть в результате дорожно-транспортного происшествия
     */
    DDTP36404: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине
     */
    D36404: function (riskData, input, risk) {
        const shouldCalculatedByPeriod = true;
        const isDisabilityRisk = true;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod, isDisabilityRisk });
    },

    /**
     * @description Потеря работы ОУСВ
     */
    JL36404: function (riskData, input, risk) {
        const { installmentAmount } = input;

        if (input.productCode.indexOf('EPGP') >= 0) {
            return {
                sumInsured: round(Math.min(200000, installmentAmount), 2)
            };
        }

        const additionalRisksPremium = riskData.reduce((acc, v) => { acc += v.isAdditional ? v.premium : 0; return acc; }, 0);
        const minValueinRub = Math.min(200000, installmentAmount + additionalRisksPremium);
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub });
    },

    /**
     * @description Первичное диагностирование Застрахованному критического заболевания
     */
    CD36404: function (riskData, input, risk) {
        const minValueinRub = 6000000;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub });
    },

    /**
     * @description Тяжелая травма
     */
    HI36404: function (riskData, input, risk) {
        const minValueinRub = 1200000;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, minValueinRub });
    },

    /**
     * @description Смерть ЛП ВВ
     */
    DLPVV36404: function (riskData, input, risk) {
        const shouldCalculatedByPeriod = true;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod });
    },

    /**
     * @description Инв 1,2 НС ОУСВ
     */
    DA36404: function (riskData, input, risk) {
        const shouldCalculatedByPeriod = true;
        const isDisabilityRisk = true;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, shouldCalculatedByPeriod, isDisabilityRisk });
    },

    /**
     * @description КЗ выплата
     */
    CDP36404: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Смерть ЛП ОтлВ
     */
    DLPDPE36404: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

};
