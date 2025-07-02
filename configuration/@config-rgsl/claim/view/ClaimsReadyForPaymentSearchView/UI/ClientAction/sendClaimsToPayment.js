'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function sendClaimsToPayment(input, ambientProperties) {

    const selectedClaims = this.view.getSelection();

    if (!selectedClaims || selectedClaims.length === 0) {

        ambientProperties.services.confirmationDialog.showConfirmation('Пожалуйста, укажите убытки для передачи на выплату.', 'OK', 'OK', 2);
        return;
    }

    const claimsRequestData = selectedClaims.map(claim => {

        return {
            number: claim.resultData.claimNumber,
            state: claim.resultData.claimState
        };
    });

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/SendClaimsToPayment/1',
        data: {
            data: {
                claimDocuments: claimsRequestData
            }
        }
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

    let transitionResults = [];

    if (result) {
        transitionResults = result.data?.claimDocuments || [];
    }

    const failedResults = transitionResults.filter(result => !result.isStatusChanged);

    if (failedResults.length === 0) {

        ambientProperties.services.confirmationDialog.showConfirmation('Документы успешно переданы на выплату', 'OK', 'OK', 2);
    }
    else {

        const numbers = failedResults.map(result => result.claimNumber);
        const message = `Не удалось передать на выплату следующие документы: ${numbers.join(' ,')}`;
        ambientProperties.services.confirmationDialog.showConfirmation(message, 'OK', 'OK', 2);
    }

    this.view.search();
};
