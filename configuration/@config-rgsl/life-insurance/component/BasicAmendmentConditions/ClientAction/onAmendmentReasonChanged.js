'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

module.exports = function onAmendmentReasonChanged(input) {

    const amendmentReason = input.componentContext.amendmentReason;
    const contractVersions = input.additionalContext.contractVersions ?? [];

    const contractStateVersions = contractVersions.filter(i => i.seqNumber == 0 ||
        i.dimensions?.some(d => d.Key === 'amendmentType' &&
            (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

    const contractVersionsSorted = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber);
    const originalDocumentVersion = contractVersionsSorted.find(item => item.seqNumber == 0) ?? {};
    const originalDocumentBody = originalDocumentVersion.body ?? {};
    const originalDocumentStartDate = originalDocumentBody.policyTerms?.startDate;
    const latestContractStateVersion = contractVersionsSorted[0];

    const stateBody = (latestContractStateVersion.seqNumber == 0 ?
        latestContractStateVersion.body : latestContractStateVersion.snapshotBody) ??
        latestContractStateVersion.body;

    if (amendmentReason == amendmentConstants.amendmentReason.byClientCoolOff) {

        input.componentContext.validFrom = originalDocumentStartDate;
    }

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
