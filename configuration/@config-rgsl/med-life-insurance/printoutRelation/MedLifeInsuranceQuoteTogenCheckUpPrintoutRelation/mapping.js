'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
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
    const isPaper = input.body.issueForm?.code?.issueFormCode == issueForm.paper.issueFormCode;
    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const isGenChkHealth = productCode == product.GENCHKHEALTH;
    const isGenChkSport = productCode == product.GENCHKSPORT;
    const isGenChkTalents = productCode == product.GENCHKTALENTS;
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(input.body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues, 31);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = input.body.basicConditions;
    const issueDate = getValue(input, 'body.basicConditions.issueDate');
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, input.body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(input.body.mainInsuranceConditions.partner.partnerBusinessCode);
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    const runningTitleValueSettings = {
        holder: holder,
        insured: insured,
        isPolicyHolder: isPolicyHolder,
        isChild: true,
        isGenChkHealth: isGenChkHealth
    };
    const bottomRightContentHolderOrBoth = printoutsHelper.getBottomRightContentHolderOrBoth(runningTitleValueSettings);
    const runningTitleImgSettings = {
        issueDate: issueDate,
        isPolicyHolder: isPolicyHolder,
        isChild: true,
        isGenChkHealth: isGenChkHealth
    };
    const bottomLeftContentHolderOrBoth = printoutsHelper.getBottomLeftContentHolderOrBoth(runningTitleImgSettings);

    const newProduct = false;
    const difference = printoutsHelper.getDifference2(input.body.risks, 'E36904', 'DLP36904');
    const dataBasicInvestment = {
        baseActiveDescription: getValue(input.body, 'basicInvestmentParameters.baseActiveDescription'),
        investmentStrategyDescriptionFull: getValue(input.body, 'basicInvestmentParameters.investmentStrategyDescriptionFull'),
        emitent: getValue(input.body, 'basicInvestmentParameters.emitent'),
        participationCoeff: round(getValue(input.body, 'basicInvestmentParameters.participationCoeff', 1) * 100, 2) + '%'
    };
    const holderGenderMale = input.body.policyHolder.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const holder60plus = printoutsHelper.getAge(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate);
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, input.body.insuredPerson.partyData);
    let signatureOnlyForHolder = false;
    if ((runningTitleImgSettings.isChild && !isGenChkHealth) || isPolicyHolder || isGenChkHealth) {
        signatureOnlyForHolder = true;
    }
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, input.body.basicConditions.issueDate);
    const BFKOpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == '249411';
    const historyIncome = input.body.basicConditions.insuranceTerms == 5 ? '9.39' : '4.65';
    const optionPrice = round(getValue(input.body, 'basicInvestmentParameters.optionPrice', 1) * 100, 2);
    const is36 = optionPrice == '36';
    const is26_5 = optionPrice == '26.5';
    const is28 = optionPrice == '28';
    const is39 = optionPrice == '39';
    const isAfter20221101 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-11-01'));
    const riskInsuredSum = printoutsHelper.formatMoneyPrint(basicConditions?.riskInsuredSum);

    const productCaps = policy?.product?.toUpperCase();

    const marginForRunningTitle = '10mm 10mm 25mm 10mm';
    const paddingForRunningTitle = '0';
    const pageClass = 'programGroup';
    const titleLocation = 'bottom-left';
    const contentFirstPage = `'________________________________ \\A \\00B9 \\0020 Перечень и объем медицинских услуг может быть скорректирован в одностороннем порядке Страховщиком, а также может зависеть от возможностей лаборатории / медицинской организации, находящейся в территориальной доступности для Застрахованного. Медицинские услуги предоставляются Застрахованному по предварительной записи, Застрахованный имеет право отказаться от назначенного времени оказания услуги не позднее чем за 24 часа до назначенного времени. В случае если до назначенного времени оказания услуги осталось менее 24 часов, то Застрахованный имеет право отказаться от назначенного времени не более 1 раза, при повторном отказе в срок менее чем за 24 часа до назначенного времени услуга будет считаться оказанной в полном объеме. Также услуга будет считаться оказанной в полном объеме, если Застрахованный не явился в назначенное время по адресу, определенному в качестве места оказания услуги, для получения медицинской услуги. \\A \\00B2 \\0020 Срок подготовки заключения – до 92 (девяноста двух) календарных дней.  \\A \\00B3 \\0020 Дополнительные обследования/консультации и/или иные медицинские услуги, не входящие в Программу, оплачиваются Застрахованным за свой счет.'`;
    const runningTitleStylesFirstPage = printoutsHelper.setRunningTitleStyle(contentFirstPage);
    const runningTitleForDMSprogramFirstPage = printoutsHelper.setRunningTitleForPage(marginForRunningTitle, paddingForRunningTitle, 1, pageClass, titleLocation, runningTitleStylesFirstPage);

    let name211 = '';
    let age = '0 до 18';
    if (isGenChkHealth) {
        age = '18 до 65';
        name211 = 'оценки генетических особенностей, связанных с состоянием иммунитета';
    }
    if (isGenChkSport) {
        name211 = 'оценки генетических особенностей, связанных с питанием и физической активностью';
    }
    if (isGenChkTalents) {
        name211 = 'составления определения генетических особенностей, связанных с эмоциями, поведением и эффективностью работы мозга';
    }
    const paragraph211 = `Проведение генетического тестирования для ${name211} Застрахованного, включая:`;

    const isIssueDateLessThan20220131 = issueDate <= DateTimeUtils.formatDate('2022-01-31');
    const signatureSettings = {
        issueDate: issueDate,
        isPolicyHolder: isPolicyHolder,
        isOffer: undefined,
        signatureOnlyForHolder: signatureOnlyForHolder
    };
    const signatureName = printoutsHelper.getSignatureName(signatureSettings);
    const signatureImg = printoutsHelper.getSignatureLink(signatureName);
    const isOASTextAfterDecember = printoutsHelper.unpayedPremiumCondition(basicConditions.issueDate, productCode);
    const OASdatePaymentPeriod = DateTimeUtils.formatDate(DateTimeUtils.addDays(basicConditions.issueDate, 3), DateTimeUtils.DateFormats.CALENDAR);

    const output = {
        insurer,
        isPaper,
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
        bottomRightContentHolderOrBoth,
        bottomLeftContentHolderOrBoth,
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
        age,
        signatureImg,
        productCaps,
        isGenChkHealth,
        paragraph211,
        isIssueDateLessThan20220131,
        signatureOnlyForHolder,
        runningTitleForDMSprogramFirstPage,
        isOASTextAfterDecember,
        OASdatePaymentPeriod
    };

    // KID printout section
    printoutsHelper.activateKidPrintout(input, output, this);

    return output;
};
