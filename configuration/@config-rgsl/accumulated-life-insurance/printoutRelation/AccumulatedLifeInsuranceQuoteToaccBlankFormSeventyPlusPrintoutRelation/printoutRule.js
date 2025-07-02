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

    const issueDate = basicConditions?.issueDate;
    const insuranceTerm = basicConditions?.insuranceTerms;
    const paymentFrequencyCode = basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const riskPremium = basicConditions?.riskPremium;
    const riskInsuredSum = basicConditions?.riskInsuredSum;

    const phDateOfBirth = policyHolderData?.dateOfBirth;
    const phPersonGender = policyHolderData?.personGender;

    const ipDateOfBirth = insuredPersonData?.dateOfBirth;
    const ipPersonGender = insuredPersonData?.personGender;

    if (!productCode || !issueDate || !insuranceTerm || !paymentFrequencyCode ||
        (!riskPremium && !riskInsuredSum) || !phDateOfBirth || !phPersonGender || !ipDateOfBirth || !ipPersonGender) {

        return;
    }

    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isEPolicy = issueFormCode == 'ePolicy';
    const holder70plus = dateHelper.getYearNumber(phDateOfBirth, issueDate) >= 71;
    const productConf = input.body?.productConfiguration ?? {};

    const isVTBpartner = mainInsuranceConditions?.partner?.partnerBusinessCode == lifeInsuranceConstants.partnerCode.VTB;

    const products = lifeInsuranceConstants.product;
    const isECATFVTB = [products.ECATFPVTB, products.ECATFVVTB].includes(productCode);
    const isECOFVTB = [products.ECOFPVTB, products.ECOFVVTB].includes(productCode);

    if (isECOFVTB && holder70plus) { return true; }

    if (productConf.policyPrintout == 'beMillionaireBFKOPolicyPrintout' && !isEPolicy && isVTBpartner && !isECATFVTB && holder70plus) {

        return true;
    }
};
