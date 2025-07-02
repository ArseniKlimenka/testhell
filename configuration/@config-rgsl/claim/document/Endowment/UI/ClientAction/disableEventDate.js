'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { insuredEventReasons } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function disableEventDate(input) {

    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    const endowmentReason = input.context.Body.mainAttributes?.eventReason?.code;

    return endowmentReason === insuredEventReasons.contractEnd.code || isDocumentLocked || this.view.areAllElementsDisabled();
};
