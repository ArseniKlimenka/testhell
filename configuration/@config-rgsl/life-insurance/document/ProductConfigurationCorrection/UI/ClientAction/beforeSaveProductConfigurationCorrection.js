'use strict';

module.exports = async function beforeSaveProductConfigurationCorrection(input, ambientProperties) {

    const productCode = input.context.Body?.mainConditions?.insuranceProduct?.productCode;

    if (!productCode) {

        ambientProperties.services.confirmationDialog.showConfirmation(`Пожалуйста, укажите продукт и сохраните документ!`, 'OK', 'OK', 2);
        return false;
    }

    this.view.validate();

};
