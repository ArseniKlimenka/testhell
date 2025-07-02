'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isActuaryConclusionEnabled(input) {

    return input.context.State.Code === 'ActuaryApproval' && isSaveOperationAvailable(this.view);
};
