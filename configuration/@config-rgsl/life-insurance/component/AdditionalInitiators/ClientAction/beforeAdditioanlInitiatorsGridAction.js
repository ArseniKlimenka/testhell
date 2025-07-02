'use strict';

module.exports = function beforeAdditioanlInitiatorsGridAction(input, ambientProperties) {

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

    if (input.operationType === 'Add' || input.operationType === 'Edit') {

        const isUnique = checkIfAdditionalInitiatorUnique(input, input.operationType, ambientProperties);

        if (!isUnique) {

            ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.UnableToAddDuplicatedInitiator', 'OK', 'OK', 2);
            return false;
        }
    }

    return true;
};

function checkIfAdditionalInitiatorUnique(input, operationType) {

    const itemsToCheck = [];

    if (!input.componentContext.additionalInitiatorsLines) {
        input.componentContext.additionalInitiatorsLines = [];
    }

    input.componentContext.additionalInitiatorsLines?.forEach(function(item) {

        itemsToCheck.push({ agent: item.agent?.userId, agentType: item.agentType });
    });

    if (operationType === 'Add' || operationType === 'Edit') {
        itemsToCheck.push({ agent: input.affectedRow?.agent?.userId, agentType: input.affectedRow?.agentType });
    }

    const unique = itemsToCheck.filter((obj, index) => itemsToCheck.findIndex((item) => item.agent === obj.agent || obj.agentType === item.agentType) === index);
    const duplicated = itemsToCheck.filter(i => !unique.includes(i));
    return duplicated?.length === 0;
}
