const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { productGroupArray, product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {
    const { policy, currency, experationDate } = printoutsHelper.getPollicyInfo(input, this);
    let holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    holder = printoutsHelper.getPersonData(holder, input.body.policyHolder.partyData);
    holder = printoutsHelper.getEpolicyInfo(holder, input.body.issueForm);
    const { body } = printoutsHelper.getPrintoutCommonData(input, this);
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;

    const isDocumentActive = this.businessContext.documentState == 'Active';
    const isIDGZENIT = [product.IDG1ZENIT, product.IDG3ZENIT, product.IDG5ZENIT, product.IDG2ZENIT].includes(productCode);
    const isECOF2ZENIT = product.ECOF2ZENIT == productCode;

    return {
        policy,
        holder,
        isDocumentActive,
        isIDGZENIT,
        isECOF2ZENIT
    };

};
