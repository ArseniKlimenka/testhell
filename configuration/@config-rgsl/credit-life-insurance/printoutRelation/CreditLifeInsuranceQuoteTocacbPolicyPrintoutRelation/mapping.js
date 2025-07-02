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
    const basicConditions = input.body.basicConditions;
    const {
        policy,
        experationDate
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
    let risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode);
    const {
        frequency
    } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    // const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const creditProgramId = input.body.creditProgram.creditProgramId;
    const annuityPaymentSum = input.body.creditContract.annuityPaymentSum;
    risk = printoutsHelper.getRiskAvtoCred(risk, creditProgramId, annuityPaymentSum);
    const numberOfRow = creditProgramId == 'РЖ30' ? 4 : 3;
    const riskSummArray = printoutsHelper.getRiskSummArray(input.body.risks, 0, 3);
    const is08 = creditProgramId == 'РЖ08';
    const is12 = creditProgramId == 'РЖ12';
    const is15 = creditProgramId == 'РЖ15';
    const is20 = creditProgramId == 'РЖ20';
    const is24 = creditProgramId == 'РЖ24';
    const is27 = creditProgramId == 'РЖ27';
    const is30 = creditProgramId == 'РЖ30';
    const is33 = creditProgramId == 'РЖ33';
    const is35 = creditProgramId == 'РЖ35';
    const is36 = creditProgramId == 'РЖ36';
    const is08_36 = is08 || is36;
    let printoutRules = '';
    if (is08_36) {
        printoutRules = `на основании Правил страхования жизни физических лиц №9 (в редакции от 01 апреля 2023 года)`;
    } else {
        printoutRules = `на основании Правил страхования жизни физических лиц №12 (в редакции от 01 апреля 2023 года)`;
    }

    const issueDate = getValue(input, 'body.basicConditions.issueDate');
    const isBefore20221001 = dateTimeUtils.isBefore(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2022-10-01'));
    const isBetween20221001And20230227 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2022-10-01')) &&
        dateTimeUtils.isBefore(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2023-02-27'));

    const QR08 = 'https://rgsl.ru/upload/documents/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0%20%D1%81%D1%82%D1%80%D0%B0%D1%85%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%B6%D0%B8%D0%B7%D0%BD%D0%B8%20%D1%84%D0%B8%D0%B7%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85%20%D0%BB%D0%B8%D1%86%20%E2%84%969%20(%D0%B2%20%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%86%D0%B8%D0%B8%20%D0%BE%D1%82%2001%20%D0%BE%D0%BA%D1%82%D1%8F%D0%B1%D1%80%D1%8F%202022%20%D0%B3%D0%BE%D0%B4%D0%B0).pdf';
    const QR = 'https://rgsl.ru/upload/documents/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0%20%D1%81%D1%82%D1%80%D0%B0%D1%85%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F%20%D0%B6%D0%B8%D0%B7%D0%BD%D0%B8%20%D1%84%D0%B8%D0%B7%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85%20%D0%BB%D0%B8%D1%86%20%E2%84%9612%20(%D0%B2%20%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%86%D0%B8%D0%B8%20%D0%BE%D1%82%2001%20%D0%BE%D0%BA%D1%82%D1%8F%D0%B1%D1%80%D1%8F%202022%20%D0%B3%D0%BE%D0%B4%D0%B0).pdf';
    const creditRateInitial = getValue(input, 'body.creditContract.creditRate', 0) * 100;
    const creditRateRefuseInitial = getValue(input, 'body.creditContract.creditRateRefuse', 0) * 100;
    const creditRate = FormatUtils.formatNumberToMoney(creditRateInitial);
    const creditRateRefuse = FormatUtils.formatNumberToMoney(creditRateRefuseInitial);
    const creditRateDiff = creditRateInitial && creditRateRefuseInitial && FormatUtils.formatNumberToMoney(creditRateRefuseInitial - creditRateInitial);

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
        QR08,
        QR,
        numberOfRow,
        riskSummArray,
        is08,
        is12,
        is15,
        is20,
        is24,
        is27,
        is30,
        is33,
        is35,
        is36,
        is08_36,
        isBefore20221001,
        isBetween20221001And20230227,
        creditRate,
        creditRateRefuse,
        creditRateDiff,
        printoutRules
    };

    // Signature policy section
    printoutsHelper.getPolicySignatureByIssueType(input, output);

    // KID printout section
    printoutsHelper.activateKidCreditPrintoutForPaper(input, output, this);

    return output;
};
