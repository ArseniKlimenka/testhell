'use strict';

module.exports = async function CommentsOnLoad(input, ambientProperties) {

    this.view.startBlockingUI();

    const userHasGeneralBackOfficeRole = ambientProperties.applicationContext
        .currentUser()
        .getUserRoles()
        .filter(role => role.ApplicationRoleCodeName == 'GeneralBackOffice').length > 0;

    if (userHasGeneralBackOfficeRole) {
        input.context.Body = input.context.Body.map(obj => ({ ...obj, canViewAuthor: true }));
    } else {
        input.context.Body = input.context.Body.map(obj => ({ ...obj, canViewAuthor: false }));
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
    this.view.stopBlockingUI();
};
