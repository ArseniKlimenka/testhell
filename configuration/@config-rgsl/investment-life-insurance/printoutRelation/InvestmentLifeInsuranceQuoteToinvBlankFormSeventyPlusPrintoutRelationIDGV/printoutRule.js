const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

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

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        !riskPremium || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender ||
        !strategyCode) {
        return;
    }

    const holder70plus = dateHelper.getYearNumber(phDateOfBirth, issueDate) >= 71;

    if ((productGroupArray.INV_SEVENTY_PLUS_IDG_ULTRA.includes(productCode) || productGroupArray.PB_SEVENTY_PLUS_IDG.includes(productCode)) &&
        holder70plus) {
        return true;
    }
};
