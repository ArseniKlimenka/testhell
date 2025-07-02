'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { documentStates } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const disablePolicyNumberInStates = [
    documentStates.Issued,
    documentStates.CreateAmendment,
    documentStates.CreateFinancialAmendment,
    documentStates.CreateFinancialPolicyHolderChangeAmendment,
    documentStates.CreateNonFinancialAmendment,
    documentStates.AmendmentsCreated,
    documentStates.AmendmentsCancelled
];

module.exports = function disablePolicyNumber(input, ambientProperties) {

    const documentStateCode = getValue(input, 'context.State.Code');
    const policyWasFound = getValue(input, 'context.Body.technicalInformation.policyWasFound');

    return disablePolicyNumberInStates.includes(documentStateCode) || policyWasFound;

};
