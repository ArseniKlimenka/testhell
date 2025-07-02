const { notAllowedStatesForRestart } = require('@config-system/infrastructure/lib/EtlServiceManagementUiCommon');

module.exports = function shouldRestartButtonBeVisible(input) {
    return input?.context?.resultData?.restartable && !notAllowedStatesForRestart.includes(input?.context?.resultData?.state);
};
