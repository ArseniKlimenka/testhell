const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function mapping(input) {

    const body = input.body;

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
    } = printoutsHelper.getBankInfoByBody(body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const { frequency } = printoutsHelper.getFrequency(body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuranceTerms = printoutsHelper.getTerms(body);
    const basicConditions = body.basicConditions;
    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isOffer = issueFormCode == 'offer';
    if (isOffer) {
        holder.signatureName = '';
    }
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(({
        issueDate: basicConditions.issueDate,
        isOffer: issueFormCode == 'offer',
        isPolicyHolder: true
    }));
    const creditDate = body.creditContract.creditDate ? DateTimeUtils.formatDate(body.creditContract.creditDate, DateTimeUtils.DateFormats.CALENDAR) : '';
    const creditContractNumber = body.creditContract.creditContractNumber ? body.creditContract.creditContractNumber : '';
    const existsJL = risk.mandatory.some(item => item.riskCode == 'JL42204');
    const limitJL = FormatUtils.formatNumberToMoney(body.creditContract.annuityPaymentSum * 1.15);
    const onlyJL = risk.mandatory.length == 1 && existsJL;

    const risk1 = risk.mandatory.slice(0, 1);
    const risk2 = risk.mandatory.slice(1, 2);
    const risk3Exists = risk.mandatory.length >= 3;
    const risk3 = risk3Exists && risk.mandatory.slice(2, 3);
    const risk3IsCD = risk3Exists && risk.mandatory.some(item => item.riskCode == 'CD42204');
    const risk4Exists = risk.mandatory.length >= 4;
    const risk4 = risk4Exists && risk.mandatory.slice(3, 4);
    const risk5Exists = risk.mandatory.length >= 5;
    const risk5 = risk5Exists && risk.mandatory.slice(4, 5);

    const isBetween20221024And20221219 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(basicConditions.issueDate), DateTimeUtils.formatDate('2022-10-24'))
        && DateTimeUtils.isBefore(DateTimeUtils.formatDate(basicConditions.issueDate), DateTimeUtils.formatDate('2022-12-19'));
    const isBetween20221219And20230331 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(basicConditions.issueDate), DateTimeUtils.formatDate('2022-12-19'))
        && DateTimeUtils.isBefore(DateTimeUtils.formatDate(basicConditions.issueDate), DateTimeUtils.formatDate('2023-03-31'));

    const output = {
        policy,
        experationDate,
        bankInfo,
        insurer,
        holder,
        risk,
        frequency,
        insuranceTerms,
        bottomRightContentHolder,
        bottomLeftContentHolder,
        isOffer,
        creditDate,
        creditContractNumber,
        existsJL,
        limitJL,
        onlyJL,
        risk1,
        risk2,
        risk3Exists,
        risk3,
        risk3IsCD,
        risk4Exists,
        risk4,
        risk5Exists,
        risk5,
        isBetween20221024And20221219,
        isBetween20221219And20230331

    };

    // KID printout section
    if (isBetween20221024And20221219 || isBetween20221219And20230331) {
        printoutsHelper.activateKidCreditPrintoutForPaper(input, output, this, '2022-10-24');
    }

    return output;

};
