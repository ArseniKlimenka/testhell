'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableTaxDeductionTable(input) {

    return isSaveOperationAvailable(this.view);
};
