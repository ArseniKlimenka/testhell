const etlServiceManagementUiLib = require('@config-system/infrastructure/lib/EtlServiceManagementUiCommon');

module.exports = function initializeEtlServiceManagementView(input, ambientProperties) {
    input.rootContext.request.data.refreshInterval = 5;
    etlServiceManagementUiLib.setNewTimeout(input, this.view, ambientProperties);
};
