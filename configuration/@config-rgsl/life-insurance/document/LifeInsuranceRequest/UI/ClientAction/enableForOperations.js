'use strict';

const {
    documentStates,
    documentActors,
    typeOfRequest
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function enableForOperations(input, ambientProperties) {
    const documentStateCode = input.context.State?.Code;
    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const currentTypeOfRequest = input.context.Body.typeOfRequest;

    if (currentWorkUnitActor == documentActors.Operations) {

        if (currentTypeOfRequest == typeOfRequest.Cancellation && documentStateCode == documentStates.OnReview) {
            return true;
        }

        if (currentTypeOfRequest == typeOfRequest.Modification && documentStateCode == documentStates.CreateAmendment) {
            return true;
        }
    }
};
