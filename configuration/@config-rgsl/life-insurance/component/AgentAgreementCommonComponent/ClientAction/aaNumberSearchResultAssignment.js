module.exports = async function aaNumberSearchResultAssignment(input) {
    const selectedItems = input.getLookupSelection();
    const selectedItem = selectedItems[0].resultData;
    input.context.Body.commission.agentAgreement.id = selectedItem.id;
    input.context.Body.commission.agentAgreement.number = selectedItem.documentCode;
    input.context.Body.commission.agentAgreement.manualNumber = selectedItem.manualNumber;
    input.context.Body.commission.agentAgreement.externalNumber = selectedItem.externalNumber;
    input.context.Body.commission.agentAgreement.formatedNumber = `${selectedItem.documentCode}/${selectedItem.externalNumber}`;
};
