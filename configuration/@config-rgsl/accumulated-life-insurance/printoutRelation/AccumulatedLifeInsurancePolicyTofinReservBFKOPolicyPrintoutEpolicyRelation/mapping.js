'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

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
        isPremial,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const {
        frequency,
        notLump
    } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const basicConditions = input.body.basicConditions;
    const { numberOfProgramm, isFullInfo } = printoutsHelper.KZtreatment(basicConditions);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, numberOfProgramm, notLump);
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
    const insuredSum = printoutsHelper.getVectorInsuredSum(numberOfProgramm);
    const main = printoutsHelper.getMemoryMain(input);
    const paymentPlan = printoutsHelper.getPaymentPlan(input.body.paymentPlan);
    const riskFinReserv = printoutsHelper.getRiskFinReserv(risk, input.body.risksPackages, productCode);
    holder = printoutsHelper.getEpolicyInfo(holder, input.body.issueForm);
    insured = printoutsHelper.getEpolicyInfo(insured, input.body.issueForm);

    const isAfter20230725 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(basicConditions.issueDate), DateTimeUtils.formatDate('2023-07-25'));
    const DMS10 = [lifeInsuranceConstants.product.ECOF2ZENIT].includes(productCode);
    const isTextVTBAfterDecember = printoutsHelper.unpayedPremiumCondition(input.body.basicConditions.issueDate, productCode);
    const isDocumentActive = this.businessContext.documentState == 'Active';

    const output = {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        holder,
        insured,
        frequency,
        notLump,
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
        numberOfProgramm,
        isFullInfo,
        insuredSum,
        isPremial,
        main,
        paymentPlan,
        riskFinReserv,
        isAfter20230725,
        DMS10,
        isTextVTBAfterDecember,
        isDocumentActive
    };

    // KID printout section (EPolicy)
    printoutsHelper.setKidEPrintoutMapping(input, output);

    return output;
};
