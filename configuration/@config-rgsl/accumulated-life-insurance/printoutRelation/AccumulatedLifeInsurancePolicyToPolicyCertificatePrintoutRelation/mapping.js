const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    const insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);
    const insurer = printoutsConstant.insurerInfo;
    const {
        policy,
        currency,
        experationDate
    } = printoutsHelper.getPollicyInfo(input, this);
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const {
        frequency,
        notLump
    } = printoutsHelper.getFrequency(input.body.basicConditions.paymentFrequency.paymentFrequencyCode);
    const insuredAge = dateHelper.getYearNumber(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate);
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode, undefined, notLump, insuredAge);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(input.body);

    const isFinReserv = productCode == product.EFRBFKO;
    const isEBMPFBFKO = productCode == product.EBMPFBFKO;
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);
    const isBasisGarant2 = productCode == product.IBG5BFKO2;

    const isDLPT36404 = risk.mandatory.find(r => r.riskCode === 'DLPT36404');
    if (isDLPT36404 && isBasisGarant2) {
        isDLPT36404.sumInsured = 'Страховая сумма определяется на дату страхового случая для периода действия договора страхования, соответствующего дате страхового случая. Страховые суммы по периодам приведены в таблице ниже';
    }

    let riskFinReserv = {};

    if (isFinReserv || productCode == product.ECOF2ZENIT) {
        riskFinReserv = printoutsHelper.getRiskFinReserv(risk, input.body.risksPackages, productCode);
    }
    const basicConditions = input.body.basicConditions;
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureSettings = {
        issueDate: basicConditions?.issueDate
    };

    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);
    const isBasisInvestOrActiv = productGroupArray.POLICY_CERT_IS_BA_OR_BI.includes(productCode);
    holder = printoutsHelper.getEpolicyInfo(holder, input.body.issueForm);

    const {
        riskFirstPart,
        riskSecondPart
    } = printoutsHelper.twoPartRisk(risk, productCode);
    const isEBMPFBFKOorEBMPYBFKO = [product.EBMPFBFKO, product.EBMPYBFKO].includes(productCode);

    let surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    surrenderValues = printoutsHelper.getSurrenderValuesWithRisk(surrenderValues, input.body.risks, 'DLPT36404');

    let risk2row = {};
    if (isWCENOAS) {
        risk2row = printoutsHelper.getRisk2row(risk);
    }
    const isNotSpesial = ![product.EBMPFBFKO, product.WCENOAS, product.WCEN3OAS, product.EFRBFKO].includes(productCode);
    const hideOtherConditionsParts = productGroupArray.POLICY_CERT_IS_HIDE_OTHER_COND.includes(productCode);
    const isHideHeaderInsuranceSumsByDLP = isFinReserv || product.EBMGRETVTB || product.EBMGNRETVTB;
    const isIDGZENIT = productGroupArray.IDG_ZENIT.includes(productCode);
    const isECOF2ZENIT = [product.ECOF2ZENIT].includes(productCode);
    const isEBMGZENIT = [product.EBMGZENIT].includes(productCode);
    const isWCEN3OAS = productCode === product.WCEN3OAS;

    return {
        holder,
        insurer,
        policy,
        currency,
        experationDate,
        risk,
        insuranceTerms,
        numberOfrisk,
        isFinReserv,
        riskFinReserv,
        bottomRightContentBoth,
        bottomLeftContentBoth,
        isBasisInvestOrActiv,
        notLump,
        isEBMPFBFKO,
        riskFirstPart,
        riskSecondPart,
        isEBMPFBFKOorEBMPYBFKO,
        isWCENOAS,
        risk2row,
        isNotSpesial,
        hideOtherConditionsParts,
        isBasisGarant2,
        surrenderValues,
        isHideHeaderInsuranceSumsByDLP,
        isIDGZENIT,
        isECOF2ZENIT,
        isEBMGZENIT,
        isWCEN3OAS
    };
};
