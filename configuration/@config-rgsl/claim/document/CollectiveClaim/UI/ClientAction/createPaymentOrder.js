'use strict';

const { paymentOrderType, paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const uriBuilder = require('@config-rgsl/infrastructure/lib/UriBuilder');

/**
 * @translationKey {translationKey} PaymentOrderCreated
 * @translationKey {translationKey} ErrorDuringPamentOrderCreation
 * @translationKey {translationKey} SaveFirst
 * @translationKey {translationKey} DocumentHasErrorsOnPOCReation
 * @translationKey {translationKey} NoPermissionToCreatePo
 */
module.exports = async function createPaymentOrder(input, ambientProperties) {

    const schemaValidationResult = input.context.ValidationResult?.schemaValidations ?? [];
    const schemaErrors = schemaValidationResult.filter(item => item.severity === 'Error');

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

    const claimNo = input.rootContext.Number;
    let existingPaymentOrders = input.context.ClientViewModel.existingPaymentOrders;

    if (existingPaymentOrders.length > 0) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(`РНВ уже создан: ${existingPaymentOrders[0].paymentOrderNumber}`, 'OK', 'OK', 2);
        return;
    }

    const request = {
        method: 'post',
        url: uriBuilder.getIntegrationServiceUri('CreatePaymentOrder'),
        data: {
            data: {
                paymentOrderType: paymentOrderType.Claim,
                paymentOrderSubtype: paymentOrderSubType.Collective,
                referenceNumber: claimNo
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
    let poNumber = undefined;

    if (result.status === 200) {

        isCreated = true;
        poNumber = result.body.data.paymentOrders[0].paymentOrderNumber;
    }

    if (isCreated) {

        if (!existingPaymentOrders) {

            existingPaymentOrders = [];
        }

        const poRecord = { paymentOrderNumber: poNumber };
        existingPaymentOrders.push(poRecord);
        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.PaymentOrderCreated', 'OK', 'OK', 2);
        input.context.Body.claimAmounts.assignedPaymentOrderNumber = poRecord.paymentOrderNumber;

        this.view.save();
        this.view.rebind();
        this.view.reevaluateRules();
        this.view.validate();
    }
    else {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.ErrorDuringPamentOrderCreation', 'OK', 'OK', 2);
    }
};
