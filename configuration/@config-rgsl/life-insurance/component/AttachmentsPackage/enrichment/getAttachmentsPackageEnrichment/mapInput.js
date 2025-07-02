const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapInput(input) {

    const entitiesIds = [];
    let documentNumber;

    const body = getValue(this, 'businessContext.rootData');
    const contractId = getValue(this, 'businessContext.entityId');
    const contextDocumentNumber = getValue(this, 'businessContext.documentNumber');
    const contractType = getValue(this, 'businessContext.configurationDimensions.contractType');
    const isQuote = contractType == 'Quote';

    const policyHolderPartyId = getValue(body, 'policyHolder.partyData.partyId');
    const insuredPersonPartyId = getValue(body, 'insuredPerson.partyData.partyId');

    if (contractId) { entitiesIds.push(contractId); }
    if (policyHolderPartyId) { entitiesIds.push(policyHolderPartyId); }
    if (insuredPersonPartyId) { entitiesIds.push(insuredPersonPartyId); }

    // for quotes, because we have no entityId in businessContext...
    if (isQuote) {
        documentNumber = contextDocumentNumber;
    }

    // for amendments, because we have no entityId in businessContext...
    const contractVersions = getValue(body, 'contractVersions', []);

    if (contractVersions.length > 0) {

        const originalContractId = contractVersions.find(v => v.seqNumber === 0).contractId;

        if (originalContractId) {

            entitiesIds.push(originalContractId);
        }
    }

    // if nothing - do nothing
    if (entitiesIds.length == 0) { return; }

    return {
        data: {
            criteria: {
                entitiesIds,
                documentNumber
            }
        }
    };
};
