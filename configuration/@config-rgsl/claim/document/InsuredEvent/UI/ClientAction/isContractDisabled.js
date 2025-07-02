'use strict';

module.exports = function isContractDisabled(input) {

    const isExternal = input.context.Body.contract?.isExternal;

    return !!isExternal || this.view.areAllElementsDisabled();
};
