'use strict';

const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

// КИД. Раздел V. КАК ВЕРНУТЬ СТРАХОВУЮ ПРЕМИЮ?
function getKidReasonsToReturnPremiumSection(body, output, kidIsMulti) {

    const days = getKidDaysToReturnPremium(body);

    const section = `Отказ от договора страхования в течение ${days} календарных дней
    со дня его заключения, при отсутствии в данном периоде событий, имеющих
    признаки страхового случая (в соответствии с Указанием Банка России от 20.11.2015 № 3854–У
    «О минимальных (стандартных) требованиях к условиям и порядку осуществления
    отдельных видов добровольного страхования»)`;

    return section;

}

function getKidOtheCasesToReturnPremiumSection(body, output, kidIsMulti) {

    const currentProductCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const IS_KID_RETURN_PREMIUM = productGroupArray.KID_RETURN_PREMIUM.includes(currentProductCode) || productGroupArray.KID_RETURN_PREMIUM_ACCID.includes(currentProductCode);

    /* По умолчанию для всех */
    let section = `В иных случаях страховая премия возврату не подлежит. Страхователю возвращается сумма в
        пределах сформированного в установленном порядке страхового резерва на день прекращения
        договора страхования (выкупная сумма).`;

    /* Для продуктов:
        Восстанови здоровье вариант Базовый (код продукта – RHEBASEOAS),
        Восстанови здоровье вариант Оптима (код продукта – RHEOPTIMAOAS),
        Восстанови здоровье Лайт (код продукта – RHELIGHTOAS),
        Генетический чек-ап «Мое здоровье» (код продукта – GENCHKHEALTH),
        Генетический чек-ап «Питание и спорт» (код продукта – GENCHKSPORT),
        Генетический чек-ап «Таланты и способности» (код продукта – GENCHKTALENTS),
        ПРО Генетику (код продукта – PROGENTICSBFKO),
        ПРО Здоровье (код продукта – PROHEALTHBFKO),
        ПРО ЗОЖ (код продукта – PROZOZHBFKO)
     */
    if (IS_KID_RETURN_PREMIUM) {
        section = `В иных случаях страховая премия возврату не подлежит.`;
    }

    return section;

}

function getKidDaysToReturnPremiumSection(body, output, kidIsMulti) {

    const days = getKidDaysToReturnPremium(body);

    let section = `Возврат страховой премии осуществляется в течение 10 (десяти) рабочих дней со
        дня получения соответствующего заявления в случае отказа от договора страхования
        в течение ${days} календарных дней со дня его заключения.`;

    section += `<div>
            Возврат страховой премии осуществляется в течение 7 (семи) рабочих дней со
            дня получения соответствующего заявления по причине отказа от договора страхования
            в случае ненадлежащего информирования об условиях страхования.
        </div>`;

    return section;

}

function getKidDaysToReturnPremium(body) {

    const productConf = body?.productConfiguration ?? {};
    const coolOffPeriodByProductInDays = productConf.coolOffPeriodDays;

    let days = ``;

    if (coolOffPeriodByProductInDays == 14 || coolOffPeriodByProductInDays == 15) {
        days = `14 (четырнадцати)`;
    }

    if (coolOffPeriodByProductInDays == 30 || coolOffPeriodByProductInDays == 31) {
        days = `30 (тридцати)`;
    }

    return days;

}

function getKidInsurancePremiumRefundAmont(body) {
    const currentProductCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const IS_ACCIDPC = productGroupArray.KID_RETURN_PREMIUM_ACCID.includes(currentProductCode);
    const text = [];
    if (IS_ACCIDPC) {
        text.push(`100% от страховой премии – при отказе от договора страхования до даты начала срока действия договора страхования;`);
        text.push(`100% от страховой премии за вычетом части страховой премии, исчисляемой пропорционально времени, в течение которого действовал договор страхования, – при отказе от договора страхования после даты начала срока действия договора страхования.`);
    } else {
        text.push(`100% от страховой премии`);
    }
    return text;
}

module.exports = {
    getKidReasonsToReturnPremiumSection,
    getKidOtheCasesToReturnPremiumSection,
    getKidDaysToReturnPremiumSection,
    getKidDaysToReturnPremium,
    getKidInsurancePremiumRefundAmont
};
