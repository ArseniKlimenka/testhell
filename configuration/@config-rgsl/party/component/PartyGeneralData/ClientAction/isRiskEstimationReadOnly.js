'use strict';

module.exports = function isRiskEstimationReadOnly(input, ambientProperties) {

    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const isPartyGeneralDataRiskEstimation = userRoles.some(x => x.ApplicationRoleCodeName == 'PartyGeneralDataRiskEstimation');
    const isPartyEditorAGENT = userRoles.some(item => item.ApplicationRoleCodeName === 'PartyEditorAGENT');

    if (isPartyGeneralDataRiskEstimation && !isPartyEditorAGENT) {
        return false;
    }

    return true;
};
