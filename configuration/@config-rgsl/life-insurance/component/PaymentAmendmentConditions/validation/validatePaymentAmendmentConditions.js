const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const amendmentUtils = require('@config-rgsl/life-insurance/lib/amendmentUtils');

/**
* @errorCode {errorCode} noBankAccountNumber
* @errorCode {errorCode} paymentOrderIsInWork
* @errorCode {errorCode} RecipientsWithoutBankAccountsError
* @errorCode {errorCode} RecipientsWithoutBankAccountsWarning
* @errorCode {errorCode} RecipientsWithoutSelectedBankAccountsError
* @errorCode {errorCode} RecipientsWithoutSelectedBankAccountsWarning
* @errorCode {errorCode} AtleastOneRecipientIsRequired
* @errorCode {errorCode} TotalDistributedAmountShouldBeLesserOrEqualToThanTotalAmount
* @errorCode {errorCode} amountToPayIsRequired
* @errorCode {errorCode} RecipientsAreNotNeeded
* @errorCode {errorCode} DuplicatedRecipientsFound
* @errorCode {errorCode} RecipientsShouldUseNetting
* @errorCode {errorCode} CreditRefundSelectedAttachmentRequired
*/

module.exports = function validatePaymentAmendmentConditions(input) {

    const validationErrors = [];

    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;
    const documentState = this.businessContext.documentState;

    const recipients = body.paymentAmendmentConditions.canellationRecipients ?? [];
    const amount = amendmentUtils.calculateTotalCancellationAmount(body)?.total ?? 0;

    const recipientsWithNetting = recipients.filter(i => i.recipientPaymentType?.code === amendmentConstants.recipientPaymentType.nettingPayment);
    const names = recipientsWithNetting.map(item => item.fullName);

    if (names.length > 0) {

        validationErrors.push({
            errorCode: 'RecipientsShouldUseNetting',
            reference: {
                items: names.join()
            },
            severity: 'Warning'
        });
    }

    if (amount > 0) {

        if (recipients.length === 0) {

            validationErrors.push({
                errorCode: 'AtleastOneRecipientIsRequired',
                errorDataPath: dataPath + '/canellationRecipients'
            });
        }
        else {

            let totalAmountDistributed = 0;

            for (let i = 0; i < recipients.length; i++) {

                if (recipients[i].amountToPay === undefined || recipients[i].amountToPay === 0) {

                    validationErrors.push({
                        errorCode: 'amountToPayIsRequired',
                        errorDataPath: `/Body/paymentAmendmentConditions/canellationRecipients/${i}/amountToPay`
                    });
                }
                else {

                    totalAmountDistributed += recipients[i].amountToPay;
                }
            }

            if (totalAmountDistributed > amount) {

                validationErrors.push({
                    errorCode: 'TotalDistributedAmountShouldBeLesserOrEqualToThanTotalAmount',
                    errorDataPath: dataPath + '/canellationRecipients'
                });
            }

            if (recipients.length > 1) {

                const itemsToCheck = recipients.filter(item => !item.isPaid).map(i => { return { code: i.partyCode, paymentType: i.recipientPaymentType?.code }; });
                const unique = itemsToCheck.filter((obj, index) => itemsToCheck.findIndex((item) => item.code === obj.code && item.paymentType === obj.paymentType) === index);
                const duplicated = itemsToCheck.filter(i => !unique.includes(i));

                if (duplicated?.length > 0) {

                    validationErrors.push({
                        errorCode: 'DuplicatedRecipientsFound',
                        errorDataPath: '/canellationRecipients'
                    });
                }
            }

            amendmentUtils.validateCancellationRecipientsBankAccounts(body, documentState, validationErrors);
        }
    }
    else {

        if (recipients.length > 0) {

            validationErrors.push({
                errorCode: 'RecipientsAreNotNeeded',
                errorDataPath: dataPath + '/canellationRecipients'
            });
        }
    }

    const paymentLines = body.paymentAmendmentConditions.paymentLines ?? [];
    const creditRefundLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.creditRefund);

    if (creditRefundLine?.paymentLineSum > 0) {

        validationErrors.push({
            errorCode: 'CreditRefundSelectedAttachmentRequired',
            severity: 'Warning'
        });
    }

    amendmentUtils.validateOpenAmount(body, validationErrors);

    return validationErrors;
};
