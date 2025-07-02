'use strict';

const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

function policyEquityPrintoutMapping(input, that) {

    // Main data -->
    const { body, productCode, issueDate } = printoutsHelper.getPrintoutCommonData(input, that);
    const { policy, currency, experationDate } = printoutsHelper.getPollicyInfo(input, that);
    const { personalAcc, bankName, city, correspAcc, bic } = printoutsHelper.getBankInfoByBody(body);
    const bankInfo = `р/с: ${personalAcc} ${bankName}, ${city}, к/с: ${correspAcc}, БИК ${bic}`;

    const insurer = printoutsConstant.insurerInfo;
    const holder = printoutsHelper.getPerson(body.policyHolder.partyData);
    const insured = printoutsHelper.getPerson(body.insuredPerson.partyData);
    const isVTBpartner = body?.mainInsuranceConditions?.partner?.partnerBusinessCode == lifeInsuranceConstants.partnerCode.VTB;
    const risk = printoutsHelper.getRisk(body, body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(body.surrenderValues);
    const { isBeneficiaries, beneficiaries, shareSumIsNot1 } = printoutsHelper.getBeneficiaries(body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const exampleLabel = printoutsHelper.getExampleLabel(that.businessContext);
    const main = printoutsHelper.getMemoryMain(input);
    const typeOfPartner = printoutsHelper.getMemoPartner(body.mainInsuranceConditions.partner.partnerBusinessCode);
    const noConfirmCheckboxDeclaration = lifeInsuranceConstants.productGroupArray.NO_CONFIRM_CHECKBOXES_EQUITY.includes(productCode);
    // Main data <--

    // Signatures -->
    const bottomRightContentHolder = printoutsHelper.getBottomRightContentHolder(holder);
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureOnlyForHolder = true;
    const isPolicyHolderSignature = false;

    const signatureSettings = {
        issueDate: issueDate,
        isPolicyHolder: isPolicyHolderSignature,
        signatureOnlyForHolder: signatureOnlyForHolder
    };
    const bottomLeftContentHolder = printoutsHelper.getBottomLeftContentHolder(signatureSettings);
    const bottomLeftContentHolder2 = printoutsHelper.getBottomLeftContentHolder2(signatureSettings);
    const signatureSettingsBoth = {
        issueDate: issueDate
    };
    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettingsBoth);
    // Signatures <--

    // Page total count reduce -->
    const countReducePrintoutPagesTotalNumber = 5;
    const reducePrintoutPagesTotalNumber = printoutsHelper.reducePrintoutPagesTotalNumber(countReducePrintoutPagesTotalNumber);
    // Page total count reduce <--

    const isPremiumSplit = dateHelper.isAfterOrEqual(dateHelper.formatDate(issueDate), dateHelper.formatDate('2025-05-01'));

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
        bottomRightContentHolder,
        bottomRightContentBoth,
        bottomLeftContentHolder,
        bottomLeftContentHolder2,
        bottomLeftContentBoth,
        reducePrintoutPagesTotalNumber,
        isVTBpartner,
        isPremiumSplit,
        noConfirmCheckboxDeclaration
    };


}

function policyAccidentPrintoutMapping(input, that) {
    const exampleLabel = printoutsHelper.getExampleLabel(that.businessContext);

    const body = input.body;
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
    } = printoutsHelper.getPollicyInfo(input, that);
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    let insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const {
        frequency,
        notLump
    } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const sportsTypes = printoutsHelper.getSportTypes(input.body);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDynamicDeclaration(input, sportsTypes);
    const InsuranseSum = printoutsHelper.getPollicyInfo(input, that).riskInsuredSum.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    insured = printoutsHelper.getPersonData(insured, input.body.insuredPerson.partyData);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const basicConditions = input.body.basicConditions;
    const insuredAge = dateHelper.getYearNumber(input.body.insuredPerson.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, undefined, notLump, insuredAge);
    const { isBeneficiaries, beneficiaries, shareSumIsNot1 } = printoutsHelper.getBeneficiaries(body.beneficiaries);
    const QR = printoutsHelper.qrCodeGenerator(personalAcc, bankName, bic, correspAcc, input.body.policyHolder.partyData.partyBody.partyPersonData, policy, risk.premium.sumByDate);
    const premium = parseFloat(risk.premium.sumByDate.replace(',', '.')).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const signatureSettingsForNobody = {
        issueDate: basicConditions?.issueDate,
        isNobody: true,
    };
    const bottomLeftContentNobody = printoutsHelper.getBottomLeftContentNobody(signatureSettingsForNobody);
    const isBefore28032025 = dateHelper.isBefore(dateHelper.formatDate(basicConditions.issueDate), dateHelper.formatDate('2025-03-28'));
    const coverageDuration = basicConditions?.coverageDuration;
    const isWholeDay = coverageDuration === lifeInsuranceConstants.coverageDuration.wholeDay.code;
    const isACCIDPC2 = productCode === lifeInsuranceConstants.product.ACCIDPC2;


    return {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        isPolicyHolder,
        holder,
        insured,
        frequency,
        insuranceTerms,
        declarationMain,
        declarationMedical,
        InsuranseSum,
        basicConditions,
        QR,
        risk,
        productCode,
        premium,
        sportsTypes,
        bottomLeftContentNobody,
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1,
        isBefore28032025,
        isWholeDay,
        isACCIDPC2
    };
}

module.exports = {
    policyEquityPrintoutMapping,
    policyAccidentPrintoutMapping
};
