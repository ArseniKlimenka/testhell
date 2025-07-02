'use strict';

const { isSaveOperationAvailable, refreshView } = require('@config-rgsl/agent-agreement-base/lib/AAGeneralHelper');
const { documentEditMode } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');

module.exports = function onLoadDocumentAction(input) {

    input.rootContext.ClientViewModel.documentEditMode = documentEditMode.cancellationAmendment;

    const isDocumentLocked = !isSaveOperationAvailable(this.view);

    if (isDocumentLocked) {

        this.view.disableAllElements();
    }

    refreshView(this.view);
};
