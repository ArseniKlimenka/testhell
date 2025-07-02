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
    const products = lifeInsuranceConstants.product;
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
    const paymentPlan = printoutsHelper.getPaymentPlan(input.body.paymentPlan);
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, input.body.insuredPerson.partyData);
    const riskFinReserv = printoutsHelper.getRiskFinReserv(risk, input.body.risksPackages, productCode);
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder || lifeInsuranceConstants.product.ECOF2ZENIT == productCode;
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, input.body.basicConditions.issueDate);
    const holder60plus = printoutsHelper.getAge(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate) && lifeInsuranceConstants.product.ECOF2ZENIT != productCode;

    const isAfter20230725 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(basicConditions.issueDate), DateTimeUtils.formatDate('2023-07-25'));
    const isECOFVTB = [products.ECOFPVTB, products.ECOFVVTB, products.ECOF2ZENIT].includes(productCode);
    const isECOFVTBDMS = [products.ECOFPVTB, products.ECOFVVTB].includes(productCode);
    const DMS10 = [products.ECOF2ZENIT].includes(productCode);

    const isVTBpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == lifeInsuranceConstants.partnerCode.VTB;
    const isHideHolderDataAgreement = [products.ECOFPVTB, products.ECOFVVTB, products.ECOF2ZENIT].includes(productCode);
    const isHideFinServiceNotify = [products.ECOFPVTB, products.ECOFVVTB, products.ECOF2ZENIT].includes(productCode);
    const isTextVTBAfterDecember = printoutsHelper.unpayedPremiumCondition(input.body.basicConditions.issueDate, productCode);
    const isECOF2ZENIT = lifeInsuranceConstants.product.ECOF2ZENIT == productCode;
    const isBefore20250401 = DateTimeUtils.isBefore(DateTimeUtils.formatDate(basicConditions.issueDate), DateTimeUtils.formatDate('2025-04-01'));
    const isVTBBankDocument = isVTBpartner && isBefore20250401;

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
        exampleLabel,
        isPremial,
        main,
        typeOfPartner,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentBoth,
        paymentPlan,
        isPolicyHolder,
        holderInfo,
        riskFinReserv,
        holder60plus,
        isAfter20230725,
        isECOFVTB,
        isVTBpartner,
        isHideHolderDataAgreement,
        isHideFinServiceNotify,
        isTextVTBAfterDecember,
        DMS10,
        isECOFVTBDMS,
        isECOF2ZENIT,
        isVTBBankDocument
    };

    // KID printout section
    printoutsHelper.activateKidPrintout(input, output, this);

    return output;
};
