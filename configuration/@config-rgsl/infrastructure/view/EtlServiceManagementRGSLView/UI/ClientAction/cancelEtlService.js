/**
 * @translationKey {translationKey} CancelEtlServiceEventConfirmation
 */

const { showConfirmationAsync } = require('@config-system/infrastructure/lib/DialogHelper');
const { post } = require('@config-system/infrastructure/lib/HttpHelpers');

module.exports = async function cancelEtlService(input, ambientProperties) {
    await showConfirmationAsync(
        ambientProperties,
        '.CancelEtlServiceEventConfirmation',
        async () => await post(ambientProperties, 'api/core/long-running-tasks/cancel', { TaskId: input.data.resultData.taskId }));
};
