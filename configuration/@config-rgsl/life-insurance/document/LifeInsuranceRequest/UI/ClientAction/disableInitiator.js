'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { documentActors, documentStates } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const disableInitiatorInStates = [
    documentStates.Issued,
    documentStates.CreateAmendment,
    documentStates.CreateFinancialAmendment,
    documentStates.CreateFinancialPolicyHolderChangeAmendment,
    documentStates.CreateNonFinancialAmendment,
    documentStates.AmendmentsCreated,
    documentStates.AmendmentsCancelled
];

module.exports = function disableInitiator(input, ambientProperties) {

    const documentStateCode = getValue(input, 'context.State.Code');
    const isAgent = input?.context?.WorkUnitActor?.CurrentActor == documentActors.Agent;

    if ((disableInitiatorInStates.includes(documentStateCode) || isAgent)) {
        return true;
    }

    return false;

};
