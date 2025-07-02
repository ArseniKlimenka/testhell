/**
 * @translationKey {translationKey} RestartEtlServiceEventConfirmation
 * @translationKey {translationKey} RestartEtlServiceEventResult
 * @translationKey {translationKey} ProcessingEtlServiceEventResult
 */

const { showConfirmationAsync } = require('@config-system/infrastructure/lib/DialogHelper');
const { post } = require('@config-system/infrastructure/lib/HttpHelpers');

module.exports = async function restartEtlService(input, ambientProperties) {
    const rowData = input.data.resultData;
    await showConfirmationAsync(
        ambientProperties,
        '.RestartEtlServiceEventConfirmation',
        async () => {
            const result = await post(ambientProperties, 'api/core/long-running-tasks/restart', { TaskId: input.data.resultData.taskId });
            const message = await ambientProperties.services.translate.get(ambientProperties.configurationCodeName.toUpperCase() + '.RestartEtlServiceEventResult', { taskId: result.TaskId });
            ambientProperties.services.confirmationDialog.showNotification(message);
        });
};
