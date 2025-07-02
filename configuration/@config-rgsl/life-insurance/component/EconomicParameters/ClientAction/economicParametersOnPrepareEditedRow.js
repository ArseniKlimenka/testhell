'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getProductConfigurationForEconomics, getProductConfigurationNotifications } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = async function economicParametersOnPrepareEditedRow(input, ambientProperties) {

    const { rootContext, affectedRow } = input;

    if (!rootContext.Number) {

        ambientProperties.services.confirmationDialog.showConfirmation(`Пожалуйста, сохраните документ!`, 'OK', 'OK', 2);
        return false;
    }

    const productConfigurations = await getProductConfigurationForEconomics(input, ambientProperties, this);
    await getProductConfigurationNotifications(input, ambientProperties, this, productConfigurations);

    affectedRow.enterValuesDate = DateTimeUtils.dateTimeNow();

    return true;
};
