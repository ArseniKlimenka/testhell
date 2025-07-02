'use strict';

const { policyState, product, productGroupArray, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

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
    const isReinvest = productGroupArray.REINVEST.includes(productCode);
    const strategyCode = body.basicInvestmentParameters.investmentStrategy.investmentStrategyCode;
    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    const documentState = this.businessContext.documentState;
    const documentStateIsActive = [policyState.Active, policyState.Activated].includes(documentState);
    const isBFKO17 = [product.IBI3BFKO17, product.IBI5BFKO17].includes(productCode);
    const isZENIT = productGroupArray.IDG_ZENIT.includes(productCode);
    const sysActor = this.applicationContext.actor;
    const isSystemActor = sysActor == actor.System;

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        !riskPremium || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender ||
        !strategyCode || !documentStateIsActive || isReinvest) {

        return;
    } else if ((isSystemActor && isZENIT) || isBFKO17 || (isEPolicy == true)) {

        return true;
    }
};
