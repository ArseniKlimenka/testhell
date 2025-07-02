const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const { product } = require("@config-rgsl/infrastructure/lib/lifeInsuranceConstants");

module.exports = function mapping(input) {

    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const {
        policy,
        experationDate,
        currency
    } = printoutsHelper.getPollicyInfo(input, this);
    const {
        personalAcc,
        bankName,
        city,
        correspAcc,
        bic
    } = printoutsHelper.getBankInfoByBody(input.body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    const insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode);
    const { frequency, notLump } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    const paymentSum = input.body.paymentPlan[0]?.paymentSum ?? 0;
    const qrPremiumSum = FormatUtils.formatNumberToMoney(paymentSum, null, 2, ',', '', true);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, qrPremiumSum);
    let surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    const paymentPlan = printoutsHelper.getPaymentPlan(input.body.paymentPlan);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const basicConditions = input.body.basicConditions;
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureSettings = {
        issueDate: basicConditions?.issueDate
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);
    const signatureNone = printoutsHelper.getSignatureNone();
    surrenderValues = printoutsHelper.getSurrenderValues2row(surrenderValues);
    const risk2row = printoutsHelper.getRisk2row(risk);
    const I46204riskPremium = input.body.risks.filter(item => item.risk.riskCode == 'I46204')[0]?.riskPremium ?? 0;
    const insurancePremiumAll = FormatUtils.formatNumberToMoney(paymentSum - I46204riskPremium);
    risk2row.insurancePremiumAll = insurancePremiumAll;

    const isDocumentActive = this.businessContext.documentState == 'Active';
    const isWCEN3OAS = productCode === product.WCEN3OAS;

    return {
        exampleLabel,
        policy,
        experationDate,
        bankInfo,
        insurer,
        holder,
        risk,
        frequency,
        insuranceTerms,
        declarationMedical,
        declarationMain,
        otherCondition,
        QR,
        insured,
        surrenderValues,
        paymentPlan,
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentBoth,
        signatureNone,
        currency,
        notLump,
        risk2row,
        isDocumentActive,
        isWCEN3OAS
    };
};
