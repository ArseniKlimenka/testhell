'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const {
    product,
    issueForm
} = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const body = input.body;

    const {
        personalAcc,
        bankName,
        city,
        correspAcc,
        bic
    } = printoutsHelper.getBankInfoByBody(body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    let holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(body.insuredPerson.partyData);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(body.surrenderValues, 31);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = body.basicConditions;
    const issueDate = getValue(input, 'body.basicConditions.issueDate');
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(body.mainInsuranceConditions.partner.partnerBusinessCode);
    const isPolicyHolder = body.insuredPerson.isPolicyHolder;

    const newProduct = false;
    const difference = printoutsHelper.getDifference2(body.risks, 'E36904', 'DLP36904');
    const dataBasicInvestment = {
        baseActiveDescription: getValue(body, 'basicInvestmentParameters.baseActiveDescription'),
        investmentStrategyDescriptionFull: getValue(body, 'basicInvestmentParameters.investmentStrategyDescriptionFull'),
        emitent: getValue(body, 'basicInvestmentParameters.emitent'),
        participationCoeff: round(getValue(body, 'basicInvestmentParameters.participationCoeff', 1) * 100, 2) + '%'
    };
    const holderGenderMale = body.policyHolder.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const holder60plus = printoutsHelper.getAge(body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, body.basicConditions.issueDate);
    holder = printoutsHelper.getPersonData(holder, body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, body.insuredPerson.partyData);
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, body.basicConditions.issueDate);
    const BFKOpartner = body.mainInsuranceConditions.partner.partnerBusinessCode == '249411';
    const historyIncome = body.basicConditions.insuranceTerms == 5 ? '9.39' : '4.65';
    const optionPrice = round(getValue(body, 'basicInvestmentParameters.optionPrice', 1) * 100, 2);
    const is36 = optionPrice == '36';
    const is26_5 = optionPrice == '26.5';
    const is28 = optionPrice == '28';
    const is39 = optionPrice == '39';
    const isAfter20221101 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2022-11-01'));
    const riskInsuredSum = printoutsHelper.formatMoneyPrint(basicConditions?.riskInsuredSum);

    const isRHELIGHTOAS = productCode == product.RHELIGHTOAS;
    const isRHEBASEOAS = productCode == product.RHEBASEOAS;
    const isRHEOPTIMAOAS = productCode == product.RHEOPTIMAOAS;
    const isRheBaseOrOptima = isRHEBASEOAS || isRHEOPTIMAOAS;

    const isIssueDateLessThan20220131 = issueDate <= dateTimeUtils.formatDate('2022-01-31');
    const isOffer = body?.issueForm?.code?.issueFormCode == issueForm.offer.issueFormCode;
    const signatureNameSettings = {
        issueDate: issueDate,
        isPolicyHolder: isPolicyHolder,
        isOffer: isOffer,
        signatureOnlyForHolder: false
    };
    const signatureName = printoutsHelper.getSignatureName(signatureNameSettings);
    const signatureImg = printoutsHelper.getSignatureLink(signatureName);

    let runningTitleForDMSprogramFirstPage;
    const marginForRunningTitle = '10mm 10mm 25mm 10mm';
    const paddingForRunningTitle = '0';
    const pageClass = 'programGroup';
    const titleLocation = 'bottom-left';
    let productName = '';
    if (isRHELIGHTOAS) {
        const contentFirstPage = `'________________________________ \\A \\00B9 \\0020 Экспертное заключение готовится на основании выписных документов и иной медицинской документации Застрахованного без очного освидетельствования. На основании экспертного заключения осуществляется подбор специалиста.'`;
        const runningTitleStylesFirstPage = printoutsHelper.setRunningTitleStyle(contentFirstPage);
        runningTitleForDMSprogramFirstPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 1, pageClass, titleLocation, runningTitleStylesFirstPage);
        productName = '«Восстанови здоровье Лайт»';
    }

    let runningTitleForDMSprogramSecondPage;
    if (isRHEBASEOAS) {
        const contentFirstPage = `'________________________________ \\A \\00B9 \\0020 Оплата проживания за пределами медицинского учреждения во время курса реабилитации оплачивается Застрахованным (законным представителем Застрахованного) самостоятельно.'`;
        const runningTitleStylesFirstPage = printoutsHelper.setRunningTitleStyle(contentFirstPage);
        runningTitleForDMSprogramFirstPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 1, pageClass, titleLocation, runningTitleStylesFirstPage);

        const contentSecondPage = `'________________________________ \\A \\00B2 \\0020 Способность к самостоятельному передвижению − способность самостоятельно перемещаться в пространстве, сохранять равновесие тела при передвижении, в покое и перемене положения тела, пользоваться общественным транспортом.'`;
        const runningTitleStylesSecondPage = printoutsHelper.setRunningTitleStyle(contentSecondPage);
        runningTitleForDMSprogramSecondPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 2, pageClass, titleLocation, runningTitleStylesSecondPage);
        productName = '«Восстанови здоровье» вариант «Базовый»';
    }

    if (isRHEOPTIMAOAS) {
        const contentFirstPage = `'________________________________ \\A \\00B9 \\0020 Оплата проживания за пределами медицинского учреждения во время курса реабилитации оплачивается Застрахованным (законным представителем Застрахованного) самостоятельно. \\A \\00B2 \\0020 Страховщик имеет право по своему усмотрению увеличивать данный период.'`;
        const runningTitleStylesFirstPage = printoutsHelper.setRunningTitleStyle(contentFirstPage);
        runningTitleForDMSprogramFirstPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 2, pageClass, titleLocation, runningTitleStylesFirstPage);

        const contentSecondPage = `'________________________________ \\A \\00B3 \\0020 Способность к самостоятельному передвижению − способность самостоятельно перемещаться в пространстве, сохранять равновесие тела при передвижении, в покое и перемене положения тела, пользоваться общественным транспортом.'`;
        const runningTitleStylesSecondPage = printoutsHelper.setRunningTitleStyle(contentSecondPage);
        runningTitleForDMSprogramSecondPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 3, pageClass, titleLocation, runningTitleStylesSecondPage);
        productName = '«Восстанови здоровье» вариант «Оптима»';
    }


    const output = {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        holder,
        insured,
        risk,
        riskInsuredSum,
        insuranceTerms,
        payDay,
        declarationMedical,
        declarationMain,
        otherCondition,
        surrenderValues,
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1,
        QR,
        numberOfrisk,
        exampleLabel,
        main,
        commission,
        typeOfPartner,
        newProduct,
        difference,
        dataBasicInvestment,
        holderGenderMale,
        holder60plus,
        isPolicyHolder,
        holderInfo,
        BFKOpartner,
        is36,
        is26_5,
        is28,
        is39,
        historyIncome,
        isAfter20221101,
        signatureImg,
        isRHELIGHTOAS,
        isRHEBASEOAS,
        isRHEOPTIMAOAS,
        isRheBaseOrOptima,
        isIssueDateLessThan20220131,
        runningTitleForDMSprogramFirstPage,
        runningTitleForDMSprogramSecondPage,
        productName
    };

    // Signature policy section
    printoutsHelper.getPolicySignatureByIssueType(input, output);

    // KID printout section
    printoutsHelper.activateKidPrintout(input, output, this);

    return output;
};
