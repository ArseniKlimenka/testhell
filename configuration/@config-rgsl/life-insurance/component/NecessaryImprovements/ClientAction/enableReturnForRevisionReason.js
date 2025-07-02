'use strict';

const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const {
    documentStates,
    documentActors
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const enableReturnForRevisionReasonInStates = [
    documentStates.OnReview
];
const enableReturnForRevisionReasonForActors = [
    documentActors.GeneralBackOffice
];

module.exports = function enableReturnForRevisionReason(input, ambientProperties) {

    const documentStateCode = getValue(input, 'context.State.Code');
    const currentWorkUnitActor = getValue(ambientProperties, 'currentWorkUnitActor');

    if (enableReturnForRevisionReasonInStates.includes(documentStateCode) && enableReturnForRevisionReasonForActors.includes(currentWorkUnitActor)) {
        return true;
    }

    return false;

};
