const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const {
    round
} = require('@config-system/infrastructure/lib/RoundingUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');

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
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, null, null, null, input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const {
        frequency
    } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
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
    const isOASTextAfterDecember = printoutsHelper.unpayedPremiumCondition(basicConditions.issueDate, productCode);
    const OASdatePaymentPeriod = dateTimeUtils.formatDate(dateTimeUtils.addDays(basicConditions.issueDate, 3), dateTimeUtils.DateFormats.CALENDAR);

    const output = {
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
        isOASTextAfterDecember,
        OASdatePaymentPeriod
    };

    // KID printout section
    printoutsHelper.activateKidPrintout(input, output, this);

    return output;
};
