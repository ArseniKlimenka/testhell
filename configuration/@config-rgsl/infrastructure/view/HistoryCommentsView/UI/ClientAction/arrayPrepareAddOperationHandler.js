/**
 * @translationKey {translationKey} SaveFirst
 *
 */
module.exports = async function arrayPrepareAddOperationHandler(input, ambientProperties) {

    if (input.context.Number === undefined) {

        const saveFirstTranlsationKey = `${ambientProperties.configurationCodeName.toUpperCase()}.SaveFirst`;

        return await ambientProperties.services.confirmationDialog.showWarning(saveFirstTranlsationKey, 'UI_BOOTSTRAP.##OK', undefined, 1).then((res) => {
            return false;
        });
    }

    return true;
};
