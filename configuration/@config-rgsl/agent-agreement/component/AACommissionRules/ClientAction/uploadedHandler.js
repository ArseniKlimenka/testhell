'use strict';

/**
 * @translationKey {translationKey} FileUploaded
 */

module.exports = async function uploadedHandler(input, ambientProperties) {

    ambientProperties.services.confirmationDialog
        .showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.FileUploaded', "OK", "Cancel", 1);
};
