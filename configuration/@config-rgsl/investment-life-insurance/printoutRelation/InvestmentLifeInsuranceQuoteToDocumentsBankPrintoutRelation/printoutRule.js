'use strict';

const { product, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const body = input.body;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate;
    const insuranceTerm = body.basicConditions?.insuranceTerms;
    const paymentFrequencyCode = body.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const riskPremium = body.basicConditions?.riskPremium;
    const phDateOfBirth = body.policyHolder?.partyData?.partyBody?.partyPersonData?.dateOfBirth;
    const phPersonGender = body.policyHolder?.partyData?.partyBody?.partyPersonData?.personGender;
    const ipDateOfBirth = body.insuredPerson?.partyData?.partyBody?.partyPersonData?.dateOfBirth;
    const ipPersonGender = body.insuredPerson?.partyData?.partyBody?.partyPersonData?.personGender;
    const strategyCode = body.basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;
    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isReinvest = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        !riskPremium || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender ||
        !strategyCode) {

        return;
    }

    const isEPolicy = issueFormCode == 'ePolicy';
    const isNOTE3BFKO = productCode == product.NOTE3BFKO;
    const isNOTE1BFKO = productCode == product.NOTE1BFKO;
    const isNOTE1BFKO3 = productCode == product.NOTE1BFKO3;
    const isNOTE1BFKO4 = productCode == product.NOTE1BFKO4;
    const isIDGZENIT = productGroupArray.IDG_ZENIT.includes(productCode) || productGroupArray.IDG_RET_VTB.includes(productCode);

    if (isIDGZENIT) { return; }

    if ((isEPolicy && !isReinvest) || isNOTE3BFKO || isNOTE1BFKO || isNOTE1BFKO3 || isNOTE1BFKO4) {

        return true;
    }
};
