const etlServiceManagementUiLib = require('@config-system/infrastructure/lib/EtlServiceManagementUiCommon');

module.exports = function onRefreshIntervalChange(input, ambientProperties) {
    etlServiceManagementUiLib.setNewTimeout(input, this.view, ambientProperties);
};
