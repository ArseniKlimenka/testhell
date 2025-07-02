const { callIntegrationService } = require('@config-rgsl/infrastructure/lib/CommonUtils');

module.exports = async function releaseAssetLimit(input, ambientProperties) {

    this.view.save();

    const request = {
        data: {
            contractNumber: input.context.Number
        }
    };

    this.view.startBlockingUI();

    try {
        const result = await callIntegrationService(ambientProperties, 'AssetLimitReleaseIS', request);
    } catch (error) {
        const errorMessage = error.error.data?.errorResponse?.message || error.error.message || error.error.Message || 'UnknownError';
        showMessage(errorMessage, ambientProperties);
    } finally {
        this.view.stopBlockingUI();
    }

    this.view.save();
};

function showMessage(msg, ambientProperties) {
    ambientProperties.services.confirmationDialog.showError(msg, undefined, undefined, 1);
}
