'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function economicParametersOnPrepareAddedRow(input, ambientProperties) {

    const { rootContext, affectedRow } = input;

    if (!rootContext.Number && ambientProperties.configurationCodeName != "ContractEntity") {

        ambientProperties.services.confirmationDialog.showConfirmation(`Пожалуйста, сохраните документ!`, 'OK', 'OK', 2);
        return false;
    }

    affectedRow.enterValuesDate = DateTimeUtils.dateTimeNow();

    affectedRow.partner = {};

    affectedRow.insuranceProduct = input.additionalContext?.insuranceProduct ?? {};

    this.view.validate();

    return true;
};
