const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {

    const { body } = printoutsHelper.getPrintoutCommonData(input, this);

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
    let holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(body.insuredPerson.partyData);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(body.surrenderValues, 31);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = body.basicConditions;
    const issueDate = getValue(input, 'body.basicConditions.issueDate');
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(body.mainInsuranceConditions.partner.partnerBusinessCode);
    const strategyCode = getValue(body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyCode');
    const baseActiveDescription = getValue(body, 'basicInvestmentParameters.baseActiveDescription');
    const investmentStrategyDescriptionFull = getValue(body, 'basicInvestmentParameters.investmentStrategyDescriptionFull');

    const basicInvestPurchaseDate = body.basicInvestmentParameters.purchaseDate;
    const purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
    const basicInvestDischargeDate = body.basicInvestmentParameters.dischargeDate;
    const dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);

    const dataBasicInvestment = {
        emitent: getValue(body, 'basicInvestmentParameters.emitent'),
        fixRate: round(getValue(body, 'basicInvestmentParameters.fixRate'), 2),
        intialShare: round(getValue(body, 'basicInvestmentParameters.intialShare'), 2)
    };
    const investPeriod = printoutsHelper.getPeriodTable(body.basicInvestmentParameters, dataBasicInvestment);
    const isAfter20221101 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2022-11-01'));
    holder = printoutsHelper.getEpolicyInfo(holder, body.issueForm);
    insured = printoutsHelper.getEpolicyInfo(insured, body.issueForm);

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
        main,
        commission,
        typeOfPartner,
        baseActiveDescription,
        purchaseDate,
        dischargeDate,
        dataBasicInvestment,
        investPeriod,
        investmentStrategyDescriptionFull,
        isAfter20221101
    };
};
