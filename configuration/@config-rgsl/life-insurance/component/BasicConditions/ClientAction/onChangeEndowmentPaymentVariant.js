'use strict';

const { processProductSelection } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = async function onChangeEndowmentPaymentVariant(input, ambientProperties) {

    const body = input.context.Body;
    const clientViewModel = input.context.ClientViewModel;

    const isOnChangeInsuranceProduct = false;
    const isOnChangeIssueDate = false;
    const isOnChangePaymentFrequency = false;
    const checkResults = await processProductSelection(body, this, ambientProperties, isOnChangeInsuranceProduct, isOnChangeIssueDate, isOnChangePaymentFrequency);

    if (checkResults && checkResults.length > 0) {
        clientViewModel.checkResults = checkResults;
        const notificationMessage = "При изменении продукта значение некоторых полей было скорректировано: "
            + checkResults.map(item => item.messageText).join('; ');
        ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
    }

    this.rebindComponent();

};
