const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

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

    const isFinReserv = productCode == lifeInsuranceConstants.product.EFRBFKO;
    const isEBMPFBFKO = productCode == lifeInsuranceConstants.product.EBMPFBFKO;
    const isWCENOAS = productCode == lifeInsuranceConstants.product.WCENOAS;
    const isBasisGarant2 = lifeInsuranceConstants.productGroupArray.POLICY_CERT_INSURED_TABLE.includes(productCode);
    const IDGRETVTB = lifeInsuranceConstants.productGroupArray.IDG_RET_VTB.includes(productCode);
    const isIDG2ZENIT = productCode == lifeInsuranceConstants.product.IDG2ZENIT || IDGRETVTB;
    const isIDG1ZENIT = productCode == lifeInsuranceConstants.product.IDG1ZENIT;

    const isDLPT36404 = risk.mandatory.find(r => r.riskCode === 'DLPT36404');
    if (isDLPT36404 && (isBasisGarant2 || IDGRETVTB)) {
        isDLPT36404.sumInsured = 'Страховая сумма определяется на дату страхового случая для периода действия договора страхования, соответствующего дате страхового случая. Страховые суммы по периодам приведены в таблице ниже';
    }

    let riskFinReserv = {};

    if (isFinReserv) {
        riskFinReserv = printoutsHelper.getRiskFinReserv(risk, input.body.risksPackages, productCode);
    }
    const basicConditions = input.body.basicConditions;
    const bottomRightContentBoth = printoutsHelper.getBottomRightContentBoth(holder, insured);
    const signatureSettings = {
        issueDate: basicConditions?.issueDate
    };

    const bottomLeftContentBoth = printoutsHelper.getBottomLeftContentBoth(signatureSettings);
    const isBasisInvestOrActiv = ['IBI3BFKO', 'IBI5BFKO', 'IBI3BFKO17', 'IBI5BFKO17', 'IBI3ZENIT17', 'IBI5ZENIT17', 'IBA3BFKO', 'IBA5BFKO', 'EBMIBFKO'].includes(productCode);
    holder = printoutsHelper.getEpolicyInfo(holder, input.body.issueForm);

    const {
        riskFirstPart,
        riskSecondPart
    } = printoutsHelper.twoPartRisk(risk, productCode);
    const isEBMPFBFKOorEBMPYBFKO = ['EBMPFBFKO', 'EBMPYBFKO'].includes(productCode);

    let surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    surrenderValues = printoutsHelper.getSurrenderValuesWithRisk(surrenderValues, input.body.risks, 'DLPT36404');

    let risk2row = {};
    if (isWCENOAS) {
        risk2row = printoutsHelper.getRisk2row(risk);
    }
    const isNotSpesial = !['EBMPFBFKO', 'WCENOAS', 'EFRBFKO'].includes(productCode);

    const hideOtherConditionsParts = ['EBMOAS2', 'EBMZENIT', 'EBMAKCEPT', 'EBMGBFKO', 'EBMG', 'EBMGP', 'EFRBFKO', 'EHVP2', 'EBMPFBFKO', 'EBMPYBFKO', 'IBG3BFKO', 'IBG5BFKO', 'IBG5BFKO2', 'IBG3OAS', 'IBG5OAS', 'IDGV2BFKO', 'IDGV3BFKO', 'IDGV5BFKO', 'IDGV2PPBFKO', 'IDGV3PPBFKO', 'IDGV5PPBFKO', 'IDG5', 'IDGP3', 'IDGP5', 'IDGV3', 'IDGV2PP', 'IDGV3PP', 'EBMGZENIT', 'IDGN3', 'IDGN5', 'EBMGN', 'EBMGNT' ].includes(productCode);
    const isIDGZENIT = lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode);
    const isIDGRETVTB = lifeInsuranceConstants.productGroupArray.IDG_RET_VTB.includes(productCode);

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
        isIDG2ZENIT,
        isIDG1ZENIT,
        isIDGZENIT,
        isIDGRETVTB
    };
};
