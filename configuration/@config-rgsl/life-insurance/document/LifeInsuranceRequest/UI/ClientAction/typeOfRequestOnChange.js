'use strict';

const {
    fillInAmendmentReason,
    getBankAccounts,
    getRecipientBankAccounts,
    fillInBankAccount,
    fillInRecipientBankAccount,
    blockAgentCancellation,
    setRequestDefaultValues
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = async function typeOfRequestOnChange(input, ambientProperties) {

    await setRequestDefaultValues(input, ambientProperties, this);
    await fillInAmendmentReason(input, ambientProperties);
    await getBankAccounts(input, ambientProperties);
    await getRecipientBankAccounts(input, ambientProperties);
    await fillInBankAccount(input);
    fillInRecipientBankAccount(input);
    await blockAgentCancellation(input, ambientProperties, this);

    if (input.context.Body.typeOfRequest) {
        this.view.getContext().AvailableOperations = [{
            Code: "Save",
            Description: "Save",
            Link: {
                Rel: null,
                Href: "api/core/universal-documents",
                Method: "POST"
            }
        }];
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

};
