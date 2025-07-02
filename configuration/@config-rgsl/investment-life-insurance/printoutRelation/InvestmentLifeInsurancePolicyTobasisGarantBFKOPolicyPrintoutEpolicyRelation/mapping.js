'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

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
    const payDay = printoutsHelper.getDateToStringWithoutYear(input.body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    let surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    surrenderValues = printoutsHelper.getSurrenderValuesWithRisk(surrenderValues, input.body.risks, 'DLPT36404');

    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const typeOfPartner = printoutsHelper.getMemoPartner(input.body.mainInsuranceConditions.partner.partnerBusinessCode);
    const main = printoutsHelper.getMemoryMain(input);
    holder = printoutsHelper.getEpolicyInfo(holder, input.body.issueForm);
    insured = printoutsHelper.getEpolicyInfo(insured, input.body.issueForm);
    const isBasisGorDriverG = [product.IBG5BFKO2, product.IDG3REINVEST, product.IDG5REINVEST, product.IDGP2PB, product.IDGP3PB, product.IDGP5PB].includes(productCode);
    const isDriverGarant = [product.IDG3REINVEST, product.IDG5REINVEST, product.IDG3LIFEINVEST, product.IDG5LIFEINVEST].includes(productCode);
    const isIDGZENIT = productGroupArray.IDG_ZENIT.includes(productCode);
    const isIDGLife = [product.IDG3LIFEINVEST, product.IDG5LIFEINVEST].includes(productCode) || productGroupArray.IDG_ZENIT.includes(productCode);
    const issueDate = input.body.basicConditions?.issueDate;
    const reinvestPaymentDate = dateHelper.formatDate(dateHelper.addDays(issueDate, lifeInsuranceConstants.periodPayment.reinvest), dateHelper.DateFormats.CALENDAR);
    const isIDGRETVTB = lifeInsuranceConstants.productGroupArray.IDG_RET_VTB.includes(productCode);
    const boldTextInsuredRisks = isIDGZENIT || isIDGRETVTB;
    const isIDGNRETVTB = [product.IDGN2RETVTB, product.IDGN3RETVTB, product.IDGN5RETVTB].includes(productCode);
    const isDocumentActive = this.businessContext.documentState == 'Active';
    const isReinvestBasicVariant = productGroupArray.REINVEST_BASIC_VARIANTS.includes(productCode);
    const variantDescription = input.body?.basicInvestmentParameters?.variant?.variantDescription;
    const isTextReinvest = printoutsHelper.unpayedPremiumCondition(issueDate, productCode) || isIDGZENIT || isIDGRETVTB;
    const isPremiumSplit = (isDriverGarant || isIDGRETVTB || isIDGZENIT) && dateHelper.isAfterOrEqual(dateHelper.formatDate(issueDate), dateHelper.formatDate('2025-05-01'));

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
        main,
        typeOfPartner,
        isBasisGorDriverG,
        isDriverGarant,
        isDocumentActive,
        isReinvestBasicVariant,
        variantDescription,
        isIDGLife,
        reinvestPaymentDate,
        isTextReinvest,
        isIDGZENIT,
        isIDGRETVTB,
        boldTextInsuredRisks,
        isPremiumSplit,
        isIDGNRETVTB
    };

    // KID printout section (EPolicy)
    printoutsHelper.setKidEPrintoutMapping(input, output);

    return output;
};
