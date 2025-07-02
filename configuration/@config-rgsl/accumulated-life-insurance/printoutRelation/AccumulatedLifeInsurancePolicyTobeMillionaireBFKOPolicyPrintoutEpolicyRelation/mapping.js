'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const {
    product,
    productGroupArray
} = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require("@config-rgsl/infrastructure/lib/DateTimeUtils");

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
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const {
        frequency,
        notLump
    } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const basicConditions = input.body.basicConditions;
    const insuredAge = dateHelper.getYearNumber(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, undefined, notLump, insuredAge);
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const paymentPlan = printoutsHelper.getPaymentPlan(input.body.paymentPlan);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const typeOfPartner = printoutsHelper.getMemoPartner(input.body.mainInsuranceConditions.partner.partnerBusinessCode);
    holder = printoutsHelper.getEpolicyInfo(holder, input.body.issueForm);
    insured = printoutsHelper.getEpolicyInfo(insured, input.body.issueForm);
    const age70minus = insuredAge <= 70;
    const age71plus = insuredAge >= 71 && insuredAge <= 80;

    // const isBasisActive = [product.IBA3REINVEST, product.IBA5REINVEST].includes(productCode);
    const isStrategyOnFive = [product.EBMGREINVEST, product.EBMMGREINVEST, product.EBMGLIFEINVEST, product.EBMGPB, product.EBMGZENIT].includes(productCode);
    const isDocumentActive = this.businessContext.documentState == 'Active';
    const isVTBGarant = [product.EBMGRETVTB, product.EBMMGREINVEST, product.EBMGNRETVTB].includes(productCode);
    const isEBMMGREINVEST = [product.EBMMGREINVEST].includes(productCode);
    const isReinvestBasicVariant = productGroupArray.REINVEST_BASIC_VARIANTS.includes(productCode);
    const variantDescription = input.body?.basicInvestmentParameters?.variant?.variantDescription;
    const reinvestPaymentDate = DateTimeUtils.formatDate(DateTimeUtils.addDays(input.body.basicConditions.issueDate, lifeInsuranceConstants.periodPayment.reinvest), DateTimeUtils.DateFormats.CALENDAR);
    const isTextReinvest = printoutsHelper.unpayedPremiumCondition(input.body.basicConditions.issueDate, productCode);
    const isVTBEPolicy = [product.EBMGRETVTB, product.EBMGNRETVTB, product.EBMGZENIT].includes(productCode);

    const isDNSVV36404 = risk.mandatory.find(r => r.riskCode === 'DNSVV36404');
    if (isEBMMGREINVEST && isDNSVV36404) {
        if (age70minus) {
            isDNSVV36404.sumInsured = isDNSVV36404.sumInsured + `, но не более 2 000 000 рублей`;
        }
        else if (age71plus) {
            isDNSVV36404.sumInsured = isDNSVV36404.sumInsured + `, но не более 1 000 000 рублей`;
        }
    }

    const output = {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        isPolicyHolder,
        holder,
        insured,
        frequency,
        risk,
        insuranceTerms,
        declarationMedical,
        declarationMain,
        otherCondition,
        surrenderValues,
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1,
        paymentPlan,
        QR,
        typeOfPartner,
        isStrategyOnFive,
        isDocumentActive,
        isVTBGarant,
        age70minus,
        age71plus,
        isEBMMGREINVEST,
        isReinvestBasicVariant,
        variantDescription,
        reinvestPaymentDate,
        isTextReinvest,
        isVTBEPolicy
    };

    // KID printout section (EPolicy)
    printoutsHelper.setKidEPrintoutMapping(input, output);

    return output;
};
