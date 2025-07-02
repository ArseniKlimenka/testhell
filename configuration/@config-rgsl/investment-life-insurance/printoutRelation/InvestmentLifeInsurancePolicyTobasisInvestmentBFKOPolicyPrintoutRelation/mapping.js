const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
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
    if (body.basicConditions.isReinvest) {
        surrenderValues[0].periodStartDate = 'c 31-го дня после даты уплаты страховой премии';
    }
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
    const baseActiveDescription = getValue(body, 'basicInvestmentParameters.baseActiveDescription');
    const investmentStrategyDescriptionFull = getValue(body, 'basicInvestmentParameters.investmentStrategyDescriptionFull');

    const basicInvestPurchaseDate = body.basicInvestmentParameters.purchaseDate;
    const purchaseDate = printoutsHelper.formatDatePrint(basicInvestPurchaseDate);
    const basicInvestDischargeDate = body.basicInvestmentParameters.dischargeDate;
    const dischargeDate = printoutsHelper.formatDatePrint(basicInvestDischargeDate);

    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureSettings = {
        issueDate: basicConditions?.issueDate
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);
    const newProduct = true;
    const difference = printoutsHelper.getDifference2(body.risks, 'E36904', 'DLP36904');
    const dataBasicInvestment = {
        emitent: getValue(body, 'basicInvestmentParameters.emitent'),
        fixRate: round(getValue(body, 'basicInvestmentParameters.fixRate'), 2),
        intialShare: round(getValue(body, 'basicInvestmentParameters.intialShare'), 2)
    };
    const investPeriod = printoutsHelper.getPeriodTable(body.basicInvestmentParameters, dataBasicInvestment);
    const holderGenderMale = body.policyHolder.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const holder60plus = printoutsHelper.getAge(body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, body.basicConditions.issueDate);
    holder = printoutsHelper.getPersonData(holder, body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, body.insuredPerson.partyData);
    const isPolicyHolder = body.insuredPerson.isPolicyHolder;
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, body.basicConditions.issueDate);
    const BFKOpartner = body.mainInsuranceConditions.partner.partnerBusinessCode == '249411';
    const AkceptPartner = body.mainInsuranceConditions.partner.partnerBusinessCode == '431120';
    const ZenithPartner = body.mainInsuranceConditions.partner.partnerBusinessCode == '191127';
    const OASpartner = body.mainInsuranceConditions.partner.partnerBusinessCode == '247457';

    const isAfter20221101 = dateTimeUtils.isAfterOrEqual(dateTimeUtils.formatDate(issueDate), dateTimeUtils.formatDate('2022-11-01'));
    const isAfter02072025 = dateTimeUtils.isAfterOrEqual(basicConditions?.issueDate, '2025-02-07');

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
        commission,
        typeOfPartner,
        baseActiveDescription,
        investmentStrategyDescriptionFull,
        purchaseDate,
        dischargeDate,
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentBoth,
        newProduct,
        difference,
        dataBasicInvestment,
        investPeriod,
        holderGenderMale,
        holder60plus,
        isPolicyHolder,
        holderInfo,
        BFKOpartner,
        AkceptPartner,
        ZenithPartner,
        OASpartner,
        isAfter20221101,
        isAfter02072025
    };
};
