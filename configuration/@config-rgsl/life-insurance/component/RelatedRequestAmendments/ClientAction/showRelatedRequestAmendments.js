'use strict';

const { documentStates } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function showRelatedRequestAmendments(input, ambientProperties) {

    const showRelatedAmendmentsInRequestStates = [
        documentStates.Issued,
        documentStates.CancelWithoutPayment,
        documentStates.CreateAmendment,
        documentStates.AmendmentsCreated
    ];

    if (showRelatedAmendmentsInRequestStates.includes(input.rootContext.State.Code)) {
        return true;
    }

};
