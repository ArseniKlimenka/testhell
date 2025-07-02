'use strict';

const { parseHighlightedErrorMessage } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} NeedInputContractNumber
 */

module.exports = async function searchContractButton(input, ambientProperties) {

    if (!input.componentContext?.number) {

        const ONLY_OK_BUTTON = 1;

        const translate = ambientProperties.services.translate.getSync;
        const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'NeedInputContractNumber');
        ambientProperties.services.confirmationDialog.showWarning(msg, "OK", "Cancel", ONLY_OK_BUTTON);
        return;
    }

    try {

        await this.view.evaluate(['/accountingCertificateEnrichments'], false, true);
    } catch (error) {
        throw new Error(parseHighlightedErrorMessage(error.error.StackTrace));
    }
};
