'use strict';

const { paymentOrderType, paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const uriBuilder = require('@config-rgsl/infrastructure/lib/UriBuilder');
const { endowmentStatesToAllocateActivities } = require('@config-rgsl/claim-base/lib/claimConsts');

/**
 * @translationKey {translationKey} PaymentOrderCreated
 * @translationKey {translationKey} SelectBeneficiary
 * @translationKey {translationKey} ErrorDuringPamentOrderCreation
 * @translationKey {translationKey} SaveFirst
 * @translationKey {translationKey} InvalidBeneficiary
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

    if (endowmentStatesToAllocateActivities.includes(stateCode) &&
        !isDocumentLocked &&
        (!currentAssignee || currentAssignee !== currentUser)) {

        throw 'Невозможно создать РНВ! На текущего пользователя не назначена задача!';
    }

    const schemaValidationResult = input.context.ValidationResult?.schemaValidations ?? [];
    const schemaErrors = schemaValidationResult.filter(item => item.severity === 'Error' &&
        item.code !== 'BeneficiariesWithoutBankAccounts');

    if (schemaErrors.length > 0) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.DocumentHasErrorsOnPOCReation', 'OK', 'OK', 2);
        return;
    }

    if (!isSaveOperationAvailable(this.view)) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.NoPermissionToCreatePo', 'OK', 'OK', 2);
        return;
    }

    if (this.view.isDirty()) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.SaveFirst', 'OK', 'OK', 2);
        return;
    }

    const selectedItems = this.view
        .getControlByElementId('beneficiariesTable').dataSource.selectionModel.selected();

    if (!selectedItems || selectedItems.length === 0) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.SelectBeneficiary', 'OK', 'OK', 2);
        return;
    }

    const selectedBeneficiary = selectedItems[0];
    const beneficiaries = input.rootContext.Body.endowmentBeneficiaries;
    const beneficiary = beneficiaries.find(item => item === selectedBeneficiary);

    if (!beneficiary.partyCode || !beneficiary.beneficiaryReason.code || !beneficiary.beneficiaryPaymentType.code) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.InvalidBeneficiary', 'OK', 'OK', 2);
        return;
    }

    const endowmentNo = input.rootContext.Number;
    let existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;

    if (existingPaymentOrders && selectedItems.length !== 0) {

        const existing = existingPaymentOrders.find(item => item.beneficiaryCode === beneficiary.partyCode &&
            (item.paymentOrderNumber === beneficiary.assignedPaymentOrderNumber ||
                item.paymentOrderNumber === beneficiary.assignedPitPaymentOrderNumber));

        if (existing) {

            ambientProperties.services.confirmationDialog.showConfirmation(`Для указанного выгодоприобретателя уже создан РНВ: ${existing.paymentOrderNumber}`, 'OK', 'OK', 2);
            return;
        }
    }

    const request = {
        method: 'post',
        url: uriBuilder.getIntegrationServiceUri('CreatePaymentOrder'),
        data: {
            data: {
                paymentOrderType: paymentOrderType.Claim,
                paymentOrderSubtype: paymentOrderSubType.Endowment,
                referenceNumber: endowmentNo,
                beneficiaryCode: beneficiary.partyCode,
                beneficiaryPaymentTypeCode: beneficiary.beneficiaryPaymentType.code
            }
        },
        returnFullResponse: true
    };

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

    let isCreated = false;
    let poRecords = [];

    if (result.status === 200) {

        isCreated = true;
        poRecords = result.body.data.paymentOrders.map(o => {

            return {
                paymentOrderNumber: o.paymentOrderNumber,
                beneficiaryCode: beneficiary.partyCode,
                paymentOrderType: o.paymentOrderType,
                paymentOrderSubtype: o.paymentOrderSubtype
            };
        });
    }

    if (isCreated) {

        if (!existingPaymentOrders) {

            input.context.ClientViewModel.existingPaymentOrders = [];
        }

        input.context.ClientViewModel.existingPaymentOrders = existingPaymentOrders.concat(poRecords);
        existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;

        const poNumber = poRecords
            .find(item => item.paymentOrderType === paymentOrderType.Claim &&
                item.paymentOrderSubtype === paymentOrderSubType.Endowment)?.paymentOrderNumber;
        const pitPoNumber = poRecords
            .find(item => item.paymentOrderType === paymentOrderType.Claim &&
                item.paymentOrderSubtype === paymentOrderSubType.EndowmentPIT)?.paymentOrderNumber;

        beneficiary.assignedPaymentOrderNumber = poNumber;
        beneficiary.assignedPitPaymentOrderNumber = pitPoNumber;

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
