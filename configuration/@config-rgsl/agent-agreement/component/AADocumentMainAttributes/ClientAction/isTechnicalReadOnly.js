'use strict';

const { documentEditMode } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');

module.exports = function isTechnicalReadOnly(input) {

    return input.rootContext.ClientViewModel.documentEditMode === documentEditMode.changeAmendment ||
        input.rootContext.ClientViewModel.isDocumentLocked;
};
