module.exports = async function onChangeReplaceDisabilityAnyReason(input, ambientProperties) {

    const ONLY_OK_BUTTON = 1;

    const manualCorrection = input.data.manualCorrection;
    const manualRiskDeletion = input.data.manualRiskDeletion;
    const replaceDisabilityAnyReason = input.data.replaceDisabilityAnyReason;

    if (manualCorrection && (manualRiskDeletion || replaceDisabilityAnyReason)) {

        await ambientProperties.services.confirmationDialog.showError('Использовать ручную корректировку с другими вариантами корректировки запрещено!', 'OK', 'Cancel', ONLY_OK_BUTTON);

        input.data.replaceDisabilityAnyReason = false;
    }
};
