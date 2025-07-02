'use strict';

const { processProductSelection } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = async function onChangeIssueDate(input, ambientProperties) {

    if (input?.componentContext?.sportTypes?.selectedTypes?.length > 0) {
        input.componentContext.sportTypes.selectedTypes = [];
    }

    const body = input.context.Body;
    const clientViewModel = input.context.ClientViewModel;

    const isOnChangeInsuranceProduct = false;
    const isOnChangeIssueDate = true;
    const isOnChangePaymentFrequency = false;
    const checkResults = await processProductSelection(body, this, ambientProperties, isOnChangeInsuranceProduct, isOnChangeIssueDate, isOnChangePaymentFrequency);

    if (checkResults && checkResults.length > 0) {
        clientViewModel.checkResults = checkResults;
        const notificationMessage = "При изменении даты заключения некоторых полей было скорректировано: "
            + checkResults.map(item => item.messageText).join('; ');
        ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
    }

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();

};
