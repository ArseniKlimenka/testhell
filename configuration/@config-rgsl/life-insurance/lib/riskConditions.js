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

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const creditRisks = require('@config-rgsl/life-insurance/lib/creditRisks');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { riskPackagesConfiguration } = require('@config-rgsl/life-insurance/lib/riskPackagesConfiguration');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

// The function name is a conjunction of a Risk and Product codes consequently
module.exports = {

    /**
     * @risk Смерть Застрахованного по любой причине
     * @product Надежный выбор
     * @condition Обязательный при возрасте Застрахованного на дату заключения договора <= 45 полных лет
     * @param {Context} context Document Body
     */
    DLPSS36102ERC: function (context) {
        const ageOnStartLessThan45 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 45;

        return ageOnStartLessThan45;
    },

    /**
     * @risk Смерть Застрахованного по любой причине
     * @product Надежный выбор Премиум
     * @condition Обязательный при возрасте Застрахованного на дату заключения договора <= 45 полных лет
     * @param {Context} Document Body
     */
    DLPSS36102ERCP: function (context) {
        const ageOnStartLessThan45 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 45;

        return ageOnStartLessThan45;
    },
    /**
     * @risk: Смерть Застрахованного по любой причине с возвратом страховых взносов
     * @product: Надежный выбор
     * @condition Обязательный при возрасте Застрахованного на дату заключения договора > 45 полных лет
     * @param {Context} Document Body
     */
    DPVV36102ERC: function (context) {
        const ageOnStartMoreThan45 = context.insredAgeOnStartDate && context.insredAgeOnStartDate > 45;

        return ageOnStartMoreThan45;
    },

    /**
     * @risk: Смерть Застрахованного по любой причине с возвратом страховых взносов
     * @product: Надежный выбор Премиум
     * @condition Обязательный при возрасте Застрахованного на дату заключения договора > 45 полных лет
     * @param {Context} Document Body
     */
    DPVV36102ERCP: function (context) {
        const ageOnStartMoreThan45 = context.insredAgeOnStartDate && context.insredAgeOnStartDate > 45;

        return ageOnStartMoreThan45;
    },

    /**
     * @risk: Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного
     * случая или болезни с освобождением от уплаты страховых взносов
     * @product: Надежный выбор
     * @condition Обязательный при оплате в рассрочку
     * @param {Context} Document Body
     */
    D36102ERC: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;

        return paymentByInstallments;
    },

    /**
     * @risk: Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного
     * случая или болезни с освобождением от уплаты страховых взносов
     * @product: Надежный выбор Премиум
     * @condition Обязательный при оплате в рассрочку, совпадении страхователя с застрахованным
     * @param {Context} Document Body
     */
    D36102ERCP: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;

        return paymentByInstallments && isInsuredPolicyHolder;
    },

    /**
     * @risk: Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты одного взноса
     * @product: Надежный выбор Премиум
     * @condition Обязательный при оплате в рассрочку, совпадении страхователя с застрахованным,
     * возрасте Застрахованного на дату заключения <= 60 полных лет,
     * возрасте Застрахованного на дату окончания договора <= 65 полных лет
     * @param {Context} Document Body
     */
    JL36102ERCP: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        const ageOnStartLessThan60 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 64;

        return paymentByInstallments && isInsuredPolicyHolder && ageOnStartLessThan60;
    },

    /**
     * @risk: Первичное диагностирование застрахованному критического заболевания (5 болезней)
     * @product: Надежный выбор Премиум
     * @condition Дополнительный, можно подключить при оплате в рассрочку,
     * возрасте Застрахованного на дату заключения <= 60 полных лет
     * @param {Context} Document Body
     */
    CDP36102ERCP: function (context) {

        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStartLessThan60 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 60;

        return paymentByInstallments && ageOnStartLessThan60;
    },

    /**
     * @risk: Тяжкие телесные повреждения Застрахованного в результате несчастного случая
     * @product: Надежный выбор Премиум
     * @condition Дополнительный, можно подключить при оплате в рассрочку,
     * возрасте Застрахованного на дату заключения <= 60 полных лет
     * @param {Context} Document Body
     */
    HI36102ERCP: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStartLessThan60 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 60;

        return paymentByInstallments && ageOnStartLessThan60;
    },

    /**
     * @risk: Инвалидность Застрахованного с установлением I, II группы инвалидности
     * в результате несчастного случая от уплаты страховых взносов
     * @product: Вектор здоровья Премиум
     * @condition Обязательный при оплате в рассрочку
     * @param {Context} Document Body
     */
    DA36102EHVP: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;

        return paymentByInstallments;
    },

    /**
     * @risk: КЗ лечение. Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС...
     * @product: Вектор здоровья Премиум
     * @condition НЕ может быть заменен на КЗ выплата, автоматически устанавливается, если застрахованному:
     * на дату заключения > 58 и  <= 63 полных лет
     * на дату окончания договора > 65 и <= 70 полных лет
     * @param {Context} Document Body
     */
    CDH10800EHVP: function (context) {
        const ageOnStartLessThan58 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 58;
        const ageOnStartLessThan63 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 63;

        return !(ageOnStartLessThan58) && ageOnStartLessThan63;
    },

    /**
     * @risk: КЗ лечение. Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС...
     * @product: Вектор здоровья Премиум
     * @condition может быть заменен на КЗ выплата, автоматически устанавливается, если застрахованному:
     * на дату заключения <= 58 полных лет
     * на дату окончания договора <= 65 полных лет
     * @param {Context} Document Body
     */
    CDH10800EHVPREPLACEABLE: function (context) {
        const ageOnStartLessThan58 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 58;

        return ageOnStartLessThan58;
    },

    DLP42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DLP42204', 0) > 0;
    },

    D42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'D42204', 0) > 0;
    },

    CD42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'CD42204', 0) > 0;
    },

    I42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'I42204', 0) > 0;
    },

    JL42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'JL42204', 0) > 0;
    },

    DMS110800: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DMS110800', 0) > 0;
    },

    DMS210800: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DMS210800', 0) > 0;
    },

    DNS42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DNS42204', 0) > 0;
    },

    DA1005042204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DA1005042204', 0) > 0;
    },

    DA10010042204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DA10010042204', 0) > 0;
    },

    DA12012042204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DA12012042204', 0) > 0;
    },

    DIL42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DIL42204', 0) > 0;
    },

    DI1005042204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DI1005042204', 0) > 0;
    },

    DI10010042204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DI10010042204', 0) > 0;
    },

    DI12012042204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DI12012042204', 0) > 0;
    },

    TDA42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'TDA42204', 0) > 0;
    },

    TDLP42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'TDLP42204', 0) > 0;
    },

    CDP42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'CDP42204', 0) > 0;
    },

    HA42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'HA42204', 0) > 0;
    },

    ITP42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'ITP42204', 0) > 0;
    },

    DT42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DT42204', 0) > 0;
    },

    DNST42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DNST42204', 0) > 0;
    },

    DAT42204: function (context) {
        const { productCode, creditSumNet, creditProgramId, contractIssueDate } = context;
        const creditRisksConfig = creditRisks({ productCode, creditSumNet, creditProgramId, issueDate: contractIssueDate });
        return getValue(creditRisksConfig, 'DAT42204', 0) > 0;
    },

    /**
     * @risk: Инвалидность Застрахованного с установлением I, II группы инвалидности
     * по любой причине с освобождением от уплаты страховых взносов
     * @product: Надежный выбор 2.0
     * @condition Обязательный при оплате в рассрочку
     * @param {Context} Document Body
     */
    D36404ERC2: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        return paymentByInstallments;
    },

    /**
     * @risk: Инвалидность Застрахованного с установлением I, II группы инвалидности
     * по любой причине с освобождением от уплаты страховых взносов
     * @product: Надежный выбор Премиум 2.0
     * @condition Обязательный при оплате в рассрочку, совпадении страхователя с застрахованным
     * @param {Context} Document Body
     */
    D36404ERCP2: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        return paymentByInstallments && isInsuredPolicyHolder;
    },

    /**
     * @risk: Потеря работы ОУСВ
     * @product: Надежный выбор Премиум 2.0
     * @condition Обязательный при оплате в рассрочку, совпадении страхователя с застрахованным,
     * возрасте Застрахованного на дату заключения <= 64 полных лет
     * @param {Context} Document Body
     */
    JL36404ERCP2: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        const ageOnStartLessThan64 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 64;
        return paymentByInstallments && isInsuredPolicyHolder && ageOnStartLessThan64;
    },

    /**
     * @risk: Первичное диагностирование Застрахованному критического заболевания
     * @product: Надежный выбор Премиум 2.0
     * @condition Дополнительный, можно подключить при оплате в рассрочку,
     * возрасте Застрахованного на дату заключения <= 60 полных лет
     * @param {Context} Document Body
     */
    CD36404ERCP2: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStartLessThan60 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 60;
        return paymentByInstallments && ageOnStartLessThan60;
    },

    /**
     * @risk: Тяжелая травма
     * @product: Надежный выбор Премиум 2.0
     * @condition Дополнительный, можно подключить при оплате в рассрочку,
     * возрасте Застрахованного на дату заключения <= 60 полных лет
     * @param {Context} Document Body
     */
    HI36404ERCP2: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStartLessThan60 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 60;
        return paymentByInstallments && ageOnStartLessThan60;
    },

    /**
     * @risk: Инв 1,2 НС ОУСВ
     * @product: Вектор здоровья Премиум 2.0
     * @condition Обязательный при оплате в рассрочку
     * @param {Context} Document Body
     */
    DA36404EHVP2: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        return paymentByInstallments;
    },

    /**
     * @risk: КЗ выплата
     * @product: Вектор здоровья Премиум 2.0
     * @condition Может быть выбран как замена риска КЗ лечение при возрасте Застрахованного на дату заключения <= 58 полных лет
     * @param {Context} Document Body
     */
    CDP36404EHVP2: function (context) {
        const ageOnStartLessThan58 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 58;
        return ageOnStartLessThan58;
    },

    /**
     * @risk: ИНС 1,2 ВВ
     * @product: Финансовый резерв БФКО
     * @condition Только по результатам индивидуального андеррайтинга или удаления риска
     * @param {Context} Document Body
     */
    DAVV36404EFRBFKO: function (context) {
        return context.manualCorrection || context.isHardcoreDeletedRisk;
    },

    /**
     * @risk: ИЛП 1,2 ВВ
     * @product: Финансовый резерв БФКО
     * @condition Только если риск не был удален
     * @param {Context} Document Body
     */
    DVV36404EFRBFKO: function (context) {
        return !context.isHardcoreDeletedRisk;
    },

    /**
     * @risk: Смерть НС
     * @product: Финансовый резерв БФКО
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DNS36404EFRBFKO: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DNS36404';
        return selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: Смерть ТП
     * @product: Финансовый резерв БФКО
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DTP36404EFRBFKO: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DTP36404';
        return selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: ВНТ НС
     * @product: Финансовый резерв БФКО
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CTDA36404EFRBFKO: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CTDA36404';
        return selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: ИНС 1,2
     * @product: Финансовый резерв БФКО
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DASS36404EFRBFKO: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DASS36404';
        return selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },


    /**
     * @risk: КЗ лечение РФ
     * @product: Финансовый резерв БФКО
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CDHR10800EFRBFKO: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDHR10800';
        return selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: КЗ ОУСВ
     * @product: Финансовый резерв БФКО
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CDVV36404EFRBFKO: function (context) {
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDVV36404';
        return selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode))
            && isInsuredPolicyHolder;
    },

    /**
     * @risk: ИНС 1,2 ВВ
     * @product: Финансовый резерв БФКО
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     */
    CDHW10800EFRBFKO: function (context) {
        return context.manualCorrection;
    },

    /**
     * @risk: Инв 1,2 ЛП ОУСВ
     * @product: Премиум Гарант Плюс АКБАРС
     * @condition Обязательный при совпадении страхователя с застрахованным
     * @param {Context} Document Body
     */
    D36404EPGPAKBARS: function (context) {
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        return isInsuredPolicyHolder;
    },

    /**
     * @risk: Потеря работы ОУСВ
     * @product: Премиум Гарант Плюс АКБАРС
     * @condition Обязательный при совпадении страхователя с застрахованным
     * @param {Context} Document Body
     */
    JL36404EPGPAKBARS: function (context) {
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        return isInsuredPolicyHolder;
    },

    /**
     * @risk: Смерть ЛП
     * @product: Стань миллионером БФКО
     * @condition Обязательный при возрасте Застрахованного на дату заключения <= 55 полных лет
     * @param {Context} Document Body
     */
    DLP36404EBMBFKO: function (context) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        return ageOnStartLessThan55;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером БФКО
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 56 и <= 65 полных лет
     * @param {Context} Document Body
     */
    DLPVV6536404EBMBFKO: function (context) {
        const ageOnStartMoreThan56 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 56;
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        return ageOnStartMoreThan56 && ageOnStartLessThan65;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером БФКО
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV6536404EBMBFKOR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan55 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером БФКО
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 66 полных лет
     * @param {Context} Document Body
     */
    DLPVV7036404EBMBFKO: function (context) {
        const ageOnStartMoreThan66 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 66;
        return ageOnStartMoreThan66;
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером БФКО
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV7036404EBMBFKOR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan65 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Смерть ЛП
     * @product: Стань миллионером ЗЕНИТ
     * @condition Обязательный при возрасте Застрахованного на дату заключения <= 55 полных лет
     * @param {Context} Document Body
     */
    DLP36404EBMZENIT: function (context) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        return ageOnStartLessThan55;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером ЗЕНИТ
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 56 и <= 65 полных лет
     * @param {Context} Document Body
     */
    DLPVV6536404EBMZENIT: function (context) {
        const ageOnStartMoreThan56 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 56;
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        return ageOnStartMoreThan56 && ageOnStartLessThan65;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером ЗЕНИТ
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV6536404EBMZENITR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan55 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером ЗЕНИТ
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 66 полных лет
     * @param {Context} Document Body
     */
    DLPVV7036404EBMZENIT: function (context) {
        const ageOnStartMoreThan66 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 66;
        return ageOnStartMoreThan66;
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером ЗЕНИТ
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV7036404EBMZENITR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan65 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Инв 1,2 ЛП ОУСВ
     * @product: Премиум Гарант Плюс ЗЕНИТ
     * @condition Обязательный при совпадении страхователя с застрахованным
     * @param {Context} Document Body
     */
    D36404EPGPZENIT: function (context) {
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        return isInsuredPolicyHolder;
    },

    /**
     * @risk: Потеря работы ОУСВ
     * @product: Премиум Гарант Плюс ЗЕНИТ
     * @condition Обязательный при совпадении страхователя с застрахованным
     * @param {Context} Document Body
     */
    JL36404EPGPZENIT: function (context) {
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        return isInsuredPolicyHolder;
    },

    /**
     * @risk: Смерть ЛП
     * @product: Стань миллионером АКЦЕПТ
     * @condition Обязательный при возрасте Застрахованного на дату заключения <= 55 полных лет
     * @param {Context} Document Body
     */
    DLP36404EBMAKCEPT: function (context) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        return ageOnStartLessThan55;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером АКЦЕПТ
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 56 и <= 65 полных лет
     * @param {Context} Document Body
     */
    DLPVV6536404EBMAKCEPT: function (context) {
        const ageOnStartMoreThan56 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 56;
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        return ageOnStartMoreThan56 && ageOnStartLessThan65;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером АКЦЕПТ
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV6536404EBMAKCEPTR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan55 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером АКЦЕПТ
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 66 полных лет
     * @param {Context} Document Body
     */
    DLPVV7036404EBMAKCEPT: function (context) {
        const ageOnStartMoreThan66 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 66;
        return ageOnStartMoreThan66;
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером АКЦЕПТ
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV7036404EBMAKCEPTR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan65 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Смерть ЛП
     * @product: Стань миллионером ОАС
     * @condition Обязательный при возрасте Застрахованного на дату заключения <= 55 полных лет
     * @param {Context} Document Body
     */
    DLP36404EBMOAS: function (context) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        return ageOnStartLessThan55;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером ОАС
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 56 и <= 65 полных лет
     * @param {Context} Document Body
     */
    DLPVV6536404EBMOAS: function (context) {
        const ageOnStartMoreThan56 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 56;
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        return ageOnStartMoreThan56 && ageOnStartLessThan65;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером ОАС
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV6536404EBMOASR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan55 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером ОАС
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 66 полных лет
     * @param {Context} Document Body
     */
    DLPVV7036404EBMOAS: function (context) {
        const ageOnStartMoreThan66 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 66;
        return ageOnStartMoreThan66;
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером ОАС
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV7036404EBMOASR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan65 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Смерть ЛП
     * @product: Стань миллионером АКБАРС
     * @condition Обязательный при возрасте Застрахованного на дату заключения <= 55 полных лет
     * @param {Context} Document Body
     */
    DLP36404EBMAKBARS: function (context) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        return ageOnStartLessThan55;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером АКБАРС
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 56 и <= 65 полных лет
     * @param {Context} Document Body
     */
    DLPVV6536404EBMAKBARS: function (context) {
        const ageOnStartMoreThan56 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 56;
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        return ageOnStartMoreThan56 && ageOnStartLessThan65;
    },

    /**
     * @risk: Смерть ЛП ВВ_65
     * @product: Стань миллионером АКБАРС
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV6536404EBMAKBARSR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan55 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 55;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan55 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером АКБАРС
     * @condition Обязательный при возрасте Застрахованного на дату заключения >= 66 полных лет
     * @param {Context} Document Body
     */
    DLPVV7036404EBMAKBARS: function (context) {
        const ageOnStartMoreThan66 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 66;
        return ageOnStartMoreThan66;
    },

    /**
     * @risk: Смерть ЛП ВВ_70
     * @product: Стань миллионером АКБАРС
     * @condition Только по результатам индивидуального андеррайтинга
     * @param {Context} Document Body
     * @param {CurrentWorkUnitActor} Current work unit actor
     */
    DLPVV7036404EBMAKBARSR: function (context, currentWorkUnitActor) {
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        const manualCorrection = context.manualCorrection;
        return ageOnStartLessThan65 && (manualCorrection || currentWorkUnitActor == "Underwriter");
    },

    /**
     * @risk: Инв 1,2 ЛП ОУСВ
     * @product: Надежный капитал Классика 2.0
     * @condition При совпадении страхователя с застрахованным и возрасте застрахованного на дату заключения <= 64 лет
     * и возрасте застрахованного на дату окончания > 65 лет
     * @param {Context} Document Body
     */
    D36404CAPCLRELOAS: function (context) {
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        const ageOnStartLessThan64 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 64;
        const replaceDisabilityAnyReason = getValue(context, 'replaceDisabilityAnyReason', false);

        return isInsuredPolicyHolder && ageOnStartLessThan64 && !replaceDisabilityAnyReason;
    },

    /**
     * @risk: Инв 1,2 НС ОУСВ
     * @product: Надежный капитал Классика 2.0
     * @condition При совпадении страхователя с застрахованным и возрасте застрахованного на дату окончания > 65 лет
     * @param {Context} Document Body
     */
    DA36404CAPCLRELOAS: function (context) {
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        const ageOnEndMoreThan65 = context.insredAgeOnEndDate && context.insredAgeOnEndDate > 65;
        const replaceDisabilityAnyReason = getValue(context, 'replaceDisabilityAnyReason', false);

        return isInsuredPolicyHolder && (ageOnEndMoreThan65 || replaceDisabilityAnyReason);
    },

    /**
     * @risk: Потеря работы ОУСВ
     * @product: Надежный капитал Классика 2.0
     * @condition Только по результатам индивидуального андеррайтинга и возрасте застрахованного на дату заключения <= 60 лет
     * @param {Context} Document Body
     */
    MJL36404CAPCLRELOAS: function (context) {
        const riskCode = 'MJL36404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        const ageOnStartLessThan60 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 60;
        return ageOnStartLessThan60 && isInsuredPolicyHolder && allAvailablePackages;
    },

    /**
     * @risk: Смерть НС
     * @product: Надежный капитал Классика 2.0
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DNS36404CAPCLRELOAS: function (context) {
        const riskCode = 'DNS36404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        return allAvailablePackages;
    },

    /**
     * @risk: Смерть ДТП
     * @product: Надежный капитал Классика 2.0
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DDTP36404CAPCLRELOAS: function (context) {
        const riskCode = 'DDTP36404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        return allAvailablePackages;
    },

    /**
     * @risk: ИЛП 1,2
     * @product: Надежный капитал Классика 2.0
     * @condition При возрасте застрахованного на дату заключения <= 60 лет
     * @param {Context} Document Body
     */
    DSS36404CAPCLRELOAS: function (context) {
        const riskCode = 'DSS36404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        const ageOnStartLessThan60 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 60;
        return ageOnStartLessThan60 && allAvailablePackages;
    },

    /**
     * @risk: Критические заболевания
     * @product: Надежный капитал Классика 2.0
     * @condition При возрасте застрахованного на дату заключения <= 60 лет
     * @param {Context} Document Body
     */
    CD36404CAPCLRELOAS: function (context) {
        const riskCode = 'CD36404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        const ageOnStartLessThan60 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 60;
        return ageOnStartLessThan60 && allAvailablePackages;
    },

    /**
     * @risk: Критические заболевания 6 с освобождение от уплаты взносов
     * @product: Надежный капитал Классика 2.0
     * @condition При возрасте застрахованного на дату заключения <= 60 лет и возрасте на дату окончания <= 65 лет.
     * @param {Context} Document Body
     */
    CD636404CAPCLRELOAS: function (context) {
        const riskCode = 'CD636404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        const ageOnStartLessThan60 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 60;
        const ageOnEndLessThan65 = context.insredAgeOnEndDate && context.insredAgeOnEndDate <= 65;
        return ageOnStartLessThan60 && ageOnEndLessThan65 && allAvailablePackages;
    },

    /**
     * @risk: Тяжелая травма
     * @product: Надежный капитал Классика 2.0
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    HI36404CAPCLRELOAS: function (context) {
        const riskCode = 'HI36404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        return allAvailablePackages;
    },

    /**
     * @risk: Травма и госпитализация в случае травмы, не указанной в таблице травм
     * @product: Надежный капитал Классика 2.0
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    IH36404CAPCLRELOAS: function (context) {
        const riskCode = 'IH36404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        return allAvailablePackages;
    },

    /**
     * @risk: Травма и госпитализация в случае травмы, не указанной в таблице травм
     * @product: Детский капитал Классика 2.0
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    IH36404CAPCLCHILDOAS: function (context) {
        const riskCode = 'IH36404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        return allAvailablePackages;
    },

    /**
     * @risk: Критические заболевания 6 с освобождение от уплаты взносов
     * @product: Детский капитал Классика 2.0
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CD636404CAPCLCHILDOAS: function (context) {
        const riskCode = 'CD636404';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        return allAvailablePackages;
    },

    /**
     * @risk: Травма Застрахованного в результате несчастного случая
     * @product: Достойный век 2.0
     * @condition При выборе соответствующего пакета. При рассроченной уплате взносов и возрасте ЗЛ на дату оформлени 30-75 лет.
     * @param {Context} Document Body
     */
    I46204WCENOAS: function (context) {
        const riskCode = 'I46204';
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const allAvailablePackages = selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        return paymentByInstallments && allAvailablePackages;
    },

    /**
     * @risk: Смерть ЛП (в результате НСиБ) с разными способами определения СС в период действия договора (смеш)
     * @product: Достойный век 2.0
     * @condition При расроченной оплате для клиентов в возрасте 78 лет на момент оформления
     * @param {Context} Document Body
     */
    DLP46204MWCENOAS: function (context) {
        const isIssueDateAfter = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(context.contractIssueDate), DateTimeUtils.formatDate(lifeInsuranceConstants.newRules.WCENOAS.startDate));
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStart78 = context.insredAgeOnStartDate && context.insredAgeOnStartDate == 78;
        const ageOnStartMoreThan30 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 30;
        const ageOnStartLessThan80 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 80;
        return ((paymentByInstallments && ageOnStart78) || (!paymentByInstallments && ageOnStartMoreThan30 && ageOnStartLessThan80)) && isIssueDateAfter;
    },

    /**
     * @risk: Смерть Застрахованного по любой причине
     * @product: Достойный век 2.0
     * @condition При расроченной оплате для клиентов в возрасте от 30 до 77 лет на момент оформления
     * @param {Context} Document Body
     */
    DLP46204WCENOAS: function (context) {
        const isIssueDateAfter = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(context.contractIssueDate), DateTimeUtils.formatDate(lifeInsuranceConstants.newRules.WCENOAS.startDate));
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStartMoreThan30 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 30;
        const ageOnStartLessThan77 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 77;
        return (paymentByInstallments && ageOnStartMoreThan30 && ageOnStartLessThan77) || !isIssueDateAfter;
    },

    /**
     * @risk: Смерть Застрахованного по любой причине (ВВ)
     * @product: Достойный век 2.0
     * @condition При расроченной оплате для клиентов в возрасте от 30 до 77 лет на момент оформления
     * @param {Context} Document Body
     */
    DLPVV46204WCENOAS: function (context) {
        const isIssueDateAfter = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(context.contractIssueDate), DateTimeUtils.formatDate(lifeInsuranceConstants.newRules.WCENOAS.startDate));
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStartMoreThan30 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 30;
        const ageOnStartLessThan77 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 77;
        return (paymentByInstallments && ageOnStartMoreThan30 && ageOnStartLessThan77) || !isIssueDateAfter;
    },

    /**
 * @risk: Смерть ЛП (в результате НСиБ) с разными способами определения СС в период действия договора (смеш)
 * @product: Достойный век 3.0
 * @condition При расроченной оплате для клиентов в возрасте 78 лет на момент оформления
 * @param {Context} Document Body
 */
    DLP46204MWCEN3OAS: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStart78 = context.insredAgeOnStartDate && context.insredAgeOnStartDate == 78;
        const ageOnStartMoreThan40 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 40;
        const ageOnStartLessThan80 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 80;
        return ((paymentByInstallments && ageOnStart78) || (!paymentByInstallments && ageOnStartMoreThan40 && ageOnStartLessThan80));
    },

    /**
 * @risk: Смерть Застрахованного по любой причине
 * @product: Достойный век 3.0
 * @condition При расроченной оплате для клиентов в возрасте от 40 до 77 лет на момент оформления
 * @param {Context} Document Body
 */
    DLP46204WCEN3OAS: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStartMoreThan40 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 40;
        const ageOnStartLessThan77 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 77;
        return (paymentByInstallments && ageOnStartMoreThan40 && ageOnStartLessThan77);
    },

    /**
 * @risk: Смерть Застрахованного по любой причине (ВВ)
 * @product: Достойный век 3.0
 * @condition При расроченной оплате для клиентов в возрасте от 40 до 77 лет на момент оформления
 * @param {Context} Document Body
 */
    DLPVV46204WCEN3OAS: function (context) {
        const paymentByInstallments = context.paymentType && context.paymentType != lifeInsuranceConstants.paymentFrequency.oneTime.code;
        const ageOnStartMoreThan40 = context.insredAgeOnStartDate && context.insredAgeOnStartDate >= 40;
        const ageOnStartLessThan77 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 77;
        return (paymentByInstallments && ageOnStartMoreThan40 && ageOnStartLessThan77);
    },

    /**
     * @risk: Инв 1,2 ЛП ОУСВ
     * @product: Детский капитал ОАС 2.0
     * @condition При возрасте страхователя на дату заключения <= 64 лет
     * @param {Context} Document Body
     */
    D36404CAPCLCHILDOAS: function (context) {
        const ageOnStartLessThan64 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 64;
        const replaceDisabilityAnyReason = getValue(context, 'replaceDisabilityAnyReason', false);
        return ageOnStartLessThan64 && !replaceDisabilityAnyReason;
    },

    /**
     * @risk: Инв 1,2 НС ОУСВ
     * @product: Детский капитал ОАС 2.0
     * @condition При возрасте страхователя на дату окончания > 65 лет
     * @param {Context} Document Body
     */
    DA36404CAPCLCHILDOAS: function (context) {
        const ageOnEndMoreThan65 = context.phAgeOnEndDate && context.phAgeOnEndDate > 65;
        const replaceDisabilityAnyReason = getValue(context, 'replaceDisabilityAnyReason', false);
        return ageOnEndMoreThan65 || replaceDisabilityAnyReason;
    },

    /**
     * @risk: Инв 1,2 ЛП
     * @product: На всякий случай Ультра
     * @condition При возрасте застрахованного на дату начала действия договора <= 64
     * @param {Context} Document Body
     */
    D42204TERM: function (context) {
        const ageOnStartLessThan64 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 64;
        const riskCode = 'D42204';
        const isCurrentRiskDeleted = context.deletedRisks.includes(riskCode);

        if (context.restoreAllRisks && isCurrentRiskDeleted) {
            return true;
        } else if (isCurrentRiskDeleted) {
            return false;
        } else if (ageOnStartLessThan64) {
            return true;
        }
    },

    /**
     * @risk: Смерть НС
     * @product: На всякий случай Ультра
     * @condition При выбранном Пакете 1
     * @param {Context} Document Body
     */
    DNS42204TERM: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DNS42204';
        const isCurrentRiskDeleted = context.deletedRisks.includes(riskCode);

        if (context.restoreAllRisks && isCurrentRiskDeleted) {
            return true;
        } else if (isCurrentRiskDeleted) {
            return false;
        } else if (selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode))) {
            return true;
        }
    },

    /**
     * @risk: Смерть ТП
     * @product: На всякий случай Ультра
     * @condition При выбранном Пакете 1
     * @param {Context} Document Body
     */
    DTP42204TERM: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DTP42204';
        const isCurrentRiskDeleted = context.deletedRisks.includes(riskCode);

        if (context.restoreAllRisks && isCurrentRiskDeleted) {
            return true;
        } else if (isCurrentRiskDeleted) {
            return false;
        } else if (selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode))) {
            return true;
        }
    },

    /**
     * @risk: Травма НС
     * @product: На всякий случай Ультра
     * @condition При выбранном Пакете 1
     * @param {Context} Document Body
     */
    I42204TERM: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'I42204';
        const isCurrentRiskDeleted = context.deletedRisks.includes(riskCode);

        if (context.restoreAllRisks && isCurrentRiskDeleted) {
            return true;
        } else if (isCurrentRiskDeleted) {
            return false;
        } else if (selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode))) {
            return true;
        }
    },

    /**
     * @risk: КЗ лечение РФ
     * @product: На всякий случай Ультра
     * @condition При выбранном Пакете 2 и при возрасте застрахованного на дату начала действия договора <= 64
     * @param {Context} Document Body
     */
    CDHR10800TERM: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDHR10800';
        const ageOnStartLessThan64 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 64;

        return ageOnStartLessThan64 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: КЗ лечение весь мир
     * @product: На всякий случай Ультра
     * @condition При выбранном Пакете 2 и при возрасте застрахованного на дату начала действия договора <= 64
     * @param {Context} Document Body
     */
    CDHW10800TERM: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDHW10800';
        const ageOnStartLessThan64 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 64;

        return ageOnStartLessThan64 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: Инвалидность 1,2 ЛП ОУСВ
     * @product: Забота о будущем
     * @condition При возрасте страхователя на дату заключения <= 64 лет
     * @param {Context} Document Body
     */
    D36404ECATFPVTB: function (context) {
        const ageOnStartLessThan64 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 64;
        const replaceDisabilityAnyReason = getValue(context, 'replaceDisabilityAnyReason', false);
        return ageOnStartLessThan64 && !replaceDisabilityAnyReason;
    },

    /**
     * @risk: Инвалидность 1,2 НС ОУСВ
     * @product: Забота о будущем
     * @condition При возрасте страхователя на дату окончания > 65 лет
     * @param {Context} Document Body
     */
    DA36404ECATFPVTB: function (context) {
        const ageOnEndMoreThan65 = context.phAgeOnEndDate && context.phAgeOnEndDate > 65;
        const replaceDisabilityAnyReason = getValue(context, 'replaceDisabilityAnyReason', false);
        return ageOnEndMoreThan65 || replaceDisabilityAnyReason;
    },

    /**
     * @risk: Инвалидность 1,2 ЛП ОУСВ
     * @product: Забота о будущем Ультра
     * @condition При возрасте страхователя на дату заключения <= 64 лет
     * @param {Context} Document Body
     */
    D36404ECATFVVTB: function (context) {
        const ageOnStartLessThan64 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 64;
        const replaceDisabilityAnyReason = getValue(context, 'replaceDisabilityAnyReason', false);
        return ageOnStartLessThan64 && !replaceDisabilityAnyReason;
    },

    /**
     * @risk: Инвалидность 1,2 НС ОУСВ
     * @product: Забота о будущем Ультра
     * @condition При возрасте страхователя на дату окончания > 65 лет
     * @param {Context} Document Body
     */
    DA36404ECATFVVTB: function (context) {
        const ageOnEndMoreThan65 = context.phAgeOnEndDate && context.phAgeOnEndDate > 65;
        const replaceDisabilityAnyReason = getValue(context, 'replaceDisabilityAnyReason', false);
        return ageOnEndMoreThan65 || replaceDisabilityAnyReason;
    },

    /**
     * @risk: ИНС 1,2 ВВ
     * @product: Забота о семье
     * @condition Только по результатам индивидуального андеррайтинга или удаления риска
     * @param {Context} Document Body
     */
    DAVV36404ECOFPVTB: function (context) {
        const ageOnEndMoreThan65 = context.insredAgeOnEndDate && (context.insredAgeOnEndDate > 65 && context.insredAgeOnEndDate < 71);
        const isReplace = context?.replaceDisabilityECOF ?? false;
        if (ageOnEndMoreThan65 && !isReplace && !context.isHardcoreDeletedRisk) {
            return true;
        }
        else if (isReplace && !context.isHardcoreDeletedRisk) {
            return true;
        }

        return false;

    },

    /**
     * @risk: ИНС 1,2 ВВ
     * @product: Забота о семье Ультра
     * @condition Только по результатам индивидуального андеррайтинга или удаления риска
     * @param {Context} Document Body
     */
    DAVV36404ECOFVVTB: function (context) {
        const ageOnEndMoreThan65 = context.insredAgeOnEndDate && (context.insredAgeOnEndDate > 65 && context.insredAgeOnEndDate < 71);
        const isReplace = context?.replaceDisabilityECOF ?? false;
        if (ageOnEndMoreThan65 && !isReplace && !context.isHardcoreDeletedRisk) {
            return true;
        }
        else if (isReplace && !context.isHardcoreDeletedRisk) {
            return true;
        }

        return false;

    },

    /**
     * @risk: ИЛП 1,2 ВВ
     * @product: Забота о семье
     * @condition Только если риск не был удален
     * @param {Context} Document Body
     */
    DVV36404ECOFPVTB: function (context) {
        const ageOnStartLessThan64 = context.insredAgeOnStartDate && (context.insredAgeOnStartDate <= 64 && context.insredAgeOnEndDate < 71);
        const isReplace = context?.replaceDisabilityECOF ?? false;
        if (ageOnStartLessThan64 && !context.isHardcoreDeletedRisk && !isReplace) {
            return true;
        } else if (context.isHardcoreDeletedRisk || isReplace) {
            return false;
        }
    },

    /**
     * @risk: ИЛП 1,2 ВВ
     * @product: Забота о семье Ультра
     * @condition Только если риск не был удален
     * @param {Context} Document Body
     */
    DVV36404ECOFVVTB: function (context) {
        const ageOnStartLessThan64 = context.insredAgeOnStartDate && (context.insredAgeOnStartDate <= 64 && context.insredAgeOnEndDate < 71);
        const isReplace = context?.replaceDisabilityECOF ?? false;
        if (ageOnStartLessThan64 && !context.isHardcoreDeletedRisk && !isReplace) {
            return true;
        } else if (context.isHardcoreDeletedRisk || isReplace) {
            return false;
        }
    },

    /**
     * @risk: Смерть ТП
     * @product: Забота о семье
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DTP36404ECOFPVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DTP36404';
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        return ageOnStartLessThan65 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: Смерть ТП
     * @product: Забота о семье Ультра
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DTP36404ECOFVVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DTP36404';
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        return ageOnStartLessThan65 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: Смерть НС
     * @product: Забота о семье
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DNS36404ECOFPVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DNS36404';
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        return ageOnStartLessThan65 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: Смерть НС
     * @product: Забота о семье Ультра
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DNS36404ECOFVVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DNS36404';
        const ageOnStartLessThan65 = context.insredAgeOnStartDate && context.insredAgeOnStartDate <= 65;
        return ageOnStartLessThan65 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: ВНТ НС
     * @product: Забота о семье
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CTDA36404ECOFPVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CTDA36404';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: ВНТ НС
     * @product: Забота о семье 2.0
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CTDA36404ECOF2ZENIT: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CTDA36404';
        const ageOnStartLessThan60 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 60;
        return ageOnStartLessThan60 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: ВНТ НС
     * @product: Забота о семье Ультра
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CTDA36404ECOFVVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CTDA36404';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: ИНС 1,2
     * @product: Забота о семье
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DASS36404ECOFPVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DASS36404';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: ИНС 1,2
     * @product: Забота о семье 2.0
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DASS36404ECOF2ZENIT: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DASS36404';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 60;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: ИНС 1,2
     * @product: Забота о семье Ультра
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    DASS36404ECOFVVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'DASS36404';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: КЗ выплата
     * @product: Забота о семье
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CDP36404ECOFPVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDP36404';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: КЗ выплата
     * @product: Забота о семье Ультра
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CDP36404ECOFVVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDP36404';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: КЗ лечение РФ
     * @product: Забота о семье
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CDHR10800ECOFPVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDHR10800';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
    * @risk: КЗ лечение РФ
    * @product: Забота о семье 2.0
    * @condition При выборе соответствующего пакета
    * @param {Context} Document Body
    */
    CDHR10800ECOF2ZENIT: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDHR10800';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 60;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: КЗ лечение РФ
     * @product: Забота о семье Ультра
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CDHR10800ECOFVVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDHR10800';
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: КЗ ОУСВ
     * @product: Забота о семье
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CDVV36404ECOFPVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDVV36404';
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && isInsuredPolicyHolder && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: КЗ ОУСВ
     * @product: Забота о семье 2.0
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CDVV36404ECOF2ZENIT: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDVV36404';
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 60;
        return ageOnStartLessThan57 && isInsuredPolicyHolder && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },

    /**
     * @risk: КЗ ОУСВ
     * @product: Забота о семье Ультра
     * @condition При выборе соответствующего пакета
     * @param {Context} Document Body
     */
    CDVV36404ECOFVVTB: function (context) {
        const selectedPackages = context.risksPackages && context.risksPackages.selectedPackages || [];
        const riskCode = 'CDVV36404';
        const isInsuredPolicyHolder = context.isInsuredPolicyHolder;
        const ageOnStartLessThan57 = context.phAgeOnStartDate && context.phAgeOnStartDate <= 58;
        return ageOnStartLessThan57 && isInsuredPolicyHolder && selectedPackages.some(item => riskPackagesConfiguration({ packageCode: item.packageCode }).packageRisks.includes(riskCode));
    },
};
