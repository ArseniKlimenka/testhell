'use strict';

/**
 * @translationKey {translationKey} AdditionalServicesAreNotSelected
 */

module.exports = async function checkBeforeConfirmSelectAdditionalServices(input, ambientProperties) {

    const selection = input.getLookupData().selection;

    if (!selection) {
        await ambientProperties.services.confirmationDialog.showError(translate(ambientProperties, 'AdditionalServicesAreNotSelected'), 'OK', 'OK', 1);

        return false;
    }

    return true;
};

function translate(ambientProperties, translationKey) {

    return ambientProperties.services.translate.getSync(ambientProperties.configurationCodeName.toUpperCase(), translationKey);
}
