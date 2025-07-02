'use strict';

const { changeEndowmentStatus } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { endowmentTransitions } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function sendOperationsDirectorApprovalToSentToPayment(input, ambientProperties) {
    changeEndowmentStatus(endowmentTransitions.operationsDirectorToSentToPayment, this.view, ambientProperties);
};
