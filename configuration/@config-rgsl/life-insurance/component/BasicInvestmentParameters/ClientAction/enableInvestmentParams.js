const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { shouldDisableSaveableContract } = require('@config-rgsl/infrastructure/lib/UIUtils');

module.exports = function enableInvestmentParams(input, ambientProperties) {

    if (shouldDisableSaveableContract(input, this.view)) {
        return false;
    }

    const isManualSetInvestmentParams = input.componentContext.isManualSetInvestmentParams ?? false;

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isBackOffice = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'GeneralBackOffice');

    const state = getValue(input, 'context.State.Code');

    return isBackOffice && isManualSetInvestmentParams && state == 'Draft';
};
