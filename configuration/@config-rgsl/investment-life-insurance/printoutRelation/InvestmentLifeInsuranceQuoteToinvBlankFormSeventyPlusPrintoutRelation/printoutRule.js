'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(input) {

    const body = input?.body;
    const basicConditions = body?.basicConditions;
    const mainInsuranceConditions = body?.mainInsuranceConditions;
    const policyHolderData = body?.policyHolder?.partyData?.partyBody?.partyPersonData;
    const insuredPersonData = body?.insuredPerson?.partyData?.partyBody?.partyPersonData;

    const productCode = mainInsuranceConditions?.insuranceProduct?.productCode;
    const partnerBusinessCode = mainInsuranceConditions?.partner?.partnerBusinessCode;

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

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        !riskPremium || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender ||
        !strategyCode) {

        return;
    }


    const isEPolicy = issueFormCode == 'ePolicy';
    const holder70plus = dateHelper.getYearNumber(phDateOfBirth, issueDate) >= 71;
    const isVTBpartner = partnerBusinessCode == lifeInsuranceConstants.partnerCode.VTB;
    const productConf = input.body?.productConfiguration ?? {};

    const policyPrintouts = ['basisActivePolicyPrintout', 'driverGuaranteePSBPolicyPrintout'];

    if (!lifeInsuranceConstants.productGroupArray.TRIGGER_SKIP_IDGP.includes(productCode) && !lifeInsuranceConstants.productGroupArray.INV_SEVENTY_PLUS_IDG_ULTRA.includes(productCode) && policyPrintouts.includes(productConf.policyPrintout) && !isEPolicy && isVTBpartner && holder70plus) {

        return true;
    }
};
