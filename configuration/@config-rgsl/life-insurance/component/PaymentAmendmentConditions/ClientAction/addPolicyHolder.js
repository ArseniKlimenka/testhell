'use strict';
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} CannotAddAnotherPolicyHolder
 */

module.exports = async function addPolicyHolder(input, ambientProperties) {

    this.view.startBlockingUI();

    const newRecipient = {};
    const holder = input.rootContext.Body.technicalData.policyParties.holder;

    if (input.componentContext.canellationRecipients.find(x => x.partyCode === holder.personCode)) {

        const ONLY_OK_BUTTON = 1;
        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.CannotAddAnotherPolicyHolder', "OK", "Cancel", ONLY_OK_BUTTON);
        this.view.rebind();
        this.view.reevaluateRules();
        this.view.validate();
        this.view.stopBlockingUI();
        return;
    }

    newRecipient.recipientReason = amendmentConstants.defaultCancellationRecipientReason;
    newRecipient.recipientPaymentType = amendmentConstants.defaultCancellationRecipientPaymentType;
    newRecipient.amountToPayPercetage = 1;

    newRecipient.partyId = holder.personId;
    newRecipient.partyCode = holder.personCode;
    newRecipient.partyType = holder.partyType;
    newRecipient.fullName = holder.fullName;

    const validFrom = input.rootContext.Body.basicAmendmentConditions.validFrom;

    const bankAccountRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetPartyBankAccountsOnlyDataSource',
        data: {
            data: {
                criteria: {
                    partyCode: holder.personCode,
                    activeOnly: true,
                    tillDate: validFrom
                }
            }
        }
    };

    let bankAccountResult;

    try {
        this.view.startBlockingUI();
        bankAccountResult = await ambientProperties.services.api.call(bankAccountRequest);
    }
    catch (err) {
        throwResponseError(err);
        this.view.stopBlockingUI();
    }

    const totalAmouns = amendmentUtils.calculateTotalCancellationAmount(input.rootContext.Body);
    newRecipient.bankAccount = bankAccountResult.data[0].resultData[0];
    newRecipient.amountToPay = totalAmouns.total * newRecipient.amountToPayPercetage;
    newRecipient.amountToPayInRubCurrency = totalAmouns.totalInRub * newRecipient.amountToPayPercetage;
    input.componentContext.canellationRecipients.push(newRecipient);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
    this.view.stopBlockingUI();
};
