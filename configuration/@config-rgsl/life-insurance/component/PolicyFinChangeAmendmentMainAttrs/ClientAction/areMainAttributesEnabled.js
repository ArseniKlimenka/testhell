'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function areMainAttributesEnabled(input) {

    return (input.context.State.Code === 'OperationsApproval' || input.context.State.Code === 'Draft') && isSaveOperationAvailable(this.view);
};
