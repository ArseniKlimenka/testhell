'use strict';

module.exports = function showPartyDuplicate(input, ambientProperties) {

    const allowActors = [
        "GeneralBackOffice",
        "Operations",
        "Administrator",
        "System"
    ];

    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();

    if (userRoles.filter(ur => allowActors.includes(ur.ApplicationRoleCodeName)).length > 0 && !input.context?.Body?.partyGeneralData?.duplicateMasterNumber) {
        return true;
    }

    return false;

};
