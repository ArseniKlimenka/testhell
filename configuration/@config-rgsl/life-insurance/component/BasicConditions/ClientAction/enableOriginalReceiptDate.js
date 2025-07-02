'use strict';

const { actor, issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function enableOriginalReceiptDate(input, ambientProperties) {
    const currentActor = ambientProperties?.currentWorkUnitActor;
    const issueFormCode = input?.additionalContext?.issueFormCode;

    // Не убирать, закомментировано для временного скрытия функционала
    // if(currentActor === actor.Operations && issueFormCode && issueFormCode !== issueForm.ePolicy.issueFormCode && issueFormCode !== issueForm.offer.issueFormCode) {
    //     return true;
    // }

    return false;
};
