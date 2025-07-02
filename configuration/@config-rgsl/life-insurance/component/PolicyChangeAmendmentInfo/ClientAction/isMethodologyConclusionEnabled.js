'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isMethodologyConclusionEnabled(input) {

    return input.context.State.Code === 'InsuranceMethodologyApproval' && isSaveOperationAvailable(this.view);
};
