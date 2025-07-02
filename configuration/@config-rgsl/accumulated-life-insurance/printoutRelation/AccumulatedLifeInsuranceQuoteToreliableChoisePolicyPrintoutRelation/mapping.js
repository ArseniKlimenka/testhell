const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");

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
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    const holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    const insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const {
        frequency,
        notLump
    } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = input.body.basicConditions;
    const {
        numberOfProgramm
    } = printoutsHelper.KZtreatment(basicConditions);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, numberOfProgramm);
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
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, input.body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(input.body.mainInsuranceConditions.partner.partnerBusinessCode);
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureSettings = {
        issueDate: basicConditions?.issueDate
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);

    return {
        insurer,
        bankInfo,
        policy,
        isPremial,
        currency,
        experationDate,
        isPolicyHolder,
        holder,
        insured,
        frequency,
        notLump,
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
        exampleLabel,
        main,
        commission,
        typeOfPartner,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentBoth
    };
};
