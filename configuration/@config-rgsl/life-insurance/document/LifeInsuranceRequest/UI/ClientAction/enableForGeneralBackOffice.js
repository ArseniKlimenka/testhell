'use strict';

const {
    documentStates,
    documentActors
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

const enableInStates = [
    documentStates.Draft,
    documentStates.Correction,
    documentStates.OnReview
];

const enableForActors = [
    documentActors.GeneralBackOffice,
    documentActors.Operations
];

module.exports = function enableForGeneralBackOffice(input, ambientProperties) {

    const documentStateCode = input.context.State?.Code;
    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;

    if (enableInStates.includes(documentStateCode) && enableForActors.includes(currentWorkUnitActor)) {
        return true;
    }

};
