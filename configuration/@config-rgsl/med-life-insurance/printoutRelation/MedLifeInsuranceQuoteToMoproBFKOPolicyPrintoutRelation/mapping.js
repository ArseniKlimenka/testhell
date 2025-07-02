'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const {
    product,
    issueForm
} = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const {
        personalAcc,
        bankName,
        city,
        correspAcc,
        bic
    } = printoutsHelper.getBankInfoByBody(input.body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    const holder = printoutsHelper.getLegalEntity(input.body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const payDay = dateTimeUtils.formatDate(input.body.policyTerms.startDate, dateTimeUtils.DateFormats.CALENDAR);
    const issueDate = dateTimeUtils.formatDate(input.body.basicConditions.issueDate, dateTimeUtils.DateFormats.CALENDAR);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);

    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    // const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = input.body.basicConditions;

    const signatureSettingsForNobody = {
        issueDate: basicConditions?.issueDate,
        isNobody: true,
    };

    const signatureName = printoutsHelper.getSignatureName(signatureSettingsForNobody);
    const singnatureForProgramm = printoutsHelper.getSignatureLink(signatureName);

    signatureSettingsForNobody.cssPageName = ':-ro-nth(n of policyGroup)';
    const bottomLeftContentNobody = printoutsHelper.getBottomLeftContentNobody(signatureSettingsForNobody);
    /*
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    holder = printoutsHelper.getLegalEntity(holder, input.body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, input.body.insuredPerson.partyData);
    */
    insured = printoutsHelper.getPersonData(insured, input.body.insuredPerson.partyData);
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, input.body.basicConditions.issueDate);
    const riskInsuredSum = printoutsHelper.formatMoneyPrint(basicConditions?.riskInsuredSum);

    const isMOPROZVBFKO = productCode == product.MOPROZVBFKO;
    const isMOPROCHEKVBFKO = productCode == product.MOPROCHEKVBFKO;

    const ruleDescription = getValue(input.body, 'insuranceRules.ruleDescription');

    let runningTitleForDMSprogramFirstPage;
    const marginForRunningTitle = '10mm 10mm 25mm 10mm';
    const paddingForRunningTitle = '0';
    const pageClass = 'programGroup';
    const titleLocation = 'bottom-left';
    const productName = '';
    let programName = '';

    let runningTitleForDMSprogramSecondPage;

    if (isMOPROZVBFKO) {
        const contentFirstPage = `'________________________________ \\A \\00B9 \\0020 Перечень и объем медицинских услуг может быть скорректирован в одностороннем порядке Страховщиком, а также может зависеть от возможностей лаборатории / медицинской организации, находящейся в территориальной доступности для Застрахованного. Медицинские услуги предоставляются Застрахованному по предварительной записи, Застрахованный имеет право отказаться от назначенного времени оказания услуги не позднее чем за 24 часа до назначенного времени. В случае если до назначенного времени оказания услуги осталось менее 24 часов, то Застрахованный имеет право отказаться от назначенного времени не более 1 раза, при повторном отказе в срок менее чем за 24 часа до назначенного времени услуга будет считаться оказанной в полном объеме. Также услуга будет считаться оказанной в полном объеме, если Застрахованный не явился в назначенное время по адресу, определенному в качестве места оказания услуги, для получения медицинской услуги. \\A \\00B2 \\0020 Дополнительные обследования/консультации и/или иные медицинские услуги, не входящие в Программу (в. т. ч. в перечень дополнительных обследований/консультаций, предусмотренных в п.п. 2.3 и 2.4 Программы) оплачиваются Застрахованным за свой счет. \\A \\00B3 \\0020 В случае если по итогам генетического исследования «Риски заболеваний» у Застрахованного выявлены высокие риски заболеваний и в группе злокачественных новообразований, и в группе болезней сердечно-сосудистой системы, Застрахованный выбирает одну группу, по которой будет проходить дополнительное медицинское обследование. \\A \\2074 \\0020 Заключение должно быть выдано не ранее чем за 14 (четырнадцать) календарных дней до момента обращения Застрахованного за организацией медицинского обследования. \\A \\2075 \\0020 Предоставление Застрахованным назначения врача-специалиста обязательно. Заключение должно быть выдано не ранее чем за 14 (четырнадцать) календарных дней до момента обращения Застрахованного за организацией медицинского обследования.'`;
        const runningTitleStylesFirstPage = printoutsHelper.setRunningTitleStyle(contentFirstPage);
        runningTitleForDMSprogramFirstPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 1, pageClass, titleLocation, runningTitleStylesFirstPage);

        programName = 'Генетическое тестирование';
    }

    if (isMOPROCHEKVBFKO) {
        const contentFirstPage = `'________________________________ \\A \\00B9 \\0020 Перечень и объем медицинских услуг может быть скорректирован в одностороннем порядке Страховщиком, а также может зависеть от возможностей лаборатории / медицинской организации, находящейся в территориальной доступности для Застрахованного. Медицинские услуги предоставляются Застрахованному по предварительной записи, Застрахованный имеет право отказаться от назначенного времени оказания услуги не позднее чем за 24 часа до назначенного времени. В случае если до назначенного времени оказания услуги осталось менее 24 часов, то Застрахованный имеет право отказаться от назначенного времени не более 1 раза, при повторном отказе в срок менее чем за 24 часа до назначенного времени услуга будет считаться оказанной в полном объеме. Также услуга будет считаться оказанной в полном объеме, если Застрахованный не явился в назначенное время по адресу, определенному в качестве места оказания услуги, для получения медицинской услуги.'`;
        const runningTitleStylesFirstPage = printoutsHelper.setRunningTitleStyle(contentFirstPage);
        runningTitleForDMSprogramFirstPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 1, pageClass, titleLocation, runningTitleStylesFirstPage);

        const contentSecondPage = `'________________________________ \\A \\00B2 \\0020 В случае невозможности оказания консультации врача-специалиста в очной форме, консультация предоставляется в дистанционно (онлайн-консультация). \\A \\00B3 \\0020 Дополнительные назначения и/или иные медицинские услуги, не входящие в Программу, оплачиваются Застрахованным за свой счет.'`;
        const runningTitleStylesSecondPage = printoutsHelper.setRunningTitleStyle(contentSecondPage);
        runningTitleForDMSprogramSecondPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 2, pageClass, titleLocation, runningTitleStylesSecondPage);

        programName = 'Комплексное медицинское исследование';
    }

    return {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        holder,
        issueDate,
        insured,
        risk,
        riskInsuredSum,
        insuranceTerms,
        payDay,
        declarationMain,
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1,
        // QR,
        numberOfrisk,
        exampleLabel,
        main,
        bottomLeftContentNobody,
        // isPolicyHolder,
        holderInfo,
        singnatureForProgramm,
        ruleDescription,
        runningTitleForDMSprogramFirstPage,
        runningTitleForDMSprogramSecondPage,
        productName,
        isMOPROZVBFKO,
        isMOPROCHEKVBFKO,
        programName,
    };
};
