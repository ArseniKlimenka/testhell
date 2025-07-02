'use strict';

module.exports = async function afterCancellationRecipientsGridAction(input, ambientProperties) {

    this.view.startBlockingUI();
    const recipients = input.componentContext.canellationRecipients ?? [];

    if (recipients.length === 0 && input.rootContext.Body.tempTechnicalData?.recipientsBankAccounts) {

        delete input.rootContext.Body.tempTechnicalData.recipientsBankAccounts;
    }
    else {

        await this.view.evaluate(['[GetCancellationRecipientsBankAccounts]'], false, true);
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
    this.view.stopBlockingUI();
};
