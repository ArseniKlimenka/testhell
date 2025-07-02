'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult.data?.length > 0) {

        const contractVersionsMapped = sinkResult.data.map(data => data.resultData);

        const contractStateVersions = contractVersionsMapped.filter(i => i.seqNumber == 0 ||
            i.dimensions?.some(d => d.Key === 'amendmentType' &&
                (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

        const contractVersionsSorted = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber);

        const latestContractStateVersion = contractVersionsSorted[0];
        const initialVersion = contractVersionsSorted.find(d => d.seqNumber == 0);

        const stateBody = (latestContractStateVersion.seqNumber == 0 ?
            latestContractStateVersion.body : latestContractStateVersion.snapshotBody) ??
            latestContractStateVersion.body;

        const isPolicyPartiesSamePerson = stateBody.policyHolder.partyData.partyCode === stateBody.insuredPerson.partyData.partyCode;
        const selectedRiskCode = sinkExchange.selectedRiskCode;
        const riskData = stateBody.risks.find(r => r.risk.riskCode === selectedRiskCode);
        const riskPerson = riskData.risk.riskPerson;

        if (!isPolicyPartiesSamePerson && riskPerson === 'policyHolder') {

            this.stopExecution();
            return;
        }

        sinkExchange.contractData = stateBody;
        sinkExchange.originalContractId = initialVersion.contractId;
        sinkExchange.contractVersions = contractVersionsMapped;
    }
    else {

        throw 'Contract not found!';
    }
};
