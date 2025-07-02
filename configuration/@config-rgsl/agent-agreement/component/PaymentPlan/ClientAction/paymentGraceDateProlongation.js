'use strict';

/**
 * @translationKey {translationKey} EditPaymentPlanViewTitle
 * @translationKey {translationKey} Save
 */

module.exports = async function paymentGraceDateProlongation(input, ambientProperties) {

    const dialogParams = getDialogParams(input, ambientProperties);
    await ambientProperties.services.viewDialog.show(dialogParams);
};

function getDialogParams(input, ambientProperties) {

    const paymentPlan = input.componentContext;

    return {
        dialogViewReference: {
            configurationCodeName: 'EditPaymentPlanView',
            configurationConceptType: 'CustomView',
            configurationVersion: '1'
        },
        title: translate(ambientProperties, 'EditPaymentPlanViewTitle'),
        dialogSize: 'Large',
        dialogButtonOptions: {
            confirmCaption: translate(ambientProperties, 'Save'),
            onConfirmAction: 'savePaymentPlan',
            onCancelAction: 'closeView'
        },
        customData: {
            paymentPlan
        }
    };
}

function translate(ambientProperties, translationKey) {

    return ambientProperties.services.translate.getSync(ambientProperties.configurationCodeName.toUpperCase(), translationKey);
}
