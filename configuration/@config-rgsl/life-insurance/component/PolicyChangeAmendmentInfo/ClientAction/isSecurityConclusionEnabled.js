'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isSecurityConclusionEnabled(input) {

    return input.context.State.Code === 'SecurityApproval' && isSaveOperationAvailable(this.view);
};
