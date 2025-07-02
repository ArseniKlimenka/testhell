'use strict';

/**
 * @translationKey {translationKey} DuplicatedPOItem
 */
module.exports = function beforePOItemsGridAction(input, ambientProperties) {

    if (input.operationType === 'Add') {

        const itemType = input.affectedRow.itemType;
        const existingItem = input.gridData.find(item => item.itemType === itemType);

        if (existingItem) {

            ambientProperties.services.confirmationDialog
                .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.DuplicatedPOItem', 'OK', 'OK', 2);
            return false;
        }
    }

    return true;
};
