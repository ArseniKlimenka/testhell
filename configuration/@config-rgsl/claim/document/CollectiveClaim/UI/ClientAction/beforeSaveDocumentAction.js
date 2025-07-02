'use strict';

const { checkIfInsuredEventActive, calculateCollectiveClaimAmounts } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

/**
 * @translationKey {translationKey} InsuredEventCancelled
 */
module.exports = async function beforeSaveDocumentAction(input, ambientProperties) {

    const insuredEventNumber = input.context.Body.mainAttributes?.insuredEvent?.insuredEventNumber;
    const number = input.context.Number;

    if (insuredEventNumber) {

        const isInsuredEventActive = checkIfInsuredEventActive(insuredEventNumber, ambientProperties);

        if (!isInsuredEventActive) {

            ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.InsuredEventCancelled', 'OK', 'OK', 2);
            return false;
        }
    }

    if (number) {
        await calculateCollectiveClaimAmounts(input.context.Body, number, ambientProperties);
    }

    delete input.context.Body.tempTechnicalData;
};
