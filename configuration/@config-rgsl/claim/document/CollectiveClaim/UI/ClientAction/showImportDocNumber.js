'use strict';

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function showImportDocNumber(input) {

    const stateCode = input.context.State?.Code;
    return stateCode === claimStates.claimImportInProgress;
};
