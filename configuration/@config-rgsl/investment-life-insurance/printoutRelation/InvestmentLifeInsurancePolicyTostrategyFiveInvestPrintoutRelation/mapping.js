const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

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
    const {
        frequency,
        notLump
    } = printoutsHelper.getFrequency(body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const insuredAge = dateHelper.getYearNumber(body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, body.basicConditions.issueDate);
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
    const issueDate = getValue(input, 'body.basicConditions.issueDate');
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(body.mainInsuranceConditions.partner.partnerBusinessCode);
    const strategyCode = getValue(body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyCode');

    // TODO_PRINT
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
            issueDate: basicConditions?.issueDate,
            isPolicyHolder: isPolicyHolderSignature,
            signatureOnlyForHolder: signatureOnlyForHolder
        };
    } else {
        signatureSettings = {
            issueDate: basicConditions?.issueDate
        };
    }
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentHolder2 = printoutsHelper.getBottomLeftContentHolder2(signatureSettings);
    const signatureSettingsBoth = {
        issueDate: basicConditions?.issueDate
    };
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettingsBoth);
    const newProduct = true;
    const difference = printoutsHelper.getDifference3(body.risks, 'IE36904', 'fake', body.paymentPlan);
    const dataBasicInvestment = {
        baseActiveDescription: getValue(body, 'basicInvestmentParameters.baseActiveDescription'),
        investmentStrategyDescriptionFull: getValue(body, 'basicInvestmentParameters.investmentStrategyDescriptionFull'),
        emitent: getValue(body, 'basicInvestmentParameters.emitent'),
        participationCoeff: round(getValue(body, 'basicInvestmentParameters.participationCoeff', 1) * 100, 2) + '%'
    };
    const holderGenderMale = body.policyHolder.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const holder60plus = printoutsHelper.getAge(body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, body.basicConditions.issueDate);
    holder = printoutsHelper.getPersonData(holder, body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, body.insuredPerson.partyData);
    const isPolicyHolder = body.insuredPerson.isPolicyHolder;
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, body.basicConditions.issueDate);
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
