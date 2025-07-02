const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
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

    let numberOfProgram;

    if (body.risks.some(item => item.risk.riskCode == 'DI1005042204')) {
        numberOfProgram = 1;
    }

    if (body.risks.some(item => item.risk.riskCode == 'DI10010042204')) {
        numberOfProgram = 2;
    }

    if (body.risks.some(item => item.risk.riskCode == 'DI12012042204')) {
        numberOfProgram = 3;
    }

    const risk = printoutsHelper.getRisk(body, body.risks, productCode, numberOfProgram);
    const { frequency } = printoutsHelper.getFrequency(body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuranceTerms = printoutsHelper.getTerms(body);
    const basicConditions = body.basicConditions;
    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isOffer = issueFormCode == 'offer';
    if (isOffer) {
        holder.signatureName = '';
    }
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder({
        issueDate: basicConditions.issueDate,
        isOffer: issueFormCode == 'offer',
        isPolicyHolder: true
    });

    const existsJL = risk.mandatory.some(item => item.riskCode == 'JL42204');
    if (existsJL) {
        const limitJL = FormatUtils.formatNumberToMoney(body.creditContract.annuityPaymentSum * 1.15);
        risk.mandatory.find(item => item.riskCode == 'JL42204').insurancePayment = 'в соответствии с п. 10.7 Правил, но не более максимального лимита ежемесячной страховой выплаты – ' + limitJL + ' рублей';
    }

    const risk1 = risk.mandatory.slice(0, 1);
    const risk2 = risk.mandatory.slice(1, 2);
    const risk3Exists = risk.mandatory.length >= 3;
    const risk3 = risk3Exists && risk.mandatory.slice(2, 3);
    const risk3IsCD = risk3Exists && risk.mandatory.some(item => item.riskCode == 'CD42204');
    const risk4Exists = risk.mandatory.length >= 4;
    const risk4 = risk4Exists && risk.mandatory.slice(3, 4);
    const risk5Exists = risk.mandatory.length >= 4;
    const risk5 = risk5Exists && risk.mandatory.slice(4, 5);

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
        risk1,
        risk2,
        risk3Exists,
        risk3,
        risk3IsCD,
        risk4Exists,
        risk4,
        risk5Exists,
        risk5
    };
};
