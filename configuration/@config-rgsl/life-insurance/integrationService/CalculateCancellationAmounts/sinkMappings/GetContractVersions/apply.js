'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const contractVersions = (sinkResult?.data ?? []).map(_ => ({
        contractId: _.resultData.contractId,
        contractNumber: _.resultData.contractNumber,
        seqNumber: _.resultData.seqNumber,
        body: _.resultData.body,
        commonBody: _.resultData.commonBody,
        snapshotBody: _.resultData.snapshotBody,
        versionState: _.resultData.versionState,
        stateId: _.resultData.stateId,
        configurationName: _.resultData.configurationName,
        dimensions: _.resultData.dimensions,
        createdOn: _.resultData.createdOn,
        contractState: _.resultData.contractState,
        documentType: _.resultData.documentType,
        documentState: _.resultData.documentState,
        productDescription: _.resultData.productDescription,
    }));

    const contractStateVersions = contractVersions.filter(i => i.seqNumber == 0 ||
        i.dimensions?.some(d => d.Key === 'amendmentType' && (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

    const originalContractStateVersion = contractStateVersions.find(i => i.seqNumber == 0);
    const latestContractStateVersion = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber)[0];

    const stateBody = (latestContractStateVersion.seqNumber == 0 ? latestContractStateVersion.body : latestContractStateVersion.snapshotBody)
    ?? originalContractStateVersion.body;

    sinkExchange.contractStateBody = stateBody;
};
