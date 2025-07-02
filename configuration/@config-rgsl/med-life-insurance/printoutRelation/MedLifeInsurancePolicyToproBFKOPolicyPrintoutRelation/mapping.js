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
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
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
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries, productCode);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
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

    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, input.body.insuredPerson.partyData);
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, input.body.basicConditions.issueDate);
    const riskInsuredSum = printoutsHelper.formatMoneyPrint(basicConditions?.riskInsuredSum);

    const isPROGENTICSBFKO = productCode == product.PROGENTICSBFKO;
    const isPROHEALTHBFKO = productCode == product.PROHEALTHBFKO;
    const isPROZOZHBFKO = productCode == product.PROZOZHBFKO;
    const isGenOrZozh = isPROGENTICSBFKO || isPROZOZHBFKO;
    const ruleDescription = getValue(input.body, 'insuranceRules.ruleDescription');

    let runningTitleForDMSprogramFirstPage;
    const marginForRunningTitle = '10mm 10mm 25mm 10mm';
    const paddingForRunningTitle = '0';
    const pageClass = 'programGroup';
    const titleLocation = 'bottom-left';
    let productName = '';

    if (isPROGENTICSBFKO) {
        const contentFirstPage = `'________________________________ \\A \\00B9 \\0020 Перечень и объем Услуг может быть скорректирован в одностороннем порядке Страховщиком, а также может зависеть от возможностей лаборатории/медицинской организации, находящейся в территориальной доступности для Застрахованного, назначенное время по адресу, определенному в качестве места оказания услуги, для получения медицинской услуги.'`;
        const runningTitleStylesFirstPage = printoutsHelper.setRunningTitleStyle(contentFirstPage);
        runningTitleForDMSprogramFirstPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 1, pageClass, titleLocation, runningTitleStylesFirstPage);
        productName = '«ПРО Генетику»';
    }

    let runningTitleForDMSprogramSecondPage;
    if (isPROHEALTHBFKO) {
        const contentFirstPage = `'________________________________ \\A \\00B9 \\0020 Перечень и объем Услуг может быть скорректирован в одностороннем порядке Страховщиком, а также может зависеть от возможностей лаборатории/медицинской организации, находящейся в территориальной доступности для Застрахованного.'`;
        const runningTitleStylesFirstPage = printoutsHelper.setRunningTitleStyle(contentFirstPage);
        runningTitleForDMSprogramFirstPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 1, pageClass, titleLocation, runningTitleStylesFirstPage);

        const contentSecondPage = `'________________________________ \\A \\00B2 \\0020 Дистанционная консультация врача-генетика проводится по желанию Застрахованного и не является обязательным условием для дальнейшего прохождения медицинских обследований, предусмотренных настоящей Программой.'`;
        const runningTitleStylesSecondPage = printoutsHelper.setRunningTitleStyle(contentSecondPage);
        runningTitleForDMSprogramSecondPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 2, pageClass, titleLocation, runningTitleStylesSecondPage);
        productName = '«ПРО Здоровье»';
    }

    if (isPROZOZHBFKO) {
        const contentFirstPage = `'________________________________ \\A \\00B9 \\0020 Перечень и объем Услуг может быть скорректирован в одностороннем порядке Страховщиком, а также может зависеть от возможностей лаборатории/медицинской организации, находящейся в территориальной доступности для Застрахованного.'`;
        const runningTitleStylesFirstPage = printoutsHelper.setRunningTitleStyle(contentFirstPage);
        runningTitleForDMSprogramFirstPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 1, pageClass, titleLocation, runningTitleStylesFirstPage);
        productName = '«ПРО ЗОЖ»';
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
        QR,
        numberOfrisk,
        exampleLabel,
        main,
        bottomLeftContentNobody,
        isPolicyHolder,
        holderInfo,
        singnatureForProgramm,
        isPROGENTICSBFKO,
        isPROHEALTHBFKO,
        isPROZOZHBFKO,
        isGenOrZozh,
        ruleDescription,
        runningTitleForDMSprogramFirstPage,
        runningTitleForDMSprogramSecondPage,
        productName,
    };
};
