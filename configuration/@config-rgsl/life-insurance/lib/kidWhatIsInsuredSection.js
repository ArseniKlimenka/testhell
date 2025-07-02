'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { product, productGroupArray, sportProducts } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

// КИД. Раздел I. ЧТО ЗАСТРАХОВАНО?
function getKidWhatIsInsuredSection(body, output, kidIsMulti) {

    const currentProductCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const kidRiskCodes = body.risks ? body.risks.map(item => item.risk.riskCode) : [];

    /* Для продукта Финансовый резерв (код продукта – EFRBFKO) */
    const DAVV36404_OR_DASS36404 = checkAvailabilitySome(kidRiskCodes, [
        'DAVV36404', // ИНС 1,2 ВВ
        'DASS36404' // ИНС 1,2
    ]);
    const DNS36404 = checkAvailabilitySome(kidRiskCodes, ['DNS36404']); // Смерть НС
    const DTP36404 = checkAvailabilitySome(kidRiskCodes, ['DTP36404']); // Смерть ТП
    const CTDA36404 = checkAvailabilitySome(kidRiskCodes, ['CTDA36404']); // ВНТ НС
    const CDVV36404 = checkAvailabilitySome(kidRiskCodes, ['CDVV36404']); // КЗ ОУСВ
    const CDP36404 = checkAvailabilitySome(kidRiskCodes, ['CDP36404']); // КЗ выплата
    const CDHR10800_OR_CDHW10800 = checkAvailabilitySome(kidRiskCodes, [
        'CDHR10800', // КЗ лечение РФ
        'CDHW10800' // КЗ лечение весь мир
    ]);

    /* Для продукта На всякий случай Ультра (код продукта – TERMVVTB) */
    const DLP42204 = checkAvailabilitySome(kidRiskCodes, ['DLP42204']); // Смерть ЛП
    const D42204 = checkAvailabilitySome(kidRiskCodes, ['D42204']); // Инв 1,2
    const DNS42204 = checkAvailabilitySome(kidRiskCodes, ['DNS42204']); // Смерть НС
    const DTP42204 = checkAvailabilitySome(kidRiskCodes, ['DTP42204']); // Смерть ДТП
    const I42204 = checkAvailabilitySome(kidRiskCodes, ['I42204']); // Травма НС

    /* Для продукта Вектор здоровья Премиум 2.0 (код продукта - EHVP2) */
    const DA36404 = checkAvailabilitySome(kidRiskCodes, ['DA36404']); // Инвалидность 1,2 НС ОУСВ
    // КЗ выплата
    const CDH10800 = checkAvailabilitySome(kidRiskCodes, ['CDH10800']); // КЗ лечение

    /* Для продукта Надежный капитал. Классика 2.0 (код продукта - CAPCLRELOAS) */
    const D36404 = checkAvailabilitySome(kidRiskCodes, ['D36404']); // Инвалидность 1,2 ЛП ОУСВ
    // Инвалидность 1,2 НС ОУСВ
    const MJL36404 = checkAvailabilitySome(kidRiskCodes, ['MJL36404']); // Потеря работы ОУСВ (за период)
    // Смерть НС
    const DDTP36404 = checkAvailabilitySome(kidRiskCodes, ['DDTP36404']); // Смерть ДТП
    const DSS36404 = checkAvailabilitySome(kidRiskCodes, ['DSS36404']); // ИЛП 1,2
    const CD636404 = checkAvailabilitySome(kidRiskCodes, ['CD636404']); // Критические заболевания ОУСВ
    const CD36404 = checkAvailabilitySome(kidRiskCodes, ['CD36404']); // Критические заболевания
    const IH36404 = checkAvailabilitySome(kidRiskCodes, ['IH36404']); // Травма НС
    const HI36404 = checkAvailabilitySome(kidRiskCodes, ['HI36404']); // Тяжелая травма

    /* Для продукта Надежный капитал. Классика 2.0 (коробка) (код продукта - CAPCLRELBOXOAS) */
    // D36404 Инвалидность 1,2 ЛП ОУСВ
    // DA36404 Инвалидность 1,2 НС ОУСВ
    // MJL36404 Потеря работы ОУСВ (за период)

    /* Для продукта Детский капитал. Классика 2.0 (коробка) (код продукта – CAPCLCHILDBOXOAS) */
    const CD5C36404 = checkAvailabilitySome(kidRiskCodes, ['CD5C36404']); // Критические заболевания
    const SOA36404 = checkAvailabilitySome(kidRiskCodes, ['SOA36404']); // Хирургическая операция в результате НС
    // D36404 Инвалидность 1,2 ЛП ОУСВ
    // DA36404 Инвалидность 1,2 НС ОУСВ

    /* Для продукта Надежный выбор Премиум 2.0 (код продукта - ERCP2) */
    // D36404 Инвалидность 1,2 ЛП ОУСВ
    const JL36404 = checkAvailabilitySome(kidRiskCodes, ['JL36404']); // Хирургическая операция в результате НС
    // CD36404 Критические заболевания
    // HI36404 Тяжелая травма

    /* Для продукта Надежный выбор 2.0 (код продукта - ERC2) */
    // D36404 Инвалидность 1,2 ЛП ОУСВ

    /* Для продукта Достойный век 2.0 (код продукта – WCENOAS) */
    const I46204 = checkAvailabilitySome(kidRiskCodes, ['I46204']); // Травма

    /* Для продуктов:
        Восстанови здоровье вариант Базовый (код продукта – RHEBASEOAS),
        Восстанови здоровье вариант Оптима (код продукта – RHEOPTIMAOAS)
    */
    const HC20700 = checkAvailabilitySome(kidRiskCodes, ['HC20700']); // Госпитализация в результате COVID-19

    /*
        Для продуктов Драйвер Гарантия Зенит - (коды продуктов - IDG1ZENIT, IDG2ZENIT, IDG3ZENIT, IDG5ZENIT)
    */
    const DLP36404 = checkAvailabilitySome(kidRiskCodes, ['DLP36404']); // Смерть Застрахованного по любой причине

    /* Для продуктов:
        Забота о будущем (код продукта – ECATFPVTB)
        Забота о будущем Ультра (код продукта – ECATFVVTB)
    */
    const E36404 = checkAvailabilitySome(kidRiskCodes, ['E36404']);
    const DLPVV36404 = checkAvailabilitySome(kidRiskCodes, ['DLPVV36404']);
    const DLPDPE36404 = checkAvailabilitySome(kidRiskCodes, ['DLPDPE36404']);
    const DVV36404 = checkAvailabilitySome(kidRiskCodes, ['DVV36404']);

    let section = ``;
    let sectionText = ``;

    /* Для продукта Финансовый резерв (код продукта – EFRBFKO) */
    const EFRBFKO = currentProductCode == product.EFRBFKO;
    const EFRBFKO_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине; 
    Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине`;

    /* Для продукта Забота о семье (код продукта – ECOFPVTB) */
    const ECOFPVTB = currentProductCode == product.ECOFPVTB;
    /* Для продукта Забота о семье Ультра (код продукта – ECOFVVTB) */
    const ECOFVVTB = currentProductCode == product.ECOFVVTB;
    const ECOFVTB_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине`;

    if (EFRBFKO || ECOFPVTB || ECOFVVTB) {

        if (ECOFPVTB || ECOFVVTB) {
            section = ECOFVTB_START_TEXT;
            if (DVV36404) {
                section += getKidRiskName('DVV36404');
            }
        }
        else {
            section = EFRBFKO_START_TEXT;
        }

        if (DAVV36404_OR_DASS36404) { section += getKidRiskName('DAVV36404'); }
        if (DNS36404) { section += getKidRiskName('DNS36404'); }
        if (DTP36404) { section += getKidRiskName('DTP36404'); }
        if (CTDA36404) { section += getKidRiskName('CTDA36404'); }
        if (CDVV36404) { section += getKidRiskName('CDVV36404'); }
        if (CDP36404) { section += getKidRiskName('CDP36404'); }
        section += `.`;

        if (CDHR10800_OR_CDHW10800) {
            sectionText += getKidRiskName('CDHR10800');
            section += getDivSection(sectionText);
        }

    }

    // Забота о будущем (код продукта – ECATFPVTB), Забота о будущем Ультра (код продукта – ECATFVVTB)
    const IS_ECATF = productGroupArray.ECATF.includes(currentProductCode);
    const IS_ECATFZENIT = [product.ECATFZENIT, product.ECATFUBRR].includes(currentProductCode);
    const KID_ECATF_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: Дожитие Застрахованного до окончания срока страхования`;

    if (IS_ECATF) {

        section = KID_ECATF_START_TEXT;

        if (DLPDPE36404) { section += getKidRiskName('DLPDPE36404'); }
        if (DLPVV36404 && !IS_ECATFZENIT) { section += getKidRiskName('DLPVV36404'); }
        if (D36404) { section += getKidRiskName('D36404'); }
        if (DA36404) { section += getKidRiskName('DA36404'); }
        section += `.`;
    }

    /* Для продукта На всякий случай Ультра (код продукта – TERMVVTB) */
    const TERMVVTB = currentProductCode == product.TERMVVTB;
    const TERMVVTB_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: Смерть Застрахованного по любой причине`;

    if (TERMVVTB) {

        section = TERMVVTB_START_TEXT;

        if (DLP42204) { section += getKidRiskName('DLP42204'); }
        if (D42204) { section += getKidRiskName('D42204'); }
        if (DNS42204) { section += getKidRiskName('DNS42204'); }
        if (DTP42204) { section += getKidRiskName('DTP42204'); }
        if (I42204) { section += getKidRiskName('I42204'); }
        section += `.`;

        if (CDHR10800_OR_CDHW10800) {
            sectionText += getKidRiskName('CDHR10800');
            section += getDivSection(sectionText);
        }

    }

    // Для продуктов Драйвер Гарантия Зенит - (коды продуктов - IDG1ZENIT, IDG2ZENIT, IDG3ZENIT, IDG5ZENIT)
    const IS_IDGZENIT = productGroupArray.IDG_ZENIT.includes(currentProductCode);
    const KID_IDGZENIT_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине; 
    Смерть Застрахованного в результате несчастного случая`;
    const ECOFZENIT = currentProductCode == product.ECOF2ZENIT;

    if (IS_IDGZENIT) {
        section = KID_IDGZENIT_START_TEXT;
        if (ECOFZENIT) {
            const KID_IDGZENIT_START_TEXT_ECOF = `Страховые риски, относящиеся к страхованию жизни: 
            Дожитие Застрахованного до окончания срока страхования; 
            Смерть Застрахованного по любой причине`;
            section = KID_IDGZENIT_START_TEXT_ECOF;
            if (DVV36404) {
                section += getKidRiskName('DVV36404');
            }
            if (DAVV36404_OR_DASS36404) { section += getKidRiskName('DAVV36404'); }
            if (DNS36404) { section += getKidRiskName('DNS36404'); }
            if (DTP36404) { section += getKidRiskName('DTP36404'); }
            if (CTDA36404) { section += getKidRiskName('CTDA36404'); }
            if (CDVV36404) { section += getKidRiskName('CDVV36404'); }
            if (CDP36404) { section += getKidRiskName('CDP36404'); }
            section += `.`;

            if (CDHR10800_OR_CDHW10800) {
                sectionText += getKidRiskName('CDHR10800');
                section += getDivSection(sectionText);
            }

        }

    }

    /* Для продукта Вектор здоровья Премиум 2.0 (код продукта - EHVP2) */
    const EHVP2 = currentProductCode == product.EHVP2;
    const EHVP2_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине; 
    Смерть Застрахованного в результате несчастного случая`;

    if (EHVP2) {

        section = EHVP2_START_TEXT;

        if (DA36404) { section += getKidRiskName('DA36404'); }
        if (CDP36404) { section += getKidRiskName('CDP36404'); }
        section += `.`;

        sectionText += `Страховые риски, относящиеся к медицинскому страхованию (далее<span class="kidNoWrap"> – </span>ДМС): 
        Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных 
        Программой ДМС «Медицинские обследования», в связи с необходимостью проведения 
        профилактических мероприятий, снижающих степень опасных для жизни или здоровья 
        Застрахованного угроз и/или устраняющих их`;
        if (CDH10800) { sectionText += getKidRiskName('CDH10800'); }
        sectionText += `.`;
        section += getDivSection(sectionText);

    }

    /* Для продукта Надежный капитал. Классика 2.0 (код продукта - CAPCLRELOAS) */
    const CAPCLRELOAS = currentProductCode == product.CAPCLRELOAS;
    const CAPCLRELOAS_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине`;

    if (CAPCLRELOAS) {

        section = CAPCLRELOAS_START_TEXT;

        if (D36404) { section += getKidRiskName('D36404'); }
        if (DA36404) { section += getKidRiskName('DA36404'); }
        if (MJL36404) { section += getKidRiskName('MJL36404'); }
        if (DNS36404) { section += getKidRiskName('DNS36404'); }
        if (DDTP36404) { section += getKidRiskName('DDTP36404'); }
        if (DSS36404) { section += getKidRiskName('DSS36404'); }
        if (CD636404) { section += getKidRiskName('CD636404'); }
        if (CD36404) { section += getKidRiskName('CD36404'); }
        if (IH36404) { section += getKidRiskName('IH36404'); }
        if (HI36404) { section += getKidRiskName('HI36404'); }
        section += `.`;

    }

    /* Для продукта Надежный капитал. Классика 2.0 (коробка) (код продукта - CAPCLRELBOXOAS) */
    const CAPCLRELBOXOAS = currentProductCode == product.CAPCLRELBOXOAS;
    const CAPCLRELBOXOAS_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине`;

    if (CAPCLRELBOXOAS) {

        section = CAPCLRELBOXOAS_START_TEXT;

        if (D36404) { section += getKidRiskName('D36404'); }
        if (DA36404) { section += getKidRiskName('DA36404'); }
        if (MJL36404) { section += getKidRiskName('MJL36404'); }
        section += `.`;

    }

    /* Для продукта Детский капитал. Классика 2.0 (коробка) (код продукта – CAPCLCHILDBOXOAS) */
    const CAPCLCHILDOAS = currentProductCode == product.CAPCLCHILDOAS;
    const CAPCLCHILDBOXOAS = currentProductCode == product.CAPCLCHILDBOXOAS;
    const CAPCLCHILDBOXOAS_START_TEXT = `Страховые риски, относящиеся к страхованию жизни:`;

    if (CAPCLCHILDOAS || CAPCLCHILDBOXOAS) {

        section = CAPCLCHILDBOXOAS_START_TEXT;

        sectionText = kidIsMulti ? ' ' : 'в отношении Застрахованного 1 – ';
        sectionText += `Дожитие Застрахованного до окончания срока страхования; Смерть Застрахованного по любой причине`;
        if (CD5C36404) { sectionText += getKidRiskName('CD5C36404'); }
        if (SOA36404) { sectionText += getKidRiskName('SOA36404'); }
        if (CAPCLCHILDOAS) { /* Для продукта Детский капитал. Классика 2.0 (код продукта – CAPCLCHILDOAS) */
            if (IH36404) { sectionText += getKidRiskName('IH36404'); }
        }
        sectionText += kidIsMulti ? '.' : ';';
        section += kidIsMulti ? sectionText : getDivSection(sectionText);

        if (kidIsMulti) {
            output.insuredPersonObj.kidWhatIsInsuredSection = section;
            section = CAPCLCHILDBOXOAS_START_TEXT;
        }

        sectionText = kidIsMulti ? ' ' : 'в отношении Застрахованного 2 – ';
        sectionText += `Смерть Застрахованного по любой причине с освобождением от уплаты страховых взносов`;
        if (D36404) { sectionText += getKidRiskName('D36404'); }
        if (DA36404) { sectionText += getKidRiskName('DA36404'); }
        if (CAPCLCHILDOAS) { /* Для продукта Детский капитал. Классика 2.0 (код продукта – CAPCLCHILDOAS) */
            if (CD636404) { sectionText += getKidRiskName('CD636404'); }
        }
        sectionText += `.`;
        section += kidIsMulti ? sectionText : getDivSection(sectionText);

        if (kidIsMulti) {
            output.policyHolderObj.kidWhatIsInsuredSection = section;
        }

    }

    /* Для продукта Надежный выбор Премиум 2.0 (код продукта - ERCP2) */
    const ERCP2 = currentProductCode == product.ERCP2;
    const ERCP2_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине; 
    Смерть Застрахованного в результате несчастного случая`;

    if (ERCP2) {

        section = ERCP2_START_TEXT;
        if (D36404) { section += getKidRiskName('D36404'); }
        if (JL36404) { section += getKidRiskName('JL36404'); }
        if (CD36404) { section += getKidRiskName('CD36404'); }
        if (HI36404) { section += getKidRiskName('HI36404'); }
        section += `.`;

    }

    /* Для продукта Надежный выбор 2.0 / СМП (код продукта - ERC2 / ERC2SMP) */
    const ERC2 = productGroupArray.KID_WII_ERC2.includes(currentProductCode);
    const ERC2_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине; 
    Смерть Застрахованного в результате несчастного случая`;

    if (ERC2) {

        section = ERC2_START_TEXT;
        if (D36404) { section += getKidRiskName('D36404'); }
        section += `.`;

    }

    /* Для продуктов:
        Достойный век 2.0 (код продукта – WCENOAS)
        Достойный век 3.0 (код продукта – WCEN3OAS) */
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(currentProductCode);
    const WCENOAS_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Смерть Застрахованного по любой причине; 
    Смерть Застрахованного в результате дорожно-транспортного происшествия`;

    if (isWCENOAS) {

        section = WCENOAS_START_TEXT;
        if (I46204) { section += getKidRiskName('I46204'); }
        section += `.`;

    }

    /* Для продуктов:
        Восстанови здоровье вариант Базовый (код продукта – RHEBASEOAS),
        Восстанови здоровье вариант Оптима (код продукта – RHEOPTIMAOAS)
    */
    const RHEBASEOAS = currentProductCode == product.RHEBASEOAS;
    const RHEOPTIMAOAS = currentProductCode == product.RHEOPTIMAOAS;
    const RHE_START_TEXT = `Страховые риски, относящиеся к медицинскому страхованию: 
    Обращение Застрахованного за предоставлением медицинских или иных услуг, 
    предусмотренных Программой, вследствие расстройства здоровья 
    или состояния Застрахованного, требующих получения таких услуг.`;

    if (RHEBASEOAS || RHEOPTIMAOAS) {

        section = RHE_START_TEXT;
        if (HC20700) {
            sectionText = getKidRiskName('HC20700');
            section += getDivSection(sectionText);
        }

    }

    /* Для продукта Восстанови здоровье Лайт (код продукта – RHELIGHTOAS) */
    const RHELIGHTOAS = currentProductCode == product.RHELIGHTOAS;
    const RHELIGHTOAS_START_TEXT = `Страховые риски, относящиеся к медицинскому страхованию: 
    Обращение Застрахованного за предоставлением медицинских или иных услуг, 
    предусмотренных Программой, вследствие расстройства здоровья 
    или состояния Застрахованного, требующих получения таких услуг.`;

    if (RHELIGHTOAS) {
        section = RHELIGHTOAS_START_TEXT;
    }

    const ACCIDPC = sportProducts.includes(currentProductCode);
    const selectedTypes = body?.basicConditions?.sportTypes?.selectedTypes ?? [];
    const namesString = selectedTypes.map(type => type?.name?.toLowerCase()).join(', ');
    const ACCIDPC_START_TEXT = `Смерть Застрахованного в результате несчастного случая; Инвалидность Застрахованного с установлением категории «ребенок-инвалид» или I, II, III группы инвалидности в результате несчастного случая; Травма Застрахованного в результате несчастного случая.<br>`;
    const ACCIDPC_SECOND_TEXT = `События по указанным выше рискам признаются страховыми случаями только при условии, что они произошли во время участия Застрахованного в организованных спортивных соревнованиях, тренировках и спортивных сборах по следующим видам спорта: ` + namesString + `, а также при подготовке и обслуживанию спортивной техники и инвентаря по указанным видам спорта.`;

    if (ACCIDPC) {
        section = ACCIDPC_START_TEXT;
        section += getDivSection(ACCIDPC_SECOND_TEXT);
    }

    /* Для продукта Премиум выбор Лайт (код продукта – EPCLZENIT) */
    const EPCLZENIT = currentProductCode == product.EPCLZENIT;
    const EPCLZENIT_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине; 
    Смерть Застрахованного в результате несчастного случая; 
    Смерть Застрахованного в результате дорожно-транспортного происшествия; 
    Инвалидность Застрахованного с установлением I, II группы инвалидности 
    по любой причине с освобождением от уплаты страховых взносов.`;

    if (EPCLZENIT) {
        section = EPCLZENIT_START_TEXT;
    }

    /* Для продуктов:
        Базис Гарант (коды продуктов - IBG10, IBG1AKCEPT, IBG3, IBG3BFKO, IBG3OAS, IBG5, IBG5BFKO, IBG5OAS, IBG7, IBGP10, IBGP3, IBGP5, IBGP7)
    */
    const IS_KID_WII_BASIS_GARANT = productGroupArray.KID_WII_BASIS_GARANT.includes(currentProductCode);
    const KID_WII_BASIS_GARANT_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине.`;

    if (IS_KID_WII_BASIS_GARANT) {
        section = KID_WII_BASIS_GARANT_START_TEXT;
        if (DNS36404) { section += getKidRiskName('DNS36404'); }
        section += `.`;
    }

    /* Для продуктов:
        Стань миллионером (коды продуктов - EBMAKCEPT , EBMOAS, EBMZENIT),
        Стань миллионером 2.0 (код продукта - EBMOAS2),
        Стратегия на пять. Гарант (коды продуктов – EBMG, EBMGBFKO, EBMGMINBANK, EBMGP, EBMGZENIT)
    */
    const IS_KID_WII_EBM = productGroupArray.KID_WII_EBM.includes(currentProductCode);
    const KID_WII_EBM_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине; 
    Смерть Застрахованного в результате несчастного случая.`;

    if (IS_KID_WII_EBM) {
        section = KID_WII_EBM_START_TEXT;
    }

    /* Для продуктов:
        Генетический чек-ап «Мое здоровье» (код продукта – GENCHKHEALTH),
        Генетический чек-ап «Питание и спорт» (код продукта – GENCHKSPORT),
        Генетический чек-ап «Таланты и способности» (код продукта – GENCHKTALENTS),
        ПРО Генетику (код продукта – PROGENTICSBFKO),
        ПРО Здоровье (код продукта – PROHEALTHBFKO),
        ПРО ЗОЖ (код продукта – PROZOZHBFKO)
    */
    const IS_KID_WII_GENCHK_PRO = productGroupArray.KID_WII_GENCHK_PRO.includes(currentProductCode);
    const KID_WII_GENCHK_PRO_START_TEXT = `Страховые риски, относящиеся к медицинскому страхованию: 
    Обращение Застрахованного за предоставлением медицинских или иных услуг, 
    предусмотренных Программой, в связи с необходимостью проведения профилактических мероприятий, 
    снижающих степень опасных для жизни или здоровья Застрахованного угроз и/или устраняющих их.`;

    if (IS_KID_WII_GENCHK_PRO) {
        section = KID_WII_GENCHK_PRO_START_TEXT;
    }

    /* Для продуктов Драйвер Гарантия
        (коды продуктов - IDG10, IDG3, IDG5, IDG7, IDGP10, IDGP3, IDGP5, IDGP7, IDGV1BFKO, IDGV2, IDGV2BFKO, IDGV3, IDGV3BFKO, IDGV5BFKO, IDG5ZENIT)
    */
    const IS_KID_WII_DRIVER = productGroupArray.KID_WII_DRIVER.includes(currentProductCode);
    const KID_WII_DRIVER_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине; 
    Смерть Застрахованного в результате несчастного случая.`;

    if (IS_KID_WII_DRIVER) {
        section = KID_WII_DRIVER_START_TEXT;
    }

    /* Для продуктов:
        Драйвер Гарантия с периодической выплатой дохода (коды продуктов - IDGV2PP, IDGV3PP, IDGV3PPBFKO, IDGV5PPBFKO),
        3 года Стратегия на пять. Гарант (код продукта - EBM3GUBRR)
    */
    const IS_KID_WII_DRIVER_PERIODIC_PAYMENT = productGroupArray.KID_WII_DRIVER_PERIODIC_PAYMENT.includes(currentProductCode);
    const KID_WII_DRIVER_PERIODIC_PAYMENT_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Дожитие Застрахованного до дат, установленных в Договоре страхования; 
    Смерть Застрахованного по любой причине; 
    Смерть Застрахованного в результате несчастного случая.`;

    if (IS_KID_WII_DRIVER_PERIODIC_PAYMENT) {
        section = KID_WII_DRIVER_PERIODIC_PAYMENT_START_TEXT;
    }

    /* Для продуктов:
        Драйвер Гарантия (коды продуктов - IDG3RETVTB, IDG5RETVTB, IDG2RETVTB, IDGN3RETVTB, IDGN5RETVTB, IDGN2RETVTB)
    */
    const IS_KID_IDG_RET_VTB = productGroupArray.IDG_RET_VTB.includes(currentProductCode);
    const KID_WII_IDG_RET_VTB_START_TEXT = `Страховые риски, относящиеся к страхованию жизни: 
    Дожитие Застрахованного до окончания срока страхования; 
    Смерть Застрахованного по любой причине`;

    if (IS_KID_IDG_RET_VTB) {
        section = KID_WII_IDG_RET_VTB_START_TEXT;
        if (DNS36404) { section += getKidRiskName('DNS36404'); }
        section += `.`;
    }

    return section;

}

