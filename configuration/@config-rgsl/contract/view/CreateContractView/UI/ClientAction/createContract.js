'use strict';

/**
 * @translationKey {translationKey} JsonIsNotValid
 * @translationKey {translationKey} ProductCodeIsRequired
 * @translationKey {translationKey} ProductCodeIsAbsent
 * @translationKey {translationKey} ProductGroupIsAbsent
 * @translationKey {translationKey} ProcessHasValidationErrors
 * @translationKey {translationKey} UnknownError
 * @translationKey {translationKey} ProcessCompletedSuccessfully
 * @translationKey {translationKey} TransitionWasBlocked
 * @translationKey {translationKey} PartyIsAbsent
 * @translationKey {translationKey} PartnerIsAbsent
 */

const { callIntegrationService } = require('@config-rgsl/infrastructure/lib/CommonUtils');
function translate(ambientProperties, key, params) { return ambientProperties.services.translate.getSync(ambientProperties.configurationCodeName, key, params); }

module.exports = async function createContract(input, ambientProperties) {
    input.context.Body.validationErrors = [];
    let savingResult;

    this.view.startBlockingUI();

    try {
        const request = {
            data: {
                request: input.context.Body.request
            }
        };

        try {
            savingResult = await callIntegrationService(ambientProperties, 'CreateIndividualPolicy', request);
        } catch (error) {
            const errorMessage = error.error.data?.errorResponse?.message || error.error.message || 'UnknownError';
            showMessage(errorMessage, ambientProperties);
        }

    } finally {
        this.view.stopBlockingUI();
    }

    const errors = savingResult?.data?.validationErrors;

    if (errors?.length > 0) {
        input.context.Body.validationErrors = errors;
        showMessage('ProcessHasValidationErrors', ambientProperties);
    }

    if (savingResult?.hasStopped) {
        showMessage(savingResult.message, ambientProperties);
    }

    if (savingResult?.data?.createdPolicyNumber) {
        const translationKey = savingResult.data.hasTransitioned ? 'ProcessCompletedSuccessfully' : 'TransitionWasBlocked';
        ambientProperties.services.confirmationDialog.showNotification(translate(ambientProperties, translationKey, { policyNumber: savingResult.data.createdPolicyNumber }), undefined, undefined, 1);
        input.context.Body.createdPolicyNumber = savingResult.data.createdPolicyNumber;
        input.context.Body.configurationName = savingResult.data.configurationName;
        this.view.rebind();
    }
};

function showMessage(errorCode, ambientProperties, inputContext) {
    ambientProperties.services.confirmationDialog.showError(translate(ambientProperties, errorCode, inputContext), undefined, undefined, 1);
}
