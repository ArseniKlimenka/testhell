const sumInsuredBasicCalc = require('@config-rgsl/credit-life-insurance/lib/creditSumInsuredBasicCalc');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { creditDmsSumInsured } = require('@config-rgsl/credit-life-insurance/lib/creditDmsSumInsured');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const creditRisks = require('@config-rgsl/life-insurance/lib/creditRisks');

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
     * @description Смерть
     */
    DLP42204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Инвалидность
     */
    D42204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description КЗ
     */
    CD42204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Травмы
     */
    I42204: function (riskData, input, risk) {
        const { creditSum, productCode, creditSumNet, creditProgramId, contractIssueDate } = input;
        const coeff = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate }).I42204COEFF;
        return {
            sumInsured: round(coeff * creditSum, 2),
            sumInsuredByPeriod: []
        };
    },

    /**
     * @description Потеря работы
     */
    JL42204: function (riskData, input, risk) {
        const { annuityPaymentSum, productCode, creditSumNet, creditProgramId, contractIssueDate } = input;
        const coeff = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate }).JL42204COEFF;
        return {
            sumInsured: round(coeff * annuityPaymentSum, 2),
            sumInsuredByPeriod: []
        };
    },

    /**
     * @description ДМС1
     */
    DMS110800: function (riskData, input, risk) {
        const { creditProgramId, installmentAmount } = input;
        const creditDmsSumInsuredConf = creditDmsSumInsured({ creditProgramId, installmentAmount });
        return {
            sumInsured: getValue(creditDmsSumInsuredConf, 'sumInsured', 0),
            sumInsuredByPeriod: []
        };
    },

    /**
     * @description ДМС2
     */
    DMS210800: function (riskData, input, risk) {
        const { creditProgramId, installmentAmount } = input;
        const creditDmsSumInsuredConf = creditDmsSumInsured({ creditProgramId, installmentAmount });
        return {
            sumInsured: getValue(creditDmsSumInsuredConf, 'sumInsured', 0),
            sumInsuredByPeriod: []
        };
    },

    /**
     * @description Смерть НС
     */
    DNS42204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description ИНС 1,2 100/50
     */
    DA1005042204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description ИНС 1,2 100/100
     */
    DA10010042204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description ИНС 1,2 120/120
     */
    DA12012042204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Смерть Б
     */
    DIL42204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description ИБ 1,2 100/50
     */
    DI1005042204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description ИБ 1,2 100/100
     */
    DI10010042204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description ИБ 1,2 120/120
     */
    DI12012042204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description ВНТ НС
     */
    TDA42204: function (riskData, input, risk) {
        const { creditSum } = input;
        return {
            sumInsured: round(0.3 * creditSum, 2),
            sumInsuredByPeriod: []
        };
    },

    /**
     * @description ВНТ ЛП
     */
    TDLP42204: function (riskData, input, risk) {
        const { creditSum } = input;
        return {
            sumInsured: round(0.3 * creditSum, 2),
            sumInsuredByPeriod: []
        };
    },

    /**
     * @description КЗ выплата
     */
    CDP42204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description Госп НС
     */
    HA42204: function (riskData, input, risk) {
        const { creditSum } = input;
        return {
            sumInsured: round(0.3 * creditSum, 2),
            sumInsuredByPeriod: []
        };
    },

    /**
     * @description Травма ТП
     */
    ITP42204: function (riskData, input, risk) {
        const { creditSum } = input;
        return {
            sumInsured: Math.min(round(0.3 * creditSum, 2), 1500000),
            sumInsuredByPeriod: []
        };
    },

    /**
     * @description ИЛП 1,2 таб
     */
    DT42204: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description СмертьНС ИзмСС
     */
    DNST42204: function (riskData, input, risk) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = input;
        const coeff = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate }).DNST42204COEFF;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, coeff });
    },

    /**
     * @description ИнвалНС ИзмСС
     */
    DAT42204: function (riskData, input, risk) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = input;
        const coeff = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate }).DAT42204COEFF;
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk, coeff });
    },

    /**
     * @description КЗ Выплата
     */
    CDP36404: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk });
    },

    /**
     * @description КЗ Лечение
     */
    CDHW10800: function (riskData, input, risk) {
        return sumInsuredBasicCalc.generalSumInsuredCalc({ riskData, input, risk});
    },

};
