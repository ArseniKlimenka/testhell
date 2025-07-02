'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

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
    const isReinvest = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);
    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';
    const isEBMGRETVTB = lifeInsuranceConstants.productGroupArray.SKIP_BANK_DOCUMENT.includes(productCode);
    const isAfter01042025 = DateTimeUtils.isAfter(issueDate, '2025-03-31');

    if (isEBMGRETVTB && isEPolicy && isAfter01042025) { return; }

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        !riskPremium || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender) {

        return;
    }

    if (isEPolicy && !isReinvest) {

        return true;
    }
};
