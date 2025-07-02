'use strict';

module.exports = function showDuplicateFilter(input, ambientProperties) {

    const allowActors = [
        "GeneralBackOffice",
        "Operations",
        "Administrator",
        "System"
    ];

    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();

    if (userRoles.filter(ur => allowActors.includes(ur.ApplicationRoleCodeName)).length > 0) {
        return true;
    }

    return false;

};

/*  Disable by roles
    let parentView = this.view?.getParentView()?.getContext();

    if (this.view?.getParentView() == undefined) {
        parentView = this.view?.getContext();
    }

    if (parentView.ConfigurationCodeName == 'GeneralPartySearchWithEditView') {
        parentView = this.view?.getParentView()?.getParentView()?.getContext();
    }

    if (parentView) {
        if ([documentActors.GeneralBackOffice, documentActors.Operations, documentActors.Administrator, documentActors.System]
            .includes(parentView.WorkUnitActor.CurrentActor)) {
            return true;
        }
    }
*/
