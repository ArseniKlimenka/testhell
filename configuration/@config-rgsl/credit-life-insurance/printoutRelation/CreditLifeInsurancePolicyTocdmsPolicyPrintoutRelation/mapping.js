const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

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
    const isDMS1 = body.risks.find(item => item.risk.riskCode == 'DMS110800');
    const isDMS2 = body.risks.find(item => item.risk.riskCode == 'DMS210800');
    let dmsProgramName = '';
    if (isDMS1) {
        dmsProgramName = 'ЛЕЧЕНИЕ ОНКОЛОГИЧЕСКОГО ЗАБОЛЕВАНИЯ';
    }
    if (isDMS2) {
        dmsProgramName = 'ЛЕЧЕНИЕ ОНКОЛОГИЧЕСКОГО / КРИТИЧЕСКОГО ЗАБОЛЕВАНИЯ';
    }

    const isAfter20220221 = dateHelper.isAfterOrEqual(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2022-02-21'));
    if (isAfter20220221) {
        policy.rule = 'Правил добровольного медицинского страхования (в редакции от 01 октября 2022 года)';
    }

    return {
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
        isDMS1,
        isDMS2,
        dmsProgramName,
        isAfter20220221
    };
};
