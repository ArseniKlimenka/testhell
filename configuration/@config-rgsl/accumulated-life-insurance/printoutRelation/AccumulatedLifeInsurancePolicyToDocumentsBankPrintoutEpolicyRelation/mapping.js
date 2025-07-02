const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {
    const { policy, currency, experationDate } = printoutsHelper.getPollicyInfo(input, this);
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    holder = printoutsHelper.getEpolicyInfo(holder, input.body.issueForm);
    const products = lifeInsuranceConstants.product;
    const isPolicyHolder = input.body.insuredPerson.isPolicyHolder;
    const productCode = input.body.mainInsuranceConditions.insuranceProduct.productCode;
    const isDocumentActive = this.businessContext.documentState == 'Active';
    const isECOF2ZENIT = [products.ECOF2ZENIT, products.EBMGZENIT].includes(productCode);
    const isIDGZENIT = [products.IDG1ZENIT, products.IDG3ZENIT, products.IDG5ZENIT, products.IDG2ZENIT].includes(productCode);
    const isEBMGZENIT = [products.EBMGZENIT].includes(productCode);

    return {
        policy,
        holder,
        isDocumentActive,
        isECOF2ZENIT,
        isIDGZENIT,
        isPolicyHolder,
        isEBMGZENIT
    };

};
