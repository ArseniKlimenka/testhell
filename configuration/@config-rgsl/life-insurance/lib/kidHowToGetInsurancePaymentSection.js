'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

// КИД. Раздел IV. КАК ПОЛУЧИТЬ СТРАХОВУЮ ВЫПЛАТУ?
function getKidGetInsurancePaymentSection(body, output, kidIsMulti) {

    const currentProductCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    const riskPremium = getValue(body, 'basicConditions.riskPremium', 0);
    const kidRiskCodes = body.risks ? body.risks.map(item => item.risk.riskCode) : [];

    /* По умолчанию для всех */
    let sectionText = `Страховая выплата (страховое возмещение) осуществляется 
    в течение 30 (тридцати) календарных дней со дня предоставления указанных документов.`;
    let section = getDivSection(sectionText);

    /* Для продукта На всякий случай Ультра (код продукта - TERMVVTB)
    */
    const IS_KID_PAYMENT_TERMVVTB = productGroupArray.KID_PAYMENT_TERMVVTB.includes(currentProductCode);
    const KID_PAYMENT_TERMVVTB_START_TEXT = `Страховая выплата (страховое возмещение) по страховым рискам, 
    относящимся к медицинскому страхованию, осуществляется в течение 30 (тридцати) 
    рабочих дней со дня предоставления указанных документов.`;

    /* Для продуктов Восстанови здоровье Лайт (код продукта – RHELIGHTOAS),
        Генетический чек-ап «Мое здоровье» (код продукта – GENCHKHEALTH),
        Генетический чек-ап «Питание и спорт» (код продукта – GENCHKSPORT),
        Генетический чек-ап «Таланты и способности» (код продукта – GENCHKTALENTS),
        ПРО Генетику (код продукта – PROGENTICSBFKO),
        ПРО Здоровье (код продукта – PROHEALTHBFKO),
        ПРО ЗОЖ (код продукта – PROZOZHBFKO)
    */
    const IS_KID_PAYMENT_RHE_GENCHK_PRO = productGroupArray.KID_PAYMENT_RHE_GENCHK_PRO.includes(currentProductCode);
    const KID_PAYMENT_RHE_GENCHK_PRO_START_TEXT = `Страховая выплата (страховое возмещение) по страховым рискам, 
    относящимся к медицинскому страхованию, осуществляется в течение 30 (тридцати) 
    рабочих дней со дня предоставления указанных документов.`;

    /* Для продуктов Восстанови здоровье вариант Базовый (код продукта – RHEBASEOAS),
        Восстанови здоровье вариант Оптима (код продукта – RHEOPTIMAOAS)
    */
    const IS_KID_PAYMENT_RHE_BASE_OPT = productGroupArray.KID_PAYMENT_RHE_BASE_OPT.includes(currentProductCode);
    const KID_PAYMENT_RHE_BASE_OPT_START_TEXT = `Страховая выплата (страховое возмещение) по страховым рискам, 
    относящимся к медицинскому страхованию, осуществляется в течение 30 (тридцати) 
    рабочих дней со дня предоставления указанных документов.`;

    /* Для продуктов Надежный выбор Премиум 2.0 (код продукта - ERCP2),
        Надежный капитал. Классика 2.0 (код продукта - CAPCLRELOAS),
        Детский капитал. Классика 2.0 (коробка) (код продукта – CAPCLCHILDBOXOAS),
        Детский капитал. Классика 2.0 (код продукта – CAPCLCHILDOAS)
    */
    const IS_KID_PAYMENT_ERCP2_CAPCL = productGroupArray.KID_PAYMENT_ERCP2_CAPCL.includes(currentProductCode);
    const KID_PAYMENT_ERCP2_CAPCL_START_TEXT = `Страховая выплата (страховое возмещение) осуществляется 
    в течение 30 (тридцати) календарных дней со дня предоставления указанных документов.`;

    /* Для продуктов:
        Достойный век 2.0 (код продукта – WCENOAS)
        Достойный век 3.0 (код продукта – WCEN3OAS) */
    const IS_KID_PAYMENT_WCENOAS = productGroupArray.KID_PAYMENT_WCENOAS.includes(currentProductCode);
    const KID_PAYMENT_WCENOAS_START_TEXT = `Страховая выплата (страховое возмещение) по страховым случаям, 
    связанным со смертью Застрахованного, осуществляется в течение 8 (восьми) рабочих дней 
    со дня предоставления указанных документов.`;

    /* Для продуктов Вектор здоровья Премиум 2.0 (код продукта - EHVP2),
        Финансовый резерв (код продукта – EFRBFKO)
    */
    const IS_KID_PAYMENT_EHVP2_EFRBFKO = productGroupArray.KID_PAYMENT_EHVP2_EFRBFKO.includes(currentProductCode);
    const KID_PAYMENT_EHVP2_EFRBFKO_START_TEXT = `Страховая выплата (страховое возмещение) по страховым рискам, 
    относящимся к страхованию жизни, осуществляется в течение 30 (тридцати) календарных дней 
    со дня предоставления указанных документов.`;

    /* Для продуктов:
        Забота о будущем (код продукта – ECATFPVTB)
        Забота о будущем Ультра (код продукта – ECATFVVTB)
    */
    const IS_ECATF = productGroupArray.ECATF.includes(currentProductCode);

    if (IS_ECATF) {

        if (checkAvailabilitySome(kidRiskCodes, ['DLPDPE36404'])) {

            const yearsFromIssueDate = dateUtils.getYearDifference(new Date(), (body.basicConditions?.issueDate));
            const beneficiary = body.beneficiaries?.beneficiaries.find(p => p.beneficiaryCategory == 'NonAdult');

            const benefAge = dateUtils.getYearDifference(new Date(), beneficiary?.dateOfBirth ?? new Date());
            const benefAgeOnIssueDate = benefAge - yearsFromIssueDate;
            const benefAgeOnEndDate = benefAgeOnIssueDate + Number(body.basicConditions?.insuranceTerms);

            section = getDivSection('Страховая выплата (страховое возмещение) осуществляется в течение 30 (тридцати) календарных дней со дня предоставления указанных документов.');
            section += getDivSection(`При этом по риску «Смерть Застрахованного по любой причине с отложенной страховой выплатой» 
                страховая выплата осуществляется по достижении Выгодоприобретателем по данному риску ${benefAgeOnEndDate} -
                летнего возраста, но не ранее даты окончания срока действия договора страхования.`);
        }
    }

    if (IS_KID_PAYMENT_RHE_GENCHK_PRO) {
        sectionText = KID_PAYMENT_RHE_GENCHK_PRO_START_TEXT;
        section = getDivSection(sectionText);
    }

    if (IS_KID_PAYMENT_TERMVVTB) {
        sectionText = KID_PAYMENT_TERMVVTB_START_TEXT;
        section = getDivSection(sectionText);

        const CDHR10800_OR_CDHW10800 = checkAvailabilitySome(kidRiskCodes, ['CDHR10800', 'CDHW10800']); // КЗ лечение РФ / КЗ лечение весь мир

        if (CDHR10800_OR_CDHW10800) {
            sectionText = `Страховая выплата (страховое возмещение) по страховым рискам, относящимся к медицинскому страхованию, осуществляется в течение 30 (тридцати) рабочих дней со дня предоставления указанных документов.`;
            section += getDivSection(sectionText);
        }
    }

    if (IS_KID_PAYMENT_RHE_BASE_OPT) {

        sectionText = KID_PAYMENT_RHE_BASE_OPT_START_TEXT;
        section = getDivSection(sectionText);

        const HC20700 = checkAvailabilitySome(kidRiskCodes, ['HC20700']); // Госпитализация в результате COVID–19

        if (HC20700) {
            sectionText = `Страховая выплата (страховое возмещение) по страховым рискам, относящимся к страхованию от несчастных случаев и болезней, в течение 30 (тридцати) календарных дней со дня предоставления указанных документов.`;
            section += getDivSection(sectionText);
        }
    }

    if (IS_KID_PAYMENT_ERCP2_CAPCL) {
        sectionText = KID_PAYMENT_ERCP2_CAPCL_START_TEXT;

        const CD36404 = checkAvailabilitySome(kidRiskCodes, ['CD36404']); // Критические заболевания
        const CD5C36404 = checkAvailabilitySome(kidRiskCodes, ['CD5C36404']); // Критические заболевания

        if (CD36404 || CD5C36404) {
            sectionText += ` При этом по риску «Первичное диагностирование Застрахованному критического заболевания» 
            страховая выплата производится только по истечении 30 (тридцати) календарных дней с даты первичной 
            постановки диагноза критического заболевания (периода ожидания).`;
        }
        section = getDivSection(sectionText);
    }

    if (IS_KID_PAYMENT_WCENOAS) {

        sectionText = KID_PAYMENT_WCENOAS_START_TEXT;
        section = getDivSection(sectionText);

        const I46204 = checkAvailabilitySome(kidRiskCodes, ['I46204']); // Травма

        if (I46204) {
            sectionText = `Страховая выплата (страховое возмещение) по страховым случаям, связанным 
            с получением Застрахованным травматических повреждений в результате несчастного случая, 
            осуществляется в течение 15 (пятнадцати) рабочих дней со дня предоставления указанных документов.`;
            section += getDivSection(sectionText);
        }

    }

    if (IS_KID_PAYMENT_EHVP2_EFRBFKO) {

        sectionText = KID_PAYMENT_EHVP2_EFRBFKO_START_TEXT;

        const CDP36404 = checkAvailabilitySome(kidRiskCodes, ['CDP36404']); // КЗ выплата

        if (CDP36404) {
            sectionText += ` При этом по риску «Первичное диагностирование Застрахованному критического заболевания» 
            страховая выплата производится только по истечении 30 (тридцати) календарных дней 
            с даты первичной постановки диагноза критического заболевания (периода ожидания).`;
        }
        section = getDivSection(sectionText);

        const CDH10800_TO_CDHW10800 = checkAvailabilitySome(kidRiskCodes, [
            'CDH10800', // КЗ лечение
            'CU10800', // Чек-ап
            'CDHR10800', // КЗ лечение РФ
            'CDHW10800' // КЗ лечение весь мир
        ]);

        if (CDH10800_TO_CDHW10800) {
            sectionText = `Страховая выплата (страховое возмещение) по страховым рискам, относящимся 
            к медицинскому страхованию, осуществляется в течение 30 (тридцати) рабочих дней 
            со дня предоставления указанных документов.`;
            section += getDivSection(sectionText);
        }

    }


    return section;

}

function getDivSection(sectionText) {
    return `<div class="kidIndent">${sectionText}</div>`;
}

module.exports = {
    getKidGetInsurancePaymentSection,
    getDivSection
};
