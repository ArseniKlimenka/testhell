'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

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
    const holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    const insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const basicConditions = input.body.basicConditions;
    const productConf = input.body?.productConfiguration ?? {};
    const isAnnualGuaranteedIncome = productConf.guaranteedIncome.includes(lifeInsuranceConstants.guaranteedIncome.annual.code);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(input.body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    let surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const typeOfPartner = printoutsHelper.getMemoPartner(input.body.mainInsuranceConditions.partner.partnerBusinessCode);
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureSettings = {
        issueDate: basicConditions?.issueDate
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);
    const signatureNone = printoutsHelper.getSignatureNone();
    surrenderValues = printoutsHelper.getSurrenderValuesWithRisk(surrenderValues, input.body.risks, 'DLPT36404');
    const ZENITpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == lifeInsuranceConstants.partnerCode.ZENIT;
    const isAfter20230321 = dateHelper.isAfter(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-03-21'));
    const isBefore20230410 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2023-04-10'));
    const isIDG2ZENIT = [products.IDG2ZENIT].includes(productCode);
    const holder60plus = printoutsHelper.getAge(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate);
    const holder70plus = dateHelper.getYearNumber(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate) >= 71;
    const BFKOpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == lifeInsuranceConstants.partnerCode.BFKO;
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    const isBasisGarant2 = [products.IBG3BFKO2, products.IBG5BFKO2].includes(productCode);
    const isIDG3_5 = [products.IDG3REINVEST, products.IDG5REINVEST, products.IDGV2PPBFKO, products.IDGV3PPBFKO, products.IDGV5PPBFKO].includes(productCode);
    const isPSBDriver5or3 = [products.IDG3, products.IDG5, products.IDG3NT, products.IDG5NT, products.IDG2UBRR, products.IDG3UBRR, products.IDG5UBRR].includes(productCode);
    const isIDGZENIT = lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode);
    const isVTBpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == lifeInsuranceConstants.partnerCode.VTB;
    const isWithoutDot = isIDG2ZENIT || isVTBpartner;
    const isVTBNOTE = false;
    const isIDGtbUltra = lifeInsuranceConstants.productGroupArray.IDG_VTB_ULTRA.includes(productCode);
    const isIDGtbPP = lifeInsuranceConstants.productGroupArray.IDG_VTB_PP.includes(productCode);
    const isIDGPVTB = [products.IDGP4VTB, products.IDGP4PPVTB, products.IDGV3PPSOVKOM, products.IDGV5PPSOVKOM].includes(productCode);
    const isIDGPSB = [products.IDG3, products.IDG5, products.IDGP3, products.IDGP5, products.IDGN3, products.IDGN5, products.IDG3REINVEST, products.IDG5REINVEST, products.IDG3NT, products.IDG5NT, products.IDG2UBRR, products.IDG3UBRR, products.IDG5UBRR].includes(productCode);
    const isShowPaymentOrder = lifeInsuranceConstants.productGroupArray.OAS_IDGV_MEMO.includes(productCode);
    const isBarCodeNeed = [products.IDGP2PB, products.IDGP3PB, products.IDGP5PB].includes(productCode);
    const barCodePolicyNumber = policy?.number ? policy?.number.replace('-', '') : '';
    input.kidIsPolicy = true;
    const isNewTextPSB = printoutsHelper.unpayedPremiumCondition(basicConditions.issueDate, productCode) || lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode);
    const isIDGVPPTextAfterDecember = (dateHelper.isAfter(basicConditions.issueDate, '2024-12-31') && [products.IDGV2PPOAS, products.IDGV3PPOAS, products.IDGV5PPOAS].includes(productCode));
    const isIDGVOAS = [products.IDGV2OAS, products.IDGV3OAS, products.IDGV5OAS, products.IDGV2PPOAS, products.IDGV3PPOAS, products.IDGV5PPOAS].includes(productCode);
    const isBrBeforeFurtherRules = isVTBpartner || isIDGVOAS;
    const reinvestPaymentDate = dateHelper.formatDate(dateHelper.addDays(input.body.basicConditions.issueDate, lifeInsuranceConstants.periodPayment.reinvest), dateHelper.DateFormats.CALENDAR);
    const isReinvestPaper = (dateHelper.isAfter(basicConditions.issueDate, '2024-12-31') && [products.IDG3REINVEST, products.IDG5REINVEST].includes(productCode));
    const conditionForVariant = input?.body?.issueForm?.code?.issueFormCode == lifeInsuranceConstants.issueForm.paper.issueFormCode &&
        DateTimeUtils.isBefore('2024-12-01', basicConditions?.issueDate) &&
        lifeInsuranceConstants.productGroupArray.VARIANT_TO_PAPER.includes(productCode);
    const variantDescription = input?.body?.basicInvestmentParameters?.variant?.variantDescription;
    const variant = variantDescription && conditionForVariant ? ` ${input?.body?.basicInvestmentParameters?.variant?.variantDescription} ` : ' ';
    const isAfter02072025 = dateHelper.isAfterOrEqual(basicConditions?.issueDate, '2025-02-07');
    const isBefore20250401 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2025-04-01'));
    const isVTBBankDocument = isVTBpartner && isBefore20250401;
    const isPremiumSplit = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2025-05-01'));

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
        ZENITpartner,
        isAnnualGuaranteedIncome,
        isAfter20230321,
        isBefore20230410,
        isBasisGarant2,
        holder60plus,
        BFKOpartner,
        isPolicyHolder,
        isIDG3_5,
        isPSBDriver5or3,
        isIDGZENIT,
        isVTBpartner,
        isVTBNOTE,
        isIDGtbUltra,
        isIDGtbPP,
        holder70plus,
        isIDGPVTB,
        isIDG2ZENIT,
        isWithoutDot,
        isIDGPSB,
        isShowPaymentOrder,
        isBarCodeNeed,
        barCodePolicyNumber,
        isNewTextPSB,
        variant,
        isIDGVPPTextAfterDecember,
        isBrBeforeFurtherRules,
        reinvestPaymentDate,
        isReinvestPaper,
        isAfter02072025,
        isVTBBankDocument,
        isPremiumSplit
    };

    // KID printout section
    printoutsHelper.activateKidPrintout(input, output, this);

    return output;
};
