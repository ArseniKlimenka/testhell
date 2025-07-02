'use strict';

module.exports = function rule(input) {

    const body = input.body;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate;
    const insuranceTerm = body.basicConditions?.insuranceTerms;
    const insuranceTermsDays = body.basicConditions?.insuranceTermsDays;
    const paymentFrequencyCode = body.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const riskInsuredSum = body.basicConditions?.riskInsuredSum;
    const phDateOfBirth = body.policyHolder?.partyData?.partyBody?.partyPersonData?.dateOfBirth;
    const ipDateOfBirth = body.insuredPerson?.partyData?.partyBody?.partyPersonData?.dateOfBirth;

    if (!productCode || !issueDate || (!insuranceTerm && !insuranceTermsDays) || !paymentFrequencyCode ||
        !riskInsuredSum || !phDateOfBirth || !ipDateOfBirth) {

        return;
    }

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.policyPrintout == 'sportPolicy') {

        return true;
    }
};
