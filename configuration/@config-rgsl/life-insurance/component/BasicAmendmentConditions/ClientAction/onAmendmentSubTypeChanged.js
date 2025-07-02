'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function onAmendmentSubTypeChanged(input) {

    const amendmentSubType = input.componentContext.amendmentSubType;
    delete input.componentContext.amendmentReason;

    if (amendmentSubType === amendmentConstants.amendmentSubType.byCourtDecision) {

        input.componentContext.amendmentReason = amendmentConstants.amendmentReason.byCourt;
    }
    else if (amendmentSubType === amendmentConstants.amendmentSubType.byCommissionDecision) {

        input.componentContext.amendmentReason = amendmentConstants.amendmentReason.individualCommission;
    }

    const contractVersions = input.additionalContext.contractVersions ?? [];

    const contractStateVersions = contractVersions.filter(i => i.seqNumber == 0 ||
        i.dimensions?.some(d => d.Key === 'amendmentType' &&
            (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

    const contractVersionsSorted = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber);
    const latestContractStateVersion = contractVersionsSorted[0];

    const stateBody = (latestContractStateVersion.seqNumber == 0 ?
        latestContractStateVersion.body : latestContractStateVersion.snapshotBody) ??
        latestContractStateVersion.body;

    const fakeBody = {
        contractVersions: input.additionalContext.contractVersions,
        paymentAmendmentConditions: input.additionalContext.paymentAmendmentConditions,
        basicAmendmentConditions: input.componentContext,
    };
    amendmentUtils.setCancellationPaymentLines(fakeBody, stateBody);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
