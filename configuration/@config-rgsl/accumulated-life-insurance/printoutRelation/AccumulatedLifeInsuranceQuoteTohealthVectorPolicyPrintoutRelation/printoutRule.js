'use strict';

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

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        !riskPremium || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender) {

        return;
    }

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.policyPrintout == 'healthVectorPolicyPrintout') {

        return true;
    }
};
