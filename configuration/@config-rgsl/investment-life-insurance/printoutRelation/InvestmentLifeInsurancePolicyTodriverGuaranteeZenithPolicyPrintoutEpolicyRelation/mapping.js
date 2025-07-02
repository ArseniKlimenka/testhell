const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const products = lifeInsuranceConstants.product;
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
    const startDate = input.body.policyTerms?.startDate;
    const holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    const insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(input.body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = input.body.basicConditions;
    const typeOfPartner = printoutsHelper.getMemoPartner(input.body.mainInsuranceConditions.partner.partnerBusinessCode);
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const issueDate = basicConditions?.issueDate;
    const signatureSettings = {
        issueDate
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);
    const signatureNone = printoutsHelper.getSignatureNone();
    const isAfter20230321 = dateHelper.isAfter(dateHelper.formatDate(issueDate), dateHelper.formatDate('2023-03-21'));
    const isBefore20230410 = dateHelper.isBefore(dateHelper.formatDate(issueDate), dateHelper.formatDate('2023-04-10'));
    const isZenithPartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == lifeInsuranceConstants.partnerCode.ZENIT && productCode != lifeInsuranceConstants.product.IDG1ZENIT;
    const isIDG1 = [products.IDG1REINVEST, products.IDGV1BFKO, products.IDG1LIFEINVEST].includes(productCode);
    const isReinvestBasicVariant = lifeInsuranceConstants.productGroupArray.REINVEST_BASIC_VARIANTS.includes(productCode);
    const variantDescription = input.body?.basicInvestmentParameters?.variant?.variantDescription;
    const isIDG1LIFEINVEST = [products.IDG1LIFEINVEST].includes(productCode);
    const reinvestPaymentDate = dateHelper.formatDate(dateHelper.addDays(issueDate, lifeInsuranceConstants.periodPayment.reinvest), dateHelper.DateFormats.CALENDAR);
    const isTextReinvest = printoutsHelper.unpayedPremiumCondition(issueDate, productCode) || lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode);
    const isAfter02072025 = dateHelper.isAfterOrEqual(basicConditions?.issueDate, '2025-02-07');
    const isIDGZENIT = lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode);
    const isIDG1ZENIT = lifeInsuranceConstants.product.IDG1ZENIT == productCode;
    const isDocumentActive = this.businessContext.documentState == 'Active';
    const isPremiumSplit = dateHelper.isAfterOrEqual(dateHelper.formatDate(issueDate), dateHelper.formatDate('2025-05-01'));

    const output = {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        holder,
        insured,
        risk,
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
        typeOfPartner,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentBoth,
        signatureNone,
        isAfter20230321,
        isBefore20230410,
        isZenithPartner,
        isIDG1,
        startDate,
        variantDescription,
        isReinvestBasicVariant,
        isIDG1LIFEINVEST,
        reinvestPaymentDate,
        isTextReinvest,
        isAfter02072025,
        isIDGZENIT,
        isIDG1ZENIT,
        isDocumentActive,
        isPremiumSplit
    };

    // KID printout section
    printoutsHelper.activateKidPrintout(input, output, this);

    return output;
};
