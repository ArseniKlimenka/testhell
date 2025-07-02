'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function enableAttachments(input) {

    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    const state = input.rootContext.State?.Code;

    if (isDocumentLocked &&
        state !== endowmentStates.awaitingInquiries &&
        state !== endowmentStates.awaitingApproval &&
        state !== endowmentStates.awaitingEndowmentDate) {

        return false;
    }

    return true;
};
