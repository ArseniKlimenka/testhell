'use strict';

/**
 * @translationKey {translationKey} DataIsNotSelected
 */
module.exports = function checkLookupResultSelected(input, ambientProperties) {
    const selection = input.getLookupData().selection;

    if (selection && selection.length > 0) {
        return true;
    }
    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.DataIsNotSelected');
    return false;

};
