const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

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
    let holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(body.insuredPerson.partyData);
    const {
        frequency,
        notLump
    } = printoutsHelper.getFrequency(body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuredAge = dateHelper.getYearNumber(body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, issueDate);
    const risk = printoutsHelper.getRisk(body, body.risks, productCode, undefined, notLump, insuredAge);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(body.surrenderValues, 31);
    surrenderValues[0].periodStartDate = 'со следующего дня после уплаты 3-го платежа (страхового взноса)';
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = body.basicConditions;
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(body.mainInsuranceConditions.partner.partnerBusinessCode);

    const basicInvestPurchaseDate = body.basicInvestmentParameters.purchaseDate;
    const purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
    const basicInvestDischargeDate = body.basicInvestmentParameters.dischargeDate;
    const dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);

    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureSettings = {
        issueDate: issueDate
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);
    const newProduct = true;
    const difference = printoutsHelper.getDifference2(body.risks, 'IE36904', 'IDLPVV36904');
    const dataBasicInvestment = {
        baseActiveDescription: getValue(body, 'basicInvestmentParameters.baseActiveDescription'),
        investmentStrategyDescriptionFull: getValue(body, 'basicInvestmentParameters.investmentStrategyDescriptionFull'),
        emitent: getValue(body, 'basicInvestmentParameters.emitent'),
        participationCoeff: round(getValue(body, 'basicInvestmentParameters.participationCoeff', 1) * 100, 2) + '%'
    };
    const holderGenderMale = body.policyHolder.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const holder60plus = printoutsHelper.getAge(body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, issueDate);
    holder = printoutsHelper.getPersonData(holder, body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, body.insuredPerson.partyData);
    const isPolicyHolder = body.insuredPerson.isPolicyHolder;
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, issueDate);
    const BFKOpartner = body.mainInsuranceConditions.partner.partnerBusinessCode == '249411';
    const historyIncome = body.basicConditions.insuranceTerms == 5 ? '9.39' : '4.65';
    const optionPrice = round(getValue(body, 'basicInvestmentParameters.optionPrice', 1) * 100, 2);
    const is36 = optionPrice == '36';
    const is26_5 = optionPrice == '26.5';
    const is28 = optionPrice == '28';
    const is39 = optionPrice == '39';
    const is41_5 = optionPrice == '41.5';
    const paymentPlan = printoutsHelper.getPaymentPlan(body.paymentPlan);
    const signatureNone = printoutsHelper.getSignatureNone();
    const threePayments = paymentPlan.slice(0, 3);

    return {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        holder,
        insured,
        frequency,
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
        commission,
        typeOfPartner,
        purchaseDate,
        dischargeDate,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentBoth,
        newProduct,
        difference,
        dataBasicInvestment,
        holderGenderMale,
        holder60plus,
        isPolicyHolder,
        holderInfo,
        BFKOpartner,
        is36,
        is26_5,
        is28,
        is39,
        is41_5,
        historyIncome,
        paymentPlan,
        signatureNone,
        threePayments,
        notLump
    };
};
