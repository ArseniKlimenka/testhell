'use strict';

const { actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { cancellationAmendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function disableInquiryReason(input, ambientProperties) {

    const state = input.rootContext.State.Code;
    const currentActor = input.rootContext.WorkUnitActor?.CurrentActor;
    const selectedDepartment = input.context.ClientViewModel.inquiriesData.department?.code ?? '';
    const departmentCodesToAllow = ['agentSalesSupport', 'partnerSalesSupport', 'callCenter'];

    return currentActor !== actor.Operations ||
        state === cancellationAmendmentState.Active ||
        state === cancellationAmendmentState.SentToPayment ||
        state === cancellationAmendmentState.Paid ||
        state === cancellationAmendmentState.Cancelled ||
        !departmentCodesToAllow.includes(selectedDepartment);
};
