'use strict';

const { changeEndowmentStatus } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { endowmentTransitions } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function sendOperationsApprovalToOperationsDirectorApproval(input, ambientProperties) {
    changeEndowmentStatus(endowmentTransitions.operationsToOperationsDirector, this.view, ambientProperties);
};
