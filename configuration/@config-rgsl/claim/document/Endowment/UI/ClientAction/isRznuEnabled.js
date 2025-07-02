'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function isRznuEnabled(input) {

    return isSaveOperationAvailable(this.view) && !!input.rootContext.Body.endowmentAmounts.manualRznu;
};
