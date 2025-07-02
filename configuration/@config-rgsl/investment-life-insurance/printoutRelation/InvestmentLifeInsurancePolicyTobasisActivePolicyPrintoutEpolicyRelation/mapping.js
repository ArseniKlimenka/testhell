const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const {
    round
} = require('@config-system/infrastructure/lib/RoundingUtils');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const {
        body,
        productCode,
        issueDate,
        strategyCode
    } = printoutsHelper.getPrintoutCommonData(input, this);

    const products = lifeInsuranceConstants.product;
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
    const surrenderValues = printoutsHelper.getSurrenderValues(body.surrenderValues, 31);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const main = printoutsHelper.getMemoryMain(input);
    const basicConditions = body.basicConditions;
    const commission = printoutsHelper.getMemoryCommission(productCode, basicConditions, body.paymentPlan);
    const typeOfPartner = printoutsHelper.getMemoPartner(body.mainInsuranceConditions.partner.partnerBusinessCode);

    const basicInvestPurchaseDate = body.basicInvestmentParameters.purchaseDate;
    const purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
    const basicInvestDischargeDate = body.basicInvestmentParameters.dischargeDate;
    const dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);

    const newProduct = true;
    const difference = printoutsHelper.getDifference2(body.risks, 'E36904', 'DLP36904');

    const dataBasicInvestment = {
        baseActiveDescription: getValue(body, 'basicInvestmentParameters.baseActiveDescription'),
        investmentStrategyDescriptionFull: getValue(body, 'basicInvestmentParameters.investmentStrategyDescriptionFull'),
        emitent: getValue(body, 'basicInvestmentParameters.emitent'),
        participationCoeff: round(getValue(body, 'basicInvestmentParameters.participationCoeff', 1) * 100, 2) + '%'
    };

    const optionPrice = round(getValue(body, 'basicInvestmentParameters.optionPrice', 1) * 100, 2);
    const is36 = optionPrice == '36';
    const is26_5 = optionPrice == '26.5';
    const is26_3 = optionPrice == '26.3';
    const is28 = optionPrice == '28';
    const is39 = optionPrice == '39';
    const is29_4 = optionPrice == '29.4';
    const is41_5 = optionPrice == '41.5';
    const isAfter20221101 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2022-11-01'));

    const isBasisActive = [products.IBA5REINVEST, products.IBA3REINVEST].includes(productCode);
    const isReinvestBasicVariant = lifeInsuranceConstants.productGroupArray.REINVEST_BASIC_VARIANTS.includes(productCode);
    const variantDescription = body?.basicInvestmentParameters?.variant?.variantDescription;

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
        purchaseDate,
        dischargeDate,
        newProduct,
        difference,
        dataBasicInvestment,
        is36,
        is26_5,
        is26_3,
        is28,
        is39,
        isAfter20221101,
        isBasisActive,
        is29_4,
        is41_5,
        isReinvestBasicVariant,
        variantDescription
    };
};
