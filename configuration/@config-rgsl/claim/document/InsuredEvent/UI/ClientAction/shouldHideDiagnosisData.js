'use strict';

const { operationsOnlyTypes } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function shouldHideDiagnosisData(input, ambientProperties) {

    const currentActor = ambientProperties.currentWorkUnitActor;
    const currentEventType = input.context.Body.insuredEventType?.code;

    return currentActor === "Operations" || operationsOnlyTypes.includes(currentEventType);
};
