'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function areRequestFieldsEnabled(input) {

    return input.context.State.Code === 'OperationsApproval' && isSaveOperationAvailable(this.view);
};
