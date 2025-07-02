'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function canCopyRow(input) {

    return isSaveOperationAvailable(this.view);
};
