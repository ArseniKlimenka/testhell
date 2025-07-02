'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const contractVersions = sinkResult.data && sinkResult.data.map(item => item.resultData) || [];

    const contractStateVersions = contractVersions.filter(i => i.seqNumber == 0 ||
        i.dimensions?.some(d => d.Key === 'amendmentType' && (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

    const originalContractStateVersion = contractStateVersions.find(i => i.seqNumber == 0);
    const latestContractStateVersion = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber)[0];
    const latestContractVersion = contractVersions.sort((a, b) => b.seqNumber - a.seqNumber)[0];

    const stateBody = (latestContractStateVersion.seqNumber == 0 ? latestContractStateVersion.body : latestContractStateVersion.snapshotBody)
        ?? originalContractStateVersion.body;

    const holder = stateBody.policyHolder;

    sinkExchange.stateBody = stateBody;
    sinkExchange.originalContractVersion = originalContractStateVersion;
    sinkExchange.latestStateContractVersion = latestContractStateVersion;
    sinkExchange.latestContractVersion = latestContractVersion;
    sinkExchange.contractVersions = contractVersions;
    sinkExchange.holder = holder;

};
