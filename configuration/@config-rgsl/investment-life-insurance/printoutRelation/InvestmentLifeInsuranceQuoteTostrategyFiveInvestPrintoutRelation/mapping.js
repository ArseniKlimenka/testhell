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
    } = printoutsHelper.getBankInfoByBody(input.body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;
    const insurer = printoutsConstant.insurerInfo;
    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const {
        frequency,
        notLump
    } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuredAge = dateHelper.getYearNumber(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, issueDate);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, undefined, notLump, insuredAge);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(input.body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues, 31);
    surrenderValues[0].periodStartDate = 'со следующего дня после уплаты 3-го платежа (страхового взноса)';
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(this.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = input.body.basicConditions;
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, input.body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(input.body.mainInsuranceConditions.partner.partnerBusinessCode);

    const basicInvestPurchaseDate = body.basicInvestmentParameters.purchaseDate;
    const purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
    const basicInvestDischargeDate = body.basicInvestmentParameters.dischargeDate;
    const dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);

    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureOnlyForHolder = true;
    const isPolicyHolderSignature = false;
    const isAfter20240212 = dateHelper.isAfterOrEqual(dateHelper.formatDate(issueDate), dateHelper.formatDate('2024-02-12'));
    let signatureSettings = {};
    if (isAfter20240212) {
        signatureSettings = {
            issueDate: issueDate,
            isPolicyHolder: isPolicyHolderSignature,
            signatureOnlyForHolder: signatureOnlyForHolder
        };
    } else {
        signatureSettings = {
            issueDate: issueDate
        };
    }
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentHolder2 = printoutsHelper.getBottomLeftContentHolder2(signatureSettings);
    const signatureSettingsBoth = {
        issueDate: issueDate
    };
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettingsBoth);
    const newProduct = true;
    const difference = printoutsHelper.getDifference3(input.body.risks, 'IE36904', 'fake', input.body.paymentPlan);
    const dataBasicInvestment = {
        baseActiveDescription: getValue(input.body, 'basicInvestmentParameters.baseActiveDescription'),
        investmentStrategyDescriptionFull: getValue(input.body, 'basicInvestmentParameters.investmentStrategyDescriptionFull'),
        emitent: getValue(input.body, 'basicInvestmentParameters.emitent'),
        participationCoeff: round(getValue(input.body, 'basicInvestmentParameters.participationCoeff', 1) * 100, 2) + '%'
    };
    const holderGenderMale = input.body.policyHolder.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const holder60plus = printoutsHelper.getAge(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, issueDate);
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, input.body.insuredPerson.partyData);
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, issueDate);
    const BFKOpartner = input.body.mainInsuranceConditions.partner.partnerBusinessCode == '249411';
    const historyIncome = input.body.basicConditions.insuranceTerms == 5 ? '9.39' : '4.65';
    const optionPrice = round(getValue(input.body, 'basicInvestmentParameters.optionPrice', 1) * 100, 2);
    const is36 = optionPrice == '36';
    const is26_5 = optionPrice == '26.5';
    const is28 = optionPrice == '28';
    const is39 = optionPrice == '39';
    const is41_5 = optionPrice == '41.5';
    const paymentPlan = printoutsHelper.getPaymentPlan(input.body.paymentPlan);
    const signatureNone = printoutsHelper.getSignatureNone();
    const threePayments = paymentPlan.slice(0, 3);
    let reducePrintoutPagesTotalNumber;
    if (isAfter20240212) {
        reducePrintoutPagesTotalNumber = printoutsHelper.reducePrintoutPagesTotalNumber(6); // Памятка ЦБ
    }

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
        bottomLeftContentHolder2,
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
        notLump,
        reducePrintoutPagesTotalNumber,
        isAfter20240212
    };
};
