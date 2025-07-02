/**
 * @typedef Context
 * @property {String} insredAgeOnStartDate,
 * @property {String} insredAgeOnEndDate,
 * @property {String} contractSartDate
 * @property {String} contractEndDate
 * @property {String} paymentType
 * @property {String} isInsuredPolicyHolder
 * @property {String} productCode
 */

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

// This lib uses the same functions names and the same ideology as riskConditions lib
module.exports = {

    /**
     * @risk: Инв 1,2 НС ОУСВ
     * @product: Надежный капитал ОАС 2.0
     * @condition Включается в договор с полисной годовщины, следующей за достижением Застрахованным 65 лет, если не была произведена замена риска Инвалидность ЛП
     * @param {Context} Document Body
     */
    DA36404CAPCLRELOAS: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        if (context.replaceDisabilityAnyReason) {
            return context.contractSartDate;
        }

        const riskDurationYears = (maxInsuredAge - context.insredAgeOnStartDate) <= 0 ? 0 : maxInsuredAge - context.insredAgeOnStartDate;
        const riskStartDateCalc = DateTimeUtils.addMonths(context.contractSartDate, 12 * riskDurationYears);
        const riskStartDate = DateTimeUtils.isBefore(riskStartDateCalc, context.contractEndDate) ? riskStartDateCalc : context.contractEndDate;

        return riskStartDate;
    },

    /**
     * @risk: Инв 1,2 НС ОУСВ
     * @product: Детский капитал ОАС 2.0
     * @condition Включается в договор с полисной годовщины, следующей за достижением Застрахованным 65 лет.
     * @param {Context} Document Body
     */
    DA36404CAPCLCHILDOAS: function (context) {
        const maxInsuredAge = 65;

        if (!context.phAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        if (context.replaceDisabilityAnyReason) {
            return context.contractSartDate;
        }

        const riskDurationYears = (maxInsuredAge - context.phAgeOnStartDate) <= 0 ? 0 : maxInsuredAge - context.phAgeOnStartDate;
        const riskStartDateCalc = DateTimeUtils.addMonths(context.contractSartDate, 12 * riskDurationYears);
        const riskStartDate = DateTimeUtils.isBefore(riskStartDateCalc, context.contractEndDate) ? riskStartDateCalc : context.contractEndDate;

        return riskStartDate;
    },

    /**
     * @risk: Смерть ЛП
     * @product: Достойный век ОАС 2.0
     * @condition Включается в договор с 3-го года
     * @param {Context} Document Body
     */
    DLP46204WCENOAS: function (context) {
        if (!context.contractSartDate) { return; }
        const riskStartDate = DateTimeUtils.addMonths(context.contractSartDate, 12 * 2);
        return riskStartDate;
    },

    /**
 * @risk: Смерть ЛП
 * @product: Достойный век ОАС 3.0
 * @condition Включается в договор с 3-го года
 * @param {Context} Document Body
 */
    DLP46204WCEN3OAS: function (context) {
        if (!context.contractSartDate) { return; }
        const riskStartDate = DateTimeUtils.addMonths(context.contractSartDate, 12 * 2);
        return riskStartDate;
    },

    /**
     * @risk: Критические заболевания 5 детский риск (рак, трансплантация, почечная недостаточность, паралич, кома)
     * @product: Детский капитал Классика и Коробка 2.0
     * @condition Включается в договор с полисной годовщины, следующей за достижением Застрахованным 1 года.
     * @param {Context} Document Body
     */
    CD5C36404CAPCLCHILDOAS: function (context) {
        const maxInsuredAge = 1;

        if (!context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = Math.max(maxInsuredAge - (context.insredAgeOnStartDate || 0), 0);
        const riskStartDateCalc = DateTimeUtils.addMonths(context.contractSartDate, 12 * riskDurationYears);
        const riskStartDate = DateTimeUtils.isBefore(riskStartDateCalc, context.contractEndDate) ? riskStartDateCalc : context.contractEndDate;

        return riskStartDate;
    },

    /**
     * @risk: Инвалидность 1,2 НС ОУСВ
     * @product: Забота о будущем
     * @condition Обязательно включается в договор в отношении Застрахованного по риску с полисной годовщины, следующей за достижением Застрахованным возраста 65 лет
     * @param {Context} Document Body
     */
    DA36404ECATFPVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        if (context.replaceDisabilityAnyReason) {
            return context.contractSartDate;
        }

        const riskDurationYears = (maxInsuredAge - context.insredAgeOnStartDate) <= 0 ? 0 : maxInsuredAge - context.insredAgeOnStartDate;
        const riskStartDateCalc = DateTimeUtils.addMonths(context.contractSartDate, 12 * riskDurationYears);
        const riskStartDate = DateTimeUtils.isBefore(riskStartDateCalc, context.contractEndDate) ? riskStartDateCalc : context.contractEndDate;

        return riskStartDate;
    },

    /**
     * @risk: Инвалидность 1,2 НС ОУСВ
     * @product: Забота о будущем Ультра
     * @condition Обязательно включается в договор в отношении Застрахованного по риску с полисной годовщины, следующей за достижением Застрахованным возраста 65 лет
     * @param {Context} Document Body
     */
    DA36404ECATFVVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        if (context.replaceDisabilityAnyReason) {
            return context.contractSartDate;
        }

        const riskDurationYears = (maxInsuredAge - context.insredAgeOnStartDate) <= 0 ? 0 : maxInsuredAge - context.insredAgeOnStartDate;
        const riskStartDateCalc = DateTimeUtils.addMonths(context.contractSartDate, 12 * riskDurationYears);
        const riskStartDate = DateTimeUtils.isBefore(riskStartDateCalc, context.contractEndDate) ? riskStartDateCalc : context.contractEndDate;

        return riskStartDate;
    },

    /**
     * @risk: ИНС 1,2 ВВ
     * @product: Забота о семье
     * @condition Включается в договор с полисной годовщины, следующей за достижением Застрахованным 65 лет, если не была произведена замена риска Инвалидность ЛП
     * @param {Context} Document Body
     */
    DAVV36404ECOFPVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        if (context.replaceDisabilityECOF) {
            return context.contractSartDate;
        }

        const riskDurationYears = (maxInsuredAge - context.insredAgeOnStartDate) <= 0 ? 0 : maxInsuredAge - context.insredAgeOnStartDate;
        const riskStartDateCalc = DateTimeUtils.addMonths(context.contractSartDate, 12 * riskDurationYears);
        const riskStartDate = DateTimeUtils.isBefore(riskStartDateCalc, context.contractEndDate) ? riskStartDateCalc : context.contractEndDate;

        return riskStartDate;
    },

    /**
     * @risk: ИНС 1,2 ВВ
     * @product: Забота о семье Ультра
     * @condition Включается в договор с полисной годовщины, следующей за достижением Застрахованным 65 лет, если не была произведена замена риска Инвалидность ЛП
     * @param {Context} Document Body
     */
    DAVV36404ECOFVVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        if (context.replaceDisabilityECOF) {
            return context.contractSartDate;
        }

        const riskDurationYears = (maxInsuredAge - context.insredAgeOnStartDate) <= 0 ? 0 : maxInsuredAge - context.insredAgeOnStartDate;
        const riskStartDateCalc = DateTimeUtils.addMonths(context.contractSartDate, 12 * riskDurationYears);
        const riskStartDate = DateTimeUtils.isBefore(riskStartDateCalc, context.contractEndDate) ? riskStartDateCalc : context.contractEndDate;

        return riskStartDate;
    },

};
