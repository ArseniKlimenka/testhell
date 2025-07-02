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
     * @risk: Потеря работы ОУСВ
     * @product: Надежный выбор Премиум
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    JL36102ERCP: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ выплата
     * @product: Надежный выбор Премиум
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDP36102ERCP: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ТТП
     * @product: Надежный выбор Премиум
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    HI36102ERCP: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Потеря работы ОУСВ
     * @product: Надежный выбор Премиум 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    JL36404ERCP2: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Первичное диагностирование Застрахованному критического заболевания
     * @product: Надежный выбор Премиум 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CD36404ERCP2: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Тяжелая травма
     * @product: Надежный выбор Премиум 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    HI36404ERCP2: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ИЛП 1,2 ВВ
     * @product: Финансовый резерв
     * @condition По достижении 70 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    DVV36404EFRBFKO: function (context) {
        const maxInsuredAge = 70;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = Math.max(maxInsuredAge - context.insredAgeOnStartDate, 1);
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ВНТ НС
     * @product: Финансовый резерв
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CTDA36404EFRBFKO: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ИНС 1,2
     * @product: Финансовый резерв
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    DASS36404EFRBFKO: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ выплата
     * @product: Финансовый резерв
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDP36404EFRBFKO: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ лечение РФ
     * @product: Финансовый резерв
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDHR10800EFRBFKO: function (context) {
        const maxInsuredAge = 65;
        const maxRiskDurationYears = 7;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = Math.min(maxInsuredAge - context.insredAgeOnStartDate, maxRiskDurationYears);
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ лечение весь мир
     * @product: Финансовый резерв
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDHW10800EFRBFKO: function (context) {
        const maxInsuredAge = 65;
        const maxRiskDurationYears = 7;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = Math.min(maxInsuredAge - context.insredAgeOnStartDate, maxRiskDurationYears);
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ ОУСВ
     * @product: Финансовый резерв
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDVV36404EFRBFKO: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Инв 1,2 ЛП ОУСВ
     * @product: Надежный капитал ОАС 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    D36404CAPCLRELOAS: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Инв 1,2 ЛП ОУСВ
     * @product: Детский капитал ОАС 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    D36404CAPCLCHILDOAS: function (context) {
        const maxInsuredAge = 65;

        if (!context.phAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.phAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Травма Застрахованного в результате несчастного случая
     * @product: Достойный век 2.0
     * @condition По достижении 80 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    I46204WCENOAS: function (context) {
        const maxInsuredAge = 80;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Смерть ДТП
     * @product: Достойный век 2.0
     * @condition Действет 2 года
     * @param {Context} Document Body
     */
    DDTP46204WCENOAS: function (context) {
        if (!context.contractSartDate) { return; }

        const riskEndDate = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * 2);

        return riskEndDate;
    },

    /**
     * @risk: Смерть ЛП ВВ
     * @product: Достойный век 2.0
     * @condition Действет 2 года
     * @param {Context} Document Body
     */
    DLPVV46204WCENOAS: function (context) {
        if (!context.contractSartDate) { return; }

        const riskEndDate = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * 2);

        return riskEndDate;
    },

    /**
     * @risk: Смерть ЛП
     * @product: Достойный век 2.0
     * @condition По достижении 120 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    DLP46204WCENOAS: function (context) {
        const maxInsuredAge = 120;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDate = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);

        return riskEndDate;
    },

    /**
     * @risk: Смерть ДТП
     * @product: Достойный век 3.0
     * @condition Действет 2 года
     * @param {Context} Document Body
     */
    DDTP46204WCEN3OAS: function (context) {
        if (!context.contractSartDate) { return; }

        const riskEndDate = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * 2);

        return riskEndDate;
    },

    /**
     * @risk: Смерть ЛП ВВ
     * @product: Достойный век 3.0
     * @condition Действет 2 года
     * @param {Context} Document Body
     */
    DLPVV46204WCEN3OAS: function (context) {
        if (!context.contractSartDate) { return; }

        const riskEndDate = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * 2);

        return riskEndDate;
    },

    /**
     * @risk: Смерть ЛП
     * @product: Достойный век 3.0
     * @condition По достижении 120 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    DLP46204WCEN3OAS: function (context) {
        const maxInsuredAge = 120;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDate = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);

        return riskEndDate;
    },

    /**
     * @risk: Потеря работы ОУСВ
     * @product: Надежный капитал Классика 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    MJL36404CAPCLRELOAS: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Критические заболевания
     * @product: Надежный капитал Классика 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CD36404CAPCLRELOAS: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ИЛП 1,2
     * @product: Надежный капитал ОАС 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    DSS36404CAPCLRELOAS: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Смерть Застрахованного в результате несчастного случая
     * @product: Нота Премиум (1 год)
     * @condition Риск действует 3 месяца
     * @param {Context} Document Body
     */
    DNS36404NOTE1BFKO4: function (context) {
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 3);
        return riskEndDateCalc;
    },

    /**
     * @risk: Смерть Застрахованного в результате несчастного случая
     * @product: Нота СЖ (1 год)
     * @condition Риск действует 3 месяца
     * @param {Context} Document Body
     */
    DNS36404NOTEV1BFKO: function (context) {
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 3);
        return riskEndDateCalc;
    },

    /**
     * @risk: Инвалидность 1,2 гр. ЛП
     * @product: На всякий случай Ультра
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    D42204TERM: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ лечение РФ
     * @product: На всякий случай Ультра
     * @condition По достижении 65 риск отключаем со след. годовщины и не более 5 лет от основной программы
     * @param {Context} Document Body
     */
    CDHR10800TERM: function (context) {
        const maxInsuredAge = 65;
        const maxRiskDurationYears = 5;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = Math.min(maxInsuredAge - context.insredAgeOnStartDate, maxRiskDurationYears);
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ лечение весь мир
     * @product: На всякий случай Ультра
     * @condition По достижении 65 риск отключаем со след. годовщины и не более 5 лет от основной программы
     * @param {Context} Document Body
     */
    CDHW10800TERM: function (context) {
        const maxInsuredAge = 65;
        const maxRiskDurationYears = 5;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = Math.min(maxInsuredAge - context.insredAgeOnStartDate, maxRiskDurationYears);
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Инвалидность 1,2 ЛП ОУСВ
     * @product: Забота о будущем
     * @condition Обязательно включается в договор, действует до достижения Застрахованным по риску 65 лет
     * @param {Context} Document Body
     */
    D36404ECATFPVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: Инвалидность 1,2 ЛП ОУСВ
     * @product: Забота о будущем Ультра
     * @condition Обязательно включается в договор, действует до достижения Застрахованным по риску 65 лет
     * @param {Context} Document Body
     */
    D36404ECATFVVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ИЛП 1,2 ВВ
     * @product: Забота о семье
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    DVV36404ECOFPVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ИЛП 1,2 ВВ
     * @product: Забота о семье Ультра
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    DVV36404ECOFVVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ВНТ НС
     * @product: Забота о семье
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CTDA36404ECOFPVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ВНТ НС
     * @product: Забота о семье 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CTDA36404ECOF2ZENIT: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: ВНТ НС
     * @product: Забота о семье Ультра
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CTDA36404ECOFVVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ выплата
     * @product: Забота о семье
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDP36404ECOFPVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ выплата
     * @product: Забота о семье Ультра
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDP36404ECOFVVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ лечение РФ
     * @product: Забота о семье
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDHR10800ECOFPVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateMax = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate7Years = DateTimeUtils.substractDays(DateTimeUtils.addYears(context.contractSartDate, 7), 1);
        const riskEndDateCalc = DateTimeUtils.isBefore(riskEndDate7Years, riskEndDateMax) ? riskEndDate7Years : riskEndDateMax;
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ лечение РФ
     * @product: Забота о семье 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDHR10800ECOF2ZENIT: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateMax = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate5Years = DateTimeUtils.substractDays(DateTimeUtils.addYears(context.contractSartDate, 5), 1);
        const riskEndDateCalc = DateTimeUtils.isBefore(riskEndDate5Years, riskEndDateMax) ? riskEndDate5Years : riskEndDateMax;
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ лечение РФ
     * @product: Забота о семье Ультра
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDHR10800ECOFVVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateMax = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate7Years = DateTimeUtils.substractDays(DateTimeUtils.addYears(context.contractSartDate, 7), 1);
        const riskEndDateCalc = DateTimeUtils.isBefore(riskEndDate7Years, riskEndDateMax) ? riskEndDate7Years : riskEndDateMax;
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ ОУСВ
     * @product: Забота о семье
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDVV36404ECOFPVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ ОУСВ
     * @product: Забота о семье 2.0
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDVV36404ECOF2ZENIT: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

    /**
     * @risk: КЗ ОУСВ
     * @product: Забота о семье Ультра
     * @condition По достижении 65 риск отключаем со след. годовщины
     * @param {Context} Document Body
     */
    CDVV36404ECOFVVTB: function (context) {
        const maxInsuredAge = 65;

        if (!context.insredAgeOnStartDate || !context.contractSartDate || !context.contractEndDate) { return; }

        const riskDurationYears = maxInsuredAge - context.insredAgeOnStartDate;
        const riskEndDateCalc = DateTimeUtils.addMonthsSubstractDay(context.contractSartDate, 12 * riskDurationYears);
        const riskEndDate = DateTimeUtils.isBefore(riskEndDateCalc, context.contractEndDate) ? riskEndDateCalc : context.contractEndDate;

        return riskEndDate;
    },

};
