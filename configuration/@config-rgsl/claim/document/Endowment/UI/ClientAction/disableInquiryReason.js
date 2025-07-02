'use strict';
const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function disableInquiryReason(input, ambientProperties) {

    const state = input.rootContext.State.Code;
    const currentActor = input.rootContext.WorkUnitActor?.CurrentActor;
    const selectedDepartment = input.context.ClientViewModel.inquiriesData.department?.code ?? '';
    const departmentCodesToAllow = ['agentSalesSupport', 'partnerSalesSupport', 'callCenter'];

    return currentActor !== 'Operations' ||
        state !== endowmentStates.operationsApproval ||
        !departmentCodesToAllow.includes(selectedDepartment);
};
