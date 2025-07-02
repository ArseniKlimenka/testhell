'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isUnderwriterConclusionEnabled(input) {

    return input.context.State.Code === 'UnderwriterApproval' && isSaveOperationAvailable(this.view);
};
