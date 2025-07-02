'use strict';
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableCancellationRecipientsTable(input) {

    return isSaveOperationAvailable(this.view);
};
