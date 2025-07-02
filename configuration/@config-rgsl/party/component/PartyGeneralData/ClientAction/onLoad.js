module.exports = function onLoad(input, ambientProperties) {

    const currentUserRoles = ambientProperties.applicationContext.currentUser().getUserRoles() || [];
    const isComplianceUser = currentUserRoles.some(item => item.ApplicationRoleCodeName == 'ComplianceGroup' || item.ApplicationRoleCodeName == 'ComplianceOfficer');

    if (isComplianceUser) {

        this.view.getControlByElementId('isPodFt')?.enableElement();
    }
    else {

        this.view.getControlByElementId('isPodFt')?.disableElement();
    }
};
