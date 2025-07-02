'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { operationsOnlyTypes } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function onLoadDocumentAction(input, ambientProperties) {

    this.view.startBlockingUI();

    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    const currentEventTypeCode = input.context.Body.insuredEventType?.code;
    const currentActor = ambientProperties.currentWorkUnitActor;
    const enabledForActor = (currentActor === 'ClaimManager' && !operationsOnlyTypes.includes(currentEventTypeCode)) ||
        (currentActor === 'Operations' && operationsOnlyTypes.includes(currentEventTypeCode));
    const state = input.context.State?.Code;

    await this.view.evaluate(['[GetPolicyDates]'], false, true);
    this.view.setClean();

    if (isDocumentLocked) {

        this.view.disableAllElements();
    }
    else if (currentEventTypeCode && !enabledForActor && state === "Draft") {

        this.view.getContext().AvailableOperations.length = 0;
        this.view.rebind();
        this.view.reevaluateRules();
        this.view.validate();
        this.view.disableAllElements();
    }

    this.view.stopBlockingUI();
};
