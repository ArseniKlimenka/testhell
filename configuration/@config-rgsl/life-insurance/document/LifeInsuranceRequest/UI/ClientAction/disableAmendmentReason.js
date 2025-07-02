const {
    getValue
} = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const {
    documentStates,
    documentActors
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const disableAmendmentReasonInStates = [
    documentStates.Issued,
    documentStates.Correction,
    documentStates.CancelWithoutPayment,
    documentStates.RefusalToTerminateByPolicyholder,
    documentStates.Cancelled
];
const disableAmendmentReasonForActors = [
    documentActors.Agent,
    documentActors.GeneralBackOffice,
    documentActors.Operations
];

module.exports = function disableAmendmentReason(input, ambientProperties) {

    const documentStateCode = getValue(input, 'context.State.Code');
    const currentWorkUnitActor = getValue(ambientProperties, 'currentWorkUnitActor');

    if (([documentStates.OnReview].includes(documentStateCode) && [documentActors.Agent].includes(currentWorkUnitActor)) || (
        disableAmendmentReasonInStates.includes(documentStateCode) && disableAmendmentReasonForActors.includes(currentWorkUnitActor))) {
        return true;
    }

};
