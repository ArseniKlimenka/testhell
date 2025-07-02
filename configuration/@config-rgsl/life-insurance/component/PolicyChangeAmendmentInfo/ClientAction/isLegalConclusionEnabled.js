'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isLegalConclusionEnabled(input) {

    return input.context.State.Code === 'LegalApproval' && isSaveOperationAvailable(this.view);
};
