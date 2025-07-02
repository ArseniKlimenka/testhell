'use strict';

const { changeEndowmentStatus } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { endowmentTransitions } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function sendDeputyDirectorApprovalToSentToPayment(input, ambientProperties) {
    changeEndowmentStatus(endowmentTransitions.deputyDirectorToSentToPayment, this.view, ambientProperties);
};
