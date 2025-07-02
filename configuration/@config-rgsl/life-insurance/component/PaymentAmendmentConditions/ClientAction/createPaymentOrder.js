'use strict';

const { paymentOrderType, paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

/**
 * @translationKey {translationKey} PaymentOrderCreated
 * @translationKey {translationKey} SelectRecipient
 * @translationKey {translationKey} ErrorDuringPamentOrderCreation
 * @translationKey {translationKey} SaveFirst
 * @translationKey {translationKey} InvalidRecipient
 * @translationKey {translationKey} DocumentHasErrorsOnPOCReation
 * @translationKey {translationKey} NoPermissionToCreatePo
 */
module.exports = async function createPaymentOrder(input, ambientProperties) {

    const entityId = input.context.Id;
    const currentUser = ambientProperties.applicationContext.currentUser().getUserName();
    const isDocumentLocked = !isSaveOperationAvailable(this.view);
    let currentAssignee = undefined;
    const stateCode = input.context.State.Code;

    if (entityId) {

        currentAssignee = await getCurrentAssignee(input, ambientProperties);
    }

    if (amendmentConstants.cancellationStatesToAllocateActivities.includes(stateCode) &&
        !isDocumentLocked &&
        (!currentAssignee || currentAssignee !== currentUser)) {

        throw 'Невозможно создать РНВ! На текущего пользователя не назначена задача!';
    }

    const schemaValidationResult = getValue(input, 'context.ValidationResult.schemaValidations', []);
    const schemaErrors = schemaValidationResult.filter(item => item.severity === 'Error' && item.code !== 'RecipientsWithoutBankAccounts');

    if (schemaErrors.length > 0) {

        ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.DocumentHasErrorsOnPOCReation', 'OK', 'OK', 2);
        return;
    }

    if (isDocumentLocked) {

        ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.NoPermissionToCreatePo', 'OK', 'OK', 2);
        return;
    }

    if (this.view.isDirty()) {

        ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.SaveFirst', 'OK', 'OK', 2);
        return;
    }

    const selectedItems = this.view.getControlByElementId('cancellationRecipientsTable').dataSource.selectionModel.selected();

    if (!selectedItems || selectedItems.length === 0) {

        ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.SelectRecipient', 'OK', 'OK', 2);
        return;
    }

    const selectedRecipient = selectedItems[0];
    const recipients = input.componentContext.canellationRecipients;
    const recipient = recipients.find(item => item === selectedRecipient);

    if (!recipient.partyCode || !recipient.recipientReason.code || !recipient.recipientPaymentType.code) {

        ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.InvalidRecipient', 'OK', 'OK', 2);
        return;
    }

    const cancellationNo = input.rootContext.Number;
    const contractNo = input.rootContext.OriginalDocumentNumber;
    const existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;

    if (existingPaymentOrders && selectedItems.length !== 0) {

        const existing = existingPaymentOrders.find(item => item.recipientCode === recipient.partyCode &&
            (item.paymentOrderNumber === recipient.assignedPaymentOrderNumber ||
                item.paymentOrderNumber === recipient.assignedPitPaymentOrderNumber));

        if (existing) {

            ambientProperties.services.confirmationDialog.showConfirmation(`Для указанного выгодоприобретателя уже создан РНВ: ${existing.paymentOrderNumber}`, 'OK', 'OK', 2);
            return;
        }
    }

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/CreatePaymentOrder/1',
        data: {
            data: {
                paymentOrderType: paymentOrderType.PolicyCancellation,
                referenceNumber: contractNo,
                cancellationNumber: cancellationNo,
                cancellationRecipientCode: recipient.partyCode,
                cnlRecipientPaymentTypeCode: recipient.recipientPaymentType.code
            }
        },
        returnFullResponse: true
    };

    let isCreated = false;
    let poRecords = [];

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    if (result.status === 200) {

        isCreated = true;
        poRecords = result.body.data.paymentOrders.map(o => {
            return {
                paymentOrderNumber: o.paymentOrderNumber,
                recipientCode: recipient.partyCode,
                paymentOrderType: o.paymentOrderType,
                paymentOrderSubType: o.paymentOrderSubtype
            };
        });
    }

    if (isCreated) {

        if (!input.context.ClientViewModel.existingPaymentOrders) {

            input.context.ClientViewModel.existingPaymentOrders = [];
        }

        input.context.ClientViewModel.existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders.concat(poRecords);

        const poNumber = poRecords
            .find(item => item.paymentOrderType === paymentOrderType.PolicyCancellation &&
                !item.paymentOrderSubType)?.paymentOrderNumber;

        const pitPoNumber = poRecords
            .find(item => item.paymentOrderType === paymentOrderType.PolicyCancellation &&
                item.paymentOrderSubType === paymentOrderSubType.PIT)?.paymentOrderNumber;

        recipient.assignedPaymentOrderNumber = poNumber;
        recipient.assignedPitPaymentOrderNumber = pitPoNumber;

        this.view.save();
        this.view.rebind();
        this.view.reevaluateRules();
        this.view.validate();

        ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.PaymentOrderCreated', 'OK', 'OK', 2);
    }
    else {

        ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.ErrorDuringPamentOrderCreation', 'OK', 'OK', 2);
    }
};

async function getCurrentAssignee(input, ambientProperties) {

    const activitiesRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/OpenStateActivityDataSource',
        data: {
            data: {
                criteria: {
                    entityId: input.context.Id,
                    stateCode: input.context.State.Code
                }
            }
        }
    };

    const result = await ambientProperties.services.api.call(activitiesRequest);

    let currentAssignee = undefined;
    if (result?.data?.length > 0) {

        currentAssignee = result.data[0].resultData.userName;
    }

    return currentAssignee;
}
