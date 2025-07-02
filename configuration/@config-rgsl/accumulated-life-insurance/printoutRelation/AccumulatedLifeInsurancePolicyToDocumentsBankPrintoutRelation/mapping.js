const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input) {
    const products = lifeInsuranceConstants.product;
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
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const risk = printoutsHelper.getRisk(input.body, input.body.risks, productCode);
    const numberOfrisk = risk.mandatory.length + risk.additional.length + 1;
    const insuranceTerms = printoutsHelper.getTerms(input.body);
    const payDay = printoutsHelper.getDateToStringWithoutYear(input.body.policyTerms.startDate);
    const declarationMedical = printoutsHelper.getDeclaration(input.body.declarationMedical);
    const declarationMain = printoutsHelper.getDeclaration(input.body.declarationMain);
    const otherCondition = printoutsHelper.getOtherCondition(input.body.insurerComment);
    const surrenderValues = printoutsHelper.getSurrenderValues(input.body.surrenderValues);
    const {
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1
    } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const main = printoutsHelper.getMemoryMain(input);
    const holderGenderMale = input.body.policyHolder.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const holder60plus = printoutsHelper.getAge(input.body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth, input.body.basicConditions.issueDate);
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    const holderInfo = printoutsHelper.getNoticeBFKO(holder.email, holder.phoneNumber, input.body.basicConditions.issueDate);
    const isU1092 = [products.IBG3BFKO, products.IBG5BFKO, products.EBMGBFKO, products.EBMIBFKO, products.EFRBFKO, products.EBMBFKO, products.WCENOAS, products.WCEN3OAS, products.EBMPYBFKO, products.EBMPFBFKO, products.IBG5BFKO2].includes(productCode);
    const is6057U = [products.IBI3BFKO, products.IBI5BFKO, products.IBI3BFKO17, products.IBI5BFKO17, products.IBA3BFKO, products.IBA5BFKO, products.NOTE3BFKO, products.NOTE1BFKO, products.NOTE1BFKO3, products.NOTE1BFKO4].includes(productCode);
    const isStrategyFiveInvest = products.EBMIBFKO == productCode;

    holder = printoutsHelper.getEpolicyInfo(holder, input.body.issueForm);

    const isNOTE1BFKO4 = productCode == products.NOTE1BFKO4;
    const investmentStrategyCode = getValue(input.body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyCode');
    const isStrategyMajorLeague60 = investmentStrategyCode == 'majorLeague 6.0';
    const isNoConsentPersonalData = [products.EBMGRETVTB, products.EBMGNRETVTB, products.ECOF2ZENIT, products.EBMGZENIT].includes(productCode);
    const isNo60plus = [products.EBMGRETVTB, products.EBMGNRETVTB, products.ECOF2ZENIT].includes(productCode);
    const isBankDocument = [products.EBMGRETVTB, products.EBMGNRETVTB].includes(productCode);
    const isECOF2ZENIT = [products.ECOF2ZENIT, products.EBMGZENIT].includes(productCode);
    const isIDGZENIT = [products.IDG1ZENIT, products.IDG3ZENIT, products.IDG5ZENIT, products.IDG2ZENIT].includes(productCode);
    const isEBMGZENIT = [products.EBMGZENIT].includes(productCode);

    return {
        insurer,
        bankInfo,
        policy,
        currency,
        experationDate,
        holder,
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
        numberOfrisk,
        main,
        holderGenderMale,
        holder60plus,
        isPolicyHolder,
        holderInfo,
        isU1092,
        is6057U,
        isStrategyFiveInvest,
        isNOTE1BFKO4,
        isStrategyMajorLeague60,
        isNoConsentPersonalData,
        isNo60plus,
        isBankDocument,
        isECOF2ZENIT,
        isIDGZENIT,
        isEBMGZENIT
    };
};
