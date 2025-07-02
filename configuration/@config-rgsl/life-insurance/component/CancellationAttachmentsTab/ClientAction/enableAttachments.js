'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { cancellationAmendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function enableAttachments(input, ambientProperties) {

    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    const state = input.rootContext.State.Code;

    if (isDocumentLocked &&
        state !== cancellationAmendmentState.RequestToClient &&
        state !== cancellationAmendmentState.AwaitingApproval &&
        state !== cancellationAmendmentState.AwaitingCancellationDate) {

        return false;
    }

    return true;
};
