'use strict';

module.exports = function rule(input) {

    const body = input?.body;
    const basicConditions = body?.basicConditions;
    const mainInsuranceConditions = body?.mainInsuranceConditions;
    const policyHolderData = body?.policyHolder?.partyData?.partyBody?.partyPersonData;
    const insuredPersonData = body?.insuredPerson?.partyData?.partyBody?.partyPersonData;

    const productCode = mainInsuranceConditions?.insuranceProduct?.productCode;

    const issueDate = basicConditions?.issueDate;
    const insuranceTerm = basicConditions?.insuranceTerms;
    const paymentFrequencyCode = basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const riskPremium = basicConditions?.riskPremium;

    const phDateOfBirth = policyHolderData?.dateOfBirth;
    const phPersonGender = policyHolderData?.personGender;

    const ipDateOfBirth = insuredPersonData?.dateOfBirth;
    const ipPersonGender = insuredPersonData?.personGender;

    const strategyCode = body?.basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;

    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isEPolicy = issueFormCode == 'ePolicy';

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        !riskPremium || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender ||
        !strategyCode) {
        return;
    }

    const productConf = input.body?.productConfiguration ?? {};
    if (productConf.policyPrintout == 'basisActivePolicyPrintout' && isEPolicy == false) {
        return true;
    }
};
