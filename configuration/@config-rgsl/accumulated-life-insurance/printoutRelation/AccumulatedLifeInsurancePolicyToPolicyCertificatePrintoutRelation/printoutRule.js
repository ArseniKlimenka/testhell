'use strict';

const { policyState, product, productGroupArray, issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const body = input.body;
    const productCode = body.mainInsuranceConditions.insuranceProduct.productCode;
    const issueDate = body.basicConditions.issueDate;
    const insuranceTerm = body.basicConditions.insuranceTerms;
    const paymentFrequencyCode = body.basicConditions.paymentFrequency.paymentFrequencyCode;
    const riskPremium = body.basicConditions?.riskPremium || body.basicConditions.riskInsuredSum;
    const phDateOfBirth = body.policyHolder.partyData.partyBody.partyPersonData?.dateOfBirth;
    const phPersonGender = body.policyHolder.partyData.partyBody.partyPersonData?.personGender;
    const ipDateOfBirth = body.insuredPerson.partyData.partyBody.partyPersonData?.dateOfBirth;
    const ipPersonGender = body.insuredPerson.partyData.partyBody.partyPersonData?.personGender;
    const isReinvest = productGroupArray.REINVEST.includes(productCode);
    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isEPolicy = issueFormCode == issueForm.ePolicy.issueFormCode;

    const documentState = this.businessContext.documentState;
    const documentStateIsActive = [policyState.Active, policyState.Activated].includes(documentState);
    const isEBMGRETVTB = [product.EBMGRETVTB, product.EBMGNRETVTB, product.EBMGZENIT].includes(productCode);
    const isZENIT = product.ECOF2ZENIT == productCode;

    if (isZENIT) { return true; }

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        !riskPremium || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender ||
        !documentStateIsActive || isReinvest) {
        return;
    }

    if (isEBMGRETVTB && documentStateIsActive) {
        return true;
    }

    if (isEPolicy) {
        return true;
    }

    return;

};
