/**
 * @translationKey {translationKey} NotAllowedToInteractWithComments, SaveFirst
 *
 */
module.exports = async function arrayPrepareAddOperationHandler(input, ambientProperties) {

    if (input.context.AllowComments !== true) {

        const notAllowedTranslationKey = `${ambientProperties.configurationCodeName.toUpperCase()}.NotAllowedToInteractWithComments`;

        return await ambientProperties.services.confirmationDialog.showWarning(notAllowedTranslationKey, 'UI_BOOTSTRAP.##OK', undefined, 1).then((res) => {
            return false;
        });


    } else if (input.context.Number === undefined) {

        const saveFirstTranlsationKey = `${ambientProperties.configurationCodeName.toUpperCase()}.SaveFirst`;

        return await ambientProperties.services.confirmationDialog.showWarning(saveFirstTranlsationKey, 'UI_BOOTSTRAP.##OK', undefined, 1).then((res) => {
            return false;
        });
    }

    return true;
};
