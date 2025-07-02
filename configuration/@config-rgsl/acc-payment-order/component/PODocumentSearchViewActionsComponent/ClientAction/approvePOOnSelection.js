'use strict';

const { paymentOrderStates } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} POSuccessfullyApproved
 * @translationKey {translationKey} NoPOforApprove
 */

module.exports = async function approvePOOnSelection(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;
    const selected = input.context.selection;
    const translate = ambientProperties.services.translate.getSync;

    const selectedPOCount = selected.length;
    const selectedPOApplied = selected.filter(_ => _.resultData.originalStateCode == paymentOrderStates.Draft);
    const selectedPOAppliedCount = selectedPOApplied.length;
    const selectedPONumbers = selectedPOApplied.map(_ => _.resultData.paymentOrderNumber);
    let selectedPOApprovedCount = 0;

    if (selectedPOAppliedCount === 0) {
        ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.NoPOforApprove', 'OK', 'Cancel', ONLY_OK_BUTTON);
        return;
    }

    const request = {
        method: 'post',
        url: 'api/core/integration-services/ApprovePaymentOrderService/1',
        data: {
            data: {
            }
        }
    };

    try {
        this.view.startBlockingUI();
        for (const poToApply of selectedPOApplied) {
            request.data.data.poNumber = poToApply.resultData.paymentOrderNumber;

            let t;
            try {
                await ambientProperties.services.api.call(request);
            }
            catch (e) {
                t = e;
            }
        }
    }
    finally {
        this.view.stopBlockingUI();
    }

    const countRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/PaymentOrderBasicInfoDataSource',
        data: {
            data: {
                criteria: {
                    poNumbers: selectedPONumbers,
                    paymentOrderStates: [paymentOrderStates.Approved],
                }
            }
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(countRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    if (result && result.data) {
        selectedPOApprovedCount = result.data.length;
    }

    const msgData = {
        poSelected: selectedPOCount,
        poApproved: selectedPOApprovedCount,
        poError: selectedPOAppliedCount - selectedPOApprovedCount,
    };

    const msg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'POSuccessfullyApproved', msgData);
    ambientProperties.services.confirmationDialog.showNotification(msg, 'OK', 'Cancel', ONLY_OK_BUTTON);

    this.view.search();
};
