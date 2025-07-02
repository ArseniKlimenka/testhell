const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(input) {

    const {
        body,
        productCode,
        issueDate,
        strategyCode
    } = printoutsHelper.getPrintoutCommonData(input, this);

    const {
        personalAcc,
        bankName,
        city,
        correspAcc,
        bic
    } = printoutsHelper.getBankInfoByBody(body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    const holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    const insured = printoutsHelper.getPerson(body.insuredPerson.partyData);
    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(body.surrenderValues);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = body.basicConditions;
    const typeOfPartner = printoutsHelper.getMemoPartner(body.mainInsuranceConditions.partner.partnerBusinessCode);
    const baseActiveDescription = getValue(body, 'basicInvestmentParameters.baseActiveDescription');
    const optionPrice = round(getValue(body, 'basicInvestmentParameters.optionPrice', 1) * 100, 2);
    const participationCoeff = round(getValue(body, 'basicInvestmentParameters.participationCoeff', 1) * 100, 2) + '%';
    const barrier = getValue(body, 'basicInvestmentParameters.barrier');
    const barrierAutoCall = getValue(body, 'basicInvestmentParameters.barrierAutoCall');

    const basicInvestPurchaseDate = body.basicInvestmentParameters.purchaseDate;
    const purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
    const basicInvestDischargeDate = body.basicInvestmentParameters.dischargeDate;
    const dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);

    const basicInvestCouponPeriods = body.basicInvestmentParameters.couponPeriods;
    const couponPeriods = barrier && basicInvestCouponPeriods &&
        basicInvestCouponPeriods.map((item, idx) => {
            return {
                number: idx + 1,
                beginDate: printoutsHelper.formatDatePrint(item.beginDate),
                endDate: printoutsHelper.formatDatePrint(item.endDate),
                barrier: barrier.split('; ').find((bItem, bIdx) => bIdx == idx) + '%',
                participationCoeff: participationCoeff,
                barrierAutoCall: barrierAutoCall.split('; ').find((bItem, bIdx) => bIdx == idx) + '%'
            };
        }) || [];
    const isCoupon = couponPeriods.length > 0;
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureSettings = {
        issueDate: issueDate
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);

    return {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        holder,
        insured,
        risk,
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
        numberOfrisk,
        exampleLabel,
        main,
        typeOfPartner,
        baseActiveDescription,
        optionPrice,
        participationCoeff,
        productCode,
        issueDate,
        strategyCode,
        purchaseDate,
        dischargeDate,
        couponPeriods,
        isCoupon,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentBoth
    };
};
