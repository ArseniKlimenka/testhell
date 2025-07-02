'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = async function beforeSaveProductConfiguration(input, ambientProperties) {

    const productCode = input.context.Body?.mainConditions?.insuranceProduct?.productCode;

    if (!productCode) {

        ambientProperties.services.confirmationDialog.showConfirmation(`Пожалуйста, укажите продукт и сохраните документ!`, 'OK', 'OK', 2);
        return false;
    }

    this.view.validate();

};
