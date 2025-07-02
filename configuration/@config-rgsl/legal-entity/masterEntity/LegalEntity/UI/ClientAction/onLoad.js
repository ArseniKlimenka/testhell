const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = async function onLoad(input, ambientProperties) {

    const currentActor = ambientProperties.currentWorkUnitActor;
    const userRoles = ambientProperties.applicationContext.currentUser().getUserRoles();
    const isCoach = userRoles.some(item => item.ApplicationRoleCodeName == 'Coach');
    const isCurrentUserAdmin = ambientProperties.applicationContext.isCurrentUserAdmin();

    if (currentActor == partyConstants.actor.RiskManager) {
        await this.view.disableAllElements();
        if (this.view.getControlByElementId("riskManagerAttributes"))
        { this.view.getControlByElementId("riskManagerAttributes").enableElement(); }
    }
    else {
        if (this.view.getControlByElementId("riskManagerAttributes"))
        { this.view.getControlByElementId("riskManagerAttributes").disableElement(); }
    }

    if (isCoach && !isCurrentUserAdmin) {
        this.view.disableAllElements();
        this.view.getContext().AvailableOperations = this.view.getContext().AvailableOperations.filter(
            operation => operation.Code != 'Save'
        );
        this.view.rebind();
    }

    this.view.validate();
    this.view.reevaluateRules();

};
