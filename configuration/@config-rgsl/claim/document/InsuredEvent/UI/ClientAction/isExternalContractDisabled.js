'use strict';

module.exports = function isExternalContractDisabled(input) {

    const isExternal = input.context.Body.contract?.isExternal;
    return !isExternal || this.view.areAllElementsDisabled();
};
