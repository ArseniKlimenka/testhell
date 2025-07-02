'use strict';

const { changeEndowmentStatus } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { endowmentTransitions } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function sendOperationsDirectorApprovalToDeputyDirectorApproval(input, ambientProperties) {
    changeEndowmentStatus(endowmentTransitions.operationsDirectorToDeputyDirector, this.view, ambientProperties);
};
