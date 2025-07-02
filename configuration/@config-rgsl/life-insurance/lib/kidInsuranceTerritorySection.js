'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { product, productGroupArray, sportProducts } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

// КИД. Раздел III. ТЕРРИТОРИЯ СТРАХОВАНИЯ
function getKidInsuranceTerritorySection(body, output, kidIsMulti) {

    const currentProductCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    const riskPremium = getValue(body, 'basicConditions.riskPremium', 0);
    const kidRiskCodes = body.risks ? body.risks.map(item => item.risk.riskCode) : [];

    const IS_EFRBFKO = currentProductCode == product.EFRBFKO;
    const IS_ECOFPVTB = currentProductCode == product.ECOFPVTB;
    const IS_ECOFVVTB = currentProductCode == product.ECOFVVTB;
    const IS_EHVP2 = currentProductCode == product.EHVP2;
    const IS_TERMVVTB = currentProductCode == product.TERMVVTB;
    const IS_ACCIDPC = sportProducts.includes(currentProductCode);
    const IS_ECOFZENIT = currentProductCode == product.ECOF2ZENIT;
    const KID_TER_KID_ACCIDPC_START_TEXT = `Страхование действует на территории всего мира, за исключением зон военных конфликтов и приравненных к ним территорий.`;
    /* По умолчанию для всех
        + Дополнительные условия:
            Для продукта Финансовый резерв (код продукта – EFRBFKO),
            Для продукта Вектор здоровья Премиум 2.0 (код продукта - EHVP2)
            Для продукта Забота о семье (код продукта – ECOFPVTB)
            Для продукта Забота о семье Ультра (код продукта – ECOFVVTB)
    */
    let section = `Страхование действует на территории всего мира.`;

    /* Для продуктов Восстанови здоровье вариант Базовый (код продукта – RHEBASEOAS),
        Восстанови здоровье вариант Оптима (код продукта – RHEOPTIMAOAS),
        Восстанови здоровье Лайт (код продукта – RHELIGHTOAS),
        Генетический чек-ап «Мое здоровье» (код продукта – GENCHKHEALTH),
        Генетический чек-ап «Питание и спорт» (код продукта – GENCHKSPORT),
        Генетический чек-ап «Таланты и способности» (код продукта – GENCHKTALENTS),
        ПРО Генетику (код продукта – PROGENTICSBFKO),
        ПРО Здоровье (код продукта – PROHEALTHBFKO),
        ПРО ЗОЖ (код продукта – PROZOZHBFKO)
    */
    const IS_KID_TER_KID_RF = productGroupArray.KID_TER_KID_RF.includes(currentProductCode);
    const KID_TER_KID_RF_START_TEXT = `Страхование действует на территории адресов оказания медицинских и/или иных услуг в Российской Федерации.`;

    if (IS_KID_TER_KID_RF) {
        section = KID_TER_KID_RF_START_TEXT;
    }

    if (IS_ACCIDPC) {
        section = KID_TER_KID_ACCIDPC_START_TEXT;
    }

    const CDHR10800 = checkAvailabilitySome(kidRiskCodes, ['CDHR10800']); // КЗ лечение РФ
    const CDHW10800 = checkAvailabilitySome(kidRiskCodes, ['CDHW10800']); // КЗ лечение весь мир
    const CDH10800 = checkAvailabilitySome(kidRiskCodes, ['CDH10800']); // КЗ лечение
    const CDP36404 = checkAvailabilitySome(kidRiskCodes, ['CDP36404']); // КЗ выплата

    // На всякий случай Ультра
    if (IS_TERMVVTB || IS_ECOFZENIT) {
        if (CDHR10800) {
            section += ` Для рисков ДМС в части организации лечения страхование действует на территории адресов оказания медицинских и/или иных услуг в Российской Федерации в части оказания услуг по трансплантации и по получению второго медицинского мнения страхование действует на территории адресов оказания медицинских и/или иных услуг по всему миру.`;
        }
        if (CDHW10800) {
            section += ` Для рисков ДМС в части организации лечения страхование действует на территории адресов оказания медицинских и/или иных услуг в Российской Федерации, Израиле, Испании, Южной Корее (по медицинским показаниям – по всему миру), в части оказания услуг по трансплантации и по получению второго медицинского мнения страхование действует на территории адресов оказания медицинских и/или иных услуг по всему миру.`;
        }
    }

    // Финансовый резерв
    if (IS_EFRBFKO || IS_ECOFPVTB || IS_ECOFVVTB) {
        if (CDHR10800) {
            section += ` Для рисков ДМС страхование действует на территории адресов оказания медицинских и/или иных услуг в Российской Федерации.`;
        }
        if (CDHW10800) {
            section += ` Для рисков ДМС страхование действует на территории адресов оказания медицинских и/или иных услуг в Российской Федерации, Израиле, Испании, Южной Корее (по медицинским показаниям<span class="kidNoWrap"> – </span>по всему миру).`;
        }
    }

    if (IS_EHVP2) {
        if (CDP36404) {
            section += ` Для рисков ДМС страхование действует на территории адресов оказания медицинских и/или иных услуг в Российской Федерации.`;
        }
        else if (CDH10800) {
            if (riskPremium >= 200000 && riskPremium < 680000) {
                section += ` Для рисков ДМС страхование действует на территории адресов оказания медицинских и/или иных услуг в Российской Федерации.`;
            }
            if (riskPremium >= 680000 && riskPremium < 1600000) {
                section += ` Для рисков ДМС в части организации лечения страхование действует на территории адресов оказания медицинских и/или иных услуг в Российской Федерации, Израиле, Испании, Турции, Южной Корее, в части оказания услуги по трансплантации страхование действует на территории адресов оказания медицинских и/или иных услуг по всему миру, в части организации медицинского обследования<span class="kidNoWrap"> – </span>на территории адресов оказания медицинских и/или иных услуг в Российской Федерации.`;
            }
            if (riskPremium >= 1600000) {
                section += ` Для рисков ДМС в части организации лечения страхование действует на территории адресов оказания медицинских и/или иных услуг в Российской Федерации, Израиле, Южной Корее, Европе (за исключением Швейцарии) (по медицинским показаниям<span class="kidNoWrap"> – </span>по всему миру), в части оказания услуги по трансплантации страхование действует на территории адресов оказания медицинских и/или иных услуг по всему миру, в части организации медицинского обследования<span class="kidNoWrap"> – </span>на территории адресов оказания медицинских и/или иных услуг в Российской Федерации.`;
            }
        }
    }

    return section;
}

module.exports = {
    getKidInsuranceTerritorySection
};
