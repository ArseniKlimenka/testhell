'use strict';

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
    const isReinvest = lifeInsuranceConstants.productGroupArray.REINVEST.includes(productCode);
    const strategyCode = body.basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;
    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const hidePrintout = lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode) || lifeInsuranceConstants.productGroupArray.IDG_RET_VTB.includes(productCode);

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        !riskPremium || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender ||
        !strategyCode || hidePrintout) {

        return;
    }

    const isEPolicy = issueFormCode == 'ePolicy';

    if (isEPolicy && !isReinvest) {

        return true;
    }
};