function getKidRiskName(riskCode) {
    switch (riskCode) {
        case 'CDHR10800':
            return 'Страховые риски, относящиеся к медицинскому страхованию (далее<span class="kidNoWrap"> – </span>ДМС): Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС «Диагностирование и лечение критического заболевания», вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг.';
        case 'CDH10800':
            return '; Обращение Застрахованного за предоставлением медицинских или иных услуг, предусмотренных Программой ДМС «Диагностирование и лечение критического заболевания», вследствие расстройства здоровья или состояния Застрахованного, требующих получения таких услуг';
        case 'DAVV36404':
            return '; Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая';
        case 'DNS36404':
            return '; Смерть Застрахованного в результате несчастного случая';
        case 'DTP36404':
            return '; Смерть Застрахованного в результате транспортного происшествия';
        case 'CTDA36404':
            return '; Непрерывная временная утрата трудоспособности Застрахованным в результате несчастного случая';
        case 'CDVV36404':
            return '; Первичное диагностирование Застрахованному критического заболевания с освобождением от уплаты страховых взносов';
        case 'CDP36404':
            return '; Первичное диагностирование Застрахованному критического заболевания';
        case 'D36404':
            return '; Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине с освобождением от уплаты страховых взносов';
        case 'DA36404':
            return '; Инвалидность Застрахованного с установлением I, II группы инвалидности в результате несчастного случая с освобождением от уплаты страховых взносов';
        case 'MJL36404':
            return '; Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты страховых взносов на определенный период';
        case 'DDTP36404':
            return '; Смерть Застрахованного в результате дорожно-транспортного происшествия';
        case 'DSS36404':
            return '; Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине';
        case 'CD636404':
            return '; Первичное диагностирование Застрахованному критического заболевания с освобождением от уплаты страховых взносов';
        case 'CD36404':
            return '; Первичное диагностирование Застрахованному критического заболевания';
        case 'IH36404':
            return '; Травма Застрахованного в результате несчастного случая';
        case 'HI36404':
            return '; Тяжкие телесные повреждения Застрахованного в результате несчастного случая';
        case 'CD5C36404':
            return '; Первичное диагностирование Застрахованному критического заболевания';
        case 'SOA36404':
            return '; Хирургические вмешательства в организм Застрахованного в результате несчастного случая';
        case 'JL36404':
            return '; Дожитие Застрахованного до недобровольной потери работы с освобождением от уплаты одного страхового взноса';
        case 'I46204':
            return '; Травма Застрахованного в результате несчастного случая';
        case 'HC20700':
            return 'Страховые риски, относящиеся к страхованию от несчастных случаев и болезней: Госпитализация Застрахованного в результате заболевания Коронавирусной инфекцией Covid-19.';
        case 'DTP42204':
            return '; Смерть Застрахованного в результате транспортного происшествия';
        case 'D42204':
            return '; Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине';
        case 'DLPVV36404':
            return '; Смерть Застрахованного по любой причине';
        case 'DLPDPE36404':
            return '; Смерть Застрахованного по любой причине с отложенной страховой выплатой';
        case 'E36404':
            return '; Дожитие Застрахованного до окончания срока страхования';
        case 'DLPDP36404':
            return '; Смерть Застрахованного по любой причине с отложенной страховой выплатой';
        case 'DLP36404':
            return '; Смерть Застрахованного по любой причине';
        case 'DVV36404':
            return '; Инвалидность Застрахованного с установлением I, II группы инвалидности по любой причине';


        default:
            return '';
    }
}

function getDivSection(sectionText) {
    return `<div class="kidIndent">${sectionText}</div>`;
}

module.exports = {
    getKidWhatIsInsuredSection,
    getDivSection
};
